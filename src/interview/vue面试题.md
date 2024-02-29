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

## MVVM、MVC、MVP的区别

MVC、MVP 和MVVM 是三种常见的软件架构设计模式，主要通过分离关注点的方式来组织代码结构，优化开发效率。

在开发单页面应用时，往往一个路由页面对应了一个脚本文件，所有的页面逻辑都在一个脚本文件里。页面的這染、数据的获取，对用户事件的响应所有的应用逻辑都混合在一起，这样在开发简单项目时，可能看不出什么问题，如果项目变得复杂，那么整个文件就会变得元长、混乱，这样对项目开发和后期的项目维护是非常不利的。

### MVC

MVC 通过分离Model、View和Controller的方式来组织代码结构。其中View负责页面的显示逻辑，Model负责存储页面的业务数据，以及对相应数据的操作。并且view和Model应用了观察者模式，当Model层发生改变的时候它会通知有关 View 层更新页面。Controller 层是view层和Model层的纽带，它主要负责用户与应用的响应操作，当用户与页面产生交互的时候，Controller中的事件触发器就开始工作了，通过调用Model层，来完成对Modlel的修改，然后Model层再去通知View层更新。

![MVC](/img/interview/mvc.jpg)

### MVVM

MVVM 分为 Model、 View、 ViewModel:

- Model代表数据模型，数据和业务逻辑都在Model层中定义
- View代表U视图，负责数据的展示
- viewMode负责监听Model中数据的改变并且控制视图的更新，处理用户交互操作

Model和View并无直接关联，而是通过viewModel来进行联系的，Model和ViewModel之间有着双向数据绑定的联系。因此当Modlel中的数据改变时会触发View层的刷新，View中由于用户交互操作而改变的数据也会在Model中同步。

这种模式实现了 Model和View的数据自动同步，因此开发者只需要专注于数据的维护操作即可，而不需要自己操作DOM。

![MVVM](/img/interview/mvvm.jpg)

### MVP

MVP模式与MVC唯一不同的在于Presenter和Controller。在MVC模式中使用观察者模式，来实现当Model层数据发生变化的时候，通知View层的更新。这样View层和Model层耦合在一起，当项目逻辑变得复杂的时候，可能会造成代码的混乱，并且可能会对代码的复用性造成一些问题。MVP的模式通过使用Presenter来实现对View层和Model层的解轉。MVC 中的
Controler只知道Model的接口，因此它没有办法控制View层的更新，MVP模式中，View层，的接口暴露给了Presenter因此可以在Presenter中将Model的变化和View的变化绑定在一起，以此来实现view和Model的同步更新。这样就实现了对view和Model的解耜，Presenter还包含了其他的响应逻辑。

## 单页和多页的区别及优缺点

> 单页（SPA）：就是只有一张 Web 页面的应用。单页应用程序 (SPA) 是加载单个 HTML 页面并在用户与应用程序交互时动态更新该页面的 Web 应用程序。浏览器一开始会加载必需的 HTML 、 CSS 和 JavaScript ，所有的操作都在这张页面上完成，都由 JavaScript 来控制。

- 优点

1. 体验好，快
2. 改动内容，不用加载整个页面
3. 前后端分离
4. 效果可以很炫酷

- 缺点

1. 不利于 SEO
2. 初次加载比较慢
3. 页面复杂度高

## Vue的基本原理

当一个vue实例创建时，vue会遍历data中的属性，用 Object.defineProperty（vue3,0使用proxy）将它们转为 getter/setter， 并且在内部追踪相关依赖，在属性被访问和修改时通知变化。每个组件实例都有相应的 watcher 程序实例，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的setter被调用时，会通知watcher重新计算，从而致使它关联的组件得以更新。

## 对 import Vue from "vue"的理解

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

我们开发中引入的 Vue 其实就是这个构造函数，而且这个构造函数只能通过 new Vue 的方式进行使用，否则会在控制台打印警告信息。定义完后，还会通过 initMixin(Vue)、stateMixin(Vue)、eventsMixin(Vue)、lifecycleMixin(Vue)和renderMixin(Vue)的方式为 Vue 原型中混入方法。我们通过 import Vue from "Vue"引入的本质上就是一个原型上挂在了好多方法的构造函数。

## 对 new Vue 的理解

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

## 响应式原理

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

## 如何检测数组变化

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

## 使用Object.defineProperty()来进行数据劫持有什么缺点？

在对一些属性进行操作时，使用这种方法无法拦截，比如通过下标方式修改数组数据或者给对象新增属性，这都不能触发组件的重新渲染，因为Object.defineProperty不能拦截到这些操作。更精确的来说，对于数组而言，大部分操作都是拦截不到的，只是vue内部通过重写函数的方式解決了这个问题。

在vue3.0中已经不使用这种方式了，而是通过使用Proxy对对象进行代理，从而实现数据劫持。使用Proxy的好处是它可以完美的监听到任何方式的数据改变，唯一的缺点是兼容性的问题，因为Proxy是ES6的语法。

## 如何进行依赖收集

-所谓的依赖收集（观察者模式）被观察者指代是数据，观察者（watcher 有 3 种 渲染 watcher 计算属性 用户 wather） -一个 watcher 中可能对应着多个数据，watcher 中需要保存 dep（重新渲染的时候可以让属性重新记录 waitcher）计算属性也会用到

> 多对多的关系 一个 dep 对应多个 watcher，一个 watcher 有多个 dep。默认渲染的时候会进行依赖收集

## 双向数据绑定的原理

vuejs 是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty0来劫持各个属性的setter， getter，在数据变动时发布消息给订阅者，触发相应的监听回调。主要分为以下几个步骤：

1. 需要observe的数据对象进行递归遍历，包括子属性对象的属性，都加上setter和getter这样的话，给这个对象的某个值赋值，就会触发setter，那么就能监听到了数据变化
2. compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视因，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
3. Watcher订丁阅者是Observer和Compile之间通信的桥梁，主要做的事情是：
   - 在自身实例化时往属性 订阅器(dep)里面添加自己
   - 自身必须有一个update()方法
   - 待属性变动dep.notice()通知时，能调用自身的updat0方法，并触发Compile中邬定的回调，则功成身退。
4. MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 一＞视图更新；视图交互变化（input）一＞数据model变更的双向绑定效果。

![ ](/img/interview/vue2.jpg)

## vue.set 方法如何实现

Vue.set 方法是 vue 中的一个补丁方法（正常我们添加属性是不会触发更新的，我们数组无法监控到索引和长度）
如何实现的 我们给每一个对象都增添了一个 dep 属性 当属性添加或者删除时，手动触发对象本身 dep 来进行更新

## vm.$set()怎么解决对象新增属性不能响应的问题

```js
export function set (target: Array<any> | Object, key: any, val: any): any {
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

## 如何理解 vue 中模板编译原理

我们用户传递的是 template 属性，我们需要将这个 template 编译成 render 函数

- template -> ast 语法树 -> 对语法树进行标记（标记的是静态节点）-> 将 ast 语法树生成 render 函数

> 最终每次渲染可以调用 render 函数返回对应的虚拟节点

## nextTick 在哪里使用？原理是？

nextTick 内部采用了异步任务进行包装（多个 nextTick 调用 会被合并成一次 内部会合并调用）最后在异步任务中批处理
主要应用场景就是异步更新（默认调度的时候就会添加一个 nextTicik 任务）用户为了获取最终的渲染结果需要在内部任务执行之后再执行用户逻辑。这时候用户需要将对应的逻辑放到 nextTick 中。

## data 为什么是函数

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
ca.data.a = 100
let c2 = new Child()
console.log(c2.data.a)
```

## computed 和 watch 区别

- 对于Computed:
  - 它支持缓存，只有依赖的数据发生了变化，才会重新计算
  - 不支持异步，当Computed中有异步操作时，无法监听数据的变化
  - computed的值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data声明过，或者父组件传递过来的props中的数据进行计算的。
  - 如果一个属性是由其他属性计算而来的，这个属性依赖其他的属性，一般会使用computed
  - 如果computed属性的属性值是函数，那么默认使用get方法，函数的返回值就是属性的属性值;在computed中，属性有一个get方法和一个set方法，当数据发生变化时，会调用set方法。
- 对于Watch:
  - 它不支持缓存，数据变化时，它就会触发相应的操作
  - 支持异步监听
  - 监听的函数接收两个参数，第一个参数是最新的值，第二个是变化之前的值
  - 当一个属性发生变化时，就需要执行相应的操作
  - 监听数据必须是data中声明的或者父组件传递过来的props中的数据，兰发生变化时，会触发其他操作，函数有两个的参数：
  - immediate：组件加载立即触发回调函数
  - deep：深度监听，发现数据内部的变化，在复杂数据类型中使用，例如数组中的对象发生变化。需要注意的是，deep无法监听到数组和对象内部的变化。
- 总结：
  - computed 计算属性：依赖其它属性值，井且 corputed 的值有缓存，只有它依赖的属性值发生改变，下一次获取computed 的值时才会重新计算 computed 的值。
  - watch 侦听器：更多的是观察的作用，无缓存性，类似于某些数据的监听回调，每当监听的数据变化时都会执行回调进行后续操作。
- 运用场景：
  - 当需要进行数值计算,并且依赖于其它数据时，应该使用 corputed，因为可以利用 computed的缓存特性，避免每次获取值时都要重新计算。
  - 当需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许执行异步操作（访问一个 API），限制执行该操作的频率，并在得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

## Computed 和 Methods 的区别

可以将同一函数定义为一个method 或者一个计算属性。对于最终的结果，两种方式是相同的

- 不同点：
  - computed：计算属性是基于它们的依赖进行缓存的，只有在它的相关依赖发生改变时才会重新求值；
  - method 调用总会执行函数。

## vue 侦听器

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

## props、methods、data、computed 的执行顺序

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

## vue 中 data 和 method 可以同名吗

```js
if (methods && hasOwn(methods, key)) {
    warn(`Method "${key}" has already been defined as a data property.`, vm)
}
```

## 过滤器的作用，如何实现一个过滤器

根据过滤器的名称，过滤器是用来过滤数据的，在vue中使用flters来过滤数据，flters不会修改数据，而是过滤数据，改变用户看到的输出（计算属性computed，方法methods都是通过修改数据来处理数据格式的输出显示）。

- 使用场景：
  - 需要格式化数据的情况，比如需要处理时间、价格等数据格式的输出 / 显示。
  - 比如后端返回一个年月日的日期字符串，前端需要展示为多少天前的数据格式，此时就可以用fliters过滤器来处理数据。

过滤器是一个西数，它会把表达式中的值始终当作函数的第一个参数。过滤器用在插值表达式{{}}和v-bind 表达式 中，然后放在操作符|后面进行指示。
例如，在显示金额，给商品价格添加单位：

```js
＜li>商品价格：{{item.price | filterprice}}</li>
filters: {
    filterPrice (price) {
        return price ? ('¥'+ price)：'--''
    }
}
```

## 为什么要虚拟 DOM

- 虚拟 DOM 的好处是什么？ 我们写的代码可能要针对不同的平台来使用（weex，web，小程序）可以跨平台，不需要考虑平台问题
- 不用关心兼容问题，可以在上层将对应的渲染方法传递给我，我来渲染虚拟 dom 即可
- diff 算法 针对更新的时候，有了虚拟 dom 之后我们可以通过 diff 算法来找到最后的差异进行修改真是 dom（类似在真是 dom 之间做了一个缓存）

## patch 方法

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

## diff 算法

diff 算法的特点就是平级比较，内部采用了递归+双指针方式进行了优化，优化了常见的操作。采用了递归比较的方式

### 针对一个节点的 diff 算法

-先拿出根节点来进行比较，如果是同一个节点比较属性，如果不是同一个节点则直接换成最新的即可 -同一个节点比较属性后，复用老节点

### 比较儿子

-一方有儿子，一方没有儿子（删除、添加） -两方都有儿子 -优化比较 头头 尾尾 交叉比较 -就做一个映射表，用新的去映射表中查找此元素是否存在，存在则移动，不存在则插入，最后删除多余的

## 既然 vue 通过数据劫持可以精准探测数据变化，为什么还需要虚拟 DOM 进行 diff 检测差异

-如果给每个属性都去增加 watcher，而且粒度太小也不好控制，降低 watcher 的数量（每一个组件都有一个 wathcer）可以通过 diff 算法来优化渲染过程。通过 diff 算法和响应式原理折中处理一下。

## 请说明 vue 中 key 的作用和原理，谈谈对他的理解

isSameVnode 中会根据 key 来判断两个元素是否是同一个元素，key 不相同说明不是同一个元素（key 在动态列表中不要使用索引）我们使用 key 尽量要抱枕 key 的唯一性（这样可以优化 diff 算法）

1.key 的作用主要是为了更高效的更新虚拟 DOM。
2.vue 在 patch 过程中判断两个节点是否是相同节点是 key 是一个必要条件，渲染一组列表时，key 往往是唯一标识，所以如果不定义 key 的话，vue 只能认为比较的两个节点是同一个，哪怕它们实际上不是，这导致了频繁更新元素，使得整个 patch 过程比较低效，影响性能。 3.实际使用中在渲染一组列表时 key 必须设置，而且必须是唯一标识，应该避免使用数组索引作为 key，这可能导致一些隐蔽的 bug；vue 中在使用相同标签元素过渡切换时，也会使用 key 属性，其目的也是为了让 vue 可以区分它们，否则 vue 只会替换其内部属性而不会触发过渡效果。 4.从源码中可以知道，vue 判断两个节点是否相同时主要判断两者的 key 和元素类型等，因此如果不设置 key，它的值就是 undefined，则可能永远认为这是两个相同节点，只能去做更新操作，这造成了大量的 dom 更新操作，明显是不可取的。

## slot是什么？有什么作用？原理是什么？

slot又名插槽，是vue的内容分发机制，组件内部的模板引擎使用slot元素作为承载分发内容的出口。插槽slot是子组件的一个模板标签元素，而这一个标签元素是否显示，以及怎么显示是由父组件决定的。slot又分三类，默认插槽，具名插槽和作用域插槽。

- 默认插槽：又名匿名插槽，当slot没有指定name属性值的时候一个默认显示插槽，一个组件内只有有一个匿名插槽。
- 具名插槽：带有具体名字的插槽，也就是带有name属性的slot，一个组件可以出现多个具名插槽。
- 作用域插槽：默认插槽、具名插槽的一个变体，可以是匿名插槽，也可以是具名插槽，该插槽的的不同点是在子组件渲染作用域插槽时，可以将子组件内部的数据传递给父组件，让父组件根据子组件的传递过来的数据决定如何渲染该插槽。

实现原理：当子组件vm实例化时，获取到父组件传入的slot标签的内容，存放在vm.sslot中，默认插槽为vm.$slot.default，具名插槽为vm.$slot.xxx.xxx 为插槽名，当组件执行渲染函数时候，遇到slot标签，使用$slot中的内容进行替换，此时可以为插槽传递数据，若存在数据，则可称该插槽为作用域插槽。

## 组件化的理解

组件的优点：组件复用可以根据数据渲染对应的组件，把组件相关的内容放在一起（方便复用）合理规划组件，可以做到更新的时候是组件级更新 （组件话中的特性 属性 事件 插槽）

> vue 中怎样的处理组件 1）Vue.extend 根据用户传入的对象生成一个组件的构造函数 2）根据组件产生对应的虚拟节点 3）组件初始化，将虚拟节点转化为真实节点 new Sub().$mount()

## 组件更新流程

-组件更新会触发组件的 prepatch 方法，会复用组件，并且比较组件的 属性 事件 插槽 -父组件给子组件传递的值是响应式的，在模板中使用会做依赖收集 收集自己的组件 watcher

## 异步组件原理

Vue 异步组件的写法有很多，主要用作大的组件可以异步加载的 就是先渲染一个注释标签，等组件加载完毕，最后在重新渲染 forceUpdate(图片懒加载) 使用异步组件会配合 webpack

## 组件间通信方式

- props / $emit 适用父子组件通信

- ref 与 $parent / $children 适用父子组件通信

- EventBus （$emit / $on）适用于父子、隔代、兄弟组件通信

- $attrs/$listeners 适用于隔代组件通信

- provide / inject 适用于隔代组件通信

- Vuex 适用于 父子、隔代、兄弟组件通信

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf775050e1f948bfa52f3c79b3a3e538~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

## 函数式组件的优势及原理

React 中也区分两种组件 一种叫类组件，一种叫函数式组件（Sub 就是类组件 有 this） （函数式组件 没有类就没有 this,也没有所谓的状态，没有生命周期，好处就是性能好，不需要创建 watcher 了）

## 组件生命周期

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

## 组件生命顺序

- 加载渲染过程

> 父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

- 子组件更新过程

> 父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated

- 父组件更新过程

> 父 beforeUpdate -> 父 updated

- 销毁过程

> 父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

## 如何扩展一个组件

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

## 组件中写name选项有什么好处及作用

- 可以通过名字找到对应的组件（递归组件）
- 可以通过name属性来实现缓存功能（keep-alive）
- 可以通过name来识别组件

## v-if、v-show、v-html的原理

- v-if生成vnode的时候会忽略对应节点，render的时候就不会渲染
- v-show会生成vnode，render的时候也会渲染成真实节点，只是在render过程中会在节点的属性中修改show属性值，也就是常说的display
- v-html会先移除节点下的所有节点，调用html方法，通过addProp添加innerHTML属性，归根结底还是设置innerHTML为v-html的值

## v-if 和 v-for

vue2 中 v-for 优先级更高，在编译的时候会将 v-for 渲染成\_l 函数 v-if 会变成三元表达式。v-if 和 v-for 不能同时使用。如果同时遇到的时候，应该考虑先用计算属性处理数据，在进行 v-for，可以减少循环次数。vue3 中则完全相反，v-if 的优先级高于 v-for

## v-if 和 v-show

- 手段：v-if是动态的向DOM树内添加或者删除DOM元素；v-show是通过设置DOM元泰的display样式属性控制显隐；
- 编译过程：v-if切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；v-show只是简单的基于css切换；
- 编译条件：v-if是惰性的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译；v-show是在任何条件下，无论首次条件是否为真，都被编译，然后被缓存，而且DOM元素保留；
- 性能消耗：v-if有更高的切换消耗；v-show有更高的初始渲染消耗；
- 使用场景：v-if适合运营条件不大可能改变；v-show适合频繁切换。

## v-model 的原理

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
父组件：
<ModelChild v-model="message"></ModelChild>

子组件：
<div>{{value}}</div>

props:{
    value: String
},
methods: {
  test1(){
     this.$emit('input', '小红')
  },
},
```

## clss 动态绑定

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

## style 动态绑定

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

## 怎样理解 Vue 的单向数据流

所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。
额外的，每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。子组件想修改时，只能通过 $emit 派发一个自定义事件，父组件接收到后，由父组件修改。

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

## 谈谈你对 keep-alive 的了解

keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染 ，其有以下特性：

- 一般结合路由和动态组件一起使用，用于缓存组件；

- 提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；
- 对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。

## 修饰符有哪些？

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

## Vue.use

- 作用：Vue.use 被用来安装 Vue.js 插件，例如 vue-router、vuex、element-ui。
- install 方法：如果插件是一个对象，必须提供  install  方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。
- 调用时机：该方法需要在调用  new Vue()  之前被调用。
- 特点：当 install 方法被同一个插件多次调用，插件将只会被安装一次。

## vue 中使用了哪些设计模式

单例模式：new 多次，只有一个实例
工场模式：传入参数就可以创建实例（虚拟节点的创建）
发布订阅模式：eventBus
观察者模式：watch 和 dep
代理模式：\_data 属性、proxy、防抖、节流
中介者模式：vuex
策略模式
外观模式

## vue-router 路由模式

> vue-router 有 3 种路由模式：hash、history、abstract

- hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器；
- history : 依赖 HTML5 History API 和服务器配置。具体可以查看 HTML5 History 模式；

## Vue-router有几种钩子函数？具体是什么及执行流程是怎样的？

- 钩子函数的种类有全局守卫、路由守卫、组件守卫

> 完整导航流程

1、导航被触发
2、在失活的组件里调用beforerouteLeave守卫
3、调用全局的beforeEach守卫
4、在重用的组件里调用beforeRouteUpdate守卫
5、在路由配置里调用beforeEnter
6、解析异步路由组件
7、在激活的组件里调用beforeRouteEnter
8、调用全局的beforeResolve守卫
9、导航被确认

## vue 路由传参

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

## vue2和vue3的区别

### 基本回答点

- 1、用组合式api替换选项式api，方便逻辑更加的聚合

### 一些细节改变

- 1、因为改成组合式api所以没有this
- 2、生命周期没有creat，setup等同于create，卸载改成unmount
- 3、vue3中v-if高于v-for的优先级
- 4、根实例的创建从new app变成了createApp方法
- 5、一些全局注册，比如mixin，注册全局组件，use改成了用app实例调用，而不是vue类调用
- 6、新增了传送门teleport组件
- 7、template模板可以不包在一个根div里

### 原理方面

- 1、响应式原理改成了用proxy，解决了数组无法通过下标修改，无法监听到对象属性的新增和删除的问题。也提升了响应式的效率
- 2、可以额外叙述vue3并不是完全抛弃了defineProperty,通过reactive定义的响应式数据使用oroxy包装出来，而ref还是用的defineProperty去给一个空对象，定义了一个value属性来做的响应式
- 3、组合式api的写法下，源码改成了函数式编程，方便按需引入，因为tree-shaking.功能必须配合按需引入写法。所以vue3更好地配合tree-shaking能让打包体积更小
- 4、性能优化，增加了静态节点标记。会标记静态节点，不对静态节点进行
比对。从而增加效率。
- 5、此外大家可以叙述具体标记策略，从而提升自己的印象

### 进阶回答点

- 1、vue3不推荐使用mixin进行复用逻辑提取，而是推荐写成hook
- 2、v-model应用于组件时，监听的事件和传递的值改变
- 3、ts更好地配合
