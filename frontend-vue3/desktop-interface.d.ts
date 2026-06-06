export interface DesktopAPI {
  process_versions: {
    node: string;
    chrome: string;
    electron: string;
  }
  // generateTokenAdmin: () => Promise<string>
  // httpPortIcp: () => Promise<number>
}

declare global {
  interface Window {
    // desktopAPI可能为undefined
    desktopAPI?: DesktopAPI
  }
}
