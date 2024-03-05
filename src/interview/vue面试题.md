---
title: Vue面试题
icon: markdown
order: 4
date: 2023-02-17
category:
    - 面试
tag:
    - Vue
---

## 一、Vue基础

### 1.MVVM、MVC、MVP 的区别

MVC、MVP 和 MVVM 是三种常见的软件架构设计模式，主要通过分离关注点的方式来组织代码结构，优化开发效率。

在开发单页面应用时，往往一个路由页面对应了一个脚本文件，所有的页面逻辑都在一个脚本文件里。页面的這染、数据的获取，对用户事件的响应所有的应用逻辑都混合在一起，这样在开发简单项目时，可能看不出什么问题，如果项目变得复杂，那么整个文件就会变得元长、混乱，这样对项目开发和后期的项目维护是非常不利的。

#### MVC

MVC 通过分离 Model、View 和 Controller 的方式来组织代码结构。其中 View 负责页面的显示逻辑，Model 负责存储页面的业务数据，以及对相应数据的操作。并且 view 和 Model 应用了观察者模式，当 Model 层发生改变的时候它会通知有关 View 层更新页面。Controller 层是 view 层和 Model 层的纽带，它主要负责用户与应用的响应操作，当用户与页面产生交互的时候，Controller 中的事件触发器就开始工作了，通过调用 Model 层，来完成对 Modlel 的修改，然后 Model 层再去通知 View 层更新。

![MVC](/img/interview/mvc.jpg)

#### MVVM

MVVM 分为 Model、 View、 ViewModel:

- Model 代表数据模型，数据和业务逻辑都在 Model 层中定义
- View 代表 U 视图，负责数据的展示
- viewMode 负责监听 Model 中数据的改变并且控制视图的更新，处理用户交互操作

Model 和 View 并无直接关联，而是通过 viewModel 来进行联系的，Model 和 ViewModel 之间有着双向数据绑定的联系。因此当 Modlel 中的数据改变时会触发 View 层的刷新，View 中由于用户交互操作而改变的数据也会在 Model 中同步。

这种模式实现了 Model 和 View 的数据自动同步，因此开发者只需要专注于数据的维护操作即可，而不需要自己操作 DOM。

![MVVM](/img/interview/mvvm.jpg)

#### MVP

MVP 模式与 MVC 唯一不同的在于 Presenter 和 Controller。在 MVC 模式中使用观察者模式，来实现当 Model 层数据发生变化的时候，通知 View 层的更新。这样 View 层和 Model 层耦合在一起，当项目逻辑变得复杂的时候，可能会造成代码的混乱，并且可能会对代码的复用性造成一些问题。MVP 的模式通过使用 Presenter 来实现对 View 层和 Model 层的解轉。MVC 中的
Controler 只知道 Model 的接口，因此它没有办法控制 View 层的更新，MVP 模式中，View 层，的接口暴露给了 Presenter 因此可以在 Presenter 中将 Model 的变化和 View 的变化绑定在一起，以此来实现 view 和 Model 的同步更新。这样就实现了对 view 和 Model 的解耜，Presenter 还包含了其他的响应逻辑。

### 2.单页和多页的区别及优缺点

- 概念：
  - SPA 单页面应用(SinglePage Web Application),指只有一个主页面的应用，一开始只需要加载一次 js、CSS 等相关资源。所有内容都包含在主页面，对每一个功能模块组件化。单页应用跳转，就是切换相关组件，仅仅刷新局部资源。
  - MPA 多页面应用(MultiPage Application),指有多个独立页面的应用，每个页面必须重复加载 js、CSS 等相关资源。多页应用跳转，需要整页资源刷新。
- 区别
    ![SPA](/img/interview/spa.jpg)

### 3.对 SPA 单页面的理解，它的优缺点分别是什么？

SPA(single-page application)仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载。

- 优点：
  - 用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染
  - 基于上面一点，SPA 相对对服务器压力小
  - 前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理
- 缺点：
  - 初次加载耗时多：为实现单页 Wb 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载
  - 前进后退路由管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要白己建立堆栈管理
  - SEO 难度较大：由于所有的内容都在一个页面中动态替换显示，所以在 SE0 上其有着天然的弱势

### 4.Vue 的基本原理

当一个 vue 实例创建时，vue 会遍历 data 中的属性，用 Object.defineProperty（vue3,0 使用 proxy）将它们转为 getter/setter， 并且在内部追踪相关依赖，在属性被访问和修改时通知变化。每个组件实例都有相应的 watcher 程序实例，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新。

### 5.对 import Vue from "vue"的理解

```js
function Vue(options) {
    if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
        warn('Vue is a constructor and should be called with the `new` keyword')
    }
    this._init(options)
}
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
```

我们开发中引入的 Vue 其实就是这个构造函数，而且这个构造函数只能通过 new Vue 的方式进行使用，否则会在控制台打印警告信息。定义完后，还会通过 initMixin(Vue)、stateMixin(Vue)、eventsMixin(Vue)、lifecycleMixin(Vue)和 renderMixin(Vue)的方式为 Vue 原型中混入方法。我们通过 import Vue from "Vue"引入的本质上就是一个原型上挂在了好多方法的构造函数。

### 6.对 new Vue 的理解

```js
// main.js文件
import Vue from 'vue'
var app = new Vue({
    el: '#app',
    data() {
        return {
            msg: 'hello Vue~',
        }
    },
    template: `<div>{{msg}}</div>`,
})

console.log(app)
```

new Vue 就是对构造函数 Vue 进行实例化，执行结果如下：
![An image](/img/interview/vue.jpg)
可以看出实例化后的实例中包含了很多属性，用来对当前 app 进行描述，当然复杂的 Vue 项目这个 app 将会是一个树结构，通过$parent和$children 维护父子关系。

new Vue 的过程中还会执行 this.\_init 方法进行初始化处理。

### 7.computed 和 watch 区别

- 对于 Computed:
  - 它支持缓存，只有依赖的数据发生了变化，才会重新计算
  - 不支持异步，当 Computed 中有异步操作时，无法监听数据的变化
  - computed 的值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于 data 声明过，或者父组件传递过来的 props 中的数据进行计算的。
  - 如果一个属性是由其他属性计算而来的，这个属性依赖其他的属性，一般会使用 computed
  - 如果 computed 属性的属性值是函数，那么默认使用 get 方法，函数的返回值就是属性的属性值;在 computed 中，属性有一个 get 方法和一个 set 方法，当数据发生变化时，会调用 set 方法。
- 对于 Watch:
  - 它不支持缓存，数据变化时，它就会触发相应的操作
  - 支持异步监听
  - 监听的函数接收两个参数，第一个参数是最新的值，第二个是变化之前的值
  - 当一个属性发生变化时，就需要执行相应的操作
  - 监听数据必须是 data 中声明的或者父组件传递过来的 props 中的数据，兰发生变化时，会触发其他操作，函数有两个的参数：
  - immediate：组件加载立即触发回调函数
  - deep：深度监听，发现数据内部的变化，在复杂数据类型中使用，例如数组中的对象发生变化。需要注意的是，deep 无法监听到数组和对象内部的变化。
- 总结：
  - computed 计算属性：依赖其它属性值，井且 corputed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值。
  - watch 侦听器：更多的是观察的作用，无缓存性，类似于某些数据的监听回调，每当监听的数据变化时都会执行回调进行后续操作。
- 运用场景：
  - 当需要进行数值计算,并且依赖于其它数据时，应该使用 corputed，因为可以利用 computed 的缓存特性，避免每次获取值时都要重新计算。
  - 当需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许执行异步操作（访问一个 API），限制执行该操作的频率，并在得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

### 8.computed 和 methods 的区别

可以将同一函数定义为一个 method 或者一个计算属性。对于最终的结果，两种方式是相同的

- 不同点：
  - computed：计算属性是基于它们的依赖进行缓存的，只有在它的相关依赖发生改变时才会重新求值；
  - method 调用总会执行函数。

### 9.v-if、v-show、v-html 的原理

- v-if 生成 vnode 的时候会忽略对应节点，render 的时候就不会渲染
- v-show 会生成 vnode，render 的时候也会渲染成真实节点，只是在 render 过程中会在节点的属性中修改 show 属性值，也就是常说的 display
- v-html 会先移除节点下的所有节点，调用 html 方法，通过 addProp 添加 innerHTML 属性，归根结底还是设置 innerHTML 为 v-html 的值

### 10.v-if 和 v-for

vue2 中 v-for 优先级更高，在编译的时候会将 v-for 渲染成\_l 函数 v-if 会变成三元表达式。v-if 和 v-for 不能同时使用。如果同时遇到的时候，应该考虑先用计算属性处理数据，在进行 v-for，可以减少循环次数。vue3 中则完全相反，v-if 的优先级高于 v-for

### 11.v-if 和 v-show

- 手段：v-if 是动态的向 DOM 树内添加或者删除 DOM 元素；v-show 是通过设置 DOM 元泰的 display 样式属性控制显隐；
- 编译过程：v-if 切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；v-show 只是简单的基于 css 切换；
- 编译条件：v-if 是惰性的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译；v-show 是在任何条件下，无论首次条件是否为真，都被编译，然后被缓存，而且 DOM 元素保留；
- 性能消耗：v-if 有更高的切换消耗；v-show 有更高的初始渲染消耗；
- 使用场景：v-if 适合运营条件不大可能改变；v-show 适合频繁切换。

### 12.props、methods、data、computed 的执行顺序

```js
function initState(vm) {
    vm._watchers = []
    var opts = vm.$options
    if (opts.props) {
        initProps(vm, opts.props)
    }
    if (opts.methods) {
        initMethods(vm, opts.methods)
    }
    if (opts.data) {
        initData(vm)
    } else {
        observe((vm._data = {}), true /* asRootData */)
    }
    if (opts.computed) {
        initComputed(vm, opts.computed)
    }
    if (opts.watch && opts.watch !== nativeWatch) {
        initWatch(vm, opts.watch)
    }
}
```

以上为 vue 的部分源码，可以看出判断顺序：
props > methods > data > computed > watch

### 13.data 为什么是函数

针对根实例而言，组件是通过同一个构造函数多次创建实例，如果是同一个对象的话那么数据会被互相影响。每个组件的数据源都是独立的，那就每次都调用 data 返回一个新的对象

```js
const Vue = {}
Vue.extend = function (options) {
    function Sub() {
        this.data = this.constructor.options.data()
    }
    Sub.options = options
    return Sub
}

let Child = Vue.extend({
    data() {
        return {
            a: 1,
        }
    },
})

let c1 = new Child()
c1.data.a = 100
let c2 = new Child()
console.log(c2.data.a)
```

### 14.data 和 method 可以同名吗

```js
if (methods && hasOwn(methods, key)) {
    warn(`Method "${key}" has already been defined as a data property.`, vm)
}
```

### 15.data 中某一个属性的值发生改变后，视图会立即同步执行重新渲染吗？

不会立即同步执行重新渲染。Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新。Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。

如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环 tick 中，Vue 刷新邢队列并执行实际（已去重的）工作。

### 16.nextTick 在哪里使用？原理是？

nextTick 的核心是利用了如 Promise、MutationObserver、setlmmediate、setTimeout 的原生 JavaScript 方法来模拟对应的微宏任务的实现，本质是为了利用 JavaScript 的这些异步回调任务队列来实现 Vue 框架中自己的异步回调队列。

nextTick 不仅是 Vue 内部的异步队列的调用方法，同时也允许开发者在实际项目中使用这个方法来满足实际应用中对 DOM 更新数据时机的后续逻辑处理

nextTick 是典型的将底层 JavaScript 执行原理应用到具体案例中的示例，引入异步更新邪队列机制的原因：

- 如果是同步更新，则多次对一个或多个属性赋值，会频繁触发 DOM 的渲染，可以减少一些无用渲染
- 同时由于 VirtualDOM 的引入，每一次状态发生变化后，状态变化的信号会发送给组件，组件内部使用 VirtualDOM 进行计算得出需要更新的具体的 DOM 节点，然后对 DOM 进行更新操作，每次更新状态后的渲染过程需要更多的计算，而这种无用功也将浪费更多的性能，所以异步渲染变得更加至关重要

Vue 采用了数据区动视图的思想，但是在一些情况下，仍然需要操作 DOM。有时候，可能遇到这样的情况，DOM1 的数据发生了变化，而 DOM2 需要从 DOM1 中获取数据，那这时就会发现 DOM2 的视图并没有更新，这时就需要用到了 nextTick 了。

所以，在以下情况下，会用到 nextTick:

- 在数据变化后执行的某个操作，而这个操作需要使用随数据变化而变化的 DOM 结构的时候，这个操作就需要方法在 nextTick()的回调函数中。
- 在 vue 生命周期中，如果在 created()钩子进行 DOM 操作，也一定要放在 nextTick()的回调函数中。

因为在 created()钩子函数中，页面的 DOM 还未渲染，这时候也没办法操作 DOM,所以，此时如果想要操作 DOM,必须将操作的代码放在 nextTick()的回调函数中。

### 17.侦听器

```js
export class Observer {
    constructor(value) {
        this.value = value
        if (Array.isArray(value)) {
            // 数组
        } else {
            this.walk(value)
        }
    }

    walk(obj) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, key[i])
        }
    }
}

// 循环 让对象的每一个属性都变成可观测的
function defineReactive(obj, key, val) {
    if (arguments.length === 2) {
        val = obj[key]
    }
    if (typeof val === 'object') {
        // 递归
        new Observer(val)
    }
    Object.defineProperty(obj, key, {
        enumerable: true, // 可枚举
        configurable: true, // 可改变
        get() {
            console.log(`${key}属性被读取了`)
            return val
        },
        set(newVal) {
            console.log(`${key}属性被修改了，新值为${newVak}`)
            val = newVal
        },
    })
}
```

### 18.过滤器

根据过滤器的名称，过滤器是用来过滤数据的，在 vue 中使用 flters 来过滤数据，flters 不会修改数据，而是过滤数据，改变用户看到的输出（计算属性 computed，方法 methods 都是通过修改数据来处理数据格式的输出显示）。

- 使用场景：
  - 需要格式化数据的情况，比如需要处理时间、价格等数据格式的输出 / 显示。
  - 比如后端返回一个年月日的日期字符串，前端需要展示为多少天前的数据格式，此时就可以用 fliters 过滤器来处理数据。

过滤器是一个函数，它会把表达式中的值始终当作函数的第一个参数。过滤器用在插值表达式{{}}和 v-bind 表达式 中，然后放在操作符|后面进行指示。
例如，在显示金额，给商品价格添加单位：

```js
<li>商品价格：{{item.price | filterprice}}</li>
filters: {
    filterPrice (price) {
        return price ? ('¥'+ price)：'--''
    }
}
```

### 19.自定义指令

在 Vue2.0 中，代码复用和抽象的主要形式是组件。然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。

一般需要对 DOM 元素进行底层操作时使用，尽量只用来操作 DOM 展示，不修改内部的值。当使用自定义指令直接修改 value 值时绑定 v-model 的值也不会同步更新；如必须修改可以在自定义指令中使用 keydown 事件，在 vue 组件中使用 change 事件，回调中修改 vue 数据；

- 自定义指令基本内容
  - 全局定义：Vue.directive("focus'",)
  - 局部定义：directives:{focus:}
  - 钩子函数：指令定义对象提供钩子函数
    - bind:只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
    - inSerted:被绑定元素插入父节点时调用（仅保证父节点存在，但不一定已被插入文档中）。
    - update:所在组件的/Node 更新时调用，但是可能发生在其子 VNode 更新之前调用。指令的值可能发生了改变，也可能没有。但是可以通过比较更新前后的值来忽略不必要的模板更新。
    - ComponentUpdate:指令所在组件的 VNode 及其子 VNode 全部更新后调用。
    - unbind:只调用一次，指令与元素解绑时调用。
  - 钩子函数参数
    - el:绑定元素
    - bing:指令核心对象，描述指令全部信息属性
    - name
    - value
    - oldValue
    - expression
    - arg
    - modifers
    - vnode 虚拟节点
    - oldVnode:上一个虚拟节点（更新钩子函数中才有用）
- 使用场景
  - 普通 DOM 元素进行底层操作的时候，可以使用自定义指令
  - 自定义指令是用来操作 DOM 的。尽管 Vue 推崇数据驱动视图的理念，但并非所有情况都适合数据驱动。自定义指令就是一种有效的补充和扩展，不仅可用于定义任何的 DOM 操作，并且是可复用的。
- 使用案例
  - 初级应用：
    - 鼠标聚焦
    - 下拉菜单
    - 相对时间转换
    - 滚动动画
  - 高级应用：
    - 自定义指令实现图片赖加载
    - 自定义指令集成第三方插件

### 20.clss 动态绑定

对象语法

```js
<div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>
data: {
  isActive: true,
  hasError: false
}
```

数组语法：

```js
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

### 21.style 动态绑定

对象语法：

```js
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
data: {
  activeColor: 'red',
  fontSize: 30
}
```

数组语法：

```js
<div v-bind:style="[styleColor, styleSize]"></div>

data: {
  styleColor: {
     color: 'red'
   },
  styleSize:{
     fontSize:'23px'
  }
}
```

### 22.谈谈你对 keep-alive 的了解

keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染 ，其有以下特性：

- 一般结合路由和动态组件一起使用，用于缓存组件
- 提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高
- 对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated

### 23.vue.use的实现原理

vue.use 是 vue.js 提供的全局方法，用于安装 vue.js 插件。它的主要作用是将插件注册到 vue实例中，以便在全局范围内使用插件提供的功能。

vue.use 的实现原理可以简单概括为以下几个步骤：

1. 检查插件是否已安装：

- vue use 方法接收一个插件对象作为参数，并在插件对象中通常包含一个 install 方法。
- 在执行安装之前，vue.use 首先检查插件是否已经被安装过。如果插件已经被安装过（插件的installed 属性为 true），则直接返回，避免重复安装。

2. 调用插件的 install 方法：

- 如果插件没有被安装过，vue.use 会调用插件对象的 install 方法，并传入 vue 构造函数作为参数，以便插件可以访问全局的 vue 实例。
- 插件的 install 方法可以在其中定义全局的组件、指令、混入、过滤器等功能，或者设置
全局配置等。

3. 标记插件己安装：

- 在插件的 install 方法执行完成后，vue.use 会将插件的 installed 属性标记为 true， 表示该插件已经被安装过，避免重复安装。

4. 可选参数处理：

- 在vue.use 中，还可以传递额外的参数给插件的 install 方法。这些参数可以用于配置插件的行为或向插件传递一些信息。

### 24.vue 中使用了哪些设计模式

单例模式：new 多次，只有一个实例
工场模式：传入参数就可以创建实例（虚拟节点的创建）
发布订阅模式：eventBus
观察者模式：watch 和 dep
代理模式：\_data 属性、proxy、防抖、节流
中介者模式：vuex
策略模式
外观模式

### 25.vue 的优点

- 轻量级框架：只关注视图层，是一个构建数据的视图集合，大小只有几十 kb
- 简单易学：国人开发，中文文档，不存在语言障碍，易于理解和学习
- 双向数据绑定：保留了 angular 的特点，在数据操作方面更为简单
- 组件化：保留了 react 的优点，实现了 html 的封装和重用，在构建单页面应用方面有着独特的优势
- 视图，数据，结构分离：使数据的更改更为简单，不需要进行逻辑代码的修改，只需要操作数据就能完成相关操作
- 虚拟 DOM:dom 操作是非常耗费性能的，不再使用原生的 dom 操作节点，极大解放 dom 操作，但具体操作的还是 dom 不过是换了另一种方式
- 运行速度更快：相比较于 react 而言，同样是操作虚拟 dom,就性能而言，vue 存在很大的优势

### 26.对 SSR 的理解

SSR 也就是服务端渲染，也就是将 Vue 在客户端把标签渲染成 HTML 的工作放在服务端完成，然后再把 html 直接返回给客户端

- SSR 的优势：
  - 更好的 SEO
  - 首屏加载速度更快
- SSR 的缺点：
  - 开发条件会受到限制，服务器端渲染只支持 beforeCreate 和 created 两个钩子；
  - 当需要一些外部扩展库时需要特殊处理，服务端渲染应用程序也需要处于 Nod©js 的运行环境；
  - 更多的服务端负载。

### 27.对 React 和 Vue 的理解，它们的异同

- 相似之处：
  - 都将注意力集中保持在核心库，而将其他功能做如路由和全局状态管理交给相关的库；
  - 都有自己的构建工具，能让你得到一个根据最佳实践设置的项目模板；
  - 都使用了 Virtual DOM(虚拟 DOM)提高重绘性能：
  - 都有 props 的概念，允许组件间的数据传递；
  - 都鼓励组件化应用，将应用分拆成一个个功能明确的模块，提高复用性。
- 不同之处

  - 数据流
        vue 默认支持数据双向绑定，而 React一直提倡单向数据流
  - 虚拟 DOM
        Vue2.x 开始引入"Virtual DOM",消除了和 React 在这方面的差异，但是在具体的细节还是有各自的特点。
    - Vue 宣称可以更快地计算出 Virtual DOME 的差异，这是由于它在渲染过程中，会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树。
    - 对于 Ract 而言，每当应用的状态被改变时，全部子组件都会重新渲染。当然，这可以通过 PureComponent/shouldComponentUpdate 这个生命周期方法来进行控制，但 Vue 将此视为默认的优化。
  - 组件化
        React 与 Vue 最大的不同是模板的编写。

    - Vue 鼓励写近似常规 HTML 的模板。写起来很接近标准 HTML 元素，只是多了一些属性。
    - React 推荐你所有的模板通用 JavaScript 的语法扩展一 JSX 书写。具体来讲：React 中 render 函数是支特闭包特性的，所以 import 的组件在 render 中可以直接调用。但是在 Vue 中，由于模板中使用的数据都必须挂在 this 上进行一次中转，所以 import 一个组件完了之后，还需要在 components 中再声明下。

- 监听数据变化的实现原理不同
  - Vue 通过 getter/setter 以及一些函数的劫特，能精确知道数据变化，不需要特别的优化就能达到很好的性能
  - React 默认是通过比较引用的方式进行的，如果不优化(PureComponent/shouldComponentUpdate)可能导致大量不必要的 vDOM 的重新渲染。这是因为 Vue 使用的是可变数据，而 React 更强调数据的不可变.
- 高阶组件
        react 可以通过高阶组件(HOC)来扩展，而 Vue 需要通过 mixins 来扩展。高阶组件是高阶函数，而 React 的组件本身就是纯粹的函数，所以高阶函数对 React 来说易如反掌。相反 vuejs 使用 HTML 模板创建视图组件，这时模板无法有效的编译，因此 vue 不能采用 HOC 来实现。

- 构建工具
        两者都有自己的构建工具：
  - React ==> Create React APP
  - Vue ==> Vue-ci
- 跨平台
  - React ==> React Native
  - Vue ==> Weex

## 二、响应式

### 1.响应式原理

1. 所谓数据响应式就是能够使数据变化可以被检测并对这种变化做出响应的机制。
2. MVVM 框架中要解决的一个核心问题是连接数据层和视图层，通过数据驱动应用，数据变化，视图更新，要做到这点的就需要对数据做响应式处理，这样一旦数据发生变化就可以立即做出更新处理。
3. 以 vue 为例说明，通过数据响应式加上虚拟 DOM 和 patch 算法，开发人员只需要操作数据，关心业务，完全不用接触繁琐的 DOM 操作，从而大大提升开发效率，降低开发难度。
4. vue2 中的数据响应式会根据数据类型来做不同处理，如果是对象则采用 Object.defineProperty()的方式定义数据拦截，当数据被访问或发生变化时，我们感知并作出响应；如果是数组则通过覆盖数组对象原型的 7 个变更方法，使这些方法可以额外的做更新通知，从而作出响应。这种机制很好的解决了数据响应化的问题，但在实际使用中也存在一些缺点：比如初始化时的递归遍历会造成性能损失；新增或删除属性时需要用户使用 Vue.set/delete 这样特殊的 api 才能生效；对于 es6 中新产生的 Map、Set 这些数据结构不支持等问题。
5. 为了解决这些问题，vue3 重新编写了这一部分的实现：利用 ES6 的 Proxy 代理要响应化的数据，它有很多好处，编程体验是一致的，不需要使用特殊 api，初始化性能和内存消耗都得到了大幅改善；另外由于响应化的实现代码抽取为独立的 reactivity 包，使得我们可以更灵活的使用它，第三方的扩展开发起来更加灵活了。

> 源码层面 initData -> observe ->defineReactive 方法（内部对所有属性进行重写）递归增加对象中的对象，增加 getter 和 setter
> 我们在使用 Vue 的时候，如果层级过深（考虑优化）如果数据不是响应式的就不要放在 data 中。属性取值的时候应该尽量避免多次取值。如果有些对象是放到 data 中，但是不是响应式的可以考虑采用 Object.freeze()来冻结函数

```js
let tital = 100
for (let i = 0; i < 100; i++) {
    total += 1
}
this.timer = total
```

### 2.如何检测数组变化

vue2 中检测数组的变化并没有采用 defineProperty 因为修改索引的情况不多(如果直接使用 defineProperty 会浪费大量性能)。采用重写数组变异方法来实现（函数劫持）。

> initData -> observe -> 对我们传入的数组进行原型链修改，后续调用的方法都是重写后的方法 -> 对数组中的每个对象也再次进行代理

- 当你利用索引直接设置一个数组项时

```js
vm.$set(vm.items, indexOfItem, newValue)
```

- 当你修改数组的长度时

```js
vm.items.splice(newLength)
```

### 3.使用 Object.defineProperty()来进行数据劫持有什么缺点？

在对一些属性进行操作时，使用这种方法无法拦截，比如通过下标方式修改数组数据或者给对象新增属性，这都不能触发组件的重新渲染，因为 Object.defineProperty 不能拦截到这些操作。更精确的来说，对于数组而言，大部分操作都是拦截不到的，只是 vue 内部通过重写函数的方式解決了这个问题。

在 vue3.0 中已经不使用这种方式了，而是通过使用 Proxy 对对象进行代理，从而实现数据劫持。使用 Proxy 的好处是它可以完美的监听到任何方式的数据改变，唯一的缺点是兼容性的问题，因为 Proxy 是 ES6 的语法。

### 4.如何进行依赖收集

所谓的依赖收集（观察者模式）被观察者指代是数据，观察者（watcher 有 3 种 渲染 watcher 计算属性 用户 wather）。一个 watcher 中可能对应着多个数据，watcher 中需要保存 dep（重新渲染的时候可以让属性重新记录 waitcher）计算属性也会用到

在初始化 Vue 的每个组件时，会对组件的 data 进行初始化，就会将由普通对象变成响应式对象，在这个过程中便会进行依赖收集的相关逻辑，如下所示：

```js
function defieneReactive (obj,key,val){
    const dep = new Dep();
    ...
    Object.defineProperty(obj,key,{
        ...
        get:function reactiveGetter () {
            if(Dep.target){
                dep.depend();
                ...
            }
            return val
        }
    }
}
```

以上只保留了关键代码，主要就是 const dep=new Dep()实例化一个 Dep 的实例，然后在 get 函数中通过 dep.depend()进行依赖收集。

- Dep

Dep 是整个依赖收集的核心，其关键代码如下：

```js
class Dep {
    static target;
    subs;
    constructor (){
        ...
        this.subs =[]
    }
    addSub (sub){
        this.subs.push(sub)
    }
    removeSub (sub){
        remove(this.sub,sub)
    }
    depend (){
        if (Dep.target){
            Dep.target.addDep(this)
        }
    }
    notify (){
        const subs = this.subds.slice();
        for(let i=0;i subs.length;i++){
            subs[i].update()
        }
    }
}
```

Dep 是一个 class,其中有一个关键的静态属性 static,它指向了一个全局唯一 Watcher,保证了同一时间全局只有一个 watcher 被计算，另一个属性 subs 则是一个 Watcher 的数组，所以 Dep 实际上就是对 Watcher 的管理，再看看 Watcher 的相关代码：

- Watcher

```js
class Watcher {
    getter;
    ...
    constructor (vm,expression){
        ...
        this.getter expression;
        this.get();
    }
    get () {
        pushTarget(this);
        value = this.getter.call(vm,vm)
        ...
        return value
    }
    addDep (dep){
        ...
        dep.addSub(this)
    }
    ...
}
function pushTarget (_target){
    Dep.target二_target
}
```

Watcher 是一个 class,它定义了一些方法，其中和依赖收集相关的主要有 get、addDep 等。

- 过程

在实例化 Vue 时，依赖收集的相关过程如下：

初始化状态 initState,这中间便会通过 defineReactive 将数据变成响应式对象，其中的 getter 部分便是用来依赖收集的。

初始化最终会走 mount 过程，其中会实例化 Watcher,进入 Watcher 中，便会执行 this.get()方法

```js
updateComponent = () => {
    vm._update(vm._render())
}
new Watcher(vm, updateComponent)
```

get 方法中的 pushTarget 实际上就是把 Dep.target 赋值为当前的 watcher。

this.getter.call(vm,vm),这里的 getter 会执行 vm.render()方法，在这个过程中便会角触发数据对象的 getter。.那么每个对象值的 getter 都特有一个 dep,在触发 getter 的时候会调用 dep.depend()）方法，也就会执行 Dep.target..addDep(this)。刚才 Dep.target 已经被赋值为 watcher,于是便会执行 addDep 方法，然后走到 dep.addSub()方法，便将当前的 watcher 订阅到这个数据持有的 dp 的 subs 中，这个目的是为后续数据变化时候能通知到哪些 subs 做准备。所以在 vm.render()过程中，会触发所有数据的 getter,这样便已经完成了一个依赖收集的过程。

> 多对多的关系 一个 dep 对应多个 watcher，一个 watcher 有多个 dep。默认渲染的时候会进行依赖收集

### 5.双向数据绑定的原理

vuejs 是采用数据劫持结合发布者-订阅者模式的方式，通过 Object.defineProperty0 来劫持各个属性的 setter， getter，在数据变动时发布消息给订阅者，触发相应的监听回调。主要分为以下几个步骤：

1. 需要 observe 的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter 和 getter 这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化
2. compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视因，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
3. Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，主要做的事情是：
    - 在自身实例化时往属性 订阅器(dep)里面添加自己
    - 自身必须有一个 update()方法
    - 待属性变动 dep.notice()通知时，能调用自身的 updat0 方法，并触发 Compile 中邬定的回调，则功成身退。
4. MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 一＞视图更新；视图交互变化（input）一＞数据 model 变更的双向绑定效果。

![ ](/img/interview/vue2.jpg)

### 6.vue.set 方法如何实现

Vue.set 方法是 vue 中的一个补丁方法（正常我们添加属性是不会触发更新的，我们数组无法监控到索引和长度）
如何实现的 我们给每一个对象都增添了一个 dep 属性 当属性添加或者删除时，手动触发对象本身 dep 来进行更新

### 7.vm.$set()怎么解决对象新增属性不能响应的问题

```js
export function set(target: Array<any> | Object, key: any, val: any): any {
    // target 为数组
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        // 修改数组的长度, 避免索引>数组长度导致splcie()执行有误
        target.length = Math.max(target.length, key)
        // 利用数组的splice变异方法触发响应式
        target.splice(key, 1, val)
        return val
    }
    // key 已经存在，直接修改属性值
    if (key in target && !(key in Object.prototype)) {
        target[key] = val
        return val
    }
    const ob = (target: any).__ob__
    // target 本身就不是响应式数据, 直接赋值
    if (!ob) {
        target[key] = val
        return val
    }
    // 对属性进行响应式处理
    defineReactive(ob.value, key, val)
    ob.dep.notify()
    return val
}
```

- 如果目标是数组，直接使用数组的 splice 方法触发相应式；
- 如果目标是对象，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用 defineReactive 方法进行响应式处理（ defineReactive 方法就是 Vue 在初始化对象时，给对象属性采用 Object.defineProperty 动态添加 getter 和 setter 的功能所调用的方法）

## 三、生命周期

### 1.组件生命周期

| 生命周期      |                                 描述                                  |
| :------------ | :-------------------------------------------------------------------: |
| beforeCreate  |                组件实例被创建之初，组件的属性生效之前                 |
| created       | 组件实例已经完全创建，属性也绑定，但真实 dom 还没有生成，$el 还不可用 |
| beforeMounted |          在挂载开始之前被调用：相关的 render 函数首次被调用           |
| mounted       |       el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子       |
| beforeUpdate  |            组件数据更新之前调用，发生在虚拟 DOM 打补丁之前            |
| updated       |                           组件数据更新之后                            |
| beforeDestroy |                            组件销毁前调用                             |
| destroyed     |                            组件销毁后调用                             |
| activited     |                   keep-alive 专属，组件被激活时调用                   |
| deactivated   |                   keep-alive 专属，组件被销毁时调用                   |

> 一般最多在 mounted 中发送请求（created 不是比 mounted 早吗？ 代码是同步执行的，请求时异步的）

> 内部利用了一个发布订阅模式，将用户写的钩子维护成了一个数组，后续一次调用 callHook

### 2.组件生命顺序

- 加载渲染过程

> 父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

- 子组件更新过程

> 父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated

- 父组件更新过程

> 父 beforeUpdate -> 父 updated

- 销毁过程

> 父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

## 四、组件

### 1.组件间通信方式

#### props / $emit

父组件通过 propsl 向子组件传递数据，子组件通过$emit 和父组件通信

- 父组件向子组件传值
  - props 只能是父组件向子组件进行传值，props 使得父子组件之间形成了一个单向下行绑定。子组件的数据会随着父组件不断更新。
  - props 可以显示定义一个或一个以上的数据，对于接收的数据，可以是各种数据类型，同样也可以传递一个函数。
  - props 属性名规侧：若在 props 中使用驼峰形试，模板中需要使用短横线的形式

```vue
<!-- 父组件 -->
<template>
    <div id="father">
        <son msg="msgData" fn="myFunction"></son>
    </div>
</template>
<script>
import son from "./son.vue";
export default {
    name:father,
    components:{
        son
    }
    data(){
        return {
            msgData:"父组件数据"
        }
    },
    methods:{
        myFunction(){
            console.log(vue )
        },
    }
}
</script>
```

```vue
<!-- 子组件 -->
<template>
    <div id="son">
        <p>{{ msg }}</p>
        <button @click="fn">按钮</button>
    </div>
</template>
<script>
export default {
    name: 'son',
    props: ['msg', 'fn'],
}
</script>
```

- 子组件向父组件传值

$emit 绑定一个自定义事件，当这个事件被执行的时就会将参数传弟给父组件，而父组件通过 v-on 监听并接收参数。

```vue
<!-- 父组件 -->
<template>
    <div class="section">
        <com-article
            articles="articleList ConEmitIndex="
            onEmitIndex
        ></com-article>
        <p>{{ currentIndex }}</p>
    </div>
</template>
<script>
import comArticle from './test/article.vue'
export default {
    name:'comArticle',
    components:{comArticle},
    data() {
        return {
            currentIndex:-1,
            articleList:['红楼梦'，'西游记'，'三国演义']
        }
    },
    methods:{
        onEmitIndex(idx){
            this.currentIndex idx
        }
    }
}
</script>
```

```vue
<!-- 子组件 -->
<template>
    <div>
        <div
            v-for="(item,index)in articles"
            key="index"
            @click="emitIndex(index)"
        >
            {{ item }}
        </div>
    </div>
</template>
<script>
export default {
    props: ['articles'],
    methods: {
        emitIndex(index) {
            this.$emit('onEmitIndex', index) //触发父组件的方法，并传递参数index
        },
    },
}
</script>
```

#### eventBus （$emit / $on）

eventBus 事件总线适用于父子、隔代、兄弟组件通信

- 创建事件中心管理组件之间的通信

```js
//event-bus.js
import Vue from 'vue'
export const EventBus = new Vue()
```

- 发送事件

假设有两个兄弟组件 firstCom 和 secondCom:

```vue
<template>
    <div>
        <first-com></first-com>
        <second-com></second-com>
    </div>
</template>
<script>
import firstCom from './firstCom.vue'
import secondCom from './secondCom.vue'
export default {
    components: { firstCom, secondCom },
}
</script>
```

在 firstCom:组件中发送事件：

```vue
<template>
    <div>
        <button @click="add">加法</button>
    </div>
</template>
<script>
import { EventBus } from './event--bus.js' //引入事件中心
export default {
    data() {
        return {
            num: 0,
        }
    },
    methods: {
        add() {
            EventBus.Semit('addition', { num: this.num++ })
        },
    },
}
</script>
```

- 接收事件

在 secondCom 组件中发送事件：

```vue
<template>
    <div>求和：{{ count }}</div>
</template>
<script>
import EventBus from './event-bus.js'
export default {
    data() {
        return {
            count: 0,
        }
    },
    mounted(){
        EventBus.$on('addition',param => {this.count = this.count param.num;})
    }
}
</script>
```

在上述代码中，这就相当于将 u 值存贮在了事件总线中，在其他组件中可以直接访问。事件总线就相当于一个桥梁，不用组件通过它来通信。

虽然看起来比较简单，但是这种方法也有不变之处，如果项目过大，使用这种方式进行通信，后期维护起来会很困难。

#### 依赖注入(provide / inject)

这种方式就是 u 中的依赖注入，该方法用于父子组件之间的通信。当然这里所说的父子不一定是真正的父子，也可以是祖孙组件，在层数很深的情况下，可以使用这种方法来进行传值。就不用一层一层的传递了。

project/inject 是 Vue 提供的两个钩子，和 data、methods 是同级的。并且 project 的书写形式和 data 一样。

- project 钩子用来发送数据或方法
- inject 钩子用来接收数据或方法

在父组件中：

```vue
provide(){ return { num:this.num } }:
```

在子组件中：

```vue
inject:['num']
```

还可以这样写，这样写就可以访问父组件中的所有属性：

```vue
provide(){ return { app:this } } data() { return() { return { num:1 } } }
inject:['app'] console.log(this.app.num)
```

> 注意：依赖注入所提供的属性是非响应式的。

#### ref / $refs

这种方式也是实现父子组件之间的通信。

ref:这个属性用在子组件上，它的引用就指向了子组件的实例。可以通过实例来访问组件的数据和方法。

在子组件中：

```vue
export default { data() { return { name:JavaScript' } }, methods:{ sayHello(){
console.log('hello') } } }
```

在父组件中：

```vue
<template>
    <child ref="child"></component-a>
</template>
<script>
import child from './child.vue'
export default {
    components:{child },
    mounted() {
        console.log(this.Srefs.child.name);//JavaScript
        this.Srefs.child.sayHello();//hello
    }
}
</script>
```

#### $parent / $children

- 使用$parent 可以上组件访问父组件的实例（访方问的是上一级父组件的属性和方法）
- 使用$children可以让组件访问子组件的实例，但是，$children 并不能保证顺序，并且访问的数据也不是响应式的。

在子组件中：

```vue
<template>
    <div>
        <span>{(message}}</span>
        <p>获取父组件的值为：{{ parentVal }}</p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            message: 'Vue',
            computed: {
                parentVal() {
                    return this.$parent.num
                },
            },
        }
    },
}
</script>
```

父组件中

```vue
<template>
    <div class="hello_world">
        <div>{(msg}}</div>
        <child></child>
        <button@click="change">点击改变子组件值</button>
    </div>
</template>
<script>
import child from'./child.vue'
export default {
    components:{child },
    data() {
        return {
            msg:'Welcome'
        }
    },
    methods:{
        change(){
        //获取到子组件
            this.$children[0].message ='JavaScript'
        }
    }
}
</script>
```

需要注意：

- 通过$parenti访问到的是上一级父组件的实例，可以使用$root 来访问根组件的实例
- 在组件中使用$children?拿到的是所有的子组件的实例，它是一个数组，并且是无序的
- 在根组件#app 上拿$parent得到的是new Vue()的实例，在这实例上再拿$parent 得到的是 undefined,而在最底层的子组件拿$children 是个空数组
- $children的值是数组，而$parent 是个对象

#### $attrs / $listeners

考虑一种场景，如果 A 是 B 组件的父组件，B 是 C 组件的父组件。如果想要组件 A 给组件 C 传递数据这种隔代的数据，该使用哪种方式呢？

如果是用 props/$emit 来一级一级的传递，确实可以完成，但是比较复杂；如果使用事件总线，在多人开发或者项目较大的时候，维护起来很麻烦；如果使用 ux,的确也可以，但是如果仅仅是传递数据，那可能就有点浪费了。

针对上述情况，Vue 引入了$attrs/$slisteners,实现组件之间的跨代通信。

先来看一下 inheritAttrs,它的默认值 true,继所有的父组件属性除 props 之外的所有属性；inheritAttrs:false 只继 class,属性。

- `$attrs:`继承所有的父组件属性（除了 prop 传递的属性、class 和 style）,一般用在子组件的子元素上
- `$listeners:`该属性是一个对象，里面包含了作用在这个组件上的所有监听器，可以配合 v-on="$listeners"将所有的事件监听器指向这个组件的某个特定的子元素。（相当于子组件继承父组件的事件）

A 组件(APP.vue)

```vue
<template>
    <div id="app">
        <!-- 此处监听了两个事件，可以在B组件或者C组件中直接触发 -->
        <child1 :p-child1="childl" :p-child2="child2" @test1="onTest1" @test2="onTest2"></child1>
    </div>
</div>
</template>
<script>
import Childl from './Childl.vue';
export default {
    components:{Childl },
    methods:{
        onTest1(){
            console.log('test1 running');
        },
        onTest2(){
            console.log('test2 running');
        }
    }
}
</script>
```

B 组件(Child1.vue):

```vue
<template>
    <div class="child-1">
        <p>props:{(pChild1}}</p>
        <p>Sattrs:{{ Sattrs }}</p>
        <child2 v-bind="Sattrs" v-on="$listeners"></child2>
    </div>
</template>
<script>
import Child2 from './Child2.vue';
export default {
    props:['pChildl'],
    components:{Child2 }
    inheritAttrs:false,
    mounted(){
        this.$emit('test1');/角触发APP.vue中的testl方法
    }
};
</script>
```

C 组件(Child2.vue):

```vue
<template>
    <div class="child-2">
        <p>props:({pChild2}}</p>
        <p>Sattrs:{(Sattrs}}</p>
    </div>
</template>
<script>
export default {
    props:['pChild2'],
    inheritAttrs:false,
    mounted(){
        this.$emit('test2');/触发APP.vue中的test2方法
    }
}
</script>
```

在上述代码中：

- C 组件中能直接触发 test 的原因在于 B 组件调用 c 组件时使用 v-on 绑定了$slisteners 属性
- 在 B 组件中通过 v-bind 绑定$attrs 属性，C 组件可以直接获取到 A 组件中传递下来的 props(除了 B 组件中 props 声明的)

#### Vuex 适用于 父子、隔代、兄弟组件通信

#### 总结

- 父子组件间通信
  - 子组件通过 pops 属性来接受父组件的数据，然后父组件在子组件上注册监听事件，子组件通过 emit 触发事件来向父组件发送数据。
  - 通过 ref 属性给子组件设置一个名字。父组件通过$rfs组件名来获得子组件，子组件通过$parent 获得父组件，这样也可以实现通信。
  - 使用 provide/inject,在父组件中通过 provide 提供变量，在子组件中通过 inject 来将变量注入到组件中。不论子组件有多深，只要调用了 inject 那么就可以注入 provide 中的数据。
- 兄弟组件间通信
  - 使用 eventBus 的方法，它的本质是通过创建一个空的 ue 实例来作为消息传递的对象，通信的组件引入这个实例，通信的组件通过在这个实例上监听和触发事件，来实现消息的传递。
  - 通过 parent/refs 来获取到兄弟组件，也可以进行通信。
- 任意组件之间
  - 使用 eventBus,其实就是创建一个事件中心，相当于中转站，可以用它来传递事件和接收事件。

如果业务逻辑复杂，很多组件之间需要同时处理一些公共的数据，这个时候采用上面这一些方法可能不利于项目的维护。这个时候可以使用 vuex,Vuex 的思想就是将这一些公共的数据抽离出来，将它作为一个全局的变量来管理，然后其他组件就可以对这个公共数据进行读写操作，这样达到了解耦的目的。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf775050e1f948bfa52f3c79b3a3e538~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

### 2.v-model 的原理

我们在 vue 项目中主要使用 v-model 指令在表单 input、textarea、select 等元素上创建双向数据绑定，我们知道 v-model 本质上不过是语法糖，v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：

- text 和 textarea 元素使用 value 属性和 input 事件；
- checkbox 和 radio 使用 checked 属性和 change 事件；
- select 字段将 value 作为 prop 并将 change 作为事件。

以 input 表单元素为例：

```html
<input v-model="something" />
<!-- 相当于 -->
<input v-bind:value="something" v-on:input="something = $event.target.value" />
```

如果在自定义组件中，v-model 默认会利用名为 value 的 prop 和名为 input 的事件，如下所示：

```js
//父组件
<aa-input v-model="aa"></aa-input>
//等价于
<aa-input v-bind:value="aa" v-on:input="aa=$event.target.value" ></aa-input>

//子组件
<input v-bind:value="aa" v-on:input="onmessage"></input>

props:{value:aa},
methods:{
    onmessage(e){
        emit ('input',e.target.value)
    }
}
```

### 3.怎样理解 Vue 的单向数据流

所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。额外的，每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。子组件想修改时，只能通过 $emit 派发一个自定义事件，父组件接收到后，由父组件修改。

- 这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。

在这种情况下，最好定义一个本地的 data 属性并将这个 prop 用作其初始值：

```js
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
```

- 这个 prop 以一种原始的值传入且需要进行转换。

在这种情况下，最好使用这个 prop 的值来定义一个计算属性

```js
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```

### 4.slot 是什么？有什么作用？原理是什么？

slot 又名插槽，是 vue 的内容分发机制，组件内部的模板引擎使用 slot 元素作为承载分发内容的出口。插槽 slot 是子组件的一个模板标签元素，而这一个标签元素是否显示，以及怎么显示是由父组件决定的。slot 又分三类，默认插槽，具名插槽和作用域插槽。

- 默认插槽：又名匿名插槽，当 slot 没有指定 name 属性值的时候一个默认显示插槽，一个组件内只有有一个匿名插槽。
- 具名插槽：带有具体名字的插槽，也就是带有 name 属性的 slot，一个组件可以出现多个具名插槽。
- 作用域插槽：默认插槽、具名插槽的一个变体，可以是匿名插槽，也可以是具名插槽，该插槽的的不同点是在子组件渲染作用域插槽时，可以将子组件内部的数据传递给父组件，让父组件根据子组件的传递过来的数据决定如何渲染该插槽。

实现原理：当子组件 vm 实例化时，获取到父组件传入的 slot 标签的内容，存放在 vm.sslot 中，默认插槽为 vm.$slot.default，具名插槽为vm.$slot.xxx.xxx 为插槽名，当组件执行渲染函数时候，遇到 slot 标签，使用$slot 中的内容进行替换，此时可以为插槽传递数据，若存在数据，则可称该插槽为作用域插槽。

### 5.组件化的理解

组件的优点：组件复用可以根据数据渲染对应的组件，把组件相关的内容放在一起（方便复用）合理规划组件，可以做到更新的时候是组件级更新 （组件话中的特性 属性 事件 插槽）

> vue 中怎样的处理组件 1）Vue.extend 根据用户传入的对象生成一个组件的构造函数 2）根据组件产生对应的虚拟节点 3）组件初始化，将虚拟节点转化为真实节点 new Sub().$mount()

### 6.组件更新流程

组件更新会触发组件的 prepatch 方法，会复用组件，并且比较组件的 属性 事件 插槽 -父组件给子组件传递的值是响应式的，在模板中使用会做依赖收集 收集自己的组件 watcher

### 7.异步组件原理

Vue 异步组件的写法有很多，主要用作大的组件可以异步加载的 就是先渲染一个注释标签，等组件加载完毕，最后在重新渲染 forceUpdate(图片懒加载) 使用异步组件会配合 webpack

### 8.函数式组件的优势及原理

React 中也区分两种组件 一种叫类组件，一种叫函数式组件（Sub 就是类组件 有 this） （函数式组件 没有类就没有 this,也没有所谓的状态，没有生命周期，好处就是性能好，不需要创建 watcher 了）

### 9.如何扩展一个组件

常见的组件扩展方法有：mixins，slots，extends 等

混入 mixins 是分发 Vue 组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。

```js
// 复用代码：它是一个配置对象，选项和组件里面一样
const mymixin = {
    methods: {
        dosomething() {},
    },
}
// 全局混入：将混入对象传入
Vue.mixin(mymixin)

// 局部混入：做数组项设置到mixins选项，仅作用于当前组件
const Comp = {
    mixins: [mymixin],
}
```

插槽主要用于 vue 组件中的内容分发，也可以用于组件扩展。

```html
<!-- Child -->
<div>
    <slot>这个内容会被父组件传递的内容替换</slot>
</div>
<!-- parent -->
<div>
    <Child>来自老爹的内容</Child>
</div>
```

组件选项中还有一个不太常用的选项 extends，也可以起到扩展组件的目的

```js
// 扩展对象
const myextends = {
    methods: {
        dosomething() {},
    },
}
// 组件扩展：做数组项设置到extends选项，仅作用于当前组件
// 跟混入的不同是它只能扩展单个对象
// 另外如果和混入发生冲突，该选项优先级较高，优先起作用
const Comp = {
    extends: myextends,
}
```

### 10.mixin 和mixins 区别

mixin 用于全局混入，会影响到每个组件实例，通常插件都是这样做初始化的。

虽然文档不建议在应用中直接使用 mixin，但是如果不滥用的话也是很有帮助的，比如可以全局混入封装好的ajiax 或者一些工具函数等等。

mixins 应该是最常使用的扩展组件的方式了。如果多个组件中有相同的业务逻辑，就可以将这些逻辑剥离出来，通过 mixins 混入代码，比如上拉下拉加载数据这种逻辑等等。

另外需要注意的是mixins 混入的钩子函数会先于组件内的钩子函数执行，并且在遇到同名选项的时候也会有选择性的进行合并。

### 11.组件中写 name 选项有什么好处及作用

- 可以通过名字找到对应的组件（递归组件）
- 可以通过 name 属性来实现缓存功能（keep-alive）
- 可以通过 name 来识别组件

## 五、路由

### 1.vue-Router 的懒加载如何实现

- 非懒加载：

```js
import List from '@/components/list.vue'
const router = new VueRouter({
    routes: [{ path: '/list', component: List }],
})
```

- 方案一（常用）：使用箭头函数+import 动态加载

```js
const List ()=>import('@/components/list.vue')
const router = new VueRouter({
    routes:[
        {path:'/list',component:List}
    ]
})
```

- 方案二：使用箭头函数+require 动态加载

```js
const router = new Router({
    routes: [
        {
            path: '/list',
            component: (resolve = require(['@/components/list'], resolve)),
        },
    ],
})
```

- 方案三：使用 webpack 的 require.ensure 技术，也可以实现按需加载。这种情况下，多个路由指定相同的 chunkName,会合并打包成一个 js 文件。

```js
//r就是resolve
const List = (r) =>
    require.ensure([], () => r(require('@/components/list')), 'list')
//路由也是正常的写法 这种是官方推荐的写的按模块划分懒加载
const router = new Router({
    routes: [
        {
            path: '/list',
            component: List,
            name: 'list',
        },
    ],
})
```

### 2.vue-router 路由模式

> vue-router 有 3 种路由模式：hash、history、abstract

- hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器；
- history : 依赖 HTML5 History API 和服务器配置。具体可以查看 HTML5 History 模式；

### 3.路由的hash和historyi模式的区别

#### hash模式

- 简介：
  hash模式是开发中默认的模式，它的URL带着一个#，例如：http:www.abc.com#Vue,它的hash值就是#Vue。

- 特点：
  hash值会出现在URL里面，但是不会出现在HTTP请求中，对后端完全没有影响。所以改变hash值，不会重新加载页面。这种模式的浏览器支持度很好，低版本的E浏览器也支持这种模式。hash路由被称为是前端路由，已经成为SPA(单页面应用)的标配.

- 原理：
  hash模式的主要原理就是onhashchange()事件：

```js
window.onhashchange function(event){
    console.log(event.oldURL,event.newURL);
    let hash = location.hash.slice(1);
}
```

使用onhashchange()事件的好处就是，在页面的hash值发生变化时，无需向后端发起请求，window就可以监听事件的改变，并按规则加载相应的代码。除此之外，hash值变化对应的URL都会被浏览器记录下来，这样浏览器就能实现页面的前进和后退。虽然是没有请求后端服务器，但是页面的hash值和对应的URL关联起来了。

#### history模式

- 简介：
  history模式的URL中没有#，它使用的是传统的路由分发模式，即用户在输入一个URL时，服务器会接收这个请求，并解析这个URL,然后做出相应的逻辑处理。

- 特点：
  当使用history模式时，URL就像这样：htp:labc.com/user/id。相比hash模式更加好看。但是，history模式需要后台配置支持。如果后台没有正确配置，访问时会返回404。

- API:
  history api问可以分为两大部分，切换历史状态和修改历史状态：
  - 修改历史状态：包括了HTML5 History Interface中新增的pushState()和replaceState()方法，这两个方法应用于浏览器的历史记录栈，提供了对历史记录进行修改的功能。只是当他们进行修改时，虽然修改了u川，但浏览器不会立即向后端发送请求。如果要做到改变u但又不刷新页面的效果，就需要前端用上这两个API。
  - 切换历史状态：包括forward()、back()、go(O三个方法，对应浏览器的前进，后退，跳转操作。

虽然hisoy模式丢弃了丑陋的#。但是，它也有自己的缺点，就是在刷新页面的时候，如果没有相应的路由或资源，就会刷出404来。

如果想要切换到history模式，就要进行以下配置（后端也要进行配置）：

```js
const router new VueRouter({
    mode:'history',
    routes:[...]
})
```

### 4.两种模式对比

调用history..oushState()相l比于直接修改hash,存在以下优势：

- pushState()设置的新URL可以是与当前URL同源的任意URL;而hash只可修改#后面的部分，因此只能设置与当前URL同文档的URL;
- pushState()设置的新URL可以与当前URL一模一样，这样也会把记录添加到栈中；而hash设置的新值必须与原来不一样才会触发动作将记录添加到栈中；
- pushState()通过stateObject参数可以添加任意类型的数据到记录中；而hash只可添加短字符串；
- pushState()可额外设置title属性供后续使用。
- hash模式下，仅hash符号之前的url会被包含在请求中，后端如果没有做到对路由的全覆盖，也不会返回404错误；history模式下，前端的url必须和实际向后端发起请求的u一致，如果没有对用的路由处理，将返回404错误。

### 5.如何获取页面的hash变化

- 监听$route的变化

```js
//监听，当路由发生变化的时候执行
watch: {
    $route:{
        handler:function (val,oldVal){
            console.log(val);
        },
        // 深度观察监听
        deep:true
    }
}
```

- window.location.hash读取#值

window.location.hash的值可读可写，读取来判断状态是否改变，写入时可以在不重载网页的前提下，添加条历史访问记录。

### 6.route和router的区别

- route是“路由信息对象”，包括path,params,hash,query,.fullPath,matched,.name等路由信息参数
- router是“路由实例对象包括了路由的跳转方法，钩子函数等。

### 7.Vue-router 有几种钩子函数？具体是什么及执行流程是怎样的？

- 全局路由钩子
  - router.beforeEach全局前置守卫进入路由之前
  - router.beforeResolve全局解析守卫(2.5.0+)在beforeRouteEnter调用之后调用
  - router.afterEach全局后置钩子进入路由之后
- 单个路由独享钩子
  - beforeEnter 如果不想全局配置守卫的话，可以为某些路由单独配置守卫，有三个参数：to、from、next
- 组件内钩子
这三个钩子都有三个参数：to、from、next
  - beforeRouteEnter:进入组件前触发
  - beforeRouteUpdate:当前地址改变并且改组件被复用时触发，举例来说，带有动态参数的路径foo/:id,在foo/1和foo/2之间跳转的时候，由于会渲染同样的foa组件，这个钩子在这种情况下就会被调用
  - beforeRouteLeave:离开组件被调用

注意点，beforeRouteEnter组件内还问不到this,因为该守卫执行前组件实例还没有被创建，需要传一个回调给next来访问，例如：

```js
beforeRouteEnter(to,from,next){
    next(target => {
        if (from.path =='/classProcess'){
            target.isFromProcess true
        }
    })
}
```

- 完整导航流程

1. 导航被触发
2. 在失活的组件里调用 beforeRouteLeave 守卫
3. 调用全局的 beforeEach 守卫
4. 在重用的组件里调用 beforeRouteUpdate 守卫
5. 在路由配置里调用 beforeEnter
6. 解析异步路由组件
7. 在激活的组件里调用 beforeRouteEnter
8. 调用全局的 beforeResolve 守卫
9. 导航被确认
10. 调用全局后置钩子的 afterEach 钩子
11. 触发DOM更新
12. 执行beforeRouterEnter守卫中传给next的回调函数

- 触发钩子的完整顺序

路由导航、keep-alive、和组件生命周期钩子结合起来的，触发顺序，假设是从a组件离开，第一次进入b组件：

1. beforeRouteLeave:路由组件的组件离开路由前钩子，可取消路由离开。
2. beforeEach:路由全局前置守卫，可用于登录验证、全局路由loading等。
3. beforeEnter:路由独享守卫
4. beforeRouteEnter::路由组件的组件进入路由前钩子。
5. beforeResolve:路由全局解析守卫
6. afterEach:路由全局后置钩子
7. beforeCreate:组件生命周期，不能访问tAis。
8. created;组件生命周期，可以访问tAis,不能访问dom.
9. beforeMount:组件生命周期
10. deactivated:离开缓存组件a,或者触发a的beforeDestroy和destroyed组件销毁钩子。
11. mounted:访问/操作dom.
12. activated:进入缓存组件，进入a的嵌套子组件（如果有的话）。
13. 执行beforeRouteEnter回调函数neXt.

### 8.vue 路由传参

- params 传参

```js
this.$router.push({ name: 'index', params: { id: item.id } })

this.$route.params.id
```

- 路由属性传参

```js
this.$router.push({ name: '/index/${item.id}' })

// 路由配置 {path:'/index:id'}
```

- query 传参

可以解决页面刷新参数丢失的问题

```js
this.$router.push({
    name: 'index',
    query: {
        id: item.id,
    },
})
```

### 9.params和query的区别

- 用法：query要用path来引入，params要用name来引入，接收参数都是类似的，分别是`this.$route.query.name` `this.$route.params.name`
- url地址显示：query更加类似于ajax中get传参，params则类似于post,说的再简单一点，前者在浏览器地址栏中显示参数，后者则不显示

注意：query刷新不会丢失query!里面的数据params刷新会丢失params.里面的数据。

### 10.对前端路由的理解

在前端技术早期，一个u川对应一个页面，如果要从A页面切换到B页面，那么必然伴随着页面的刷新。这个体验并不好，不过在最初也是无奈之举一用户只有在刷新页面的情况下，才可以重新去请求数据。

后来，改变发生了一Ajax出现了，它允许人们在不刷新页面的情况下发起请求；与之共生的，还有“不刷新页面即可更新页面内容”这种需求。在这样的背景下，出现了SPA(单页面应用)。

SPA极大地提升了用户体验，它允许页面在不刷新的情况下更新页面内容，使内容的切换更加流畅。但是在SPA诞生之初，人们并没有考虑到“定位”这个问题一在内容切换前后，页面的URL都是一样的，这就带来了两个问题：

- SPA其实并不知道当前的页面“进展到了哪步”。可能在一个站点下经过了反复的“前进”才终于唤出了某一块内容，但是此时只要刷新一下页面，一切就会被清零，必须重复之前的操作、才可以重新对内容进行定位一SPA并不会“记住”你的操作。
- 由于有且仅有一个URL给页面做映射，这对SE0也不够友好，搜索引擎无法收集全面的信息

为了解决这个问题，前端路由出现了。

前端路由可以帮助我们在仅有一个页面的情况下，“记住”用户当前走到了哪一步一为SPA中的各个视图匹配一个唯一标识。这意味着用户前进、后退触发的新内容，都会映射到不同的URL上去。此时即便他刷新页面，因为当前的URL可以标识出他所处的位置，因此内容也不会丢失。那么如何实现这个目的呢？首先要解决两个问题：

- 当用户刷新页面时，浏览器会默认根据当前URL对资源进行重新定位（发送请求）。这个动作对SPA是不必要的，因为我们的SPA作为单页面，无论如何也只会有一个资源与之对应。此时若走正常的请求刷新流程，反而会使用户的前进后退操作无法被记录。
- 单页面应用对服务端来说，就是一个UL、一套资源，那么如何做到用“不同的URL”来映射不同的视图内容呢？

从这两个问题来看，服务端已经完全敕不了这个场景了。所以要靠咱们前端自力更生，不然怎么叫“前端路由”呢？作为前端，可以提供这样的解决思路：

- 拦截用户的刷新操作，避免服务端盲目响应、返回不符合预期的资源内容。把刷新这个动作完全放到前端瑞逻辑里消化掉。
- 感知URL的变化。这里不是说要改造URL、凭空制造出N个URL来。而是说URL还是那个URL,只不过我们可以给它做一些微小的处理一这些处理并不会影响URL本身的性质，不会影响服务器对它的识别，只有我们前端感知的到。一旦我们感知到了，我们就根据这些变化、用JS去给它生成不同的内容。

## 六、vuex

### 1.vuex 的原理

vuex 是一个专为 yuejs 应用程序开发的状态管理模式。每一个 vuex 应用的核心就是 store（仓库）。“store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state)。

- vuex 的状态存储是响应式的。当 vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
- 改变 store 中的状态的唯一途径就是品式地提交 (commit) mutation。这样可以方便地跟踪每一个状态的变化。
![ ](/img/interview/vuex.jpg)

### 2.核心流程中的主要功能

- vue Components 是vue 组件，组件会触发 (dispatch）一些事件或动作，也就是图中的Actions;
- 在组件中发出的动作，肯定是想获取或者改变数据的，但是在 vuex 中，数据是集中管理的，不能直接去更改数据，所以会把这个动作提交 （Commit）到 Mutations 中；
- 然后 Mutations 就去改变 (Mutate） State 中的数据;
- 当 State 中的数据被改变之后，就会重新渲染(Render）到 Vue Components 中去，组件展示更新后的数据，完成一个流程。

### 3.各模块在核心流程中的主要功能

- vue Components ： vue组件。HTML页面上，负责接收用户操作等交互行为，执行dispatch方法触发对应action进行回应。
- dispatch：操作行为触发方法，是唯一能执行action的方法。
- actions：操作行为处理模块。负责处理vue Components接收到的所有交互行为。包含同步/异步操作，支持多个同名方法，按照注册的顺序依次触发。向后台AP请求的操作就在这个模块中进行，包括触发其他action以及提交mutation的操作。该模块提供了Promise的封装，以支持action的链式触发。
- commit：状态改变提交操作方法。对mutation进行提交，是唯一能执行mutation的方法。
- mutations：状态改变操作方法。是Vuex修改state的唯一推荐方法，其他修改方式在严格模式下将会报错。该方法只能进行同步操作，且方法名只能全局唯一。操作之中会有一些hook暴露出来，以进行state的监控等。
- state：页面状态管理容器对象。集中存储Vuecomponents中 data对象的零散数据，全局唯一，以进行统一的状态管理。页面显示所需的数据人该对象中进行读取，利用vue的细粒度数据响应机制来进行高效的状态更新。
- getters：state对象读取方法。图中没有单独列出该模块，应该被包含在了render中，vueComponents通过该方法读取全局state对象。

### 4.vuex中action和mutation的区別

mutation中的操作是一系列的同步函数，用于修改state中的变量的状态。当使用vuex时需要通过commit来提交需要操作的内容。mutation 非常类似于事件：每个mutation 都有一个字符串的事件类型(type)和一个回调函数（handler)。这个回调区数就是实际进行状态更改的地方，并且它会接受 state 作力第一个参数：

```js
const store = new Vuex.Store({
    state: {
        count: 1
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
})
```

当触发一个类型为 increment 的mutation 时，需要调用此函数：

```js
store.commit ('increment')
```

而Action类似于mutation，不同点在于：

- Action 可以包含任意异步操作。
- Action 提交的是 mutation， 而不是直接变更状态。

```js
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
        state.count++
    },
    actions: {
        increment (context){
            context.commit ('increment" )
        }
    }
})
```

Action 函数接受一个与 store 安例具有相同方法和属性的 context 対象，因此你可以凋用context.commit 提交一个mutation，或者通过 context.state 和 context.getters 来获取state和 getters。

所以，两者的不同点如下：

- Mutation专注于修改State，理论上是修改State的唯一途径；Action业务代码、异步请求。
- Mutation：必须同步执行；Action：可以异步，但不能直接操作State。
- 在视图更新时，先触发actions, actions再触发mutation
- mutation的参数是state，它包含store中的数据;store的参数是context，它是state 的父级，包含 state、getters

### 5.Vuex 和localStorage 的区别

- 最重要的区别
  - vex存储在内存中
  - localstorage 则以文件的方式存储在本地，只能存储宇符串类型的数据，存储对象需要 JSON的stringify和parse方法进行处理。读取内存比读取硬盘速度要快
- 应用场景
  - vuex 是一个专为 vuejs应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。vex用于组件之间的传值。
  - localstorage是本地存储，是将数据存储到浏览器的方法，一般是在跨页面传递数据时使用。
  - vuex能做到数据的响应式，localstorage不能
- 永久性
  - 刷新页面时vuex存储的值会丟失，1ocalstorage不会。

注意：对于不变的数据确实可以用localstorage可以代替vuex，但是当两个组件共用一个数据源(对象或数组）时，如果其中一个组件改变了该数据源，希望另一个组件响应该变化时，localstorage无法做到，原因就是区别。

### 6.Redux 和 vuex 有什么区别，它们的共同思想

- Redux 和 Vuex区别
  - vuex改进了Redux中的Action和Reducer函数，以mutations变化函数取代Reducer，无需switch，只需在对应的mutation函数里改变state值即可
  - vuex由于vue自动重新渲染的特性，无需订阅重新渲染函数，只要生成新的State即可
  - vuex数据流的顺序是：View调用store.commit提交对应的请求到Store中对应的mutation函数->store改变 (vue检测到数据变化自动渲染）

通俗点理解就是，vuex弱化 dispatch，通过commit进行 store状态的一次更变;取消了action概念，不必传入特定的action形式进行指定变更;弱化reducer，基于commit参数直接对数据进行转变，使得框架更加简易;

- 共同思想
  - 单一的数据源
  - 变化可以预测

本质上：redux与vuex都是对mwm思想的服务，将数据人视图中抽离的一种方案;
形式上：vuex借鉴了redux，将store作为全局的数据中心，进行mode管理;

### 7.为什么要用 Vuex 或者 Redux

由于传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。我们经常会采用父子组件直接引1用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致代码无法维护。

所以需要把组件的共享状态抽取出来，以一个全局单例模式管理。在这种模式下，组件树构成了一个巨大的"视图"，不管在树的哪个位置，任何组件都能获取状态或者触发行为。

另外，通过定义和隔离状态管理中的各种概念并强制遵守一定的规则，代码将会变得更结构化且易维护。

### 8.Vuex有哪几种属性？

有五种，分别是 State、Getter、Mutation 、Action、 Module

- state =＞ 基本数据(数据源存放地)
- getters =＞ 从基本数据派生出来的数据
- mutations=＞ 提交更改数据的方法，同步
- actions=＞像一个装饰器，包裹mutations， 使之可以异步。
- modules =＞模块化Vuex

### 9.Vuex和单纯的全局对象有什么区别？

- vuex 的状态存储是响应式的。当 vue 组件从store 中读取状态的时候，若 store 中的狀态发生变化，那么相应的组件也会相应地得到高效更新。
- 不能直接改变 store 中的状态。改变store 中的状态的唯一途径就是显式地提交 (commit)mutation。这样可以方便地跟踪每一个状态的变化，从而能够实现一些工具帮助更好地了解我们的应用。

### 10.为什么Vuex 的mutation 中不能做异步操作？

- vuex中所有的状态更新的唯一途径都是mutation，异步操作通过 Action 来提交 mutation实现，这样可以方便地跟踪每一个状态的变化，从而能够实现一些工具帮助更好地了解我们的应用。
- 每个mutation执行完成后都会对应到一个新的状态变更，这样devtools就可以打个快照存下来，然后就可以实现 time-travel 了。如果mutation支持异步操作，就没有办法知道状态是何时更新的，无法很好的进行状态的追踪，给调试带来困难。

### 11.如何在组件中批量使用Vuex的getter厲性

使用mapGetters辅助函数，利用对象展开运算符将getter混入computed 对象中

```js
import {mapGetters} from 'vuex'
export default{
    computed: {
        ...mapGetters (['total', 'discountTotal'])
    }
}
```

### 12.如何在组件中重复使用Vuex的mutation

使用mapMutations辅助函数，在组件中这么使用

```js
import { mapMutations } from 'vuex'
methods: {
    ...mapMutations ( {
        setNumber: 'SET NUMBER'
    })
}
```

然后调用this.setNumber(10)相当调用this.$store.commit('SET_NUMBER',10)

### 13.修饰符有哪些？

- 事件修饰符

  - .stop 阻止冒泡
  - .prevet 阻止默认行为
  - .capture 内部元素触发的事件先在次处理
  - .self 只有在 event.target 是当前元素时触发
  - .once 事件只会触发一次
  - .passive 立即触发默认行为
  - .native 把当前元素作为原生标签看待

- 按键修饰符

  - .keyup 键盘抬起
  - .keydown 键盘按下

- 系统修饰符

  - .ctrl
  - .alt
  - .meta

- 鼠标修饰符

  - .left 鼠标左键
  - .right 鼠标右键
  - .middle 鼠标中键

- 表单修饰符
  - .lazy 等输入完之后再显示
  - .trim 删除内容前后的空格
  - .number 输入数字或转为数字

## 七、Vue3.0

### 1.vue3.0有什么更新

- 监测机制的改变
  - 3.0 将带来基于代理 Proxy的 observer 实现，提供全语言覆盖的反应性跟踪。
  - 消除了 vue 2 当中基于 Object.defineProperty 的实现所存在的很多限制：
- 只能监测属性，不能监测对象
  - 检测属性的添加和删除;
  - 检测数组素引和长度的变更；
  - 支持 Map、Set、 WeakMap 和 Weak Set.
- 模板
  - 作用域插槽，2.× 的机制导致作用域插槽变了，父组件会重新渲染，而 3.0 把作用域插槽改成了西数的方式，这样只会影响子组件的重新渲染，提升了渲染的性能。
  - 同时，对于 render 函数的方 面，vue3.0 也会进行一系列更改来方便习惯直接使用api 来生成
vdom •
- 对象式的组件声明方式
  - vue2.x 中的组件是通过声明的方式传入一系列 option，和 TypeScript 的结合需要通过一些装饰器的方式来做，虽然能实现功能，但是比较麻烦。
  - 3.0 修改了组件的声明方式，改成了类式的写法，这样使得和 TypeScript 的结合变得很容易
- 其它方面的更改
  - 支持自定义渲染器，从而使得 weex 可以通过自定义渲染器的方式来扩展，而不是直接 fork 源码来改的方式。
  - 支持 Fragment （多个根节点）和Protal (在dom 其他部分渲染组建内容）组件，针对一些特殊的场景做了处理。
  - 基于 tree shaking 优化，提供了更多的内置功能。

### 2.defineProperty和proxy的区别

Vue 在实例初始化时遍历 data 中的所有属性，并使用 Object.defineProperty 把这些属性全部转为 getter/setter。这样当追踪数据发生变化时，setter 会被自动调用。

Object.defineProperty 是 ES5 中一个无法 shim 的特性，这也就是 Vue 不支持 IE8 以及更低版本浏览器的原因。

但是这样做有以下问题：

1. 添加或删除对象的属性时，Vue 检测不到。因为添加或删除的对象没有在初始化进行响应式处理，只能通过$set 来调用Object.defineProperty()处理。
2. 无法监控到数组下标和长度的变化。

Vue3 使用 Proxy 来监控数据的变化。Proxy 是 ES6 中提供的功能，其作用为：用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）。相对于Object.defineProperty()，其有以下特点：

1. Proxy 直接代理整个对象而非对象属性，这样只需做一层代理就可以监听同级结构下的所有属性变化，包括新增属性和删除属性。
2. Proxy 可以监听数组的变化。

### 3.Vue3.0 为什么要用 proxy？

在 Vue2 中， 0bject.defineProperty 会改变原始数据，而 Proxy 是创建对象的虚拟表示，并提供 set 、get 和 deleteProperty 等处理器，这些处理器可在访问或修改原始对象上的属性时进行拦截，有以下特点∶

- 不需用使用 Vue.$set 或 Vue.$delete 触发响应式。
- 全方位的数组变化检测，消除了Vue2 无效的边界情况。
- 支持 Map，Set，WeakMap 和 WeakSet。

Proxy 实现的响应式原理与 Vue2的实现原理相同，实现方式大同小异∶

- get 收集依赖
- Set、delete 等触发依赖
- 对于集合类型，就是对集合对象的方法做一层包装：原方法执行后执行依赖相关的收集或触发逻辑。

### 4.Composition API与React Hook很像，区别是什么

从React Hook的实现角度看，React Hook是根据useState调用的顺序来确定下一次重渲染时的state是来源于哪个useState，所以出现了以下限制

- 不能在循环、条件、嵌套函数中调用Hook
- 必须确保总是在你的React函数的顶层调用Hook
- useEffect、useMemo等函数必须手动确定依赖关系

而Composition API是基于Vue的响应式系统实现的，与React Hook的相比

- 声明在setup函数内，一次组件实例化只调用一次setup，而React Hook每次重渲染都需要调用Hook，使得React的GC比Vue更有压力，性能也相对于Vue来说也较慢
- Compositon API的调用不需要顾虑调用顺序，也可以在循环、条件、嵌套函数中使用
- 响应式系统自动实现了依赖收集，进而组件的部分的性能优化由Vue内部自己完成，而React Hook需要手动传入依赖，而且必须必须保证依赖的顺序，让useEffect、useMemo等函数正确的捕获依赖变量，否则会由于依赖不正确使得组件性能下降。

虽然Compositon API看起来比React Hook好用，但是其设计思想也是借鉴React Hook的。

### 5.vue2 和 vue3 的区别

#### 基本回答点

- 1、用组合式 api 替换选项式 api，方便逻辑更加的聚合

#### 一些细节改变

- 1、因为改成组合式 api 所以没有 this
- 2、生命周期没有 creat，setup 等同于 create，卸载改成 unmount
- 3、vue3 中 v-if 高于 v-for 的优先级
- 4、根实例的创建从 new app 变成了 createApp 方法
- 5、一些全局注册，比如 mixin，注册全局组件，use 改成了用 app 实例调用，而不是 vue 类调用
- 6、新增了传送门 teleport 组件
- 7、template 模板可以不包在一个根 div 里

#### 原理方面

- 1、响应式原理改成了用 proxy，解决了数组无法通过下标修改，无法监听到对象属性的新增和删除的问题。也提升了响应式的效率
- 2、可以额外叙述 vue3 并不是完全抛弃了 defineProperty,通过 reactive 定义的响应式数据使用 oroxy 包装出来，而 ref 还是用的 defineProperty 去给一个空对象，定义了一个 value 属性来做的响应式
- 3、组合式 api 的写法下，源码改成了函数式编程，方便按需引入，因为 tree-shaking.功能必须配合按需引入写法。所以 vue3 更好地配合 tree-shaking 能让打包体积更小
- 4、性能优化，增加了静态节点标记。会标记静态节点，不对静态节点进行
    比对。从而增加效率。
- 5、此外大家可以叙述具体标记策略，从而提升自己的印象

#### 进阶回答点

- 1、vue3 不推荐使用 mixin 进行复用逻辑提取，而是推荐写成 hook
- 2、v-model 应用于组件时，监听的事件和传递的值改变
- 3、ts 更好地配合

## 八、虚拟DOM

### 1.对虚拟DOM的理解？

从本质上来说，Virtual Dom是一个JavaScript对象，通过对象的方式来表示DOM结构。将页面的状态抽象为JS对象的形式，配合不同的渲染工具，使跨平台渲染成为可能。通过事务处理机制，将多次DOM修改的结果一次性的更新到页面上，从而有效的减少页面渲染的次数，减少修改DOM的重绘重排次数，提高渲染性能。

虚拟DOM是对DOM的抽象，这个对象是更加轻量级的对 DOM的描述。它设计的最初目的，就是更好的跨平台，比如Node.js就没有DOM，如果想实现SSR，那么一个方式就是借助虚拟DOM，因为虚拟DOM本身是js对象。 在代码渲染到页面之前，vue会把代码转换成一个对象（虚拟 DOM）。以对象的形式来描述真实DOM结构，最终渲染到页面。在每次数据发生变化前，虚拟DOM都会缓存一份，变化之时，现在的虚拟DOM会与缓存的虚拟DOM进行比较。在vue内部封装了diff算法，通过这个算法来进行比较，渲染时修改改变的变化，原先没有发生改变的通过原先的数据进行渲染。

另外现代前端框架的一个基本要求就是无须手动操作DOM，一方面是因为手动操作DOM无法保证程序性能，多人协作的项目中如果review不严格，可能会有开发者写出性能较低的代码，另一方面更重要的是省略手动DOM操作可以大大提高开发效率。

### 2.虚拟DOM的解析过程

- 首先对将要插入到文档中的 DOM 树结构进行分析，使用 js 对象将其表示出来，比如一个元素对象，包含 TagName、props 和 Children 这些属性。然后将这个 js 对象树给保存下来，最后再将 DOM 片段插入到文档中。
- 当页面的状态发生改变，需要对页面的 DOM 的结构进行调整的时候，首先根据变更的状态，重新构建起一棵对象树，然后将这棵新的对象树和旧的对象树进行比较，记录下两棵树的的差异。
- 最后将记录的有差异的地方应用到真正的 DOM 树中去，这样视图就更新了。

### 3.为什么要虚拟 DOM

#### 保证性能下限，在不进行手动优化的情况下，提供过得去的性能

看一下页面渲染的流程：解析HTML -> 生成DOM -> 生成 CSSOM -> Layout -> Paint -> Compiler

下面对比一下修改DOM时真实DOM操作和Virtual DOM的过程，来看一下它们重排重绘的性能消耗∶

- 真实DOM∶ 生成HTML字符串＋重建所有的DOM元素
- 虚拟DOM∶ 生成vNode+ DOMDiff＋必要的dom更新

Virtual DOM的更新DOM的准备工作耗费更多的时间，也就是JS层面，相比于更多的DOM操作它的消费是极其便宜的。尤雨溪在社区论坛中说道∶ 框架给你的保证是，你不需要手动优化的情况下，依然可以给你提供过得去的性能。

#### 跨平台

Virtual DOM本质上是JavaScript的对象，它可以很方便的跨平台操作，比如服务端渲染、uniapp等。

### 4.虚拟DOM真的比真实DOM性能好吗

- 首次渲染大量DOM时，由于多了一层虚拟DOM的计算，会比innerHTML插入慢。
- 正如它能保证性能下限，在真实DOM操作的时候进行针对性的优化时，还是更快的。

### 5.如何理解 vue 中模板编译原理

- 解析阶段：使用大量的正则表达式对 template 字符串进行解析，将标签、指令、属性等转化为抽象语法树 AST。
- 优化阶段：遍历 AST,找到其中的一些静态节点并进行标记，方便在页面重渲染的时候进行 diff 比较时，直接跳过这一些静态节点，优化 runtimel 的性能。
- 生成阶段：将最终的 AST 转化为 render 函数字符串。

我们用户传递的是 template 属性，我们需要将这个 template 编译成 render 函数

template -> ast 语法树 -> 对语法树进行标记（标记的是静态节点）-> 将 ast 语法树生成 render 函数

```js
//将模板编译为render函数
const { render, staticRenderFns } = compileToFunctions(template, options, this)
```

CompileToFunctionst 中的主要逻辑如下：

1. 调用 parse 方法将 template 转化为 ast(抽象语法树)

```js
constast parse(template.trim(),options)
```

- parse 的目标：把 tamplate?转换为 AST 树，它是一种用 JavaScript 对象的形试来描述整个模板。
- 解析过程：利用正则表达式顺序解析模板，当解析到开始标签、闭合标签、文本的时候都会分别执行对应的回调函数，来达到构造 AST 树的目的。

AST 元素节点总共三种类型：ype 为 1 表示普通元素、2 为表达式、3 为纯文本

2. 对静态节点做优化

```js
optimize(ast, options)
```

这个过程主要分析出哪些是静态节点，给其打一个标记，为后续更新渲染可以直接跳过静态节点做优化

深度遍历八 ST,查看每个子树的节点元素是否为静态节点或者静态节点根。如果为静态节点，他们生成的 DOM 永远不会改变，这对运行时模板更新起到了极大的优化作用。

3. 生成代码

```js
const code generate(ast,options)
```

generate 将 ast 抽象语法树编译成 render 字符串并将静态部分放到 staticRenderFns 中，最后通过 new Function(`render')生成 render 函数。

### 6.patch 方法

```js
function createElement(vnode) {
    let tag = vnode.tag
    let attrs = vnode.attrs || {}
    let children = vnode.children || []
    if (!tag) {
        return null
    }
    // 创建dom
    let elem = document.createElement(tag)
    let arreName
    // 给dom添加属性
    for (attrName in attrs) {
        if (attrs.hasOwnProperty(attrName)) {
            elem.setAttribute(attrName, attrs[attrName])
        }
    }
    // 将子元素添加到目标上
    children.forEach(function (childVnode) {
        elem.appendChild(createElement(childVnode))
    })
    return elem
}

function updateChildren(vnode, newVnode) {
    let children = vnode.children || [] // 现有节点
    let newChildren = newVnode.children || [] // 新节点
    children.forEach(function (childVnode, index) {
        // 循环的每一项
        let newChildrenVnode = newChildren[index]
        // 第一层没有变化
        if (childVnode.tag === newChildrenVnode.tag) {
            // 深层对比，递归
            uodateChildren(childVnode, newChildrenVnode)
        } else {
            // 两者tag不一样
            replaceNode(childVnode, newChildrenVnode)
        }
    })
}
```

### 7.diff 算法

diff 算法的特点就是平级比较，内部采用了递归+双指针方式进行了优化，优化了常见的操作。采用了递归比较的方式

#### 针对一个节点的 diff 算法

-先拿出根节点来进行比较，如果是同一个节点比较属性，如果不是同一个节点则直接换成最新的即可 -同一个节点比较属性后，复用老节点

#### 比较儿子

-一方有儿子，一方没有儿子（删除、添加） -两方都有儿子 -优化比较 头头 尾尾 交叉比较 -就做一个映射表，用新的去映射表中查找此元素是否存在，存在则移动，不存在则插入，最后删除多余的

### 8.既然 vue 通过数据劫持可以精准探测数据变化，为什么还需要虚拟 DOM 进行 diff 检测差异

-如果给每个属性都去增加 watcher，而且粒度太小也不好控制，降低 watcher 的数量（每一个组件都有一个 wathcer）可以通过 diff 算法来优化渲染过程。通过 diff 算法和响应式原理折中处理一下。

### 9.请说明 vue 中 key 的作用和原理，谈谈对他的理解

isSameVnode 中会根据 key 来判断两个元素是否是同一个元素，key 不相同说明不是同一个元素（key 在动态列表中不要使用索引）我们使用 key 尽量要抱枕 key 的唯一性（这样可以优化 diff 算法）

1.key 的作用主要是为了更高效的更新虚拟 DOM。
2.vue 在 patch 过程中判断两个节点是否是相同节点是 key 是一个必要条件，渲染一组列表时，key 往往是唯一标识，所以如果不定义 key 的话，vue 只能认为比较的两个节点是同一个，哪怕它们实际上不是，这导致了频繁更新元素，使得整个 patch 过程比较低效，影响性能。 3.实际使用中在渲染一组列表时 key 必须设置，而且必须是唯一标识，应该避免使用数组索引作为 key，这可能导致一些隐蔽的 bug；vue 中在使用相同标签元素过渡切换时，也会使用 key 属性，其目的也是为了让 vue 可以区分它们，否则 vue 只会替换其内部属性而不会触发过渡效果。 4.从源码中可以知道，vue 判断两个节点是否相同时主要判断两者的 key 和元素类型等，因此如果不设置 key，它的值就是 undefined，则可能永远认为这是两个相同节点，只能去做更新操作，这造成了大量的 dom 更新操作，明显是不可取的。
