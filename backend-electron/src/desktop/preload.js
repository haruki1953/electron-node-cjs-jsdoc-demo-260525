const { contextBridge, ipcRenderer } = require('electron')
/**
 * 将desktopAPI标注为前端desktop-interface.d.ts文件中DesktopAPI，以达到类型检查类型安全的效果
 * 且是以src为基准，不会被当前文件路径影响
 * @type {import('@/../../frontend-vue3/desktop-interface').DesktopAPI}
 */
const desktopAPI = {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // generateTokenAdmin: async (): Promise<string> => await ipcRenderer.invoke('generateTokenAdmin'),
  // httpPortIcp: async (): Promise<number> => await ipcRenderer.invoke('httpPortIcp')
}

contextBridge.exposeInMainWorld('desktopAPI', desktopAPI)
