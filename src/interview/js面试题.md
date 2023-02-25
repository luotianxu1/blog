---
title: JS面试题
icon: markdown
order: 2
date: 2023-02-17
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

- 基本数据类型： String Number Boolean undefined null Bigint Symbol，基本数据类型保存在内存中，保存的就是一个具体的值
- 引用数据类型（复杂数据类型）：Object Function Array，引用数据类型保存在堆内存中，声明一个引用类型的变量，它保存的是引用类型数据的地址。假如声明两个引用类型同时指向了一个地址的时候，修改其中一个那么另外一个也会改变。

```js
let obj = {
    name: '张三',
}
let obj1 = obj
obj1.name = '李四'
console.log(obj.name) //李四
```

## Symbol

Symbol 是 ES6 中引入的一种新的基本数据类型，用于表示一个独一无二的值。它是 JavaScript 中的第七种数据类型，与 undefined、null、Number（数值）、String（字符串）、Boolean（布尔值）、Object（对象）并列。

- 不能与其他的数据进行比较以及运算（唯一性）

```js
let a1 = Symbol('11')
let a2 = Symbol('11')
console.log(a1 === a2) // flase
```

![An image](/img/js/symbol.jpg)

- 不能与其他数据进行运算

```js
let result = a2 + 100 //报错
let result = a2 > 100 //报错
let result = a1 + a1 //报错
```

- 隐藏性，for···in 不能访问,使用 Object.getOwnPropertySymbols 方法可以进行访问

```js
let a = Symbol('Nan')
let obj = {
    [a]: 'Chen',
}
console.log(obj)//{Symbol(Nan): "Chen"}
for (const option in obj) {
    console.log(obj[option]) //啥都没有
}
let array = Object.getOwnPropertySymbols(obj)
console.log(array) //[Symbol(Nan)]
console.log(obj[array[0]]) //Chen
```

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

## 暂时性死区

在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）

```js
let a = 'a'
function log() {
  console.log(a)
  let a = 'b'

}
log() // ReferenceError: a is not defined
```

在本实例中，变量a的作用域，一个是全局作用域，另一个是函数作用域，已经被确定。也就是说函数内部的a此时已经确定为函数内部的作用域。

在执行阶段时，根据作用域链原则，函数内部会先寻找函数内部的作用域变量， 既然a在函数中已经被确定，那么就不会向全局作用域去寻找a了。默认函数内部a是已经定义的。但函数顺序执行的时候，访问a的同时并没有在访问之前声明a，也就是树在当前作用域下，没有找到a的生命和定义，就会出现 为定义的错误了。

## 箭头函数

- 不能作为构造函数使用，不能用 new
- 箭头函数没有原型
- 箭头函数没有 arguments
- 箭头函数不能用 call，bind，apply 去改变 this 的指向
- this 指向外层第一个函数的 this

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

## Map（字典）

Map对象保存键值对，并且能够记住键的原始插入顺序。任何值（对象或者原始值）都可以作为一个键或一个值。

- Map对象这种数据结构和和对象类型，都已键值对的形式存储数据，即 key-vlue 形式。
- Map对象存储的数据是有序的，而我们平常使用的对象是无序的，所以通常当我们需要使用对象形式（键值对）存储数据且需要有序时，采用Map对象进行存储。
- Map对象的键值可以是任意类型，我们平时使用的对象只能使用字符串作为键。

> 基本使用

```js
let defaultMap = new Map([['name', '张三'], ['age', 20]]);
```

![An image](/img/js/Map.jpg)

```js
myMap.set('name', '小猪课堂'); // 字符串作为键
myMap.set(12, '会飞的猪'); // number 类型作为键
myMap.set({}, '知乎'); // 对象类型作为键
```

![An image](/img/js/Map2.jpg)

> 获取长度

```js
let myMapSize = myMap.size;
```

> 获取值

```js
let objKey = {};
myMap.set('name', '小猪课堂'); // 字符串作为键
let name = myMap.get('name');
console.log(name); // 小猪课堂 会飞的猪 知乎
```

> 删除某个值

```js
myMap.delete('name');
```

> 判断某个值是否存在

```js
myMap.has('name'); // 返回 bool 值
```

## Set（集合）

Set对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。

- Set对象是一个类数组对象，它长得就很像数组。
- Set对象存储的值是不重复的，所以我们通常使用它来实现数组去重。
- Set对象存储的数据不是键值对的形式，而且它可以存储任何类型的数据。

> 基本使用

```js
let defaultSet = new Set(['张三', 12, true]);
```

![An image](/img/js/Set.jpg)

> 插入数据

```js
mySet.add(1);
```

> 获取长度

```js
let mySetSize = mySet.size;
```

> 获取值

由于Set对象存储的不是键值对形式，所以未提供get方法获取值，我们通常遍历它获取值：

```js
mySet.forEach((item) => {
  console.log(item)
})
```

> 删除某个值

```js
mySet.delete(1);
```

> 判断某个值是否存在

```js
mySet.has(1); // 返回Boolean值
```

## Map与Set的区别

- Map和Set查找速度都非常快，时间复杂度为O(1)，而数组查找的时间复杂度为O(n)。
- Map对象初始化的值为一个二维数组，Set对象初始化的值为一维数组。
- Map对象和Set对象都不允许键重复（可以将Set对象的键想象成值）。
- Map对象的键是不能改的，但是值能改，Set对象只能通过迭代器来更改值。

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

1. 先创建一个空对象`{}`
2. 把空对象和构造函数通过原型链进行链接`son.__proto__ = Father.prototype`
3. 把构造函数的 this 绑定到新的空对象身上`Father.call(this)`
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
__proto__可以理解为指针。实例对象中的属性，指向了构造函数的原型（protortpe）
一个实例对象在调用属性和方法的时候，会一次从实例本身、构造函数原型、原型的原型上去查找

![An image](/img/js/proto.jpg)

## 继承

1. 原型链继承
2. 借用构造函数继承
3. 组合式继承
4. ES6 的 class 继承

### 原型链继承

```js
function Super(){ this.a=1 }
Super.prototype.say = function(){ console.log(‘hhh’) }
function Sub(){}
Sub.prototype = new Super()

const test = new Sub()
console.log( test.say() )// hhh
```

优点：通过原型继承多个引用类型的属性和方法
缺点：Sub原型变成了Super的实例，如果Super的实例某个属性是引用值，该引用值就会被应用到所有Sub创建的实例中去，会有污染问题。

### 盗用构造函数(构造函数模式+call)

```js
function Super = function(){ this.a = 1 }
function Sub = function(){
       Super.call(this)
       this.b = 2
}

const test = new Sub()
```

优点：每个实例都会有自己的a属性，哪怕是引用值也不会被污染
缺点：Super构造函数中的方法在每个实例上都要创建一遍（除非该方法声明提到全局）；Sub的实例无法访问Super原型上的方法

### 组合继承(原型继承+盗用构造函数继承)

```js
function Super(){ this.a=[1,2] }
Super.prototype.say = function(){ console.log(‘hhh’) }
function Sub(){
    Super.call(this)
    this b=2
}
Sub.prototype = new Super()
 
const test1 = new Sub()
console.log( test1.say() )// hhh
test1.a.push(3)
console.log(test1.a)// [1,2,3]
const test2 = new Sub()
console.log(test2.a)// [1,2]
```

优点：可以在子类构造函数中向父类传参数,父类的引用属性不会被共享
缺点：子类不能访问父类原型上定义的方法（即不能访问Parent.prototype上定义的方法），因此所有方法属性都写在构造函数中，每次创建实例都会初始化

### 原型式继承

```js
// es5
const obj = { a:1 }
function createObj(o){
    const Fn(){}
    Fn.prototype = o
    return new Fn()
}
const test = createObj(obj)

// es6
const obj = { a:1 }
const test = Object.create(obj)
```

优点：对一个对象进行浅克隆创建另一个对象，同时继承该对象的原型属性
缺点：由于是浅克隆，所以实例共享的对象属性如果是引用值，会受污染。

### 寄生式继承(构造函数模式+工厂模式)

```js
function createObj(o){
    let clone = objectCopy(o)
    clone.say=function(){
        console.log(‘hhh’)
    }
    return clone
}

const obj = { a:1 }
const test = createObj(obj)
```

优点：根据一个对象克隆创建另一个对象，并增强对象
缺点：同【盗用构造函数继承】方法在每个实例上都要创建一遍

### 寄生式组合继承(盗用构造函数继承 + 原型式继承)

```js
function Super(){ this.a=[1,2] }
Super.prototype.say = function(){ console.log(‘hhh’) }
function Sub(){
    Super.call(this)
    this b=2
}

Sub.prototype = Object.create(Super.prototype)
Sub.prototype.constructor = Sub

const test = new Sub()
```

优点：集合了【原型式继承】和【盗用构造函数继承】的优点，效率比【组合继承】更高。

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
        console.log(1)
    }
    return this
}
Foo.getName = function () {
    console.log(2)
}
Foo.prototype.getName = function () {
    console.log(3)
}
var getName = function () {
    console.log(4)
}
function getName() {
    console.log(5)
}
Foo.getName()
getName()
Foo().getName()
getName()
new Foo.getName()
new Foo().getName()
new new Foo().getName()
```

- 执行 Foo.getName(), 执行 Foo 函数对象上的的静态方法。打印出 2
- 执行 getName()， 就是执行的 getName 变量的函数。打印 4
  - 为什么这里是 执行的 变量 getName，而不是函数 getName 呢。这得归功于 js 的预编译 js 在执行之前进行预编译，会进行 函数提升 和 变量提升,所以函数和变量都进行提升了，但是函数声明的优先级最高，会被提升至当前作用域最顶端。当在执行到后面的时候会导致 getName 被重新赋值，就会把执行结果为 4 的这个函数赋值给变量
- 执行 Foo().getName()， 调用 Foo 执行后返回值上的 getName 方法。 Foo 函数执行了，里面会给外面的 getName 函数重新赋值，并返回了 this。 也就是执行了 this.getName。所以打印出了 1
- 执行 getName()， 由于上一步，函数被重新赋值。所以这次的结果和上次的结果是一样的，还是为 1
- 执行 new Foo.getName()， 这个 new 其实就是 new 了 Foo 上面的静态方法 getName 所以是 2。 当然如果你们在这个函数里面打印 this 的话，会发现指向的是一个新对象 也就是 new 出来的一个新对象
  - 可以把 Foo.getName()看成一个整体，因为这里 . 的优先级比 new 高
- 执行 new Foo().getName()，这里函数执行 new Foo() 会返回一个对象，然后调用这个对象原型上的 getName 方法， 所以结果是 3
- 执行 new new Foo().getName(), 这个和上一次的结果是一样，上一个函数调用后并咩有返回值，所以在进行 new 的时候也没有意义了。 最终结果也是 3

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

> 闭包形成条件

1. 函数嵌套
2. 内部函数引用外部函数的局部变量

> 闭包的存在意义

1. 可以读取函数内部的变量
2. 可以使变量的值长期保存在内存中，生命周期比较长。
3. 可用来实现JS模块（JQuery库等）

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

JSON.stringify()缺点

1. 如果obj里面有时间对象，则JSON.stringify后再JSON.parse的结果，时间将只是字符串的形式，而不是对象的形式。
2. 如果obj里面有RegExp，则打印出来是空对象。
3. 如果对象中有函数或者undefined，则会直接被丢掉。
4. 如果json里有对象是由构造函数生成的，则会丢掉对象的constructon。
5. 如果对象中存在循环引用的情况也无法正确实现深拷贝。
6. 如果对象中存在NAN，则序列化后会变成null。

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

## 异步编程的实现方式

- 回调函数

  - 优点：简单、容易理解
  - 缺点：不利于维护，代码耦合高

- 事件监听(采用时间驱动模式，取决于某个事件是否发生)

  - 优点：容易理解，可以绑定多个事件，每个事件可以指定多个回调函数
  - 缺点：事件驱动型，流程不够清晰

- 发布/订阅(观察者模式)

类似于事件监听，但是可以通过‘消息中心‘，了解现在有多少发布者，多少订阅者

- Promise 对象

  - 优点：可以利用 then 方法，进行链式写法；可以书写错误时的回调函数；
  - 缺点：编写和理解，相对比较难

- Generator 函数

  - 优点：函数体内外的数据交换、错误处理机制
  - 缺点：流程管理不方便

- async 函数

  - 优点：内置执行器、更好的语义、更广的适用性、返回的是 Promise 、结构清晰。
  - 缺点：错误处理机制

## 事件委托

利用事件冒泡的机制来实现，把子元素的事件绑定到了父元素身上，如果子元素阻止了事件冒泡，那么委托也就不成立。

阻止事件冒泡： event.stopPropagation()
addEventListener('click',函数名,true/false) 默认是 false(事件冒泡)true(事件捕获)

## 事件循环

> 任务队列

- JS 分为同步任务和异步任务
- 同步任务都在主线程上执行，形成一个执行栈
- 主线程之外，事件触发线程管理着一个任务队列，只要异步任务有了运行结果，就在任务队列之中放置一个事件。
- 一旦执行栈中的所有同步任务执行完毕（此时 JS 引擎空闲），系统就会读取任务队列，将可运行的异步任务添加到可执行栈中，开始执行。

> 宏任务

可以理解是每次执行栈执行的代码就是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）。浏览器为了能够使得 JS 内部(macro)task 与 DOM 任务能够有序的执行，会在一个(macro)task 执行结束后，在下一个(macro)task 执行开始前，对页面进行重新渲染。

task 主要包含：script(整体代码)、setTimeout、setInterval、I/O、UI 交互事件、postMessage、MessageChannel、setImmediate(Node.js 环境)

> 微任务

可以理解是在当前 task 执行结束后立即执行的任务。也就是说，在当前 task 任务后，下一个 task 之前，在渲染之前。所以它的响应速度相比 setTimeout（setTimeout 是 task）会更快，因为无需等渲染。也就是说，在某一个 macrotask 执行完后，就会将在它执行期间产生的所有 microtask 都执行完毕（在渲染前）。

microtask 主要包含：Promise.then、MutaionObserver、process.nextTick(Node.js 环境)

> 运行机制

- 执行一个宏任务（栈中没有就从事件队列中获取）
- 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
- 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
- 当前宏任务执行完毕，开始检查渲染，然后 GUI 线程接管渲染
- 渲染完毕后，JS 线程继续接管，开始下一个宏任务（从事件队列中获取）

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

## 前端模块化

前端模块化就是复杂的文件编程一个一个独立的模块，比如js文件等等，分成独立的模块有利于重用
（复用性）和维护（版本迭代），这样会引来模块之间相互依赖的问题，所以有了commonJS规范，
AMD，CMD规范等等，以及用于js打包（编译等处理）的工具webpack。

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
;(async () => {
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
var a = [1, 2, 4],
    b = [1, 3, 8, 4]
const newArr = a.concat(b).filter((item, _, arr) => {
    return arr.indexOf(item) === arr.lastIndexOf(item)
})
```

## 快速打乱数组

```js
var arr = [1,2,3,4,5,6,7,8,9,10];
arr.sort(()=> Math.random() - 0.5)
//利用sort return 大于等于0不交换位置，小于0交换位置 
// [5, 8, 4, 3, 2, 9, 10, 6, 1, 7]
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

## 垃圾回收

### 为什么回收

我们知道写代码时创建一个基本类型、对象、函数……都是需要占用内存的，但是我们并不关注这些，因为这是引擎为我们分配的，我们不需要显式手动的去分配内存。JavaScript 的引用数据类型是保存在堆内存中的，然后在栈内存中保存一个对堆内存中实际对象的引用，所以，JavaScript 中对引用数据类型的操作都是操作对象的引用而不是实际的对象。可以简单理解为，栈内存中保存了一个地址，这个地址和堆内存中的实际值是相关的。

那上面代码首先我们声明了一个变量 test，它引用了对象 {name: 'isboyjc'}，接着我们把这个变量重新赋值了一个数组对象，也就变成了该变量引用了一个数组，那么之前的对象引用关系就没有了，如下图
![An image](/img/js/recovery.jpg)
没有了引用关系，也就是无用的对象，这个时候假如任由它搁置，一个两个还好，多了的话内存也会受不了，所以就需要被清理（回收）。

### 回收策略

在 JavaScript 内存管理中有一个概念叫做 可达性，就是那些以某种方式可访问或者说可用的值，它们被保证存储在内存中，反之不可访问则需回收。
至于如何回收，其实就是怎样发现这些不可达的对象（垃圾）它并给予清理的问题， JavaScript 垃圾回收机制的原理说白了也就是定期找出那些不再用到的内存（变量），然后释放其内存。

- 标记清除算法

标记清除（Mark-Sweep），目前在 JavaScript引擎 里这种算法是最常用的，到目前为止的大多数浏览器的 JavaScript引擎 都在采用标记清除算法，只是各大浏览器厂商还对此算法进行了优化加工，且不同浏览器的 JavaScript引擎 在运行垃圾回收的频率上有所差异。

就像它的名字一样，此算法分为 标记 和 清除 两个阶段，标记阶段即为所有活动对象做上标记，清除阶段则把没有标记（也就是非活动对象）销毁。

整个标记清除算法大致过程就像下面这样

1. 垃圾收集器在运行时会给内存中的所有变量都加上一个标记，假设内存中所有对象都是垃圾，全标记为0
2. 然后从各个根对象开始遍历，把不是垃圾的节点改成1
3. 清理所有标记为0的垃圾，销毁并回收它们所占用的内存空间
4. 最后，把所有内存中对象标记修改为0，等待下一轮垃圾回收

优点

标记清除算法的优点只有一个，那就是实现比较简单，打标记也无非打与不打两种情况，这使得一位二进制位（0和1）就可以为其标记，非常简单

缺点

标记清除算法有一个很大的缺点，就是在清除之后，剩余的对象内存位置是不变的，也会导致空闲内存空间是不连续的，出现了 内存碎片（如下图），并且由于剩余空闲内存不是一整块，它是由不同大小内存组成的内存列表，这就牵扯出了内存分配的问题

![An image](/img/js/recovery1.jpg)

假设我们新建对象分配内存时需要大小为 size，由于空闲内存是间断的、不连续的，则需要对空闲内存列表进行一次单向遍历找出大于等于 size 的块才能为其分配（如下图）

![An image](/img/js/recovery2.jpg)

那如何找到合适的块呢？我们可以采取下面三种分配策略

1. First-fit，找到大于等于 size 的块立即返回
2. Best-fit，遍历整个空闲列表，返回大于等于 size 的最小分块
3. Worst-fit，遍历整个空闲列表，找到最大的分块，然后切成两部分，一部分 size 大小，并将该部分返回

这三种策略里面 Worst-fit 的空间利用率看起来是最合理，但实际上切分之后会造成更多的小块，形成内存碎片，所以不推荐使用，对于 First-fit 和 Best-fit 来说，考虑到分配的速度和效率 First-fit 是更为明智的选择。

综上所述，标记清除算法或者说策略就有两个很明显的缺点

- 内存碎片化，空闲内存块是不连续的，容易出现很多空闲内存块，还可能会出现分配所需内存过大的对象时找不到合适的块
- 分配速度慢，因为即便是使用 First-fit 策略，其操作仍是一个 O(n) 的操作，最坏情况是每次都要遍历到最后，同时因为碎片化，大对象的分配效率会更慢

归根结底，标记清除算法的缺点在于清除之后剩余的对象位置不变而导致的空闲内存不连续，所以只要解决这一点，两个缺点都可以完美解决了。而标记整理（Mark-Compact）算法 就可以有效地解决，它的标记阶段和标记清除算法没有什么不同，只是标记结束后，标记整理算法会将活着的对象（即不需要清理的对象）向内存的一端移动，最后清理掉边界的内存（如下图）

![An image](/img/js/recovery3.jpg)

- 引用计数算法

引用计数（Reference Counting），这其实是早先的一种垃圾回收算法，它把对象是否不再需要简化定义为对象有没有其他对象引用到它，如果没有引用指向该对象（零引用），对象将被垃圾回收机制回收，目前很少使用这种算法了。

- 当声明了一个变量并且将一个引用类型赋值给该变量的时候这个值的引用次数就为 1
- 如果同一个值又被赋给另一个变量，那么引用数加 1
- 如果该变量的值被其他的值覆盖了，则引用次数减 1
- 当这个值的引用次数变为 0 的时候，说明没有变量在使用，这个值没法被访问了，回收空间，垃圾回收器会在运行的时候清理掉引用次数为 0 的值占用的内存

这种方式是不是很简单？确实很简单，不过在引用计数这种算法出现没多久，就遇到了一个很严重的问题——循环引用，即对象 A 有一个指针指向对象 B，而对象 B 也引用了对象 A ，如下面这个例子

```js
function test(){
  let A = new Object()
  let B = new Object()
  A.b = B
  B.a = A
}
```

如上所示，对象 A 和 B 通过各自的属性相互引用着，按照上文的引用计数策略，它们的引用数量都是 2，但是，在函数 test 执行完成之后，对象 A 和 B 是要被清理的，但使用引用计数则不会被清理，因为它们的引用数量不会变成 0，假如此函数在程序中被多次调用，那么就会造成大量的内存不会被释放。

我们再用标记清除的角度看一下，当函数结束后，两个对象都不在作用域中，A 和 B 都会被当作非活动对象来清除掉，相比之下，引用计数则不会释放，也就会造成大量无用内存占用，这也是后来放弃引用计数，使用标记清除的原因之一。

优点:引用计数算法的优点我们对比标记清除来看就会清晰很多，首先引用计数在引用值为 0 时，也就是在变成垃圾的那一刻就会被回收，所以它可以立即回收垃圾。而标记清除算法需要每隔一段时间进行一次，那在应用程序（JS脚本）运行过程中线程就必须要暂停去执行一段时间的 GC，另外，标记清除算法需要遍历堆里的活动以及非活动对象来清除，而引用计数则只需要在引用时计数就可以了。

缺点:引用计数的缺点想必大家也都很明朗了，首先它需要一个计数器，而此计数器需要占很大的位置，因为我们也不知道被引用数量的上限，还有就是无法解决循环引用无法回收的问题，这也是最严重的。

### V8对GC的优化

#### 分代式垃圾回收

- 新老生代

V8 的垃圾回收策略主要基于分代式垃圾回收机制，V8 中将堆内存分为新生代和老生代两区域，采用不同的垃圾回收器也就是不同的策略管理垃圾回收。

新生代的对象为存活时间较短的对象，简单来说就是新产生的对象，通常只支持1～8M的容量，而老生代的对象为存活事件较长或常驻内存的对象，简单来说就是经历过新生代垃圾回收后还存活下来的对象，容量通常比较大。

![An image](/img/js/recovery4.jpg)

对于新老两块内存区域的垃圾回收，V8 采用了两个垃圾回收器来管控，我们暂且将管理新生代的垃圾回收器叫做新生代垃圾回收器，同样的，我们称管理老生代的垃圾回收器叫做老生代垃圾回收器。

- 新生代垃圾回收

新生代对象是通过一个名为 Scavenge 的算法进行垃圾回收，在 Scavenge算法 的具体实现中，主要采用了一种复制式的方法即 Cheney算法。Cheney算法中将堆内存一分为二，一个是处于使用状态的空间我们暂且称之为 使用区，一个是处于闲置状态的空间我们称之为 空闲区，如下图所示

![An image](/img/js/recovery5.jpg)

新加入的对象都会存放到使用区，当使用区快被写满时，就需要执行一次垃圾清理操作,当开始进行垃圾回收时，新生代垃圾回收器会对使用区中的活动对象做标记，标记完成之后将使用区的活动对象复制进空闲区并进行排序，随后进入垃圾清理阶段，即将非活动对象占用的空间清理掉。最后进行角色互换，把原来的使用区变成空闲区，把原来的空闲区变成使用区。当一个对象经过多次复制后依然存活，它将会被认为是生命周期较长的对象，随后会被移动到老生代中，采用老生代的垃圾回收策略进行管理。

另外还有一种情况，如果复制一个对象到空闲区时，空闲区空间占用超过了 25%，那么这个对象会被直接晋升到老生代空间中，设置为 25% 的比例的原因是，当完成 Scavenge 回收后，空闲区将翻转成使用区，继续进行对象内存的分配，若占比过大，将会影响后续内存分配。

- 老生代垃圾回收

相比于新生代，老生代的垃圾回收就比较容易理解了，上面我们说过，对于大多数占用空间大、存活时间长的对象会被分配到老生代里，因为老生代中的对象通常比较大，如果再如新生代一般分区然后复制来复制去就会非常耗时，从而导致回收执行效率不高，所以老生代垃圾回收器来管理其垃圾回收执行，它的整个流程就采用的就是上文所说的标记清除算法了。

首先是标记阶段，从一组根元素开始，递归遍历这组根元素，遍历过程中能到达的元素称为活动对象，没有到达的元素就可以判断为非活动对象。清除阶段老生代垃圾回收器会直接将非活动对象，也就是数据清理掉。前面我们也提过，标记清除算法在清除后会产生大量不连续的内存碎片，过多的碎片会导致大对象无法分配到足够的连续内存，而V8中就采用了我们上文中说的标记整理算法来解决这一问题来优化空间。

- 为什么需要分代式？

分代式机制把一些新、小、存活时间短的对象作为新生代，采用一小块内存频率较高的快速清理，而一些大、老、存活时间长的对象作为老生代，使其很少接受检查，新老生代的回收机制及频率是不同的，可以说此机制的出现很大程度提高了垃圾回收机制的效率。

#### 并行回收(Parallel)

在介绍并行之前，我们先要了解一个概念 全停顿（Stop-The-World），我们都知道 JavaScript 是一门单线程的语言，它是运行在主线程上的，那在进行垃圾回收时就会阻塞 JavaScript 脚本的执行，需等待垃圾回收完毕后再恢复脚本执行，我们把这种行为叫做 全停顿。

比如一次 GC 需要 60ms ，那我们的应用逻辑就得暂停 60ms ，假如一次 GC 的时间过长，对用户来说就可能造成页面卡顿等问题。

既然存在执行一次 GC 比较耗时的情况，考虑到一个人盖房子难，那两个人、十个人...呢？切换到程序这边，那我们可不可以引入多个辅助线程来同时处理，这样是不是就会加速垃圾回收的执行速度呢？因此 V8 团队引入了并行回收机制。

所谓并行，也就是同时的意思，它指的是垃圾回收器在主线程上执行的过程中，开启多个辅助线程，同时执行同样的回收工作。

![An image](/img/js/recovery6.jpg)

简单来说，使用并行回收，假如本来是主线程一个人干活，它一个人需要 3 秒，现在叫上了 2 个辅助线程和主线程一块干活，那三个人一块干一个人干 1 秒就完事了，但是由于多人协同办公，所以需要加上一部分多人协同（同步开销）的时间我们算 0.5 秒好了，也就是说，采用并行策略后，本来要 3 秒的活现在 1.5 秒就可以干完了。

不过虽然 1.5 秒就可以干完了，时间也大大缩小了，但是这 1.5 秒内，主线程还是需要让出来的，也正是因为主线程还是需要让出来，这个过程内存是静态的，不需要考虑内存中对象的引用关系改变，只需要考虑协同，实现起来也很简单。

新生代对象空间就采用并行策略，在执行垃圾回收的过程中，会启动了多个线程来负责新生代中的垃圾清理操作，这些线程同时将对象空间中的数据移动到空闲区域，这个过程中由于数据地址会发生改变，所以还需要同步更新引用这些对象的指针，此即并行回收。

#### 增量标记与懒性清理

增量就是将一次 GC 标记的过程，分成了很多小步，每执行完一小步就让应用逻辑执行一会儿，这样交替多次后完成一轮 GC 标记（如下图）

![An image](/img/js/recovery7.jpg)

- 三色标记法(暂停与恢复)

我们知道老生代是采用标记清理算法，而上文的标记清理中我们说过，也就是在没有采用增量算法之前，单纯使用黑色和白色来标记数据就可以了，其标记流程即在执行一次完整的 GC 标记前，垃圾回收器会将所有的数据置为白色，然后垃圾回收器在会从一组跟对象出发，将所有能访问到的数据标记为黑色，遍历结束之后，标记为黑色的数据对象就是活动对象，剩余的白色数据对象也就是待清理的垃圾对象。

如果采用非黑即白的标记策略，那在垃圾回收器执行了一段增量回收后，暂停后启用主线程去执行了应用程序中的一段 JavaScript 代码，随后当垃圾回收器再次被启动，这时候内存中黑白色都有，我们无法得知下一步走到哪里了。

为了解决这个问题，V8 团队采用了一种特殊方式： 三色标记法。

1. 白色指的是未被标记的对象
2. 灰色指自身被标记，成员变量（该对象的引用对象）未被标记
3. 黑色指自身和成员变量皆被标记

![An image](/img/js/recovery8.jpg)

如上图所示，我们用最简单的表达方式来解释这一过程，最初所有的对象都是白色，意味着回收器没有标记它们，从一组根对象开始，先将这组根对象标记为灰色并推入到标记工作表中，当回收器从标记工作表中弹出对象并访问它的引用对象时，将其自身由灰色转变成黑色，并将自身的下一个引用对象转为灰色。

就这样一直往下走，直到没有可标记灰色的对象时，也就是无可达（无引用到）的对象了，那么剩下的所有白色对象都是无法到达的，即等待回收（如上图中的 C、E 将要等待回收）。

采用三色标记法后我们在恢复执行时就好办多了，可以直接通过当前内存中有没有灰色节点来判断整个标记是否完成，如没有灰色节点，直接进入清理阶段，如还有灰色标记，恢复时直接从灰色的节点开始继续执行就可以。

三色标记法的 mark 操作可以渐进执行的而不需每次都扫描整个内存空间，可以很好的配合增量回收进行暂停恢复的一些操作，从而减少 全停顿 的时间。

- 写屏障(增量中修改引用)

一次完整的 GC 标记分块暂停后，执行任务程序时内存中标记好的对象引用关系被修改了，增量中修改引用，可能不太好理解，我们举个例子（如图）

![An image](/img/js/recovery9.jpg)

假如我们有A、B、C三个对象依次引用，在第一次增量分段中全部标记为黑色（活动对象），而后暂停开始执行应用程序也就是 JavaScript 脚本，在脚本中我们将对象 B 的指向由对象 C 改为了对象 D ，接着恢复执行下一次增量分段

这时其实对象C已经无引用关系了，但是目前它是黑色（代表活动对象）此一整轮GC是不会清理C的，不过我们可以不考虑这个，因为就算此轮不清理等下一轮GC也会清理，这对我们程序运行并没有太大影响
我们再看新的对象 D 是初始的白色，按照我们上面所说，已经没有灰色对象了，也就是全部标记完毕接下来要进行清理了，新修改的白色对象D将在次轮GC的清理阶段被回收，还有引用关系就被回收，后面我们程序里可能还会用到对象D呢，这肯定是不对的

为了解决这个问题，V8增量回收使用 写屏障 (Write-barrier) 机制，即一旦有黑色对象引用白色对象，该机制会强制将引用的白色对象改为灰色，从而保证下一次增量GC标记阶段可以正确标记，这个机制也被称作 强三色不变性

那在我们上图的例子中，将对象B的指向由对象C改为对象D后，白色对象D会被强制改为灰色

- 增量标记与惰性清理的优缺？

增量标记与惰性清理的出现，使得主线程的停顿时间大大减少了，让用户与浏览器交互的过程变得更加流畅。但是由于每个小的增量标记之间执行了 JavaScript 代码，堆中的对象指针可能发生了变化，需要使用写屏障技术来记录这些引用关系的变化，所以增量标记缺点也很明显：
首先是并没有减少主线程的总暂停的时间，甚至会略微增加，其次由于写屏障机制的成本，增量标记可能会降低应用程序的吞吐量。

#### 并发回收(Concurrent)

它指的是主线程在执行 JavaScript 的过程中，辅助线程能够在后台完成执行垃圾回收的操作，辅助线程在执行垃圾回收的时候，主线程也可以自由执行而不会被挂起（如下图）。

![An image](/img/js/recovery10.jpg)

辅助线程在执行垃圾回收的时候，主线程也可以自由执行而不会被挂起，这是并发的优点，但同样也是并发回收实现的难点，因为它需要考虑主线程在执行 JavaScript  时，堆中的对象引用关系随时都有可能发生变化，这时辅助线程之前做的一些标记或者正在进行的标记就会要有所改变，所以它需要额外实现一些读写锁机制来控制这一点。

## 内存泄漏

### 内存泄漏的几种情况

- 意外的全局变量

```js
function foo(arg) {
    bar = "this is a hidden global variable";
}
```

变量没被声明,会变成一个全局变量,在页面关闭之前不会被释放。

```js
function foo() {
    this.variable = "potential accidental global";
}
// foo 调用自己，this 指向了全局对象（window）
foo();
```

在 JavaScript 文件头部加上 'use strict'，可以避免此类错误发生。启用严格模式解析 JavaScript ，避免意外的全局变量。

- 被遗忘的计时器或回调函数

```js
var someResource = getData();
setInterval(function() {
    var node = document.getElementById('Node');
    if(node) {
        // 处理 node 和 someResource
        node.innerHTML = JSON.stringify(someResource));
    }
}, 1000);
```

这样的代码很常见，如果id为Node的元素从DOM中移除，该定时器仍会存在，同时，因为回调函数中包含对someResource的引用，定时器外面的someResource也不会被释放。

- 闭包

```js
function bindEvent(){
  var obj=document.createElement('xxx')
  obj.onclick=function(){
    // Even if it is a empty function
  }
}
```

闭包可以维持函数内局部变量，使其得不到释放。上例定义事件回调时，由于是函数内定义函数，并且内部函数--事件回调引用外部函数，形成了闭包。

```js
// 将事件处理函数定义在外面
function bindEvent() {
  var obj = document.createElement('xxx')
  obj.onclick = onclickHandler
}
// 或者在定义事件处理函数的外部函数中，删除对dom的引用
function bindEvent() {
  var obj = document.createElement('xxx')
  obj.onclick = function() {
    // Even if it is a empty function
  }
  obj = null
}
```

- 没有清理的DOM元素引用

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
