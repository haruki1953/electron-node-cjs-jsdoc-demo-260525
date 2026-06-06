export const desktopNodeVersion = window.desktopAPI?.node?.()
export const desktopChromeVersion = window.desktopAPI?.chrome?.()
export const desktopElectronVersion = window.desktopAPI?.electron?.()

export const desktopIsDeskTop = (() => {
  if (window.desktopAPI == null) {
    return false
  }
  return true
})()
