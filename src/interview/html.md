---
title: html面试题
icon: markdown
order: 1
date: 2023-02-17
category:
  - 面试
tag:
  - html
---

<!-- more -->

## H5C3 新特性

> H5 新特性

1. 语义化标签
2. 音频视频
3. 画布 canvas
4. 数据存储 localstorage sessionstorage
5. 表单控件 email url search
6. 拖拽释放 API

> CSS3 新特性

1. 选择器：属性选择器、伪类选择器、伪元素选择器
2. 媒体查询
3. 文字阴影
4. 边框
5. 盒子模型 box-sizing
6. 渐变
7. 过度
8. 自定义动画
9. 背景的属性
10. 2D 和 3D

## 盒模型

- 在 HTML 中所有元素都可以看成是一个盒子
- 盒子的组成：内容 content、内边距 padding、边框 border、外边距 margin
- 盒模型的类型：
    &emsp; 标准和模型（margin+border+padding+content）
    &emsp; IE 盒模型（margin+content(border+padding)）
- 控制盒模型模式：
    `box-sizing: content-box;`默认值、标准盒模型
    `box-sizing：border-box;`表示 IE 盒模型（怪异盒模型）

## padding 与 margin 有什么不同

padding 针对自身
margin 作用于外部对象

## CSS 选择器优先级

> CSS 特性： 继承性、层叠性、优先级

!important > 行内样式 > id > 类/伪类/属性 > 标签 > 全局选择器

## CSS 属性哪个属性可以继承

1. 字体 font
2. 文本 text-align、line-height、color
3. 元素可见性 visitility:hidden
4. 表格布局属性 border-apacing
5. 列表的属性 list-style
6. 页面样式属性 page
7. 声音的样式属性

## 隐藏元素的方法

- `display:none;` 不占据空间
- `opacity: 0;` 设置元素透明度为 0，占据空间位置
- `visibility:hidden;` 占据空间位置
- `position:absolute;`
- `clip-path;`剪切

## px 与 rem 区别

- px 是像素，显示器上给我们呈现画面的像素，每个像素的大小是一样的，据对单位长度
- rem，相对单位，相对于 html 根节点的 font-size 的值。给 html 根节点设置`font-size:62.5%;` 1rem = 10px

## vm 与百分比有什么不同

百分比有继承关系，vw 只和设备宽度有关系

## vm相比于rem的优势

- 不需要计算html的font-size大小，也不需要给html设置这样一个font-size
- 不会因为设置html的font-size大小，而必须给body再设置一个font-size，防止继承
- 因为不依赖font-size的尺寸，所以不用担心某些原因html的font-size尺寸被篡改，页面尺寸混乱
- vw相比于rem更加语义化，1vw是1/100的viewport的大小
- 可以具备rem之前所有有点

## 行内与块级元素区别

- 行内元素与块级函数可以相互转换，通过修改 display 属性值来切换块级元素和行内元素，行内元素 display：inline，块级元素 display：block。
- 行内元素和其他行内元素都会在一条水平线上排列，都是在同一行的.
    块级元素独占一行，垂直向下排列，若想使其水平方向排序，可使用左右浮动（float：left/right）让其水平方向排列。
- 行内元素不可以设置宽高，宽度高度随文本内容的变化而变化，但是可以设置行高（line-height），同时在设置外边距 margin 上下无效，左右有效，内填充 padding 上下无效，左右有效；
    块级元素可以设置宽高，并且宽度高度以及外边距，内填充都可随意控制。
- 块级元素可以包含行内元素和块级元素，还可以容纳内联元素和其他元素；
    行内元素不能包含块级元素，只能容纳文本或者其他行内元素。

## 如何让浏览器支持小字体

```css
transform: scale(0.5);
```

## 让一个元素水平垂直居中

1. 定位+margin
2. 定位+transform
3. flex
4. flex+margin
5. grid
6. grid+margin
7. table

- 定位+margin

```css
.father {
    position: relative;
}
.son {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
}
```

- 定位+transform

```css
.father {
    position: relative;
}
.son {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

- flex

```css
.father {
    display: flex;
    align-items: center;
    justify-content: center;
}
```

- flex+margin

```css
.father {
    display: flex;
}
.son {
    margin: auto;
}
```

- grid

```css
.father {
    display: grid;
    align-items: center;
    justify-content: center;
}
```

- grid+margin

```css
.father {
    display: grid;
}
.son {
    margin: auto;
}
```

- table

```css
.father {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}
.son {
    display: inline-block;
}
```

## 重排重绘区别

- 重排（回流）：布局引擎根据所有样式计算出盒模型在页面上的位置和大小。对 DOM 的大小、位置进行修改后，浏览器需要重新计算元素的这些几何属性，就叫重排。
- 重绘：计算好盒模型的位置、大小和其他一些属性之后，浏览器会根据和模型的特性进行绘制。对 DOM 的样式进行修改，比如 color，浏览器不需要重新计算几何属性的时候，直接绘制了该元素的新样式，只触发了重绘。

## 页面解析过程

- DNS 解析
- 建立 TCP 连接
- 发送 HTTP 请求
- 服务端处理请求
- 渲染页面
    浏览器会获取 HTML 和 CSS 资源，然后把 HTML 解析成 DOM 树
    再把 CSS 解析成 CSSOM
    把 DOM 和 CSSOM 合并为渲染树
    布局
    把渲染树的每个节点渲染到屏幕上（绘制）
- 断开 TCP 连接

## DOM 树和渲染树有什么区别

- DOM 树和 HTML 标签一一对应，包括 head 和隐藏元素
- 渲染树不包含 head 和隐藏元素

## 浏览器解析渲染 HTML 和 CSS

1、构建 DOM

- 将 HTML 解析成许多 Tokens
- 将 Tokens 解析成 object
- 将 object 组合成为一个 DOM 树

这个过程是循序渐进的，我们假设 HTML 文件很大，一个 RTT（往返时延）只能得到一部分，浏览器得到这部分之后就会看是构建 DOM，并不会等到整个文档就位才开始渲染。这样可以加快构建过程，而且由于自顶向下构建，后面的构建不会对前面造成影响，而后面我们将会看到，CSSOM 则必须等到所有字节收到才开始构建。

2、构建 CSSOM

- 解析 CSS 文件，并构建出一个 CSSOM 树（过程类似于 DOM 构建）

CSSOM（对象模型），构建过程类似 DOM，当 HTML 解析中遇到`<link>`标签时，会请求对应的 CSS 文件，当 CSS 文件就位时便开始解析她（如果遇到行内 style 时则直接解析），这一解析过程可以和构建 DOM 同时进行。l 浏览器有一些默认的 CSS 样式，称作 user agent style。如果时外部样式，CSSOM 的构建必须要获得一份完整的 CSS 文件，而不是像 DOM 的构建是一个循序渐进的过程。因为 CSS 文件中包含大量的样式，后面的样式会覆盖前面的样式，如果我们提前就构建 CSSOm，可能会得到错误的结果。

如果是内联样式，CSSOM 构建包含在 Parse HTML 过程中
如果是外部样式，包含在 Parse Stylesheet 过程中
如果没有设置样式，使用 user agent style 则包含在 Parse HTML 中

3、构建 Render Tree

- 浏览器从 DOM 树开始，遍历每一个可见节点
- 对于每一个可见节点，在 CSSOM 上找到匹配的样式并应用
- 生成 Render Tree

浏览器使用 DOM 和 CSSOM 构建出 Render Tree。此时不像构建 DOM 一样把所有节点构建出来，浏览器之构建需要出现在屏幕上显示的部分，因此像`<head>`这些标签就无需构建，同时对于`display:none;`的元素，也无需构建

4、Layout
计算出元素相对与 viewport 的相对位置

5、Paint
将 render tree 转换成像素

引入 javascript
解析 HTML 构建 DOM 时遇到 Javascript 会被阻塞
Javascript 执行会被 CSSOM 构建阻塞，也就是说，Javascript 必须等到 CSSOM 构建完成后才会执行
如果使用异步脚本，脚本的网络请求优先级降低，切网络请求期间不阻塞 DOM 构建，直到请求完成才开始执行脚本

浏览器解析到`<link>`等标签时，会马上发出 HTTP 请求，而且解析也将继续进行，解析完成后会触发 readystatechange 事件和 DOMContentLoaded 事件

DOM 即使构建完成，也需要等 CSSOM 构建完成，才能经过一个完成的 CRP 并呈现画面，因此位了画面尽快呈现，我们需要尽早构建出 CSSOM：
1、html 文档中的`<style>`或者`<link>`标签应该放在`<head>`里并今早发现被解析
2、减少第一次请求的 CSS 文件大小

## BFC

它时页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的有 BFC 和 IFC。

> 如何创建 BFC

- 根元素
- 绝对定位（position 为 absolute/fixed）
- 浮动元素（float 为 left/right）
- 行内块元素（display 为 inline-block）
- 表格单元格（display 为 table-cell/table-caption）
- 匿名表格单元格（display 为 table/table-row/table-row-group）
- overflow 为 hidden/auto/scroll
- 弹性元素（display 为 flex 或 inline-flex）
- 网格元素（display 为 grid 或 inline-grid）

> 布局规则

内部 Box 会在垂直方向，一个接一个放置（即块级元素独占一行）
BFC 区域不会与 float box 重叠（利用这点可以实现自适应两栏布局）
内部的 Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠（margin 重叠三个条件：同属于一个 BFC；相邻；块级元素）
计算 BFC 高度时，浮动元素也参与计算
BFC 就是页面上的一个隔离独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

## 移动端适配

### 视口

> 布局视口

布局视口默认宽度是 980px

- 按照宽度为 980px 来布局一个页面的盒子和内容
- 为了完整的显示再页面中，对整个页面进行缩小

> 视觉视口

- 如果默认情况下，我们按照 980p 显示内容，那么右侧有一部分区域就会无法显示，所以手机端浏览器会默认对页面进行缩放以显示到用户的可见区域中 -那么显示在可见区域的这个视口，就是视觉视口。

> 理想视口

- 默认情况下 layout viewport 并不适合我们进行布局。
- 我们可以对 layout viewport 进行宽度和缩放的设置，以满足在一个移动端窗口的布局。

```html
<meta
    name="viewport"
    content="width=device-width,initial-scale=1.0,user-scalable=no,minimum-scale=1.0,maxinum-scale=1.0"
/>
```

![An image](/img/html/viewport.jpg)

### 适配方案

> 百分比布局

> rem 单位+动态 html 的 font-size

- 方案

  - 方案一： 媒体查询
    rem 单位是相对于 html 与元素的 font-size 来设置的，那么我们需要在不同的屏幕下有不同的尺寸，可以动态的修改 html 的 font-size。
  ![An image](/img/html/rem.jpg)
  缺点：
   1. 针对不同的屏幕编写大量媒体查询
   2. 不能实时改变

    ```css
    @media screen and (min-width: 320px) {
        html {
            font-size: 20px;
        }
    }
    ```

  - 方案二： JS 动态计算

    ```js
    const htmlEl = document.documentElement
    function setRemUnit() {
        const htmlWidth = htmlEl.clientWidth
        const htmlFontSize = htmlWidth / 10
        htmlEl.style.fontSize = htmlFontSize + 'px'
    }
    setRemUnit()
    window.addEventListener('resize', setRemUnit)
    window.addEventListener('pageshow', function () {
        if (e.persisted) {
            setRemUnit()
        }
    })
    ```

  - 方案三 lib-flexible 库

- rem转换
  - 手动换算

  - less/scss换算

    ```less
    .pxToRem(@px) {
        result: 1rem * (@px / 37.5);
    }
    .box {
        width: .pxToRem(100) [result];
    }
    ```

  - postcss-pxtorem
  - VSVode插件

> vw 单位

- 转换

  - 手动计算
  比如有一个在375px屏幕上，100px宽度和高度的盒子，我们需要将100px转成对应的vw的值，100/3.75=36.667
  - less/scss函数

  ```less
  @vwUnit: 3.75;
  .pxToVw(@px) {
    result: (@px / @vwUnit) * 1vw;
  }
  .box {
    width: .pxToVw(100)[result];
  }
  ```

  - post-px-to-viewport-8-plugin插件
  - VSCode插件

> flex 的弹性布局
