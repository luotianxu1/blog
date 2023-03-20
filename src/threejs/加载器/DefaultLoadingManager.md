---
title: DefaultLoadingManager
icon: markdown
order: 2
date: 2023-03-20
category:
    - threejs
tag:
    - 加载器
---

## DefaultLoadingManager

LoadingManager是一个全局实例, 当其他加载器没有指定加载管理器时，它将被其他大多数的加载器设为默认的加载管理器。

LoadingManager对于大多数加载器来说已经足够了，但有时您可能需要单独设置加载管理器，例如纹理、模型加载器。

## 代码示例

你可以选择性的为你的管理器设置 onStart, onLoad, onProgress, onError 这些方法。 当你的加载器使用默认加载管理器时，这些方法都将被应用到加载器上。

请注意，个人的加载器的不应具有类似上面类似的命名函数，以避免混淆。因为这些函数时用于显示有关加载总体状态的信息，而不是处理已加载的数据。

```js
THREE.DefaultLoadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {
 console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

THREE.DefaultLoadingManager.onLoad = function ( ) {
 console.log( 'Loading Complete!');
};


THREE.DefaultLoadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
 console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

THREE.DefaultLoadingManager.onError = function ( url ) {
 console.log( 'There was an error loading ' + url );
};
```

## 属性

有关LoadingManager属性的详细信息，请查看[LoadingManager](/threejs/加载器/LoadingManager.md)页面。

## 方法

有关LoadingManager方法的详细信息，请查看[LoadingManager](/threejs/加载器/LoadingManager.md)页面。
