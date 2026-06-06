export interface DesktopAPI {
  process_versions: {
    node: string;
    chrome: string;
    electron: string;
  }
  configFileContent: {
    aaaaaa: string;
    bbbbbb: string;
  } | null
  // generateTokenAdmin: () => Promise<string>
  // httpPortIcp: () => Promise<number>
}

declare global {
  interface Window {
    // desktopAPI可能为undefined
    desktopAPI?: DesktopAPI
  }
}
