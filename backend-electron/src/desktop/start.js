// Modules to control application life and create native browser window
const { Tray, BrowserWindow, app, nativeImage, Menu, shell, screen } = require('electron')
const { desktopConfig, getUrlIndexHtml, pathIconIco, pathIconPng, pathPreloadJs, enableDevTools } = require('./config')

// // 强制启用 GPU
// app.commandLine.appendSwitch('ignore-gpu-blocklist')
// app.commandLine.appendSwitch('use-angle', 'd3d11')
// app.commandLine.appendSwitch('enable-gpu-compositing')

/** @type { Tray | null } */
let mainTray = null
// 注意，窗口被关闭时并不会是null，而应该通过 mainWindow.isDestroyed() 判断
/**
 * @type {BrowserWindow | null}
 */
let mainWindow = null

let isQuitting = false
const quitApp = () => {
  if (isQuitting) {
    return
  }
  isQuitting = true
  app.quit()
}

// 确保只有一个实例在运行，将在 index.ts 调用
const checkOnlyOneDesktop = () => {
  if (!app.requestSingleInstanceLock()) {
    // 已有app在运行，退出
    quitApp()
    return false
  } else {
    // app为首个运行，为其绑定时间，当发现被重复运行时，实现窗口重新聚焦到本窗口
    app.on('second-instance', mainWindowShowRestoreFocus)
    return true
  }
}

// 将在 src/index.ts 中调用
const startElectronDesktop = () => {
  app.whenReady().then(() => {
    // // 绑定icp通信
    // handleIcpMain()

    // 【260530】改为不带小托盘，关闭窗口即关闭程序
    // // 创建托盘
    // createTray()

    // 创建窗口
    createWindow()
    // 部分 API 在 ready 事件触发后才能使用。
    app.on('activate', () => {
      // 在 macOS 系统内, 如果没有已开启的应用窗口
      // 点击托盘图标时通常会重新创建一个新窗口
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
    // // 在应用退出前关闭 Hono 服务器
    // app.on('before-quit', () => {
    //   server.close(() => {
    //     console.log('Hono server closed')
    //   })
    // })
  }).catch((error) => { console.log(error) })
}

// const handleIcpMain = () => {
//   ipcMain.handle('generateTokenAdmin', async () => await generateTokenAdmin('desktop'))
//   ipcMain.handle('httpPortIcp', async () => httpPort)
// }

// 【260530】改为不带小托盘，关闭窗口即关闭程序
// const createTray = () => {
//   // 托盘用多尺寸ico会模糊，直接用图片吧
//   const icon = nativeImage.createFromPath(pathIconPng)
//   mainTray = new Tray(icon)
//   const contextMenu = Menu.buildFromTemplate([
//     {
//       label: desktopConfig.trayShowLable,
//       click: mainWindowShowRestoreFocus
//     }, {
//       label: desktopConfig.trayQuitLable,
//       click: quitApp
//     }
//   ])

//   mainTray.setContextMenu(contextMenu)
//   mainTray.setToolTip(desktopConfig.trayToolTip)
//   mainTray.setTitle(desktopConfig.trayTitle)

//   // 点击托盘图标显示窗口
//   mainTray.on('click', mainWindowShowRestoreFocus)
// }

const mainWindowShowRestoreFocus = () => {
  if (isQuitting) {
    return
  }
  if (mainWindow == null) {
    return
  }
  const isVisible = mainWindow.isVisible()
  const isMinimized = mainWindow.isMinimized()

  if (!isVisible && !isMinimized) {
    // 已隐藏，显示
    mainWindow.show()
  } else if (isMinimized) {
    // 最小化，恢复
    mainWindow.restore()
  } else {
    // 显示
  }
  mainWindow.focus()
}

const createWindow = () => {
  // 根据屏幕大小控制窗口大小
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize
  const windowInfo = (() => {
    if (screenWidth < desktopConfig.width || screenHeight < desktopConfig.height) {
      return {
        width: desktopConfig.screenLtWidthCalc(screenWidth),
        height: desktopConfig.screenLtHeightCalc(screenHeight),
        shouldMaximize: true
      }
    }
    return {
      width: desktopConfig.width,
      height: desktopConfig.height,
      shouldMaximize: false
    }
  })()
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: windowInfo.width,
    height: windowInfo.height,
    minWidth: desktopConfig.minWidth,
    minHeight: desktopConfig.minHeight,
    show: false, // 初始隐藏窗口
    // 窗口图标使用多尺寸ico最好
    icon: pathIconIco,
    webPreferences: {
      preload: pathPreloadJs,

      // ⚠️ 必须显式关闭 sandbox，否则 preload 会在沙盒环境运行，
      //    无法使用 Node.js API（require、fs、path 等全部不可用）。
      sandbox: false,
  
      // ✔ 保持 contextIsolation=true（官方安全要求）
      //    让 preload 与渲染进程隔离，防止前端页面直接访问 Node 环境。
      //    不影响 preload 使用 Node，只是保证安全。
      contextIsolation: true,

      // ✔ 必须保持 nodeIntegration=false（安全）
      //    禁止渲染进程使用 require（避免前端页面获得 Node 权限）。
      //    preload 的 Node 能力不受此影响，只由 sandbox/Fuses 决定。
      nodeIntegration: false,
    }
  })
  if (windowInfo.shouldMaximize) {
    mainWindow.maximize()
  }
  // 完成加载时显示窗口
  mainWindow.once('ready-to-show', () => {
    // mainWindow?.show()
    // 感觉延时 0.5 秒更好
    setTimeout(() => {
      mainWindow?.show()
    }, 500)
  })

  // 移除默认的菜单栏
  mainWindow.setMenu(null)

  // 加载 index.html
  mainWindow.loadURL(getUrlIndexHtml()).catch((error) => { console.log(error) })

  // 打开开发工具
  if (enableDevTools) {
    mainWindow.webContents.openDevTools()
  }

  // // 窗口关闭时隐藏窗口
  // mainWindow.on('close', (event) => {
  //   if (isQuitting) {
  //     // 这个是必要的，不然无法退出
  //     return
  //   }
  //   event.preventDefault()
  //   mainWindow?.hide()
  //   return true
  // })

  // 【260530】改为不带小托盘，关闭窗口即关闭程序
  // 窗口关闭时直接退出
  mainWindow.on('close', () => {
    isQuitting = true
    app.quit()
  })

  // 使用系统默认浏览器打开链接
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url).catch((error) => { console.log(error) })
    return { action: 'deny' } // 阻止 Electron 自己打开链接
  })
}

module.exports = {
  startElectronDesktop,
  checkOnlyOneDesktop
}