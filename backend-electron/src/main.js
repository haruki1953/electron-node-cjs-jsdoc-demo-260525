const { startElectronDesktop, checkOnlyOneDesktop } = require("./desktop");

;(async () => {
  // 确保只有一个实例在运行
  const onlyOne = checkOnlyOneDesktop()
  if (!onlyOne) {
    return
  }
  // 启动electron桌面
  startElectronDesktop()
})()