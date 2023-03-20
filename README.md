# Electron-Vue-Element
 Scaffold for quick start and build with base facilities

## Configured
+ [Electron](https://www.electronjs.org/) v21.1.0
+ [Vue3](https://cn.vuejs.org/) js v3.2
+ [Element-plus](https://element-plus.org/) V2.2.29

## Start
```
$ cd demo
$ npm install
$ npm run electron:serve | electron:build
```

## Provided
+ src
  + [`preload.js`](./demo/src/preload.js) configured preload
  + [`background.js`](./demo/src/background.js) window title and icon
  + utils
    + [`global.js`](./demo/src/utils/global.js) js class extension
    + [`request.js`](./demo/src/utils/request.js) axio wrapper
+ [`package.json`](./demo/package.json)
  + product name
  + manual rules
+ [`vue.config.js`](./demo/vue.config.js) build assets

+ [`.npmrc`](./demo/.npmrc) npm mirror for China mainland