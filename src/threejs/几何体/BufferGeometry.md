---
title: BufferGeometry
icon: markdown
order: 23
date: 2023-03-20
category:
    - threejs
tag:
    - 几何体
---

## BufferGeometry

是面片、线或点几何体的有效表述。包括顶点位置，面片索引、法相量、颜色值、UV 坐标和自定义缓存属性值。使用 BufferGeometry 可以有效减少向 GPU 传输上述数据所需的开销。

## 代码示例

```js
const geometry = new THREE.BufferGeometry(); // 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。 // 因为在两个三角面片里，这两个顶点都需要被用到。 
const vertices = new Float32Array( [ -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0 ] ); // itemSize = 3 因为每个顶点都是一个三元组。
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) ); 
const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } ); 
const mesh = new THREE.Mesh( geometry, material );
```

## 构造函数

### BufferGeometry()

创建一个新的 BufferGeometry. 同时将预置属性设置为默认值.

## 属性

### .attributes : Object

通过 hashmap 存储该几何体相关的属性，hashmap 的 id 是当前 attribute 的名称，值是相应的 buffer。 你可以通过 .setAttribute 和 .getAttribute 添加和访问与当前几何体有关的 attribute。

### .boundingBox : Box3

当前 bufferGeometry 的外边界矩形。可以通过 .computeBoundingBox() 计算。默认值是 null。

### .boundingSphere : Sphere

当前 bufferGeometry 的外边界球形。可以通过 .computeBoundingSphere() 计算。默认值是 null。

### .drawRange : Object

用于判断几何体的哪个部分需要被渲染。该值不应该直接被设置，而需要通过 .setDrawRange 进行设置。
默认值为

```js
{ start: 0, count: Infinity }
```

### .groups : Array

将当前几何体分割成组进行渲染，每个部分都会在单独的 WebGL 的 draw call 中进行绘制。该方法可以让当前的 bufferGeometry 可以使用一个材质队列进行描述。

分割后的每个部分都是一个如下的表单：

```js
{ start: Integer, count: Integer, materialIndex: Integer }
```

start 表明当前 draw call 中的没有索引的几何体的几何体的第一个顶点；或者第一个三角面片的索引。 count 指明当前分割包含多少顶点（或 indices）。 materialIndex 指出当前用到的材质队列的索引。

通过 .addGroup 来增加组，而不是直接更改当前队列。

### .id : Integer

当前 bufferGeometry 的唯一编号。

### .index : BufferAttribute

允许顶点在多个三角面片间可以重用。这样的顶点被称为"已索引的三角面片（indexed triangles)。 每个三角面片都和三个顶点的索引相关。该 attribute 因此所存储的是每个三角面片的三个顶点的索引。 如果该 attribute 没有设置过，则 renderer 假设每三个连续的位置代表一个三角面片。 默认值是 null。

### .isBufferGeometry : Boolean

Read-only标志，用于检查给定对象是否为BufferGeometry类型。

### .morphAttributes : Object

存储 BufferAttribute 的 Hashmap，存储了几何体 morph targets 的细节信息。

### .morphTargetsRelative : Boolean

用于控制变形目标的行为;当设置为true时，变形目标数据被视为相对偏移量，而不是绝对位置/法线。默认为false。

### .name : String

当前 bufferGeometry 实例的可选别名。默认值是空字符串。

### .userData : Object

存储 BufferGeometry 的自定义数据的对象。为保持对象在克隆时完整，该对象不应该包括任何函数的引用。

### .uuid : String

当前对象实例的 UUID，该值会自动被分配，且不应被修改。

## 方法

### .setAttribute ( name : String, attribute : BufferAttribute ) : this

为当前几何体设置一个 attribute 属性。在类的内部，有一个存储 .attributes 的 hashmap， 通过该 hashmap，遍历 attributes 的速度会更快。而使用该方法，可以向 hashmap 内部增加 attribute。 所以，你需要使用该方法来添加 attributes。

### .addGroup ( start : Integer, count : Integer, materialIndex : Integer ) : undefined

为当前几何体增加一个 group，详见 groups 属性。

### .applyMatrix4 ( matrix : Matrix4 ) : this

用给定矩阵转换几何体的顶点坐标。

### .center () : this

根据边界矩形将几何体居中。

### .clone () : BufferGeometry

克隆当前的 BufferGeometry。

### .copy ( bufferGeometry : BufferGeometry ) : this

将参数指定的 BufferGeometry 的值拷贝到当前 BufferGeometry 中。

### .clearGroups ( ) : undefined

清空所有的 groups。

### .computeBoundingBox () : undefined

计算当前几何体的的边界矩形，该操作会更新已有 [param:.boundingBox]。
边界矩形不会默认计算，需要调用该接口指定计算边界矩形，否则保持默认值 null。

### .computeBoundingSphere () : undefined

计算当前几何体的的边界球形，该操作会更新已有 [param:.boundingSphere]。
边界球形不会默认计算，需要调用该接口指定计算边界球形，否则保持默认值 null。

### .computeTangents () : undefined

计算并向该几何图形添加切线属性。

### .computeVertexNormals () : undefined

通过面片法向量的平均值计算每个顶点的法向量。

### .dispose () : undefined

从内存中销毁对象。
如果在运行是需要从内存中删除 BufferGeometry，则需要调用该函数。

### .getAttribute ( name : String ) : BufferAttribute

返回指定名称的 attribute。

### .getIndex () : BufferAttribute

返回缓存相关的 .index。

### .hasAttribute ( name : String ) : Boolean

如果具有指定名称的属性存在，则返回true。

### .lookAt ( vector : Vector3 ) : this

vector - 几何体所朝向的世界坐标。

旋转几何体朝向控件中的一点。该过程通常在一次处理中完成，不会循环处理。典型的用法是过通过调用 Object3D.lookAt 实时改变 mesh 朝向。

### .normalizeNormals () : undefined

几何体中的每个法向量长度将会为 1。这样操作会更正光线在表面的效果。

### .deleteAttribute ( name : String ) : BufferAttribute

删除具有指定名称的 attribute。

### .rotateX ( radians : Float ) : this

在 X 轴上旋转几何体。该操作一般在一次处理中完成，不会循环处理。典型的用法是通过调用 Object3D.rotation 实时旋转几何体。

### .rotateY ( radians : Float ) : this

在 Y 轴上旋转几何体。该操作一般在一次处理中完成，不会循环处理。典型的用法是通过调用 Object3D.rotation 实时旋转几何体。

### .rotateZ ( radians : Float ) : this

在 Z 轴上旋转几何体。该操作一般在一次处理中完成，不会循环处理。典型的用法是通过调用 Object3D.rotation 实时旋转几何体。

### .scale ( x : Float, y : Float, z : Float ) : this

缩放几何体。该操作一般在一次处理中完成，不会循环处理。典型的用法是通过调用 Object3D.scale 实时旋转几何体。

### .setIndex ( index : BufferAttribute ) : this

设置缓存的 .index。

### .setDrawRange ( start : Integer, count : Integer ) : undefined

设置缓存的 .drawRange。详见相关属性说明。

### .setFromPoints ( points : Array ) : this

通过点队列设置该 BufferGeometry 的 attribute。

### .toJSON () : Object

返回代表该 BufferGeometry 的 JSON 对象。

### .toNonIndexed () : BufferGeometry

返回已索引的 BufferGeometry 的非索引版本。

### .translate ( x : Float, y : Float, z : Float ) : this

移动几何体。该操作一般在一次处理中完成，不会循环处理。典型的用法是通过调用 Object3D.rotation 实时旋转几何体。
