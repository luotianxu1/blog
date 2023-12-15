---
title: uniapp分环境打包
icon: uniapp
order: 6
date: 2023-07-10
category:
    - uniapp
tag:
    - uniapp
---

## 修改package.json文件

```json
{
 "uni-app" : {
  "scripts": {
   "prewx": {
        "title": "测试版小程序",
        "env": {
            "UNI_PLATFORM": "mp-weixin",
            "UNI_BASE_URL": "https://xxx.xxxx.com",
            "UNI_BASE_APPID": "xxxx",
            "UNI_BASE_NAME": "xxxxx"
          }
    },
    "prodwx": {
        "title": "正式版小程序",
        "env": {
            "UNI_PLATFORM": "mp-weixin",
            "UNI_BASE_URL": "https://xxx.xxxx.com",
            "UNI_BASE_APPID": "自定义appid，可以是不同的小程序id",
            "UNI_BASE_NAME": "自定义appid，可以是不同的小程序id"
        }
    }
  }
 }
}
```

## 在根目录下创建modifyManifest.js

```js
const fs = require('fs')
//process.env.UNI_INPUT_DIR为项目所在的绝对路径，经测试，相对路径会找不到文件
const manifestPath = process.env.UNI_INPUT_DIR + '/manifest.json'
let Manifest = fs.readFileSync(manifestPath, {
  encoding: 'utf-8'
})

function replaceManifest(path, value) {
  const arr = path.split('.')
  const len = arr.length
  const lastItem = arr[len - 1]

  let i = 0
  let ManifestArr = Manifest.split(/\n/)

  for (let index = 0; index < ManifestArr.length; index++) {
    const item = ManifestArr[index]
    if (new RegExp(`"${arr[i]}"`).test(item)) ++i;
    if (i === len) {
      const hasComma = /,/.test(item)
      ManifestArr[index] = item.replace(new RegExp(`"${lastItem}"[\\s\\S]*:[\\s\\S]*`),
        `"${lastItem}": ${value}${hasComma ? ',' : ''}`)
      break;
    }
  }

  Manifest = ManifestArr.join('\n')
}
//动态配置 appid和名称 ,这部分的代码可根据自己的需要写，需要改什么，按照manifest.json对应的路径写好即可
replaceManifest('mp-weixin.appid', `"${process.UNI_SCRIPT_ENV.UNI_BASE_APPID}"`)
replaceManifest('name', `"${process.UNI_SCRIPT_ENV.UNI_BASE_NAME}"`)

// console.log(process)
fs.writeFileSync(manifestPath, Manifest, {
  "flag": "w"
})
```

## 修改vue.config.js

```js
let reWriteManifest = require('./modifyManifest')
```

## 创建config.js来保存全局变量

```js
module.exports = {
  baseUrl: process.env.UNI_BASE_URL,
  baseName: process.env.UNI_BASE_NAME,
  baseAppId: process.env.UNI_BASE_APPID,
}
```

## 运行

```npm
npm run dev:custom prewx
```
