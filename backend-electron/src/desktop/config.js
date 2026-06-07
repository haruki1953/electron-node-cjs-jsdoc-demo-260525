const path = require('path')

// 前端url
// const getUrlIndexHtml = () => `https://sakiko.top/`
// const getUrlIndexHtml = () => 'http://127.0.0.1:50403/'
const getUrlIndexHtml = () => 'http://localhost:55173/'

const pathPreloadJs = path.join(__dirname, './preload.js')

// 图标使用多尺寸ico最好
const pathIconIco = path.join(__dirname, '../../assets/icon.ico')

// 260607-生成图标并解决图标ico模糊问题
// https://github.com/ImageMagick/ImageMagick/releases/download/7.1.2-12/ImageMagick-7.1.2-12-portable-Q16-x86.7z
// 最开始我是这样，直接生成ico
// magick image/icon.png -define icon:auto-resize=256,128,64,48,32,24,16 -filter point image/icon.ico
// 但发现小图标会很模糊，好像是因为这个命令是让图片逐级缩小，而不是直接从image/icon.png缩小
// 换成下面这样，先生成各个大小的，再合为ico，就完全解决了
// magick image/icon.png -resize 256x256 image/icon-256.png
// magick image/icon.png -resize 128x128 image/icon-128.png
// magick image/icon.png -resize 64x64  image/icon-64.png
// magick image/icon.png -resize 48x48  image/icon-48.png
// magick image/icon.png -resize 32x32  image/icon-32.png
// magick image/icon.png -resize 24x24  image/icon-24.png
// magick image/icon.png -resize 16x16  image/icon-16.png
// magick image/icon-256.png image/icon-128.png image/icon-64.png image/icon-48.png image/icon-32.png image/icon-24.png image/icon-16.png image/icon.ico

// const pathIconPng = path.join(__dirname, '../../assets/icon.png')

const desktopConfig = {
  width: 1280,
  height: 720,
  // 屏幕小于宽或高时，宽高的算法，val是屏幕宽或高的值
  screenLtWidthCalc: (/** @type {number} */ value) => { return value - 100 },
  screenLtHeightCalc: (/** @type {number} */ value) => { return value - 100 },
  minWidth: 500,
  minHeight: 400,
  trayTitle: 'ElectronDemo',
  trayToolTip: 'ElectronDemo',
  trayShowLable: '打开 ElectronDemo',
  trayQuitLable: '退出 ElectronDemo',
}

// 是否打开开发工具
const enableDevTools = true
// const enableDevTools = false

module.exports = {
  getUrlIndexHtml,
  pathPreloadJs,
  pathIconIco,
  // pathIconPng,
  desktopConfig,
  enableDevTools,
}