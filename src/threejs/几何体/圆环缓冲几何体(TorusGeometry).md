---
title: TorusGeometry(圆环缓冲几何体)
icon: markdown
order: 16
date: 2023-03-10
category:
    - threejs
tag:
    - 几何体
---

## TorusGeometry

```js
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );
```

<IFrame url="https://luotainxu-demo.netlify.app/#/threejs/geometry/torusGeometry"/>

## 构造器

### radius : Float

环面的半径，从环面的中心到管道横截面的中心。默认值是1

### tube : Float

管道的半径，默认值为0.4

### radialSegments : Integer

管道横截面的分段数，默认值为12

### tubularSegments : Integer

管道的分段数，默认值为48

### arc : Float

圆环的圆心角（单位是弧度），默认值为Math.PI * 2

## 属性

共有属性请参见其基类[BufferGeometry](/threejs/几何体/BufferGeometry.md)

### .parameters

一个包含着构造函数中每个参数的对象。在对象实例化之后，对该属性的任何修改都不会改变这个几何体

## 方法

共有方法请参见其基类[BufferGeometry](/threejs/几何体/BufferGeometry.md)
