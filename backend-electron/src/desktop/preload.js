const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs')
const path = require('path')
const { z } = require('zod')

// 实现读取程序所在目录的某个文件（主要场景是便携版，就是和.exe同级目录下的文件）config.json中的内容解析后提供给前端
// 前端就能根据此，来实现桌面版自动登录，不必像网页版手动输入登录

// exe 所在目录（portable 版最稳）
const appDir = path.dirname(process.execPath)
const configPath = path.join(appDir, 'config.json')

// 读取文件
const configRaw = (() => {
  try {
    return fs.readFileSync(configPath, 'utf8')
  } catch {
    console.error('Config file not found:', configPath)
    return null
  }
})()

// zod 校验
const configSchema = z.object({
  aaaaaa: z.string(),
  bbbbbb: z.string()
})

const configFileContent = (() => {
  if (configRaw == null) {
    return null
  }
  try {
    return configSchema.parse(JSON.parse(configRaw))
  } catch (error) {
    console.error('Config validation failed:', error)
    return null
  }
})()

// 暴露给前端
/**
 * 将desktopAPI标注为前端desktop-interface.d.ts文件中DesktopAPI，以达到类型检查类型安全的效果
 * 且是以src为基准，不会被当前文件路径影响
 * @type {import('@/../../frontend-vue3/desktop-interface').DesktopAPI}
 */
const desktopAPI = {
  process_versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  },
  configFileContent,
  // generateTokenAdmin: async (): Promise<string> => await ipcRenderer.invoke('generateTokenAdmin'),
  // httpPortIcp: async (): Promise<number> => await ipcRenderer.invoke('httpPortIcp')
}

contextBridge.exposeInMainWorld('desktopAPI', desktopAPI)