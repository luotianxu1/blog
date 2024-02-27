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

## CSS3 新特性

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

## CSS 权重计算

！important > 内联样式 > ID > 类属性、属性选择器或者伪类选择器 > 标签选择器

![ ](/img/interview/css.jpg)

![ ](/img/interview/css2.jpg)

最终从 A 开始逐层比较，A => B =>C =>D 哪个大优先哪个样式生效，否则后面覆盖前面样式，这也
是为什么有的嵌套多层样式可以实现覆盖的原因。样式名称也有就近原则，作用在当前标签的能覆盖继承来的样式。最终将这几个条件合并起来就是 css 的权重问题和计算规则。

> CSS 特性： 继承性、层叠性、优先级

!important > 行内样式 > id > 类/伪类/属性 > 标签 > 全局选择器

## CSS 中可继承与不可继承属性有哪些

### 无继承的属性

- display：规定元素应该生成的框的类型
- 文本属性：
  - vertical-align：垂直文本对齐
  - text-decoration：规定添加到文本的装饰
  - text-shadow：文本阴影效果
  - white-space：空白符的处理
  - unicode-bidi：设置文本的方向
- 盒子模型的属性：width、 height、margin、 border、padding
- 背景属性：background、background-color、background-image、background-repeat、background-position. background-attachment
- 定位属性：float、clear、position、 top、right. bottom、left、min-width、min-height、max-width, max-height, overflow. clip, z-index
- 生成内容属性：content、counter-reset、 counter-increment 了.轮廓样式属性：outline-style、outline-width、 outline-color、outline
- 页面样式属性：size、page-break-before、page-break-after
- 声音样式属性：pause-before、pause-after、pause、cue-before、cue-after、cue、play-during

### 可继承的属性

- 字体系列属性

  - font-family：字体系列
  - font-weight：字体的粗细
  - font-size：字体的大小
  - font-style：字体的风格

- 文本系列属性

  - text-indent：文本缩进
  - text-align：文本水平对齐
  - line-height：行高
  - word-spacing：单词之间的间距
  - letter-spacing：中文或者字母之间的间距
  - text-transform：控制文本大小写（就是 uppercase、lowercase、capitalize 这三个）
  - color：文本颜色

- 元素可见性

  - visibility：控制元素显示隐藏

- 列表布局属性

  - list-style：列表风格，包括 list-style-type、list-style-image 等

- 光标厲性
  - cursor：光标显示为何种形态

## padding 与 margin 有什么不同

padding 针对自身
margin 作用于外部对象

## 常见的 CSS 布局单位

常用的布局单位包括像素(px),百分比(%)，em,rem,vw/vh。

- 像素(px)是页面布局的基础，一个像素表示终端（电脑、手机、平板等）屏幕所能显示的最小的区域，像素分为两种类型：CSS 像素和物理像素：
  - csS 像素：为 web 开发者提供，在 CSS 中使用的一个抽象单位；
  - 物理像素：只与设备的硬件密度有关，任何设备的物理像素都是固定的。
- 百分比(%)，当浏览器的宽度或者高度发生变化时，通过百分比单位可以使得浏览器中的组件的宽和高随着浏览器的变化而变化，从而实现响应式的效果。一般认为子元素的百分比相对于直接父元素。
- em 和 rem 相对于 px 更具灵活性，它们都是相对长度单位，它们之间的区别：em 相对于父元素，rem 相对于根元素。
  - em:文本相对长度单位。相对于当前对象内文本的字体尺寸。如果当前行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸（默认 16x）。（相对父元素的字体大小倍数）。
  - rem:rem 是 CSS3 新增的一个相对单位，相对于根元素(html 元素)的 font-size 的倍数。作用：利用 rem 可以实现简单的响应式布局，可以利用 html 元素中字体的大小与屏幕间的比值来设置 font.size 的值，以此实现当屏幕分辨率变化时让元素也随之变化。
- vw/vh 是与视图窗口有关的单位，vw 表示相对于视图窗口的宽度，vh 表示相对于视图窗口高度，除了 vw 和 vh 外，还有 vmin 和 vmax 两个相关的单位。
  - vW:相对于视窗的宽度，视窗宽度是 100vw;
  - vh:相对于视窗的高度，视窗高度是 100vh;
  - vmin:w 和 vh 中的较小值：
  - vmax:w 和 vh 中的较大值；

vw/vh 和百分比很类似，两者的区别：

- 百分比(%)：大部分相对于祖先元素，也有相对于自身的情况比如(border-radius、translates 等)
- vw/vh:相对于视窗的尺寸

## px、em、rem 的区别及使用场景

- 三者的区别：
  - px 是固定的像素，一旦设置了就无法因为适应页面大小而改变。
  - em 和 rem 相对于 px 更具有灵活性，他们是相对长度单位，其长度不是固定的，更适用于响应式布局。rem 中给 html 根节点设置`font-size:62.5%;` 1rem = 10px
  - em 是相对于其父元素来设置字体大小，这样就会存在一个问题，进行任何元素设置，都有可能需要知道他父元素的大小。而 rem 是相对于根元素，这样就意味着，只需要在根元素确定一个参考值。
- 使用场景：
  - 对于只需要适配少部分移动设备，且分辨率对页面影响不大的，使用 px 即可。
  - 对于需要适配各种移动设备，使用 rem，例如需要适配 iPhone 和 Pad 等分辨率差别比较挺大的设备。

## vm 与百分比有什么不同

百分比有继承关系，vw 只和设备宽度有关系

## vm 相比于 rem 的优势

- 不需要计算 html 的 font-size 大小，也不需要给 html 设置这样一个 font-size
- 不会因为设置 html 的 font-size 大小，而必须给 body 再设置一个 font-size，防止继承
- 因为不依赖 font-size 的尺寸，所以不用担心某些原因 html 的 font-size 尺寸被篡改，页面尺寸混乱
- vw 相比于 rem 更加语义化，1vw 是 1/100 的 viewport 的大小
- 可以具备 rem 之前所有有点

## display 的 block、inline 和 inline-block 的区别

- block:会独占一行，多个元素会另起一行，可以设置 width、height,margin 和 padding 属性；
- inline:元素不会独占一行，设置 width、height 属性无效。但可以设置水平方向的 margin 和 padding 属性，不能设置垂直方向的 padding 和 nargin;
- inline-block:将对象设置为 inline 对象，但对象的内容作为 block 对象呈现，之后的内联对象会被排列在同一行内。

## 行内与块级元素区别

- 行内元素与块级函数可以相互转换，通过修改 display 属性值来切换块级元素和行内元素，行内元素 display：inline，块级元素 display：block。
- 行内元素和其他行内元素都会在一条水平线上排列，都是在同一行的.
    块级元素独占一行，垂直向下排列，若想使其水平方向排序，可使用左右浮动（float：left/right）让其水平方向排列。
- 行内元素不可以设置宽高，宽度高度随文本内容的变化而变化，但是可以设置行高（line-height），同时在设置外边距 margin 上下无效，左右有效，内填充 padding 上下无效，左右有效；
    块级元素可以设置宽高，并且宽度高度以及外边距，内填充都可随意控制。
- 块级元素可以包含行内元素和块级元素，还可以容纳内联元素和其他元素；
    行内元素不能包含块级元素，只能容纳文本或者其他行内元素。

## 隐藏元素的方法有哪些

- display:none:渲染树不会包含该渲染对象，因此该元素不会在页面中占据位置，也不会响应绑定的监听事件。
- visibility:hidden:元素在页面中仍占据空间，但是不会响应绑定的监听事件。
- opacity::0:将元素的透明度设置为 0，以此来实现元素的隐藏。元素在页面中仍然占据空间，并目能够响应元素绑定的监听事件。
- position:absolute:通过使用绝对定位将元素移除可视区域内，以此来实现元素的隐藏。
- z-idex:负值：来使其他元素遮盖住该元素，以此来实现隐藏。
- clip/clip-path：使用元素裁剪的方法来实现元素的隐藏，这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。
- transform:scale(0,0):将元素缩放为 0，来实现元素的隐藏。这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。

## link 和@import 的区别

- link 是 XHTML 标签，除了加载 CSS 外，还可以定义 RSS 等其他事务；@import 属于 CSS 范畴只能加载 CSS.
- link 引用 CSS 时，在页面载入时同时加载；@import 需要页面网页完全载入以后加载。
- link 是 HTML 标签，无兼容问题；@import 是在 CSS2.1 提出的，低版本的浏览器不支持。
- link 支持使用 Javascript 控制 DOM 去改变样式；而@import7 不支持。

## transition 和 animation 的区别

- transition 是过度属性，强调过度，它的实现需要触发一个事件（比如标移动上去，焦点，点击等）才执行动画。它类似于 fash 的补间动画，设置一个开始关键帧，一个结束关键帧。
- animation:是动画属性，它的实现不需要触发事件，设定好时间之后可以自己执行，且可以循环一个动画。它也类以于 flash 的补间动画，但是它可以设置多个关键帧（用@keyframe 定义）完成动画。

## display:none 与 visibility:hidden 的区别

这两个属性都是让元素隐藏，不可见。两者区别如下：

- 在渲染树中
  - display:none 会让元素完全从渲染树中消失，渲染时不会占据任何空间；
  - visibility:hidden 不会让元素从渲染树中消失，渲染的元素还会占据相应的空间，只是内容不可见。
- 是否是继承属性
  - display:none 是非继承属性，子孙节点会随着父节点从渲染树消失，通过修改子孙节点的属性也无法显示，
  - visibility:hidden 是继承属性，子孙节点消失是由于继承了 hidden,通过设置 visibility:visible 可以让子孙节点显示；
- 修改常规文档流中元素的 display 通常会造成文档的重排，但是修改 visibility 属性只会造成本元素的重绘；
- 如果使用读屏器，设置为 display:none 的内容不会被读取，设置为 visibility:hidden 的内容会被读取。

## 伪元素和伪类的区别和作用？

- 伪元素：在内容元素的前后插入额的外的元素或样式，但是这些元素实际上并不在文档中生成。它们只在外部显示可见，但不会在文档的源代码中找到它们，因此，称为“伪”元素。

```css
p:before
{content:"第一章："；}
p:after (content:"Hot!";}
p:first-line {background:red;}
p:first-letter (font-size:30px;
```

- 伪类：将特殊的效果添加到特定选择器上。它是已有元素上添加类别的，不会产生新的元素。

```css
a:hover
{color:#FFOOFF}
p:first-child {color:red)
```

总结：伪类是通过在元素选择器上加入伪类改变元素状态，而伪元素通过对元素的操作进行对元素的改变。

## 对 requestAnimationframe 的理解

实现动画效果的方法比较多，Javascript 中可以通过定时器 setTimeout 来实现，CSS3 中可以使用 transition 和 animation 来实现，HTML5 中的 canvas 也可以实现。除此之外，HTML5 提供个专门用于请求动画的 APl,那就是 requestAnimationFrame,顾名思义就是请求动画帧。

语法：window.requestAnimationFrame(callback):其中，callback 是下一次重绘之前更新动画帧所调用的函数（即上面说的回调函数）。该回调函数会被传入 DOMHighResTimeStampa 参数，它表示 requestAnimationFrame()开始去执行回调函数的时刻。该方法属于宏任务，所以会在执行完微任务之后再去执行。

取消动画：使用 cancelAnimationFrame(O 来取消执行动画，该方法接收一个参数 requestAnimationFrame 默认返回的 id,只需要传入这个 id 就可以取消动画了。

优势：

- CPU 节能：使用 SetTinterval 实现的动画，当页面被隐藏或最小化时，SetTinterval 仍然在后台执行动画任务，由于比时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费 CPU 资源。而 RequestAnimationFrame 则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，因此跟着系统走的 RequestAnimationFrame 也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有节省了 CPU 开销。
- 函数节流：在高频率事件(resize,scro 等)中，为了防止在一个刷新间隔内发生多次函数执行，RequestAnimationFrame 可保证每个刷新间隔内，函数只被执行一次，这样既能保正流畅性，也能更好的节省函数执行的开销，一个刷新间隔内函数执行多次时没有意义的，因为多数显示器每 16.7ms 刷新一次，多次绘制并不会在屏幕上体现出来。
- 减少 DoM 操作：requestAnimationFrame 会把每一帧中的所有 DOM 操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒 60 帧。

set Timeout 执行动画的缺点：

它通过设定间隔时间来不断改变图像位置，达到动画效果。但是容易出现卡顿、抖动的现象：原因是：

- settimeout 任务被放入异步队列，只有当主线程任务执行完后才会执行队列中的任务，因此实际执行时间总是比设定时间要晚；
- settimeout 的固定时间间隔不一定与屏幕刷新间隔时间相同，会引起丢帧。

## 与之间有看不见的空白间隔是什么原因起的？如何解决？

浏览器会把 inline 内联元素间的空白字符（空格、换行、Tab 等）渲染成一个空格。为了美观，通常是一个`<li>`放在一行，这导致`<li>`换行后产生换行字符，它变成一个空格，占用了一个字符的宽度。

解决办法：
(1)为`<i>`设置 oat:lt。不足：有些容器是不能设置浮动，如左右切换的焦点图等。
(2)将所有`<li>`写在同一行。不足：代码不美观
(3)将`<u>`内的字符尺寸直接设为 0，即 font-siz:0。不足：`<u>`中的其他字符尺寸也被设为 0，需要额外重新设定其他字符尺寸，且在 Safari 浏览器依然会出现空白间隔。
(4)消除`<u>`的字符间隔 letter-.spacing:-8px,不足：这也设置了`<i>`内的字符间隔，因此需要将`<i>`内的字符间隔设为默认 letter-.spacing:normal。

## 对 CSSSprites 的理解

CSSSprites(精灵图)，将一个页面涉及到的所有图片都包含到一张大图中去，然后利用 CSS 的 background-.image,background-repeat,background-position)属性的组合进行背景定位。

优点：

- 利用 CSS Spritesi 能很好地减少网页的 htp 请求，从而大大提高了页面的性能，这是 CSS Sprites 最大的优点
- CSS Sprites 能减/少图片的字节，把 3 张图片合并成 1 张图片的字节总是小于这 3 张图片的字节总和

缺点：

- 在图片合并时，要把多张图片有序的、合理的合并成一张图片，还要留好足够的空间，防止板块内出现不必要的背景。在宽屏及高分辨率下的自适应页面，如果背景不够宽，很容易出现背景断裂；
- CSSSprites 在开发的时候相对来说有点麻烦需要借助 photoshopi 或其他工具来对每个背景单元测量其准确的位置。
- 维护方面：CSS Sprites 在维护的时候比较麻烦，页面背景有少许改动时，就要改这张合并的图片，无需改的地方尽量不要动，这样避免改动更多的 CSS,如果在原来的地方放不下，又只能(最好)往下加图片，这样图片的字节就增加了，还要改动 CSS。

## 什么是物理像素，逻辑像素和像素密度，为什么在移动端开发时需要用到@3x,@2x 这种图片？

以 iPhone XS 为例，当写 CSS 代码时，针对于单位 px,其宽度为 414px&896px,也就是说当赋予一个 DV 元素宽度为 414px,这个 DIV 就会填满手机的宽度；

而如果有一把尺子来实际测量这部手机的物理像素，实际为 1242\*2688 物理像素；经过计算可知，1242/414=3,也就是说，在单边上，一个逻辑像素=3 个物理像素，就说这个屏幕的像素密度为 3，也就是常说的 3 倍屏。

对于图片来说，为了保证其不失真，张图片像素至少要对应一个物理像素，假如原始图片是 500300 像素，那么在 3 倍屏上就要放一个 1500900 像素的图片才能保证 1 个物理像素至少对应一个图片像素，才能不失真。

当然，也可以针对所有屏幕，都只提供最高清图片。虽然低密度屏幕用不到那么多图片像素，而且会因为下载多余的像素造成带宽浪费和下载延迟，但从结果上说能保证图片在所有屏幕上都不会失真。

还可以使用 CSS 媒体查间来判断不同的像素密度，从而选择不同的图片：

```css
my-image { background:(low.png);}
@media only screen and (min-device-pixel-ratio:1.5){
    #my-image background:(high.png);
}
```

## CSS 预处理器引后处理器是什么？为什么要使用它们？

预处理器，如：less,sass,stylus,用来预编译 sass 或者 1ess,增加 p 了 css 代码的复用性。层级，mixin,变量，循环，函数等对编写以及开发 U 组件都极为方便。

后处理器，如：postCss,通常是在完成的样式表中根据 css 规范处理 css,让其更加有效。目前最常做的是给 css 属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。

css 预处理器为 css 增加一些编程特性，无需考虑浏览器的兼容问题，可以在 CSS 中使用变量，简单的逻辑程序，函数等在编程语言中的一些基本的性能，可以让 cS$更加的简洁，增加适应性以及可
读性，可维护性等。

其它 css 预处理器语言：Sass(Scss),Less,Stylus,.Turbine,Swithch css

使用原因：

- 结构清晰，便于扩展
- 可以很方便的屏蔽浏览器私有语法的差异
- 可以轻松实现多重继承
- 完美的兼容了 CSS 代码，可以应用到老项目中

## :before 和：after 的双冒号和单冒号有什么区别？

- 冒号(：)用于 CSS3 伪类，双冒号(：)用于 CSS3 伪元素。
- :before?就是以一个子元素的存在，定义在元素主体内容之前的一个伪元素。并不存在于 dom 之中，只存在在页面之中。

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
- rgba() 只作用于元素的颜色或其背景色。（设置 rgba 透明的元素的子元素不会继承透明效果！）

## z-index 属性在什么情况下会失效

通常 Z-index 的使用是在有两个重叠的标签，在一定的情况下控制其中一个在另一个的上方或者下方出现。Z-index 值越大就越是在上层。Z-index 元素的 position）属性需要是 relative,absolute?或是 fixed.

Z-index 属性在下列情况下会失效：

- 父元素 position 为 relative 时，子元素的 z-index 失效。解决：父元素 positioni 改为 absolute 或 static;
- 元素没有设置 oosition 属性为非 static 属性。解决：设置该元素的 oosition 属性为 relative,absolute 或是 fixed 中的一种；
- 元素在设置 z-index 的同时还设置了 float 浮动。解决：float 去除，改为 display:inline-block;

## css3 中的 transform 有哪些属性

CSS3 中的 transform 属性用于对元素进行变换，它可以实现平移、旋转、缩放、顷斜等效果，使得网页元素可以在不改变文档流的前提下进行动态的变换和动画效果。以下是 transform 属性的一些常见属性：

- translate:用于平移（移动）元素，可以在水平方向(X 轴)和垂直方向(Y 轴)上进行平移。

```css
/*米水平和垂直平移*/
transform: translate(50px, 100px);
```

- rotate:用于旋转元素，可以按照指定的角度进行顺时针旋转。

```css
/*顺时针旋转30度*/
transform: rotate(30deg);
```

- scale:用于缩放元素，可以在水平方向(X 轴)和垂直方向(Y 轴)上进行缩放。

```css
/*在X轴和Y轴上同时缩放为原来的2倍*/
transform: scale(2);
```

- skew:用于倾斜元素，可以在水平方向(X 轴)和垂直方向(Y 轴)上进行倾斜。

```css
/*在X轴和Y轴上同时倾斜，X轴倾斜角度为30度，Y轴倾斜角度为45度*/
transform: skew(30deg, 45deg);
```

- matriⅸ：允许你自定义一个 2D 变换矩阵来进行复杂的变换。这是一个更高级和灵活的属性，但使用起来较复杂。

```css
/*自定义2D变换矩阵*/
transform: matrix(a, b, c, d, tx, ty);
```

还有其他一些更高级的属性，如 rotateX、rotateY、rotateZ(立体旋转)、scaleX、scaleY、scaleZ(单轴缩放)、translateX、translateY、translateZ(单轴平移)等。这些属性可以单独使用或与其他属性组合使用，创造出丰富的动画效果和交互体验。

## 对 Flex 布局的理解及其使用场景

Flex 是 FlexibleBox 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。任何一个容器都可以指定为 Flex 布局。行内元素也可以使用 Flex 布局。注意，设为 Flex 布局以后，子元素的 float、clear 和 vertical-align 属性将失效。采用 Flex 布局的元素，称为 Flex 容器 (flex container)，简称"容器'。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称”项目”。容器默认存在两根轴：水平的主轴 (main axis) 和垂直的交叉轴 (cross axis)，项目默认沿水平主轴排列。

以下 6 个厲性设置在容器上：

- fex-direction 属性决定主轴的方向（即项目的排列方向）。
- fex-wrap 属性定义，如果一条轴线排不下，如何换行。
- flex-fow 属性是 nex-direction 属性和 fex-wrap 属性的简写形式，默认值为 row nowrap。
- justity-content 属性定义了项目在主轴上的对齐方式。
- align-itemns 属性定义项目在交叉轴上如何对齐。
- align-content 属性定义了 多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

以下 6 个属性设置在项目上：

- order 属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0。
- flex-grow 属性定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。
- flex-shrink 属性定义了项目的缩小比例，默认为 1，即如果空问不足，该项目将缩小。
- flex-basis 属性定义了 在分配多余空问之前，项目占据的主轴空问。浏览器根据这个属性，计算主轴是否有多余空问。它的默认值为 auto，即项目的本来大小。
- flex 属性是 nlex-grow， flex-shrink 和 1lex-basis 的简写，默认值为 0 1 auto。
- align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch。

简单来说：

fex 布局是 CSS3 新增的一种布局方式，可以通过将一个元素的 display 属性值设置为 flex 从而使它成为一个 flex 容器，它的所有子元素都会成为它的项目。一个容器默认有两条轴：一个是水平的主轴，一个是与主轴垂直的交叉轴。可以使用 flex-direction 来指定主轴的方向。可以使用 justify-content 来指定元素在主轴上的排列方式，使用 align-items 来指定元素在交叉轴上的排列方式。还可以使用 flex-wrap 来规定当一行排列不下时的换行方式。对于容器中的项目，可以使用 order 属性来指定项目的排列顺序，还可以使用 nex-grow 来指定当排列空问有剩余的时候，项目的放大比例，还可以使用 fex-shrink 来指定当排列空问不足时，项目的缩小比例。

## 什么是 margin 重叠问题？如何解决？

两个块级元素的上外边距和下外边距可能会合并（折靈） 为一个外边距，其大小会取其中外边距值大的那个，这种行为就是外边距折叠。需要注意的是，浮动的元素和绝对定位这种脱离文档流的元素的外边距不会折叠。重叠只会出现在垂直方向。

计算原则：

- 如果两者都是正数，那么就去最大者
- 如果是一正一负，就会正值减去负值的绝对值
- 两个都是负值时，用 0 减去两个中绝对值大的那个

解决办法：

对于折叠的情况，主要有两种：兄弟之问重疊和父子之问重疊

- 兄弟之间重叠
  - 底部元素变为行内盒子：display: inline-block
  - 底部元素设置浮动：foat
  - 底部元素的 position 的值为 absolute/fxed
- 父子之间重叠
  - 父元素加入：overflow:hidden
  - 父元素添加透明边框：border:1px solid transparent
  - 子元素变为行内盒子：display: inline-block
  - 子元素加入浮动属性或定位
  -

## absolute 与 fxed 共同点与不同点

- 共同点：
  - 改变行内元素的呈现方式，将 display 置为 inline-block
  - 使元素脱离普通文档流，不再占据文档物理空间
  - 覆盖非定位文档元素
- 不同点：
  - abuselute 与 fxed 的根元素不同，abuselute 的根元素可以设置，txed 根元素是浏览器。
  - 在有滚动条的页面中，absolute 会跟着父元素进行移动，tixed 固定在页面的具体位置。

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

- rem 转换

  - 手动换算

  - less/scss 换算

            ```less
            .pxToRem(@px) {
                result: 1rem * (@px / 37.5);
            }
            .box {
                width: .pxToRem(100) [result];
            }
            ```

  - postcss-pxtorem
  - VSVode 插件

> vw 单位

- 转换

  - 手动计算
        比如有一个在 375px 屏幕上，100px 宽度和高度的盒子，我们需要将 100px 转成对应的 vw 的值，100/3.75=36.667
  - less/scss 函数

        ```less
        @vwUnit: 3.75;
        .pxToVw(@px) {
            result: (@px / @vwUnit) * 1vw;
        }
        .box {
            width: .pxToVw(100) [result];
        }
        ```

  - post-px-to-viewport-8-plugin 插件
  - VSCode 插件

> flex 的弹性布局

## 对 CSS 工程化的理解

CSS 工程化是为了解决以下问题：

- 宏观设计：CSS 代码如何组织、如何拆分、模块结构怎样设计？
- 编码优化：怎样写出更好的 CSS?
- 构建：如何处理我的 CSS,才能让它的打包结果最优？
- 可维护性：代码写完了，如何最小化它后续的变更成本？如何确保任何一个同事都轻松接手？

以下三个方向都是时下比较流行的、普适性非常好的 CSS 工程化实践：

- 预处理器：Less、Sass 等；
- 重要的工程化插件：PostCss;
- Webpack loader 等。

## 为什么要用预处理器？它的出现是为了解决什么问题？

预处理器，其实就是 CSS 世界的“轮子”。预处理器支持我们写一种类似 CSS、但实际并不是 CSS
的语言，然后把它编译成 CSS 代码。

那为什么写 CSS 代码写得好好的，偏偏要转去写“类 CSS”呢？这就和本来用 JS 也可以实现所有功能，但最后却写 React 的 jsx 或者 Vue 的模板语法一样一为了爽！要想知道有了预处理器有多爽，首先要知道的是传统 CSS 有多不爽。随着前端业务复杂度的提高，前端工程中对 CSS 提出了以下的诉求：

- 宏观设计上：我们希望能优化 CSS 文件的目录结构，对现有的 CSS 文件实现复用；
- 编码优化上：我们希望能写出结构清晰、简明易懂的 CSS,需要它具有一目了然的嵌套层级关系，而不是无差别的一铺到底写法；我们希望它具有变量特征、计算能力、循环能力等等更强的可编程性，这样我们可以少写一些无用的代码：
- 可维护性上：更强的可编程性意味着更优质的代码结构，实现复用意味着更简单的目录结构和更强的拓展能力，这两点如果能做到，自然会带来更强的可维护性。

这三点是传统 CSS 所做不到的，也正是预处理器所解决掉的问题。预处理器普遍会具备这样的特性：

- 嵌套代码的能力，通过嵌套来反映不同 CSS 属性之间的层级关系：
- 支持定义 css 变量，
- 提供计算函数；
- 允许对代码片段进行 extend 和 mixin;
- 支持循环语句的使用；
- 支持将 CSS 文件模块化，实现复用。

## PostCss 是如何工作的？我们在什么场景下会使用 PostCss?

它和预及处理器的不同就在于，预处理器处理的是类 CSS,而 PostCss 处理的就是 CSS 本身。Babl 可以将高版本的 JS 代码转换为低版本的 JS 代码。PostCss 做的是类似的事情：它可以编译尚未被浏览器广泛支持的先进的 CSS 语法，还可以自动为一些需要额外兼容的语法增加前缀。更强的是，由于 PostCss 有着强大的插件机制，支持各种各样的扩展，极大地强化了 CSS 的能力。

PostCss 在业务中的使用场景非常多：

- 提高 CSS 代码的可读性：PostCss 其实可以做类似预处理器能做的工作；
- 当我们的 CSS 代码需要适配低版本浏览器时，PostCss 的 Autoprefixe©r 插件可以帮助我们自动增加浏览器前缀；
- 允许我们编写面向未来的 CSS:PostCss 能够帮助我们编译 CSS next 代码；

## Webpack 能处理 css 吗？

- Webpack 在裸奔的状态下，是不能处理 csS 的，Vebpack 本身是一个面向 JavaScript 且只能处理 JavaScript 代码的模块化打包工具；
- Webpack 在 loader 的辅助下，是可以处理 CSS 的。

## 如何用 Webpack 实对 CSS 的处理

- webpack 中操作 CSS 需要使用的两个关键的 loader:css-loader 和 style-loader
- 注意，答出“用什么”有时候可能还不够，面试官会怀疑你是不是在背答案，所以你还需要了解每个 loader 都做了什么事情：
  - css-loader:导入 CSS 模块，对 CSS 代码进行编译处理；
  - style-loader::创建 style 标签，把 CSS 内容写入标签。

在实际使用中，css-loader 的执行顺序一定要安排在 style-loader 的前面。因为只有完成了编译过程，才可以对 css 代码进行插入；若提前插入了未编译的代码，那么 webpack 是无法理解这坨东西的，它会无情报错。

## 实现一个三角形

::: normal-demo Demo 演示

```html
<div class="box"></div>
```

```css
.box {
    width: 0;
    height: 0;
    border-left: 50px solid red;
    border-top: 50px solid transparent;
    border-bottom: 50px solid transparent;
}
```

:::

## 实现一个扇形

::: normal-demo 扇形

```html
<div class="box"></div>
```

```css
.box {
    border: 100px solid transparent;
    width: 0;
    heigt: 0;
    border-radius: 100px;
    border-top-color: red;
}
```

:::

## 设置小于12px的字体

在谷歌下css设置字体大小为12px及以下时，品示都是一样大小，都是默认12px。

解決办法：

- 使用Webkit的内核的-webkit-text-size-adjust的私有CSS属性来解决，只要加了-webkit-text-size-adjust:none;字体大小就不受限制了。但是chrome更新到27版本之后就不可以用了。所以高版本chrome谷歌浏览器已经不再支持-webkit-text-size-adjust样式，所以要使用时候慎用。
- 使用css3的transform缩放属性-webkit-transform:scale(0.5); 注意-webkit-transform:scale(0.75);收缩的是整个元素的大小，这时候，如果是内联元素，必须要将内联元素转换成块元素，可以使用display：block/inline-block/…；
- 使用图片：如果是内容固定不变情况下，使用将小于12px文字内容切出做图片，这样不影响兼容也不影响美观。
