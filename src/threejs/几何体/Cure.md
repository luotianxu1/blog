---
title: Cure
icon: markdown
order: 24
date: 2023-03-20
category:
    - threejs
tag:
    - 几何体
---

## Curve

用于创建包含插值方法的Curve对象的抽象基类。 有关Curve的数组，请参见[CurePath](/threejs/几何体/CurePath.md)。

## 构造函数

### Curve()

创建一个 Curve.

## 属性

### .arcLengthDivisions : Integer

确定.GetLength计算曲线的累积分段长度时的分段量。 为确保.getSpacedPoints等方法时的精度，如果曲线非常大，建议增加.arcLengthDivisions。默认值为200

## 方法

### .getPoint ( t : Float, optionalTarget : Vector ) : Vector

- t - 曲线上的位置。必须在[0,1]范围内
- optionalTarget — (可选) 如果需要, 结果将复制到此向量中，否则将创建一个新向量。

返回曲线上给定位置的点。

### .getPointAt ( u : Float, optionalTarget : Vector ) : Vector

- u - 根据弧长在曲线上的位置。必须在范围[0，1]内。
- optionalTarget — (可选) 如果需要, (可选) 如果需要, 结果将复制到此向量中，否则将创建一个新向量。

根据弧长返回曲线上给定位置的点。

### .getPoints ( divisions : Integer ) : Array

- divisions -- 要将曲线划分为的分段数。默认是 5.

使用getPoint（t）返回一组divisions+1的点

### .getSpacedPoints ( divisions : Integer ) : Array

- divisions -- 要将曲线划分为的分段数。默认是 5.

使用getPointAt（u）返回一个分段+1的等距点的数组。

### .getLength () : Float

获取总曲线弧长。

### .getLengths ( divisions : Integer ) : Array

获取累积段长度的列表。

### .updateArcLengths () : undefined

更新累积段距离缓存。

### .getUtoTmapping ( u : Float, distance : Float ) : Float

给定范围（0..1）内的u，返回范围（0..1）内的t， 然后可以用t来使用 .getPoint给出与曲线末端等距的点。

### .getTangent ( t : Float, optionalTarget : Vector ) : Vector

- t -在曲线上的点，必须在范围 [ 0, 1 ].
- optionalTarget — (可选) 如果需要, (可选) 如果需要, 结果将复制到此向量中，否则将创建一个新向量。

返回t处的单位向量切线。如果派生曲线未实现其 切线求导，将使用相距一个小三角形的两个点来求与其实际梯度的近似值

### .getTangentAt ( u : Float, optionalTarget : Vector ) : Vector

- u - 根据弧长在曲线上的位置，必须在范围[ 0, 1 ]。
- optionalTarget —(可选) 如果需要, (可选) 如果需要, 结果将复制到此向量中，否则将创建一个新向量。

返回一个点处的切线，该点与 .getTangent中给定的曲线的端点距离相等

### .computeFrenetFrames ( segments : Integer, closed : Boolean ) : Object

生成Frenet帧。需要三维空间中的曲线定义。用于TubeGeometry或ExtradeGeometry等几何图形。

### .clone () : Curve

创建此实例的克隆。

### .copy ( source : Curve ) : this

将另一个Curve对象复制到此实例。

### .toJSON () : Object

返回此实例的JSON对象表示形式。

### .fromJSON ( json : Object ) : this

将给定的JSON数据复制到此实例。
