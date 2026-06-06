export interface DesktopAPI {
  node: () => string
  chrome: () => string
  electron: () => string
  // generateTokenAdmin: () => Promise<string>
  // httpPortIcp: () => Promise<number>
}

declare global {
  interface Window {
    // desktopAPI可能为undefined
    desktopAPI?: {
      [K in keyof DesktopAPI]: DesktopAPI[K] | undefined
    }
  }
}
