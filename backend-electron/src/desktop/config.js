const path = require('path')

// 前端url
// const getUrlIndexHtml = () => `https://sakiko.top/`
const getUrlIndexHtml = () => `http://127.0.0.1:50403/`

const pathPreloadJs = path.join(__dirname, './preload.js')

// 窗口图标使用多尺寸ico最好
const pathIconIco = path.join(__dirname, '../../assets/icon.ico')
// 托盘用多尺寸ico会模糊，直接用图片吧
const pathIconPng = path.join(__dirname, '../../assets/icon.png')

const desktopConfig = {
  width: 1280,
  height: 720,
  // 屏幕小于宽或高时，宽高的算法，val是屏幕宽或高的值
  screenLtWidthCalc: (/** @type {number} */ val) => { return val - 100 },
  screenLtHeightCalc: (/** @type {number} */ val) => { return val - 100 },
  minWidth: 500,
  minHeight: 400,
  trayTitle: 'ElectronDemo',
  trayToolTip: 'ElectronDemo',
  trayShowLable: '打开 ElectronDemo',
  trayQuitLable: '退出 ElectronDemo',
}

// 是否打开开发工具
// const enableDevTools = true
const enableDevTools = false

module.exports = {
  getUrlIndexHtml,
  pathPreloadJs,
  pathIconIco,
  pathIconPng,
  desktopConfig,
  enableDevTools,
}