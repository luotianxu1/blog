---
title: CSS面试题
icon: markdown
order: 2
date: 2023-02-17
category:
  - 面试
tag:
  - css
---


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

## CSS权重计算

！important > 内联样式 > ID > 类属性、属性选择器或者伪类选择器 > 标签选择器

![ ](/img/interview/css.jpg)

![ ](/img/interview/css2.jpg)

最终从A开始逐层比较，A => B =>C =>D 哪个大优先哪个样式生效，否则后面覆盖前面样式，这也
是为什么有的嵌套多层样式可以实现覆盖的原因。样式名称也有就近原则，作用在当前标签的能覆盖继承来的样式。最终将这几个条件合并起来就是css的权重问题和计算规则。

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

## rgba() 和 opacity 的透明效果有什么不同？

- opacity 作用于元素，以及元素内的所有内容的透明度
- rgba() 只作用于元素的颜色或其背景色。（设置 rgba 透明的元素的子元素不会继承透明效
果！）

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

![ ](/img/interview/viewport.jpg)

### 适配方案

> 百分比布局

> rem 单位+动态 html 的 font-size

- 方案

  - 方案一： 媒体查询
    rem 单位是相对于 html 与元素的 font-size 来设置的，那么我们需要在不同的屏幕下有不同的尺寸，可以动态的修改 html 的 font-size。
  ![ ](/img/interview/rem.jpg)
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
