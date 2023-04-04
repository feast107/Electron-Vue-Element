# Electron-Vue-Element
 Scaffold for quick start and build with base facilities

create by [vue-cli](https://cli.vuejs.org/) 

## Configured
+ [Node.js](https://nodejs.org/en) v16.x :warning: No higher
+ [Electron](https://www.electronjs.org/) v21.1.0
+ [Vue3](https://cn.vuejs.org/) js v3.2
+ [Element-plus](https://element-plus.org/) V2.2.29  

## Prepare
Make sure install [Node.js v16.x](https://nodejs.org/dist/latest-v16.x/) 
``` bash
$ npm install -g electron
$ npm install -g electron-builder
$ npm install -g @vue/cli
```

## Start
``` bash
$ cd demo
$ npm install
$ npm run electron:serve
```
### Build 
```
$ npm run electron:build
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