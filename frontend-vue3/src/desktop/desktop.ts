export const desktopNodeVersion = window.desktopAPI?.process_versions.node
export const desktopChromeVersion = window.desktopAPI?.process_versions.chrome
export const desktopElectronVersion = window.desktopAPI?.process_versions.electron

export const desktopIsDeskTop = (() => {
  if (window.desktopAPI == null) {
    return false
  }
  return true
})()
