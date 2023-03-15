---
title: Light
icon: markdown
order: 7
date: 2023-03-15
category:
    - threejs
tag:
    - 灯光
---

## Light

光源的基类 - 所有其他的光类型都继承了该类描述的属性和方法。

## 构造器

### color : Integer

color - (可选参数) 16进制表示光的颜色。 缺省值 0xffffff (白色)。

### intensity : Float

intensity - (可选参数) 光照强度。 缺省值 1。

## 属性

公共属性请查看基类Object3D。

### .color : Color

光源的颜色。如果构造的时候没有传递，默认会创建一个新的 Color 并设置为白色。

### .intensity : Float

光照的强度，或者说能量。 在 physically correct 模式下, color 和强度 的乘积被解析为以坎德拉（candela）为单位的发光强度。 默认值 - 1.0

### .isLight : Boolean

只读标志，用于检查给定对象是否为Light类型。

## Methods

公共方法请查看基类 Object3D。

### .copy ( source : Light ) : this

从source复制 color, intensity 的值到当前光源对象中。

### .toJSON ( meta : Object ) : Object

以JSON格式返回光数据。

meta -- 包含有元数据的对象，例如该对象的材质、纹理或图片。 将该light对象转换为 three.js JSON Object/Scene format（three.js JSON 物体/场景格式）。
