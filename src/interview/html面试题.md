---
title: HTML面试题
icon: markdown
order: 1
date: 2023-02-17
category:
    - 面试
tag:
    - html
---

## src 和 href 的区别

src 和 href 都是用来用外部的资源，它们的区别如下：

- `src`：表示对资源的引用，它指向的内容会嵌入到当前标签所在的位置。S「C 会将其指向的资源下载并应用到文档内，如请求$脚本。当刘览器解析到该元素时，会暂停其他资原的下载和处理，直到将该资源加载、编译、执行完毕，所以一般 S 脚本会放在页面底部。
- `href`:表示超文本引用，它指向一些网络资源，建立和当前元素或本文档的链接关系。当浏览器识别到它他指向的文件时，就会并行下载资源，不会停止对当前文档的处理。常用在 a、ik 等标签上。

## 对 HTML 语义化的理解

语义化是指根据内容的结构化（内容语义化），选择合适的标签（代码语义化）。通俗来讲就是用正确的标签做正确的事情。

语义化的优点如下：

- 对机器友好，带有语义的文字表现力丰富，更适合搜索引擎的吧虫吧取有效信息，有利于 SEO。除比此之外，语义类还支持读屏软件，根据文章可以自动生成目录；
- 对开发者友好，使用语义类标签增强了可读性，结构更加清晰，开发者能清晰的看出网页的结构，便于团队的开发与维护。

常见的语义化标签：

- `<header></header>`头部
- `<nav></nav>`导航栏
- `<section></section>`区块（有语义化的 div)
- `<main></main>`主要区域
- `<article></article>`主要内容
- `<aside></aside>`侧边栏
- `<footer></footer>`底部

## DOCTYPE(文档类型)的作用

DOCTYPE 是 HTML5 中一种标准通用标记语言的文档类型声明，它的目的是告诉浏览器（解析器）应该以什么样(html 或 xhtl)的文档类型定义来解析文档，不同的渲染模式会影响浏览器对 CSS 代码甚至 JavaScript 脚本的解析。它必须声明在 HTML 文档的第一行。浏览器渲染页面的两种模式（可通过 document.compatMode 获取，比如，语雀官网的文档类型是 CSS1Compat):

- cSS1 Compat::标准模式(Strick mode),默认模式，浏览器使用 W3C 的标准解析渲染页面。在标准模式中，刘览器以其支持的最高标准呈现页面：
- BackCompat:怪异模式（混杂模式）(Quick mode),浏览器使用自己的怪异模式解析渲染页面。在怪异模式中，页面以一种比较宽松的向后兼容的方式显示。

## script 标签中 defer 和 async 的区别

如果没有 defer 或 async 属性，浏览器会立即加载并执行相应的脚本。它不会等待后续加载的文档元素，读取到就会开始加载和执行，这样就阻塞了后续文档的加载。

下图可以直观的看出三者之间的区别：

![ ](/img/interview/html.jpg)

其中蓝色代表 js 脚本网络加载时间，红色代表 js 脚本执行时间，绿色代表 html 解析。

defer 和 async.属性都是去异步加载外部的 JS 脚本文件，它们都不会阻塞页面的解析，其区别如下

- 执行顺序：多个带 async.属性的标签，不能保证加载的顺序；多个带 defer 属性的标签，按照加载顺序执行；
- 脚本是否并行执行：async 属性，表示后续文档的加载和执行与 s 脚本的加载和执行是并行进行的，即异步执行；defer)属性，加载后续文档的过程和 js 脚本的加载（比时仅加载不执行）是并行进行的（异步），js 脚本需要等到文档所有元素解析完成之后才执行，DOMContentLoaded 事件触发执行之前。

## 常用的 meta 标签有哪些

meta 标签由 name 和 content 属性定义，用来描述网页文档的属性，比如网页的作者，网页描述，关键词等，除了 HTTP 标准固定了一些 name 作为大家使用的共识，开发者还可以自定义 name。

常用的 meta 标签：

- (1)charset,.用来描述 HTML 文档的编码类型：`<meta charset="UTF-8">`
- (2)keywords,页面关键词：`<meta name="keywords”content="关键词”>`
- (3)description,页面描述：`<meta name="description”content="页面描述内容”/>`
- (4)refresh,页面重定向和刷新：`<meta http-equiv="refresh"content="0;url="/>`
- (5)viewport,适配移动端，可以控制视口的大小和比例：`<meta name=viewport content=width=device-width,initial-scale=1,maximum-scale=1">`

    其中，content 参数有以下几种：

  - width viewport:宽度（数值/device-width)
  - height viewport:高度（数值/device-height)
  - initial-scale:初始缩放比例
  - maximum-scale:最大缩放比例
  - minimum-scale:最小缩放处比例
  - user-scalable:是否允许用户缩放(yes/no)

- (6)搜索引擎索引方式：`<meta name="robots"content="index,follow"/>`

    其中，content 参数有以下几种：

  - a:文件将被检索，且页面上的链接可以被查询，
  - none:文件将不被检索，且页面上的链接不可以被查询；
  - index:文件将被检索；
  - follow:页面上的链接可以被查询；
  - noindex:文件将不被检索，
  - nofollow:页面上的链接不可以被查询。

## HTML5 有哪些更新

1.语义化标签

- header:定义文档的页眉（头部）；
- nav:定义导航链接的部分；
- footer:定义文档或节的页脚（底部）；
- article:定义文章内容；
- section:定义文档中的节(section、区段)；
- aside:定义其所处内容之外的内容（侧边）；

2.媒体标签

- (1)audio:音频`<audio src=''controls autoplay loop='true'></audio>`
  - controls 控制面板
  - autoplay 自动播放
  - loop=true'循环播放
- (2)video 视频`<video src=’’poster=-'imgs/aa.jpg’controls>.</video>`
  - poster：指定视频还没有完全下载完毕，或者用户还没有点击播放前显示的封面。默认显示当前视频文件的第一针画面，当然通过 postert 也可以自己指定。
  - controls 控制面板
  - width
  - height
- (3)source 标签
    因为浏览器对视频格式支持程度不一样，为了能够兼容不同的浏览器，可以通过$ouc 来指定视频源。

```html
<video>
    <source src='aa.flv' type='video/flv'></source>
    <source src-='aa.mp4' type='video,/mp4'></source>
</video>
```

3.表单

表单类型：

- email：能够验证当前输入的邮箱地址是否合法
- url:验证 URL
- number:只能输入数字，其他输入不了，而且自带上下增大减小箭头，ma 属性可以设置为最大值，min 可以设置为最小值，value 为默认值。
- search:输入框后面会给提供一个小叉，可以删除输入的内容，更加人性化。
- range:可以提供给一个范围，其中可以设置 max 和 min 以及 value,其中 value 属性可以设置为默认值
- color:提供了一个颜色拾取器
- time:时分秒
- data:日期选择年月日
- datatime:时间和日期（目前只有 Safari 支持）
- datatime-local:日期时间控件
- week:周控件
- month:月控件

表单属性：

- placeholder:提示信息
- autofocus:自动获取焦点
- autocomplete=“on'"或者 autocomplete=:“off"使用这个属性需要有两个前提：
  - 表单必须提交过
  - 必须有 name 属性。
- required:要求输入框不能为空，必须有值才能够提交。
- pattern="里面写入想要的正则模式，例如手机号 patte=-"(+86)?d10$”
- multiple:可以选择多个文件或者多个邮箱
- form="form 表单的 lD"

表单事件：

- oninput 每当 input 里的输入框内容发生变化都会触发此事件。
- oninvalid 当验证不通过时触发此事件。

4.进度条、度量器

- progress 标签：用来表示任务的进度(IE、Safari 不支持)，max 用来表示任务的进度，value 表示已完成多少
- meter 属性：用来显示刺余容量或刺余库存(IE、Safari 不支持)
- high/low:规定被视作高低的范围
- max/min:规定最大/小值
- value:规定当前度量值

设置规则：min<low<high<max

5.D0M 查询操作

- document.querySelector()
- document.querySelectorAll()

它们选择的对象可以是标签，可以是类（需要加点），可以是 D(需要加#)

6.Web 存储

HTML5 提供了两种在客户瑞存储数据的新方法：

- localStorage-没有时间限制的数据存储
- sessionStorage-针对一个 session 的数据存储

7.其他

- 拖放：拖放是一种常见的特性，即抓取对象以后拖到另一个位置。设置元素可拖放：`<img draggable="true"/>`
- 画布(canvas):canvas 元素使用 JavaScript 在网页上绘制图像。画布是一个矩形区域，可以控制其每一像素。caas 拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。`<canvas id=myCanvas"width=200 height="100></canvas>`
- SVG:SVG 指可伸缩矢量图形，用于定义用于网络的基于矢量的图形，使用 XML 格式定义图形，图像在放大或改变尺寸的情况下其图形质量不会有损失，它是万维网联盟的标准
- 地理定位：Geolocation(地理定位)用于定位用户的位置。

总结：

- (1)新增语义化标签：nav、header、.footer、aside、section、article
- (2)音频、视频标签：audio、video
- (3)数据存储：localStorage、sessionStorage
- (4)canvas(画布)、Geolocation(地理定位)、websocket(通信协议)
- (5)input 标签新 t 增属性：placeholder、autocomplete、autofocus、.required
- (6)history API:go、forward、back、pushstate

移除的元素有：

- 纯表现的元素：basefont,big,center,.font,s,strike,tt,u;
- 对可用性产生负面影响的元素：frame,frameset,noframes;

## img 的 srcset 属性的作用？

响应式页面中经常用到根据屏幕密度设置不同的图片。这时就用到了 img 标签的 srcset 属性。srcset 属性用于设置不同屏幕密度下，img 会自动加载不同的图片。用法如下：

```html
<img src="image-128.png" srcset="image-256.png 2x" />
```

使用上面的代码，就能实现在屏幕密度为 1 的情况下加载 image-128.png,屏幕密度为 2x 时加载 image-256.png。

按照上面的实现，不同的屏幕密度都要设置图片地址，目前的屏幕密度有 1×，2X,3x,4x 四种，如果每一个图片都设置 4 张图片，加载就会很慢。所以就有了新的 scst 标准。代码如下：

```html
<img
    src="image-128.png"
    srcset="image-128.png 128w, image-256.png 256w, image-512.png 512w"
    sizes="(max-width:360px) 340px,128px"
/>
```

其中 srcset 指定图片的地址和对应的图片质量。sizes,用来设置图片的尺寸零界点。对于 srcset 中的 w 单位，可以理解成图片质量。如果可视区域小于这个质量的值，就可以使用。浏览器会自动
选择一个最小的可用图片。

sizes 语法如下：

```html
sizes="[media query][length],[media query][length]...
```

sizes 就是指默认显示 128px,如果视区宽度大于 360px,则显示 340px。

## 行内元素有哪些？块级元素有哪些？空(od)元素有那些？

- 行内元素有：a b span img input select strong;
- 块级元素有：div ul ol li dl dt dd h1h2h3h4h5h6p;
-

空元素，即没有内容的 TML 元素。空元素是在开始标签中关闭的，也就是空元素没有闭合标签：

- 常见的有：`<br>`、`<hr>`、`<img>`、`<input>`、`<link>`、`<meta>`;
- 鲜见的有：`<area>`、`<base>`、`<col>`、`<colgroup>`、`<command>`、`<embed>`、`<keygen>`、`<param>`、`<source>`、`<track>`、`<wbr>`

## 说一下 web worker

在 TML 页面中，如果在执行脚本时，页面的状态是不可相应的，直到脚本执行完成后，页面才变成可相应。web worker 是运行在后台的 is,独立于其他脚本，不会影响页面的性能。并且通过 postMessage 将结果回传到主线程。这样在进行复杂操作的时候，就不会阻塞主线程了。

## title.与h1的区别、b与strong的区别、i与em的区别？

- strong标签有语义，是起到加重语气的效果，而b标签是没有的，b标签只是一个简单加粗标签。b标签之间的字符都设为粗体，strong标签加强字符的语气都是通过粗体来实现的，而搜索引擎更侧重strong标签。
- titl属性没有明确意义只表示是个标题，H1则表示层次明确的标题，对页面信息的抓取有很大的影响
- i内容展示为斜体，em表示强调的文本

## iframe有那些优点和缺点？

iframe元素会创建包含另外一个文档的内联框架（即行内框架）。

### 优点

- 用来加载速度较慢的内容（如广告）
- 可以使脚本可以并行下载
- 可以实现跨子域通信

### 缺点

- iframe会阻塞主页面的onload事件
- 无法被一些搜索引擎索识别
- 会产生很多页面，不容易管理

## label的作用是什么？如何使用？

labelt标签来定义表单控件的关系：当用户选择labelt标签时，浏览器会自动将焦点转到和label标签
相关的表单控件上。

- 使用方法1：

```html
<label for="mobile">Number:</label>
<input type="text"id="mobile"/>
```

- 使用方法2：

```html
<label>Date:<input type="text"/></label>
```

## Canvas和SVG的区别

### (1)SVG

SVG可缩放矢量图形(Scalable Vector Graphics)是基于可扩展标记语言XML描述的2D图形的语言，SVG基于XML就意味着SVG DOM中的每个元素都是可用的，可以为某个元素附加Javascript事件处理器。在SVG中，每个被绘制的图形均被视为对象。如果SVG对象的属性发生变化，那么浏览器能够自动重现图形。

其特点如下：

- 不依赖分辨率
- 支持事件处理器
- 最适合带有大型渲染区域的应用程序（比如谷歌地图）
- 复杂度高会减慢渲染速度（任何过度使用DOM的应用都不快）
- 不适合游戏应用

### (2)Canvas

Canvas,是画布，通过Javascript来绘制2D图形，是逐像素进行渲染的。其位置发生改变，就会重新进行绘制。

其特点如下：

- 依赖分辨率
- 不支持事件处理器
- 弱的文本渲染能力
- 能够以png或jpg格式保存结果图像
- 最适合图像密集型的游戏，其中的许多对象会被频繁重绘

注：矢量图，也称为面向对象的图像或绘图图像，在数学上定义为一系列由线连接的点。矢量文件中的图形元素称为对象。每个对象都是一个自成一体的实体，它具有颜色、形状、轮廓、大小和屏幕位置等属性。

## head标签有什么作用，其中什么标签必不可少？

文档的头部描述了文档的各种属性和信息，包括文档的标题、在Wb中的位置以及和其他文档的关系等。绝大多数文档头部包含的数据都不会真正作为内容显示给读者。

下面这些标签可用在head部分：

- `<title>`:定义文档的标题，是显示在浏览器标签页或窗口标题栏上的内容。这是`<head>`中必不可少的标签。
- `<meta>`:用于指定页面的元数据，比如字符编码、作者、关键词、描述等。其中最重要的是设置字符编码
- `<link>`:用于引入外部资源，最常见的用途是链接CSS样式表，还可以用来链接网站图标(favicon)和其他资源文件.
- `<script>`:用于引入JavaScript文件或定义嵌入的脚本代a码。
- `<base>`:定义页面中相对URL的基准路径。这样，在引用其他资源时，浏览器会根据基准路径来解析相对路径。
- 其他元素：还可以在`<head>`中包含其他元素，如样式(`<style>`)、逻辑(`<script>`)、搜索引擎指令(`<meta name="robots'">`)等。

## W3C 标准

标签闭合、标签小写、不乱嵌套、使用外链 css 和 js 、结构行为表现的分离

## 盒模型

- 在 HTML 中所有元素都可以看成是一个盒子
- 盒子的组成：内容 content、内边距 padding、边框 border、外边距 margin
- 盒模型的类型：
  - 标准和模型（margin+border+padding+content）
  - IE 盒模型（margin+content(border+padding)）
- 控制盒模型模式：
  - `box-sizing: content-box;`默认值、标准盒模型
  - `box-sizing：border-box;`表示 IE 盒模型（怪异盒模型）

## 行内与块级元素区别

- 行内元素与块级函数可以相互转换，通过修改 display 属性值来切换块级元素和行内元素，行内元素 display：inline，块级元素 display：block。
- 行内元素和其他行内元素都会在一条水平线上排列，都是在同一行的.
    块级元素独占一行，垂直向下排列，若想使其水平方向排序，可使用左右浮动（float：left/right）让其水平方向排列。
- 行内元素不可以设置宽高，宽度高度随文本内容的变化而变化，但是可以设置行高（line-height），同时在设置外边距 margin 上下无效，左右有效，内填充 padding 上下无效，左右有效；
    块级元素可以设置宽高，并且宽度高度以及外边距，内填充都可随意控制。
- 块级元素可以包含行内元素和块级元素，还可以容纳内联元素和其他元素；
    行内元素不能包含块级元素，只能容纳文本或者其他行内元素。

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

## iframe 有那些缺点

- iframe 会阻塞主页面的 Onload 事件
- 搜索引擎的检索程序无法解读这种页面， 不利于 SEO
- iframe 和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载

## 网页制作会用到的图片格式有哪些

png-8，png-24，jpeg，gif，svg。

但是上面的那些都不是面试官想要的最后答案。面试官希望听到是 Webp。（是否有关注新技术，新鲜
事物）

科普一下 Webp：WebP 格式，谷歌（google）开发的一种旨在加快图片加载速度的图片格式。图片压缩
体积大约只有 JPEG 的 2/3，并能节省大量的服务器带宽资源和数据空间。Facebook Ebay 等知名网站已经
开始测试并使用 WebP 格式。在质量相同的情况下，WebP 格式图像的体积要比 JPEG 格式图像小 40%
