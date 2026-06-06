// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
require('module-alias/register')
const { startElectronDesktop, checkOnlyOneDesktop } = require('@/desktop')

// eslint-disable-next-line unicorn/prefer-top-level-await
;(async () => {
  // 确保只有一个实例在运行
  const onlyOne = checkOnlyOneDesktop()
  if (!onlyOne) {
    return
  }
  // 启动electron桌面
  startElectronDesktop()
})()