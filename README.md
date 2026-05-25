electron桌面应用示例starter

electron-node-cjs-jsdoc-demo-260525
- backend-electron
- frontend-vue3

js + d.ts + jsdoc + commonjs + module-alias
- 主要用js，避免electron或node后端中不成熟的ts编译工具链与可能的兼容问题
- 对js启用类型检查使其类型安全，可用jsdoc在js中标注与导入导出类型，可用.d.ts文件写复杂类型体操
- 支持win7，electron22（node16）

前后端分离，即前端纯通过静态文件或url，前端项目在独立的文件夹


```
TypeScript 官方文档 “JavaScript with Type Checking” 
https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html
```

```
Electron 22 是最后一个支持 win7 的版本
https://www.electronjs.org/blog/windows-7-to-8-1-deprecation-notice
https://www.electronjs.org/blog/electron-22-0
https://www.npmjs.com/package/electron/v/22.3.27
```

```
dependencies
"electron-squirrel-startup": "1.0.1",

devDependencies
"@electron-forge/cli": "7.6.0",
"@electron-forge/maker-deb": "7.6.0",
"@electron-forge/maker-rpm": "7.6.0",
"@electron-forge/maker-squirrel": "7.6.0",
"@electron-forge/maker-zip": "7.6.0",
"@electron-forge/plugin-auto-unpack-natives": "7.6.0",
"@electron-forge/plugin-fuses": "7.6.0",
"@electron/fuses": "1.8.0",
"electron": "22.3.27",

yarn install

给 Yarn 设置代理
yarn config set proxy http://127.0.0.1:10809
yarn config set https-proxy http://127.0.0.1:10809

查看代理
yarn config get proxy
yarn config get https-proxy
```

**electron安装的网络问题**
- https://www.electronjs.org/zh/docs/latest/tutorial/installation#%E4%BB%A3%E7%90%86
- https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables
```sh
# cmd
set ELECTRON_GET_USE_PROXY=true
set GLOBAL_AGENT_ENVIRONMENT_VARIABLE_NAMESPACE=GLOBAL_AGENT_
set GLOBAL_AGENT_HTTP_PROXY=http://127.0.0.1:10809
set GLOBAL_AGENT_HTTPS_PROXY=http://127.0.0.1:10809
echo $ELECTRON_GET_USE_PROXY

# bash
export ELECTRON_GET_USE_PROXY=true
export GLOBAL_AGENT_ENVIRONMENT_VARIABLE_NAMESPACE=GLOBAL_AGENT_
export GLOBAL_AGENT_HTTP_PROXY=http://127.0.0.1:10809
export GLOBAL_AGENT_HTTPS_PROXY=http://127.0.0.1:10809
echo $ELECTRON_GET_USE_PROXY
```
