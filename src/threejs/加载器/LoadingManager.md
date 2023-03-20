---
title: LoadingManager
icon: markdown
order: 1
date: 2023-03-20
category:
    - threejs
tag:
    - 加载器
---

## LoadingManager

其功能是处理并跟踪已加载和待处理的数据。如果未手动设置加强管理器，则会为加载器创建和使用默认全局实例加载器管理器 - 请参阅[DefaultLoadingManager](/threejs/加载器/DefaultLoadingManager.md).

一般来说，默认的加载管理器已足够使用了，但有时候也需要设置单独的加载器 - 例如，如果你想为对象和纹理显示单独的加载条。

## 代码示例

```js
const manager = new THREE.LoadingManager()
manager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log(
        'Started loading file: ' +
            url +
            '.\nLoaded ' +
            itemsLoaded +
            ' of ' +
            itemsTotal +
            ' files.'
    )
}

manager.onLoad = function () {
    console.log('Loading complete!')
}

manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log(
        'Loading file: ' +
            url +
            '.\nLoaded ' +
            itemsLoaded +
            ' of ' +
            itemsTotal +
            ' files.'
    )
}

manager.onError = function (url) {
    console.log('There was an error loading ' + url)
}

const loader = new THREE.OBJLoader(manager)
loader.load('file.obj', function (object) {
    //
})
```

除了观察进度流程之外，还可以使用 LoadingManager 在加载期间覆写资源 URL。当某资源来自拖拽事件、 WebSockets、WebRTC 或其他 API 时，此方法可以有所帮助。下面显示了如何使用 Blob URL 加载内存模型的示例。

```js
// 将文件拖入网页时创建的Blob或File对象。
const blobs = { 'fish.gltf': blob1, 'diffuse.png': blob2, 'normal.png': blob3 }

const manager = new THREE.LoadingManager()

// 使用URL回调初始化加载管理器。
const objectURLs = []
manager.setURLModifier((url) => {
    url = URL.createObjectURL(blobs[url])
    objectURLs.push(url)
    return url
})

// 像通常一样加载，然后撤消blob URL
const loader = new THREE.GLTFLoader(manager)
loader.load('fish.gltf', (gltf) => {
    scene.add(gltf.scene)
    objectURLs.forEach((url) => URL.revokeObjectURL(url))
})
```

## 构造方法

### onLoad : Function

onLoad — (可选) 所有加载器加载完成后，将调用此函数。

### onProgress : Function

onProgress — (可选) 当每个项目完成后，将调用此函数。

### onError : Function

onError — (可选) 当一个加载器遇到错误时，将调用此函数。

## 属性

### .onStart : Function

此函数在加载开始时被调用。 有如下参数：

- url — 被加载的项的url。
- itemsLoaded — 目前已加载项的个数。
- itemsTotal — 总共所需要加载项的个数。

该函数默认为undefined。

### .onLoad : Function

所有的项目加载完成后将调用此函数。默认情况下，该函数是未定义的，除非在构造函数中传入。

### .onProgress : Function

此方法加载每一个项，加载完成时进行调用。 有如下参数：

- url — 被加载的项的url。
- itemsLoaded — 目前已加载项的个数。
- itemsTotal — 总共所需要加载项的个数。

默认情况下，该函数为undefined，除非在构造函数中传入。

### .onError : Function

此方法将在任意项加载错误时，进行调用。 有如下参数：

- url — 加载发生错误的项目的url

默认情况下，该函数为undefined，除非在构造函数中传入。

## 方法

### .addHandler ( regex : Object, loader : Loader ) : this

- regex — A regular expression.
- loader — The loader.

用给定的正则表达式注册一个加载器。可用于定义加载特定文件时应使用哪个加载器。一个典型的用例是覆盖纹理的默认加载器。

```js
manager.addHandler( /\.tga$/i, new TGALoader() );
```

### .getHandler ( file : String ) : Loader

- file — The file path.

可用于检索给定文件路径的已注册加载器。

### .removeHandler ( regex : Object ) : this

regex — A regular expression.

移除给定正则表达式的加载器。

### .resolveURL ( url : String ) : String

- url — 所要加载的url

给定URL，使用URL修饰符回调（如果有）并返回已解析的URL。如果未设置URL修饰符，则返回原始URL。

### .setURLModifier ( callback : Function ) : this

- callback — 设置URL修饰符成功时回调。使用url参数进行回调，并且必须返回 resolvedURL 。

如果设置了回调，则在发送请求之前将向每个资源URL传递回调。回调可以返回最初的URL，也可以返回新URL以覆盖加载行为。 此行为可用于从.ZIP、拖拽API和数据URI中加载资源文件。

### .itemStart ( url : String ) : undefined

- url — 所要加载的url

任何使用管理器的加载器都会调用此方法， 当加载器需要开始加载URL时。

### .itemEnd ( url : String ) : undefined

- url — 所要加载的url

任何使用管理器的加载器都会调用此方法， 当加载器需要加载URL结束时。

### .itemError ( url : String ) : undefined

- url — 所要加载的url

任何使用管理器的加载器都会调用此方法， 当加载器出现加载错误时。
