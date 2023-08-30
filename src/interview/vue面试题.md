---
title: Vue面试题
icon: markdown
order: 3
date: 2023-02-17
category:
    - 面试
tag:
    - Vue
---

<!-- more -->

## MVVM 原理

- Model: 模型持有所有的数据、状态和程序逻辑
- View: 负责界面的布局和显示
- ViewModel：负责模型和界面之间的交互，是 Model 和 View 的桥梁

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
4. vue2 中的数据响应式会根据数据类型来做不同处理，如果是对象则采用 Object.defineProperty()的方式定义数据拦截，当数据被访问或发生变化时，我们感知并作出响应；如果是数组则通过覆盖数组对象原型的 7 个变更方法，使这些方法可以额外的做更新通知，从而作出响应。这种机制很好的解决了数据响应化的问题，但在实际使用中也存在一些缺点：比如初始化时的递归遍历会造成性能损失；新增或删除属性时需要用户使用 Vue.set/delete 这样特殊的 api 才能生效；对于 es6 中新产生的 Map、Set 这些数据结构不支持等问题。 5.为了解决这些问题，vue3 重新编写了这一部分的实现：利用 ES6 的 Proxy 代理要响应化的数据，它有很多好处，编程体验是一致的，不需要使用特殊 api，初始化性能和内存消耗都得到了大幅改善；另外由于响应化的实现代码抽取为独立的 reactivity 包，使得我们可以更灵活的使用它，第三方的扩展开发起来更加灵活了。

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

## 如何进行依赖收集

-所谓的依赖收集（观察者模式）被观察者指代是数据，观察者（watcher 有 3 种 渲染 watcher 计算属性 用户 wather） -一个 watcher 中可能对应着多个数据，watcher 中需要保存 dep（重新渲染的时候可以让属性重新记录 waitcher）计算属性也会用到

> 多对多的关系 一个 dep 对应多个 watcher，一个 watcher 有多个 dep。默认渲染的时候会进行依赖收集

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

- 相同点

底层都会创建一个 watcher（用法的区别 computed 定义的属性可以在模板中使用，watch 不能在试图中使用）

- 不同点

> computed： 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值。默认不会立即执行 只有取值的时候才会执行 内部会有 dirty 属性，来控制依赖的值是否发生变化，默认计算属性需要同步返回结果（有个包就是让 computed 变成异步的）

> watch： 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；默认用户会提供一个回调函数，数据变化了就调用这个回调。我们可以监控某个数据的变化，数据变化了执行某些操作

- 运用场景

> 当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；

> 当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用  watch  选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

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

## v-if 和 v-for

vue2 中 v-for 优先级更高，在编译的时候会将 v-for 渲染成\_l 函数 v-if 会变成三元表达式。v-if 和 v-for 不能同时使用。如果同时遇到的时候，应该考虑先用计算属性处理数据，在进行 v-for，可以减少循环次数。vue3 中则完全相反，v-if 的优先级高于 v-for

## v-if 和 v-show

- v-if 是真正的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。适用于在运行时很少改变条件，不需要频繁切换条件的场景。v-if 在编译的时候会变成三元表达式

- v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 “display” 属性进行切换。适用于需要非常频繁切换条件的场景。v-show 会变成一个指令

viisbility:hidden 不能响应时间（占位的）
opacity 可以响应时间(透明度为 0)

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

> 事件修饰符

- .stop 阻止冒泡
- .prevet 阻止默认行为
- .capture 内部元素触发的事件先在次处理
- .self 只有在 event.target 是当前元素时触发
- .once 事件只会触发一次
- .passive 立即触发默认行为
- .native 把当前元素作为原生标签看待

> 按键修饰符

- .keyup 键盘抬起
- .keydown 键盘按下

> 系统修饰符

- .ctrl
- .alt
- .meta

> 鼠标修饰符

- .left 鼠标左键
- .right 鼠标右键
- .middle 鼠标中键

> 表单修饰符

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
