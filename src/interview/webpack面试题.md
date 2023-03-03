---
title: Webpack面试题
icon: markdown
order: 4
date: 2023-02-17
category:
    - 面试
tag:
    - Webpack
---

## 对webpack的理解

webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具。我们可以使用webpack管理模块。因为在webpack看来，项目中的所有资源皆为模块，通过分析模块间的依赖关系，在其内部构建出一个依赖图，最终编绎输出模块为 HTML、JavaScript、CSS 以及各种静态文件（图片、字体等），让我们的开发过程更加高效。

## 主要作用

- 模块打包。可以将不同模块的文件打包整合在一起，并且保证它们之间的引用正确，执行有序。利用打包我们就可以在开发的时候根据我们自己的业务自由划分文件模块，保证项目结构的清晰和可读性。
- 编译兼容。在前端的“上古时期”，手写一堆浏览器兼容代码一直是令前端工程师头皮发麻的事情，而在今天这个问题被大大的弱化了，通过webpack的Loader机制，不仅仅可以帮助我们对代码做polyfill，还可以编译转换诸如.less，.vue，.jsx这类在浏览器无法识别的格式文件，让我们在开发的时候可以使用新特性和新语法做开发，提高开发效率。
- 能力扩展。通过webpack的Plugin机制，我们在实现模块化打包和编译兼容的基础上，可以进一步实现诸如按需加载，代码压缩等一系列功能，帮助我们进一步提高自动化程度，工程效率以及打包输出的质量。

## webpack 的核心概念

- entry: 入口
- output: 输出
- loader: 模块转换器，用于把模块原内容按照需求转换成新内容
- 插件(plugins): 扩展插件，在webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要做的事情

## 构建流程

webpack的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

- 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
- 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
- 确定入口：根据配置中的 entry 找出所有的入口文件
- 编译模块：从入口文件出发，调用所有配置的 loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
- 完成模块编译：在经过上一步使用 loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
- 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
- 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

## 常见的loader有哪些？

默认情况下，webpack只支持对js和json文件进行打包，但是像css、html、png等其他类型的文件，webpack则无能为力。因此，就需要配置相应的loader进行文件内容的解析转换。

- image-loader：加载并且压缩图片文件。
- less-loader： 加载并编译 LESS 文件。
- sass-loader：加载并编译 SASS/SCSS 文件。
- css-loader：加载 CSS，支持模块化、压缩、文件导入等特性，使用css-loader必须要配合使用style-loader。
- style-loader：用于将 CSS 编译完成的样式，挂载到页面的 style 标签上。需要注意 loader 执行顺序，style-loader 要放在第一位，loader 都是从后往前执行。
- babel-loader：把 ES6 转换成 ES5
- postcss-loader：扩展 CSS 语法，使用下一代 CSS，可以配合 autoprefixer 插件自动补齐 CSS3 前缀。
- eslint-loader：通过 ESLint 检查 JavaScript 代码。
- vue-loader：加载并编译 Vue 组件。
- file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件 (处理图片和字体)
- url-loader：与 file-loader 类似，区别是用户可以设置一个阈值，大于阈值会交给 file-loader 处理，小于阈值时返回文件 base64 形式编码 (处理图片和字体)

## 常见的plugin有哪些？

webpack中的plugin赋予其各种灵活的功能，例如打包优化、资源管理、环境变量注入等，它们会运行在webpack的不同阶段（钩子 / 生命周期），贯穿了webpack整个编译周期。目的在于解决 loader 无法实现的其他事。

- HtmlWebpackPlugin：简化 HTML 文件创建 (依赖于 html-loader)
- mini-css-extract-plugin: 分离样式文件，CSS 提取为独立文件，支持按需加载 (替代extract-text-webpack-plugin)
- clean-webpack-plugin: 目录清理

## loader和plugin的区别？

loader是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中；plugin赋予了webpack各种灵活的功能，例如打包优化、资源管理、环境变量注入等，目的是解决 loader无法实现的其他事。

在运行时机上，loader 运行在打包文件之前；plugin则是在整个编译周期都起作用。

在配置上，loader在module.rules中配置，作为模块的解析规则，类型为数组。每一项都是一个 Object，内部包含了 test(类型文件)、loader、options (参数)等属性；plugin在 plugins中单独配置，类型为数组，每一项是一个 plugin 的实例，参数都通过构造函数传入。

## vue-loader是什么

Vue Loader 是一个 webpack 的 loader，它允许你以一种名为单文件组件 (SFCs)的格式撰写 Vue 组件。
作用：解析和转换 .vue 文件，提取出其中的逻辑代码 script、样式代码 style、以及 HTML 模版 template，再分别把它们交给对应的 Loader 去处理。

## webpack的热更新原理是？

模块热替换(HMR - hot module replacement)，又叫做热更新，在不需要刷新整个页面的同时更新模块，能够提升开发的效率和体验。热更新时只会局部刷新页面上发生了变化的模块，同时可以保留当前页面的状态，比如复选框的选中状态等。

热更新的核心就是客户端从服务端拉去更新后的文件，准确的说是 chunk diff (chunk 需要更新的部分)，实际上webpack-dev-server与浏览器之间维护了一个websocket，当本地资源发生变化时，webpack-dev-server会向浏览器推送更新，并带上构建时的hash，让客户端与上一次资源进行对比。客户端对比出差异后会向webpack-dev-server发起 Ajax 请求来获取更改内容(文件列表、hash)，这样客户端就可以再借助这些信息继续向webpack-dev-server发起 jsonp 请求获取该chunk的增量更新。

后续的部分(拿到增量更新之后如何处理？哪些状态该保留？哪些又需要更新？)由HotModulePlugin 来完成，提供了相关 API 以供开发者针对自身场景进行处理，像react-hot-loader和vue-loader都是借助这些 API 实现热更新。

## 如何提高webpack的构建速度？

### 代码压缩

- JS压缩

webpack 4.0默认在生产环境的时候是支持代码压缩的，即mode=production模式下。
实际上webpack 4.0默认是使用terser-webpack-plugin这个压缩插件，在此之前是使用 uglifyjs-webpack-plugin，两者的区别是后者对 ES6 的压缩不是很好，同时我们可以开启 parallel参数，使用多进程压缩，加快压缩。

- CSS压缩

CSS 压缩通常是去除无用的空格等，因为很难去修改选择器、属性的名称、值等。可以使用另外一个插件：css-minimizer-webpack-plugin。

- HTML压缩

使用HtmlWebpackPlugin插件来生成 HTML 的模板时候，通过配置属性minify进行 html 优化。

```js
module.exports = {
    plugin:[
        new HtmlwebpackPlugin({
            minify:{
                minifyCSS: false, // 是否压缩css
                collapseWhitespace: false, // 是否折叠空格
                removeComments: true // 是否移除注释
            }
        })
    ]
}
```

### 图片压缩

配置image-webpack-loader

### Tree Shaking

Tree Shaking是一个术语，在计算机中表示消除死代码，依赖于ES Module的静态语法分析（不执行任何的代码，可以明确知道模块的依赖关系）。 在webpack实现Tree shaking有两种方案：

- usedExports：通过标记某些函数是否被使用，之后通过 Terser 来进行优化的

```js
module.exports = {
    optimization:{
        usedExports
    }
}
```

使用之后，没被用上的代码在webpack打包中会加入unused harmony export mul注释，用来告知Terser在优化时，可以删除掉这段代码。

- sideEffects：跳过整个模块/文件，直接查看该文件是否有副作用

sideEffects用于告知webpack compiler哪些模块时有副作用，配置方法是在package.json中设置sideEffects属性。如果sideEffects设置为false，就是告知webpack可以安全的删除未用到的exports。如果有些文件需要保留，可以设置为数组的形式，如：

```js
"sideEffecis":[
    "./src/util/format.js",
    "*.css" // 所有的css文件
]
```

### 缩小打包域

排除webpack不需要解析的模块，即在使用loader的时候，在尽量少的模块中去使用。可以借助 include和exclude这两个参数，规定loader只在那些模块应用和在哪些模块不应用。

### 减少ES6转为ES5的冗余代码

使用bable-plugin-transform-runtime插件

### 提取公共代码

通过配置CommonsChunkPlugin插件，将多个页面的公共代码抽离成单独的文件
