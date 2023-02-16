---
title: JS面试题
icon: markdown
order: 2
category:
  - 面试
tag:
  - javascript
---

<!-- more -->

## js 由哪三部分组成

1. ECMAScript：JS 的核心内容，描述了语言的基础语法，比如 var，for
2. 文档对象模型（DOM）：DOM 把整个 HTML 页面规划为元素构成的文档，
3. 浏览器对象模型（BOM）：对浏览器窗口进行访问和操作

## JS 由哪些内置对象

String Boolean Number Array Object Function Math Date RegExp
Math: abs()绝对值 sqrt()开平方 max() min()
Date: new Data() getYear()
Sting: concat() length slice() split()

## 基本数据类型和引用数据类型

- 基本数据类型： String Number Boolean undefined null，基本数据类型保存在内存中，保存的就是一个具体的值
- 引用数据类型（复杂数据类型）：Object Function Array，引用数据类型保存在堆内存中，声明一个引用类型的变量，它保存的是引用类型数据的地址。假如声明两个引用类型同时指向了一个地址的时候，修改其中一个那么另外一个也会改变。

```js
let obj = {
    name: '张三',
}
let obj1 = obj
obj1.name = '李四'
console.log(obj.name) //李四
```

## ES6 新特性

1. 新增块级作用域（let、const）
2. 新增定义类的语法糖（class）
3. 新增了一种基本数据类型（symbol）
4. 新增了结构赋值
5. 新增了函数参数的默认值
6. 新增数组 API
7. 对象和数组新增了扩展运算符
8. Promise
9. 新增模块化（import export）
10. 新增 set 和 map 数据结构
11. 新增 generator
12. 新增箭头函数

## var、let、const

- var

1. 声明提升
2. 变量覆盖
3. 没有块作用域
4. 不存在暂时性死区

```js
// 声明提升
console.log(name) //ltx
var name = 'ltx'
```

```js
// 变量覆盖
var name = '123'
var name = '456'
console.log(name) // '456'
```

```js
// 没有块作用域
function fn2() {
    for (var i = 0; i < 5; i++) {}
    console.log(i) // 5
}
fn(2)
```

```js
var a = 0
consolg.log(a, window.a) // 0,0
if (true) {
    consolg.log(a, window.a) // fn,0
    a = 10
    consolg.log(a, window.a) // 10,0
    function a() {} // 提升 隐式操作
    consolg.log(a, window.a) // 10,10
    a = 20
    consolg.log(a, window.a) // 20,10
}
consolg.log(a, window.a) // 10,10
```

- const

1. const 声明之后必须赋值
2. const 定义的值不能修改
3. const 支持块级作用域不存在声明提升和变量覆盖
4. 存在暂时性死区

## 箭头函数

- 不能作为构造函数使用，不能用 new
- 箭头函数没有原型
- 箭头函数没有 arguments
- 箭头函数不能用 call，bind，apply 去改变 this 的指向
- this 指向外层第一个函数的 this

## null 与 undefind

- undefined

1. 已声明，为赋值
2. 对象某个属性不存在
3. 函数调用缺少参数
4. 函数默认的返回值

```js
// 1、已声明，为赋值
let o
console.log(o) // undefined

// 2、对象某个属性不存在
let obj = {}
console.log(obj.a) // undefined

// 3、函数调用缺少参数
function fn(a, b) {
    console.log(a, b)
}
fn(4) // 4,undefined

// 4、函数默认的返回值
function abc() {}
console.log(abc())
```

- null

1. 手动释放内存
2. 作为函数的参数（此参数不是对象）
3. 原型链的顶端

## 数据类型检测方式

- typeof() 对于基本数据类型没问题，遇到引用数据类型不管用

```js
console.log(typeof 555) // number
console.log(typeof [1, 2, 3]) // object
```

- instanceof() 只能判断引用数据类型，不能判断基本数据类型

```js
console.log([] instanceof Array) // true
console.log('string' instanceof String) // false
```

- constructor 几乎可以判断基本数据类型和引用数据类型,如果声明了一个构造函数，并把它的原型指向了 Array

```js
console.log('abc'.constructor === String) // true
```

- Object.prototype.toString.call()

```js
var opt = Object.prototype.toString
console.log(opt.call(2)) //[object Number]
console.log(opt.call(true)) //[object Boolean]
console.log(opt.call('aaa')) //[object String]
console.log(opt.call([])) //[object Array]
console.log(opt.call({})) //[object Object]
```

## Promise

解决回调地狱的问题
自身上有 all，reject，resolve，race 方法
原型上有 then，catch
三种状态：pending 初始状态，fulfilled 操作成功，rejected 操作失败
状态： pending -> fulfilled; pending -> rejected 一旦发生，状态就会凝固，不会再变
无法取消 Promise，一旦创建他就会立即执行，不能中途取消
如果不设置回调，promise 内部抛出的错误就无法反馈到外面
若当前处于 pending 窗台，无法得只目前在那个阶段

- resolve 参数

1. 普通的值或者对象 pending -> fulfilled
2. 传入一个 promise，那么当前的 Promise 的状态会由传入的 Promise 来决定，相当于状态进行了移交
3. 传入一个对象，并且这个对象由实现 then 方法，那么也会执行该 then 方法，并且由该 then 方法决定后续状态

## 操作数组的方法

- push
- pop
- sort
- splice
- unshift
- shift
- reverse
- concat
- join
- map
- filter
- ervery
- some
- reduce
- isArray
- findIndex

> 哪些方法会改变原数组：push、pop、unshift、shift、sort、reverse、splice

## filter

```js
let a = [1, 2, 3, 4, 15]
// current => 当前值
// index=>当前值下标
// 这个数组对象
let b = a.filter((current, index, array) => {
    return current < 10
})
console.log(b) //[1, 2, 3, 4]
```

## forEach()与 map()

- forEach

1. 没有返回值
2. 不能用 break 打断

```js
let arr = ['a', 'b', 'c']
let res = arr.forEach((element) => {
    // break; //Uncaught SyntaxError: Illegal break statement
    return element + '1'
})
console.log(res) // undefined
```

- map

1. 有返回值(数组)默认是 undefined
2. 不能 break 打断

```js
let arr = ['a', 'b', 'c']
let res = arr.map((value, key) => {
    // break; // Uncaught SyntaxError: Illegal break statement
    return value + '1' // 默认undefined[undefined, undefined, undefined]
})
console.log(res) // ['a1', 'b1', 'c1']
```

## new 操作具体做了什么

1. 先创建一个空对象
2. 把空对象和构造函数通过原型链进行链接
3. 把构造函数的 this 绑定到新的空对象身上
4. 根据构建函数返回的类型判断，如果是值类型，则返回对象，如果是引用类型，就要返回这个引用类型

```js
function newFun(Fun, ...args) {
    // 创建一个新对象
    let newObj = {}
    // 把空对象和构造函数通过原型链进行连接
    newObj.__proto__ = Fun.prototype
    // 把构造函数的this绑定到新的空对象身上
    const result = Fun.apply(newObj, args)
    // 根据构建函数返回的类型判断，如果是值类型，则返回对象，如果是引用类型，就要返回这个引用类型
    return result instanceof Object ? result : newObj
}
function Person(name) {
    this.name = name
}
Person.prototype.say = function () {
    console.log('123')
}
const p1 = newFun(Person, '张三')
p1.say()
console.log(p1)
```

## 原型与原型链

原型就是一个普通对象，他是构造函数的实例共享属性和方法；所有实例中引用的原型都是同一个对象。使用 prototype 可以把方法挂载原型上，内存只保存一份
**proto**可以理解为指针。实例对象中的属性，指向了构造函数的原型（protortpe）
一个实例对象在调用属性和方法的时候，会一次从实例本身、构造函数原型、原型的原型上去查找

## 继承

1. 原型链继承
2. 借用构造函数继承
3. 组合式继承
4. ES6 的 class 继承

## this 指向

1. 全局对象中的 this 指向 window
2. 全局作用域或普通函数中 this 指向全局 window
3. 严格模式下，独立调用函数中的 this 指向 undefined
4. this 永远指向最后调用它的那个对象（箭头函数除外）
5. new 关键词改变了 this 指向
6. apply,call,bind 可以改变 this 指向（箭头函数除外）
7. 箭头函数中的 this 的指向在定义的时候就已经确定了，看外层是否有函数，有就是外层函数的 this，没有就是 window
8. 匿名函数中的 this 永远指向 window，匿名函数的指向环境具有全局性

> 绑定规则

- 默认绑定

```js
console.log(this) // window
function a() {
    console.log(this)
}
a() // window

var o = {
    a: 10,
    b: {
        fn: function () {
            console.log(this.a)
        },
    },
}
o.b.fn() // this的上一级对象为b，b内部并没有a变量的定义，所以输出undefined

var o = {
    a: 10,
    b: {
        a: 12,
        fn: function () {
            console.log(this.a)
        },
    },
}
var j = o.b.fn
j() //undefined this永远指向的是最后调用它的对象，虽然fn是对象b的方法，但是fn赋值给j时候并没有执行，所以最终指向window

function test(fn) {
    fn()
}
test(o.b.fn) // window
```

- 隐式绑定

```js
function foo() {
    console.log(this)
}
let obj = {
    bar: foo,
}
obj.bar() // obj
```

- new 绑定

```js
function foo() {
    console.log(this)
}
new foo() // foo
```

- 显式绑定

call 传的是一个参数列表
apply 传递一个数组
bind 传参后不会立即执行，会返回一个改变了 this 指向的函数，这个函数还是可以传参的

```js
let obj = {
    name: '123',
}
function foo(name, age, height) {
    console.log(this)
    console.log(name)
}
foo('123', 18, 1.88) // window
foo.call(obj, '789', 2, 5) // obj
foo.apply(obj, ['456', 10, 2]) // obj
let bar = foo.bind(obj, '890', 12, 5)
bar()

var id = 66
function fn5() {
    setTimeout(() => {
        console.log(this.id)
    }, 100)
}
fn5({ id: 2 } // 66
fn5.call({ id: 22 }) //箭头函数没有作用域 call后 22
```

> 内置函数的 this

```js
setTimeout(function () {
    console.log(this) // window
}, 1000)

let btn = document.querySelector('button')
btn.addEventListener('click', function () {
    console.log(this) // button
})

let names = ['1', '2', '3']
names.forEach(function (item) {
    console.log(this) // window
})
names.forEach(function (item) {
    console.log(this) // 'aaa'
}, 'aaa')
```

> 优先级

new（new 绑定和 call、apply 不允许同时使用）>bind>apply/call>隐式绑定>默认绑定

> 面试题

- 面试题 1

```js
var name = 'luo'
var person = {
    name: 'person',
    sayName: function () {
        console.log(this.name)
    },
}
function sayName() {
    var sss = person.sayName
    sss() // 默认绑定 window luo
    person.sayName() // 隐式绑定 person person
    ;(b = person.sayName)() // 简介函数引用 window luo
}
sayName()
```

- 面试题 2

```js
var name = 'luo'
var person1 = {
    name: 'person1',
    foo1: function () {
        console.log(this.name)
    },
    f002: () => console.log(this.name),
    foo3: function () {
        return function () {
            console.log(this.name)
        }
    },
    foo4: function () {
        return () => {
            console.log(this.name)
        }
    },
}
var person2 = {
    name: 'person2',
}
person1.foo1() // 隐式绑定 person1
person1.foo1.call(person2) // 显式绑定 person2
person1.f002() // window luo
person1.f002.call(person2) // window luo
person1.foo3()() // 默认绑定 window luo
person1.foo3.call(person2)() // 默认绑定 window luo
person1.foo3().call(person2) // person2
person1.foo4()() // 隐式绑定 person1
person1.foo4.call(person2)() // person2
person1.foo4().call(person2) // person1
```

- 面试题 3

```js
var name = 'luo'
function Person(name) {
    this.name = name
    this.foo1 = function () {
        console.log(this.name)
    }
    this.f002 = () => console.log(this.name)
    this.foo3 = function () {
        return function () {
            console.log(this.name)
        }
    }
    this.foo4 = function () {
        return () => {
            console.log(this.name)
        }
    }
}
var person1 = new Person('person1')
var person2 = new Person('person2')
person1.foo1() // 隐式绑定 person1
person1.foo1.call(person2) // 显式绑定 person2
person1.f002() // person1
person1.f002.call(person2) // person1
person1.foo3()() // 默认绑定 window luo
person1.foo3.call(person2)() // 默认绑定 window luo
person1.foo3().call(person2) // person2
person1.foo4()() // 隐式绑定 person1
person1.foo4.call(person2)() // person2
person1.foo4().call(person2) // person1
```

- 面试题 4

```js
var name = 'luo'
function Person(name) {
    this.name = name
    this.obj = {
        name: 'obj',
        foo1: function () {
            return function () {
                console.log(this.name)
            }
        },
        foo2: function () {
            return () => {
                console.log(this.name)
            }
        },
    }
}
var person1 = new Person('person1')
var person2 = new Person('person2')
person1.obj.foo1()() // 默认绑定 luo
person1.obj.foo1.call(person2)() // 默认绑定 luo
person1.obj.foo1().call(person2) // person2

person1.obj.foo2()() // obj
person1.obj.foo2.call(person2)() // person2
person1.obj.foo2().call(person2) // obj
```

## 手写 call、apply、bind

```js
Function.prototype.MyCall = function (context) {
    if (typeof this !== 'function') {
        throw new Error('type error')
    }
    if (context === null || context === undefined) {
        // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
        context = window
    } else {
        // 值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
        context = Object(context)
    }
    // 使用Symbol 来确定唯一
    const fnSym = Symbol()
    //模拟对象的this指向
    context[fnSym] = this
    // 获取参数
    const args = [...arguments].slice(1)
    //绑定参数 并执行函数
    const result = context[fnSym](...args)
    //清除定义的this
    delete context[fnSym]
    // 返回结果
    return result
}

Function.prototype.MyApply = function (context) {
    if (typeof this !== 'function') {
        throw new Error('type error')
    }
    if (context === null || context === undefined) {
        // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
        context = window
    } else {
        // 值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
        context = Object(context)
    }
    // 使用Symbol 来确定唯一
    const fnSym = Symbol()
    //模拟对象的this指向
    context[fnSym] = this
    // 获取参数
    const args = [...arguments][1]
    //绑定参数 并执行函数 由于apply 传入的是一个数组 所以需要解构
    const result =
        arguments.length > 1 ? context[fnSym](...args) : context[fnSym]()
    //清除定义的this
    delete context[fnSym]
    // 返回结果  //清除定义的this
    return result
}

Function.prototype.MyBind = function (context) {
    if (typeof this !== 'function') {
        throw new Error('type error')
    }
    if (context === null || context === undefined) {
        // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
        context = window
    } else {
        // 值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
        context = Object(context)
    }
    //模拟对象的this指向
    const self = this
    // 获取参数
    const args = [...arguments].slice(1)
    // 最后返回一个函数 并绑定 this 要考虑到使用new去调用，并且bind是可以传参的
    return function Fn(...newFnArgs) {
        if (this instanceof Fn) {
            return new self(...args, ...newFnArgs)
        }
        return self.apply(context, [...args, ...newFnArgs])
    }
}
```

## 作用域

```js
function Foo() {
  getName = function () {
    console.log(1);
  };
  return this;
}
Foo.getName = function () {
  console.log(2);
}
Foo.prototype.getName = function () {
  console.log(3);
}
var getName = function () { 
  console.log(4);
}
function getName() {
  console.log(5)
}
Foo.getName();
getName();
Foo().getName()
getName();
new Foo.getName(); 
new Foo().getName()
new new Foo().getName()
```

- 执行 Foo.getName(), 执行Foo函数对象上的的静态方法。打印出 2
- 执行 getName()， 就是执行的getName变量的函数。打印 4
  - 为什么这里是 执行的 变量getName，而不是函数getName呢。这得归功于js的预编译js在执行之前进行预编译，会进行 函数提升 和 变量提升,所以函数和变量都进行提升了，但是函数声明的优先级最高，会被提升至当前作用域最顶端。当在执行到后面的时候会导致getName被重新赋值，就会把执行结果为 4 的这个函数赋值给变量
- 执行 Foo().getName()， 调用Foo执行后返回值上的getName方法。 Foo函数执行了，里面会给外面的getName函数重新赋值，并返回了this。 也就是执行了this.getName。所以打印出了 1
- 执行 getName()， 由于上一步，函数被重新赋值。所以这次的结果和上次的结果是一样的，还是为1
- 执行 new Foo.getName()， 这个 new 其实就是new了Foo上面的静态方法getName 所以是2。 当然如果你们在这个函数里面打印this的话，会发现指向的是一个新对象 也就是new出来的一个新对象
  - 可以把 Foo.getName()看成一个整体，因为这里 . 的优先级比 new 高
- 执行 new Foo().getName()，这里函数执行 new Foo() 会返回一个对象，然后调用这个对象原型上的getName方法， 所以结果是 3
- 执行 new new Foo().getName(), 这个和上一次的结果是一样，上一个函数调用后并咩有返回值，所以在进行new的时候也没有意义了。 最终结果也是3

## 防抖

- 事件被触发 n 秒后再执行回调，如果在这 n 秒内又被调用，则重新计时。 在一段时间内，事件只会最后触发一次。scroll 事件滚动、搜索框输入查询、表单验证、按钮提交、浏览器缩放

```js
function debounce(func, wait) {
    let timeout
    return function () {
        const that = this
        const args = arguments
        clearTimeout(timeout)
        timeout = setTimeout(function () {
            func.apply(that, args)
        }, wait)
    }
}

// 立即执行防抖
function debounce(func, wait, immediate) {
    let timeout
    return function () {
        const that = this
        const args = arguments
        clearTimeout(timeout)
        if (immediate) {
            const callNow = !timeout
            timeout = setTimeout(function () {
                timeout = null
            }, wait)
            if (callNow) {
                func.apply(that, args)
            }
        } else {
            timeout = setTimeout(function () {
                func.apply(that, args)
            }, wait)
        }
    }
}

// 取消防抖
function debounce(func, wait) {
    let timeout
    let debounced = function () {
        const that = this
        const args = arguments
        clearTimeout(timeout)
        timeout = setTimeout(function () {
            func.apply(that, args)
        }, wait)
    }
    debounced.cancel = function () {
        clearTimeout(timeout)
        timeout = null
    }
    return debounced
}
```

## 节流

- 在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。按照一段时间的间隔来进行触发。

```js
// 时间戳 立即执行
function throttle(func, awit) {
    let old = 0
    return function () {
        const that = this
        const args = arguments
        let now = newDate().valueOf()
        if (now - old > wait) {
            func.apply(that, func)
            old = now
        }
    }
}

// 使用定时器 第一次不执行，最后一次调用会执行
function throttle(func, wait) {
    let timeout
    return function () {
        const that = this
        const args = arguments
        if (!timeout) {
            timeout = setTimeout(function () {
                func.apply(that, args)
                timeout = null
            }, wait)
        }
    }
}
```

## 闭包

> 闭包就是方法里面返回一个方法

```js
function a() {
    let a1 = 1
    return function () {
        return a1
    }
}
```

> 闭包的存在意义

1. 延长变量生命收起
2. 创建私有环境

## 柯里化

把接收多个参数的函数，变成一个接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数，而且返回结果的新函数的技术。

- 为什么需要有函数柯里化？

1. 逻辑单一
2. 函数参数复用

```js
function foo(x, y, z) {
    console.log(x + y + z)
}
foo(10, 20, 30) // 60

function foo2(x) {
    return function (y) {
        return function (z) {
            console.log(x + y + z)
        }
    }
}
foo2(10)(20)(30) // 60

let foo3 = (x) => (y) => (z) => {
    console.log(x + y + z)
}
foo3(10)(20)(30) // 60
```

> 案例一

```js
// 信息一： 日志类型
// 信息二： 日志的类型：info/debug/feature
// 信息三： 具体信息
function logInfo(date, type, message) {
    console.log(`时间：${date} 类型：${type} 内容${message}`)
}
logInfo('2023-02-07', 'debug', '修复界面bug')
logInfo('2023-02-07', 'debug', '修复界面bug')
logInfo('2023-02-07', 'debug', '修复界面bug')

// 柯里化
let logInfo2 = (date) => (type) => (message) => {
    console.log(`时间：${date} 类型：${type} 内容${message}`)
}
let logToday = logInfo2('2023-02-08')
let logTodayDeBug = logToday('debug')
let logTodayFrature = logToday('feature')
logTodayDeBug('服务器') //时间：2023-02-08 类型：debug 内容服务器
logTodayFrature('按钮') //时间：2023-02-08 类型：feature 内容按钮
```

> 案例二

```js
function makeAdder(count) {
    function add(num) {
        return count + num
    }
    return add
}

let adder5 = makeAdder(5)
console.log(adder5(5))
console.log(adder5(10))
```

## 深拷贝与浅拷贝

```js
let arr = [1, 2, 3]
let newArr = [...arr]
newArr.push(4)
console.log(arr) // [1,2,3]
console.log(newArr) // [1,2,3,4]

let arr2 = [
    [1, 2, 3],
    [4, 5, 6],
]
let newArr2 = [...arr2]
newArr2[0].push(888)
console.log(arr2) //[1, 2, 3, 888][4, 5, 6]
console.log(newArr2) //[1, 2, 3, 888][4, 5, 6]

let obj = {
    name: '张三',
    age: 18,
}
let obj1 = { ...obj }
obj1.name = '王五'
console.log(obj)
console.log(obj1)
// 只能实现第一层，当有多层的时候还是浅拷贝
```

```js
JSON.parse(JSON.stringify(arr)) // 深拷贝 function => "function"
```

```js
// 引用数据类型（数组，对象）
function deepClone(source) {
    // [] => Array(基类) {} => Object
    const targetObj = source.constructor === Array ? [] : {}
    for (let keys in source) {
        if (source.hasOwnProperty(keys)) {
            // keys => 3种
            if (source[keys] && typeof source[keys] === 'object') {
                targetObj[keys] = deepClone(source[keys])
            } else {
                // 基本数据类型，直接赋值
                targetObj[keys] = source[keys]
            }
        }
    }
    return targetObj
}

let obj = {
    ff: 'name',
    gg: 1,
    obj: { str: '111', age: 12 },
    arr: [1, 2, 3, 4],
}
let newObjC = deepClone(obj)
newObjC.ff = '123'
console.log(obj)
console.log(newObjC)
```

## 内存泄漏

JS 里已经分配内存地址的对象，但是由于长时间没有释放或者没办法清除，造成长期占用内存的现象，会让内存资源大幅浪费，最终导致运行速度慢，甚至崩溃的情况

一些未声明直接赋值的变量、一些未清空的定时器、过度的闭包、一些引用元素没有被清除

## 事件委托

利用事件冒泡的机制来实现，把子元素的事件绑定到了父元素身上，如果子元素阻止了事件冒泡，那么委托也就不成立。

阻止事件冒泡： event.stopPropagation()
addEventListener('click',函数名,true/false) 默认是 false(事件冒泡)true(事件捕获)

## 事件循环

> 任务队列

- JS分为同步任务和异步任务
- 同步任务都在主线程上执行，形成一个执行栈
- 主线程之外，事件触发线程管理着一个任务队列，只要异步任务有了运行结果，就在任务队列之中放置一个事件。
- 一旦执行栈中的所有同步任务执行完毕（此时JS引擎空闲），系统就会读取任务队列，将可运行的异步任务添加到可执行栈中，开始执行。

> 宏任务

可以理解是每次执行栈执行的代码就是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）。浏览器为了能够使得JS内部(macro)task与DOM任务能够有序的执行，会在一个(macro)task执行结束后，在下一个(macro)task 执行开始前，对页面进行重新渲染。

task主要包含：script(整体代码)、setTimeout、setInterval、I/O、UI交互事件、postMessage、MessageChannel、setImmediate(Node.js 环境)

> 微任务

可以理解是在当前 task 执行结束后立即执行的任务。也就是说，在当前task任务后，下一个task之前，在渲染之前。所以它的响应速度相比setTimeout（setTimeout是task）会更快，因为无需等渲染。也就是说，在某一个macrotask执行完后，就会将在它执行期间产生的所有microtask都执行完毕（在渲染前）。

microtask主要包含：Promise.then、MutaionObserver、process.nextTick(Node.js 环境)

> 运行机制

- 执行一个宏任务（栈中没有就从事件队列中获取）
- 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
- 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
- 当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染
- 渲染完毕后，JS线程继续接管，开始下一个宏任务（从事件队列中获取）

![An image](/img/js/task.jpg)

> 面试题

- 面试题 1

```js
console.log('script start')

setTimeout(function () {
    console.log('setTimeout1')
    new Promise(function (resolve) {
        resolve()
    }).then(function () {
        new Promise(function (resolve) {
            resolve()
        }).then(function () {
            console.log('then4')
        })
        console.log('then2')
    })
})

new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('then1')
})

setTimeout(function () {
    console.log('setTimeout2')
})
console.log(2)

queueMicrotask(() => {
    console.log('queueMicrotask1')
})

new Promise(function (resolve) {
    resolve()
}).then(function () {
    console.log('then3')
})

console.log('script end')

// script start
// promise1
// 2
// script end

// then1
// queueMicrotask1
// then3

// setTimeout1
// then2
// then4

// setTimeout2
```

- 面试题 2

```js
console.log('script start')

function requestData(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('setTimeout')
            resolve(url)
        }, 2000)
    })
}

function getData() {
    console.log('getData start')
    requestData('why').then((res) => {
        console.log('then1-res', res)
    })
    console.log('getData end')
}

getData()

console.log('script end')

// script start
// getData start
// getData end
// script end
// setTimeout
// then1-res why
```

- 面试题 3

```js
console.log('script start')

function requestData(url) {
    console.log('requestData')
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('setTimeout')
            resolve(url)
        }, 2000)
    })
}

async function getData() {
    console.log('getData start')
    const res = await requestData('why')
    console.log('then1-res', res)
    console.log('getData end')
}

getData()

console.log('script end')

// script start
// getData start
// requestData
// script end
// setTimeout
// then1-res why
// getData end
```

- 面试题 4

```js
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}

async function async2() {
    console.log('async2')
}

console.log('script start')

setTimeout(function () {
    console.log('setTimeout')
}, 0)

async1()

new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('proimse2')
})

console.log('script end')

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// proimse2
// setTimeout
```

- 面试题 5

```js
console.log('start')
setTimeout(() => {
    console.log('setTimeout1')
}, 0)
;(async function foo() {
    console.log('async 1')
    await asyncFunction()
    console.log('async2')
})().then(console.log('foo.then'))
async function asyncFunction() {
    console.log('asyncFunction')
    setTimeout(() => {
        console.log('setTimeout2')
    }, 0)
    new Promise((res) => {
        console.log('promise1')
        res('promise2')
    }).then(console.log)
}
console.log('end')

// start
// async 1
// asyncFunction
// promise1
// foo.then
// end
// promise2
// async2
// setTimeout1
// setTimeout2
```

1. 最开始碰到 console.log("start"); 直接执行并打印出 start
2. 往下走，遇到一个 setTimeout1 就放到宏任务队列
3. 碰到立即执行函数 foo， 打印出 async 1
4. 遇到 await 堵塞队列，先 执行 await 的函数
5. 执行 asyncFunction 函数， 打印出 asyncFunction
6. 遇到第二个 setTimeout2， 放到宏任务队列
7. new Promise 立即执行，打印出 promise1
8. 执行到 res("promise2") 函数调用，就是 Promise.then。放到微任务队列
9. asyncFunction 函数就执行完毕， 把后面的打印 async2 会放到微任务队列
10. 然后打印出立即执行函数的 then 方法 foo.then
11. 最后执行打印 end
12. 开始执行微任务的队列 打印出第一个 promise2
13. 然后打印第二个 async2
14. 微任务执行完毕，执行宏任务 打印第一个 setTimeout1
15. 执行第二个宏任务 打印 setTimeout2

![An image](/img/js/thread.jpg)

## 递归求和

```js
function add(num1, num2) {
    let num = num1 + num2
    if (num2 + 1 > 100) {
        return num
    } else {
        return add(num, num2 + 1)
    }
}
let sum = add(1, 2)
console.log(sum)
```

## 通过 es6 互换值

```js
let a = 1
let b = 2
;[a, b] = [b, a]
console.log(a, b) //2 1
```

## 去重

- 方法一

```js
let arr = [1, 2, 33, 4, 5, 3, 2, 1, 5, 6, 4, 3]

// 方法一
function fn(arr) {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) === -1) {
            newArr.push(arr[i])
        }
    }
    return newArr
}
let a = fn(arr)
console.log(a) // [1, 2, 33, 4, 5, 3, 6]
```

- 方法二

```js
let arr = [1, 2, 33, 4, 5, 3, 2, 1, 5, 6, 4, 3]

let item = [...new Set(arr)]
console.log(item) // [1, 2, 33, 4, 5, 3, 6]
```

## 数组扁平化

- 方法一

```js
function flatten(array) {
    let result = []
    array.forEach((item) => {
        if (Array.isArray(item)) {
            const flatterItem = flatten1(item)
            result = result.concat(flatterItem)
        } else {
            result = result.concat(item)
        }
    })
    return result
}

console.log(flatten([1, 2, [3, [4, [5, [6]]]]]))
```

- 方法二

```js
let arr = [1, 2, [3, [4, [5, [6]]]]]
console.log(arr.flat(Infinity))
```

## 将数组扁平化且去除重复的元素，最后升序输出

```js
let arr = [1, [1, [2]], [3, 4], 7, 4, [2, 3, [4, 5, [2, 2, 1, 5, 4, 3, 8]]]]

function fn(arr) {
    let newArr = arr.flat(Infinity)
    newArr = [...new Set(newArr)]
    return newArr.sort((a, b) => a - b)
}
console.log(fn(arr)) //[1, 2, 3, 4, 5, 7, 8]
```

## 找出数组中出现最多的数字

```js
function findMostRepetitionsNumber(arr) {
    let num = null
    let count = 1
    const obj = {}
    for (let i = 0; i < arr.length; i++) {
        if (!obj[arr[i]]) {
            obj[arr[i]] = 1
        } else {
            obj[arr[i]] += 1
            if (obj[arr[i]] > count) {
                count = obj[arr[i]]
                num = arr[i]
            }
        }
    }
    return {
        num,
        count,
    }
}

const arr = [3, 5, 6, 6, 6, 6, 5, 9, 8, 10, 5, 7]

console.log(findMostRepetitionsNumber(arr))
```

## 如何拦截全局 Promise reject，但并没有设定 reject 处理器 时候的错误

```js
// 使用Try catch 只能拦截try语句块里面的
try {
    new Promise((resolve, reject) => {
        reject('WTF 123')
    })
} catch (e) {
    console.log('e', e)
    throw e
}

// 使用 unhandledrejection 来拦截全局错误  （这个是对的）
window.addEventListener('unhandledrejection', (event) => {
    event && event.preventDefault()
    console.log('event', event)
})
```

## ajax 是什么

创建交互式网页应用的网页开发技术，在不重新加载整个网页的前提下，与服务器交换数据并更新部分内容。
原理：通过 XmlHttpRequest 对象向服务器发送异步请求，然后从服务器拿到数据，最后通过 js 操作 DOM 更新页面。

1. 创建 XmlHttRequest 对象 xmh
2. 通过 xmh 对象里的 open()方法和服务器建立连接
3. 构建请求所需数据，并通过 xmh 对象的 send()发送给服务器
4. 通过 xmh 对象的 onreadystate change 事件监听服务器和你的通信状态
5. 接收并处理服务器响应的数据结果
6. 把处理的数据更新到 HTML 上

## get 和 post 区别

1. get 一般是获取数据，post 一般是提交数据
2. get 参数放在 url 上，所以安全性比较差，post 放在 body 上
3. get 刷新服务器或退回没有影响，post 请求退回时会重新提交
4. get 请求会被缓存，post 请求不会被缓存
5. get 请求会被保存在浏览器历史记录中，post 不会
6. get 请求只能进行 url 编码，post 请求支持很多种

## script 标签里的 async 和 defer 有什么区别

- 没有 async 和 defer 这两个属性的时候，浏览器会立刻加载并执行指定脚本
- 有 async，加载和渲染后面元素的过程将和 script 的加载和执行并经进行（异步）
- 有 defer，加载和渲染后面元素的过程将和 script 的加载并行进行（异步），但是它的执行事件要等所有元素解析完成之后才会执行

## setTimeout 最小执行时间是多少

html5 规定的内容：
setTimeout 最小执行时间是 4ms
setInterval 最小执行时间是 10ms

## 浏览器存储方式

- cookie

    H5 标准前的本地存储方法
    兼容性好，请求头自带 cookie
    存储量小，资源浪费，使用麻烦（封装）

- localstorage
    H5 加入的以键值对为标准的方法
    操作方便，永久存储，兼容性较好
    保存值的类型被限定，浏览器在隐私模式不可读取，不能被爬虫

- sessionstorage
    当前页面关闭后就会立刻清理，会话级别的存储方法

- indexedDB
    H5 标准的存储方法，以键值对进行存储，可以快速读取

## token 存储在哪

token：验证身份的令牌，一般就是用户通过账号密码登录后，服务端把这些凭证通过加密等一系列操作后得到的字符串。

1. 存在 localstorage 里，后期每次请求接口都需要将它当作一个字段传给后端
2. 存 cookie 中，会自动发送，缺点就是不能跨域

如果存在 localstorage 中，容易被 XSS 共计，但是如果做好了对应措施，利大于弊
如果存在 cookie 中会有 CSRF 攻击

## 大文件上传

分片上传

1. 把需要上传的文件按照一定的规则，分割成相同大小的数据块
2. 初始化一个分片上传任务，返回本次分片上传的唯一标识
3. 按照一定的规则把各个数据块上传
4. 发送完成后，服务端后判断数据上传的完整性，如果完整，那么就把数据库合并成成原始文件

## 手写实现 sleep

```js
(async () => {
    console.log('start')
    await sleep(3000)
    console.log('end')

    function sleep(timer) {
        return new Promise((res) => {
            setTimeout(() => {
                res()
            }, timer)
        })
    }
})()
```

## 找到仅在两个数组中出现过一次的数据

```js
var a = [1, 2, 4], b = [1, 3, 8, 4]
const newArr = a.concat(b).filter((item, _, arr) => {
  return arr.indexOf(item) === arr.lastIndexOf(item)
})
```

## V8 引擎

V8 是用 C++编写的 Google 开源高性能 Javascript 和 WebAssembly 引擎，它用于 Chrome 和 Node.js 等
它实现 ECMScript 和 WebAssembly，并可以跨平台运行
V8 可以独立运行，也可以嵌入到任何 C++应用程序中

![An image](/img/js/v8.jpg)

- JS 引擎比较广泛采用的就是可达性中的标记清除算法，当然类似于 V8 引擎为了进行更好的优化，他在算法的实现细节上也会结合一些其他的算法。
- 标记整理和标记清除相似，不同的式回收期间同时会将保留的存储对象搬运汇集到连续的内存空间，从而整合空闲空间，避免内存碎片化。
- 分代收集，对象被分成两组：“新的”和“旧的”。许多对象出现，完成他们的工作并很快死去，他们可以很快被清理。那些长期存活的对象会变得“老旧”，而且被检查的频次也会减少。
- 增量收集，如果有许多对象，并且我们试图一次遍历并标记整个对象集，则可能需要一些时间，并在执行过程中带来明显的延迟。所以引擎试图将垃圾收集工作分成几部分来做，然后将这几部分会逐一进行处理，这样会有许多微笑的延迟而不是一个大的延迟。

## 包管理工具

> 常见属性

- name: 项目名称
- version: 项目版本号
- description：描述信息，很多时候作为项目的基本描述
- main: 程序入口
- scripts: 用于配置一些脚本命令，以键值对形式存在
- author：作者相关信息
- license: 开源协议
- private: 当前项目是否私有
- dependencies: 记录开发坏境还是生成环境都需要依赖的包
- devDependencies: 记录生成环境不需要的，如 webpack、babel 等

> npm install 原理

![An image](/img/js/npm.jpg)
