---
title: JS面试题
icon: markdown
order: 3
date: 2023-02-17
category:
    - 面试
tag:
    - Javascript
---

## JS 由哪三部分组成

1. ECMAScript：JS 的核心内容，描述了语言的基础语法，比如 var，for
2. 文档对象模型（DOM）:它指的是把文档当做一个对象，这个对象主要定义了处理网页内容的方法和接口
3. 浏览器对象模型（BOM）:它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的法和接口。BOM 的核心是 window,而 window 对象具有双重角色，它既是通过 js 访问浏览器窗口的一个接口，又是一个 Gob!(全局)对象。这意味着在网页中定义的任何对象，变量和函数，都作为全局对象的一个属性或者方法存在。window 对象含有 I1 ocation 对象、navigator 对象、screen 对象等子对象，并且 DOM 的最根本的对象 document 对象也是 BOM 的 window 对象的子对象

## JS 由哪些内置对象

- 值属性，这些全局属性返回一个简单值，这些值没有自己的属性和方法。
    例如 Infinity、NaN、undefined、null 字面量
- 函数属性，全局函数可以直接调用，不需要在调用时指定所属对象，执行结束后会将结果直接返回给调用者。
    例如 eval()、parseFloat()、parselnt()等
- 基本对象，基本对象是定义或使用其他对象的基础。基本对象包括一般对象、函数对象和错误对象。
    例如 Object、.Function、Boolean、.Symbol、.Error 等
- 数字和日期对象，用来表示数字、日期和执行数学计算的对象。
    例如 Number、Math、Date
- 字符串，用来表示和操作字符串的对象。
    例如 String、RegExp
- 可索引的集合对象，这些对象表示按照索引值来排序的数据集合，包括数组和类型数组，以及类数组结构的对象。
    例如 Array
- 使用键的集合对象，这些集合对象在存储数据时会使用到键，支持按照插入顺序来迭代元素。
    例如 Map、Set、VeakMap、.WeakSet
- 矢量集合，SMD 矢量集合中的数据会被组织为一个数据序列。
    例如 SIMD 等
- 结构化数据，这些对象用来表示和操作结构化的缓冲区数据，或使用 JSON 编码的数据。
    例如 JSON 等
- 控制抽象对象
    例如 Promise、Generator 等
- 反射
    例如 Reflect、Proxy
- 国际化，为了支持多语言处理而加入 ECMAScript 的对象。
    例如 lntl、lnt.Collator 等
- WebAssembly
- 其他
    例如 arguments

js 中的内置对象主要指的是在程序执行前存在全局作用域里的由 js 定义的一些全局值属性、函数和用来实例化其他对象的构造函数对象。一般经常用到的如全局变量值 NaN、undefined,全局函数如 parselnt0()、parseFloat()用来实例化对象的构造函数如 Date、Object 等，还有提供数学计算的单体内置对象如 Math 对象。

## 强类型语言和弱类型语言的区别

- 强类型语言：强类型语言也称为强类型定义语言，是一种总是强制类型定义的语言，要求变量的使用要严格符合定义，所有变量都必须先定义后使用。Java 和 C++等语言都是强制类型定义的，也就是说，一旦一个变量被指定了某个数据类型，如果不经过强制转换，那么它就永远是这个数据类型了。例如你有一个整数，如果不显式地进行转换，你不能将其视为一个字符串。
- 弱类型语言：弱类型语言也称为弱类型定义语言，与强类型定义相反。JavaScripti 语言就属于弱类型语言。简单理解就是一种变量类型可以被忽略的语言。比如 JavaScript 是弱类型定义的，在 JavaScript 中就可以将字符串 12'和整数 3 进行连接得到字符串'123'，在相加的时候会进行强制类型转换。

两者对比：强类型语言在速度上可能略逊色于弱类型语言，但是强类型语言带来的严谨性可以有效地帮助避免许多错误。

## 解释性语言和编译型语言的区别

- 解释型语言
    使用专门的解释器对源程序逐行解释成特定平台的机器码并立即执行。是代码在执行时才被解释器行行动态翻译和执行，而不是在执行之前就完成翻译。解释型语言不需要事先编译，其直接将源代码解释成机器码并立即执行，所以只要某一平台提供了相应的解释器即可运行该程序。其特点总结如下
  - 解释型语言每次运行都需要将源代码解释称机器码并执行，效率较低；
  - 只要平台提供相应的解释器，就可以运行源代码，所以可以方便源程序移植；
  - JavaScript、.Python 等属于解释型语言。
- 编译型语言
    使用专门的编译器，针对特定的平台，将高级语言源代码一次性的编译成河被该平台硬件执行的机器码，并包装成该平台所能识别的可执行性程序的格式。在编译型语言写的程序执行之前，需要一个专门的编译过程，把源代码编译成机器语言的文件，如 eX 格式的文件，以后要再运行时，直接使用编译结果即可，如直接运行 eXe 文件。因为只需编译一次，以后运行时不需要编译，所以编译型语言执行效率高。其特点总结如下：
  - 一次性的编译成平台相关的机器语言文件，运行时脱离开发环境，运行效率高；
  - 与特定平台相关，一般无法移植到其他平台；
  - C、C++等属于编译型语言。

两者主要区别在于：前者源程序编译后即可在该平台运行，后者是在运行期间才编译。所以前者运行速度快，后者跨平台性好。

## 对 JSON 的里解

JSON 是一种基于文本的轻量级的数据交换格式。它可以被任何的编程语言读取和作为数据格式来传递。

在项目开发中，使用 JSON 作为前后端数据交换的方式。在前端通过将一个符合 JSON 格式的数据结构序列化为 JSON 字符串，然后将它传递到后端，后端通过 JSON 格式的字符串解析后生成对应的数据结构，以此来实现前后端数据的一个传递。

因为 JSON 的语法是基于 js 的，因此很容易将 JSON 和 js 中的对象弄混，但是应该注意的是 JSON 和 js 中的对象不是一回事，JSON 中对象格式更加严格，比如说在 JSON 中属性值不能为函数，不能出现 NN 这样的属性值等，因此大多数的 js 对象是不符合 JSON 对象的格式的.

在 js 中提供了两个函数来实现 js 数据结构和 JSON 格式的转换处理，

- JSON.stringify 函数，通过传入一个符合 JSON 格式的数据结构，将其转换为一个 JSON 字符串。如果传入的数据结构不符合 JSON 格式，那么在序列化的时候会对这些值进行对应的特殊处理，使其符合规范。在前端向后端发送数据时，可以调用这个函数将数据对象转化为 JSON 格式的字符串。
- JSON.parse 函数，这个函数用来将 JSON 格式的字符串转换为一个 js 数据结构，如果传入的字符串不是标准的 JSON 格式的字符串的话，将会抛出错误。当从后端接收到 JSON 格式的字符串时，可以通过这个方法来将其解析为一个 js 数据结构，以此来进行数据的访问。

## JavaScript 脚本延迟加载的方式有哪些？

延迟加载就是等页面加载完成之后再加载 JavaScript 文件。js 延迟加载有助于提高页面加载速度。

一般有以下几种方式：

- defer 属性：给 js 脚本添加 defer 属性，这个属性会让脚本的加载与文档的解析同步解析，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染不被阻塞。多个设置了 defer 属性的脚本按规范来说最后是顺序执行的，但是在一些浏览器中可能不是这样。
- async 属性：给 js 脚本添加 async 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 js 脚本，这个时候如果文档没有解析完成的话同样会阻塞。多个 a$yc 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次执行。
- 动态创建 DOM 方式：动态创建 DOM 标签的方式，可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。
- 使用 setTimeout 延迟方法：设置一个定时器来延迟加载 js 脚本文件
- 让 Js 最后加载：将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后来加载执行。

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

![ ](/img/interview/let.jpg)

## const 对象的属性可以修改吗

const 保证的并不是变量的值不能改动，而是变量指向的那个内存地址不能改动。对于基本类型的数据（数值、字符串、布尔值），其值就保存在变量指向的那个内存地址，因此等同于常量。但对于引用类型的数据（主要是对象和数组）来说，变量指向数据的内存地址，保存的只是一个指针，const 只能保证这个指针是固定不变的，至于它指向的数据结构是不是可变的，就完全不能控制了。

## 为什么要进行变量提升，它导致了什么问题？

变量提升的表现是，无论在函数中何处位置声明的变量，好像都被提升到了函数的首部，可以在变量声明前访问到而不会报错。

造成变量声明提升的本质原因是 S 引擎在代码执行前有一个解析的过程，创建了执行上下文，初始化了一些代码执行时需要用到的对象。当问一个变量时，会到当前执行上下文中的作用域链中去查找，而作用域链的首端指向的是当前执行上下文的变量对象，这个变量对象是执行上下文的一个属性，它包含了函数的形参、所有的函数和变量声明，这个对象的是在代码解析的时候创建的。

首先要知道，JS 在拿到一个变量或者一个函数的时候，会有两步操作，即解析和执行。

- 在解析阶段，JS 会检查语法，并对函数进行予预编译。解析的时候会先创建一个全局执行上下文环境，先把代码中即将执行的变量、函数声明都拿出来，变量先赋值为 undefined,函数先声明好可使用。在一个函数执行之前，也会创建一个函数执行上下文环境，跟全局执行上下文类似，不过函数执行上下文会多出 this、arguments7 和函数的参数。
  - 全局上下文：变量定义，函数声明
  - 函数上下文：变量定义，函数声明，this,arguments
- 在执行阶段，就是按照代码的顺序衣次执行。

那为什么会进行变量提升呢？主要有以下两个原因：

- 提高性能
    在 JS 代码执行之前，会进行语法检查和预编译，并且这一操作只进行一次。这么做就是为了提高性能，如果没有这一步，那么每次执行代码前都必须重新解析一遍该变量（函数），而这是没有必要的，因为变量（函数）的代码并不会改变，解析一遍就够了。
    在解析的过程中，还会为函数生成预编译代码。在预编译时，会统计声明了哪些变量、创建了哪些函数，并对函数的代码进行压缩，去除注释、不必要的空白等。这样做的好处就是每次执行函数时都可以直接为该函数分配浅空间（不需要再解析一遍去获取代码中声明了哪些变量，创建了哪些函数），并且因为代码压缩的原因，代码执行也更快了。
- 容错性更好
    变量提升可以在一定程度上提高 JS 的容错性，看下面的代码：

```js
a = 1
var a
console.log(a)
```

如果没有变量提升，这两行代码就会报错，但是因为有了变量提升，这段代码就河以正常执行。虽然，在可以开发过程中，可以完全避免这样写，但是有时代码很复杂的时候。可能因为疏忽而先使用后定义了，这样也不会影响正常使用。由于变量提升的存在，而会正常运行。

## 为什么 0.1+0.2！==0.3，如何让其相等

在开发过程中遇到类以这样的问题：

```js
let n1=0.1,n2=0.2
conso1e.1og(n1+n2)//0.30000000000000004
```

这里得到的不是想要的结果，要想等于 0.3，就要把它进行转化：

```js
;(n1 + n2).toFixed(2) //注意，toFixed为四舍五入
```

toFixed(num)方法可把 Number 四舍五入为指定小数位数的数字。那为什么会出现这样的结果呢？

计算机是通过二进制的方式存储数据的，所以计算机计算 0.1+0.2 的时候，实际上是计算的两个数的二进制的和。0.1 的二进制是 0.0001100110011001100...(1100 循环)，0.2 的二进制是：0.00110011001100...(1100 循环)，这两个数的二进制都是无限循环的数。那 JavaScript 是如何处理无限循环的二进制小数呢？

一般我们认为数字包括整数和小数，但是在 JavaScript 中只有一种数字类型：Number,它的实现遵循 IEEE754 标准，使用 64 位固定长度来表示，也就是标准的 double 双精度浮点数。在二进制科学表示法中，双精度浮点数的小数部分最多只能保留 52 位，再加上前面的 1，其实就是保留 53 位有效数字，剩余的需要舍去，遵从“0 舍 1 入"的原则。

根据这个原则，0.1 和 0.2 的二进制数相加，再转化为十进制数就是：0.30000000000000004。

一个直接的解决方法就是设置一个误差范围，通常称为“机器精度”。对 JavaScript 来说，这个值通常为 2-52，在 ES6 中，提供了 Number.EPSILON 属性，而它的值就是 2-52，只要判断 0.1+0.2-0.3 是否小于 Number..EPSILON,如果小于，就可以判断为 0.1+0.2===0.3

```js
function numberepsilon(argl,arg2){
    return Math.abs (argl arg2)<Number.EPSILON;
    console.log(numberepsilon(0.1 0.2,0.3));//true
}
```

## 暂时性死区

在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）

```js
let a = 'a'
function log() {
    console.log(a)
    let a = 'b'
}
log() // ReferenceError: a is not defined
```

在本实例中，变量 a 的作用域，一个是全局作用域，另一个是函数作用域，已经被确定。也就是说函数内部的 a 此时已经确定为函数内部的作用域。

在执行阶段时，根据作用域链原则，函数内部会先寻找函数内部的作用域变量， 既然 a 在函数中已经被确定，那么就不会向全局作用域去寻找 a 了。默认函数内部 a 是已经定义的。但函数顺序执行的时候，访问 a 的同时并没有在访问之前声明 a，也就是树在当前作用域下，没有找到 a 的生命和定义，就会出现 为定义的错误了。

## 箭头函数与普通函数的区别

- 箭头函数处比普通函数更加简洁
  - 如果没有参数，就直接写一个空括号即可
  - 如果只有一个参数，可以省去参数的括号
  - 如果有多个参数，用逗号分割
  - 如果函数体的返回值只有一句，可以省略大括号
  - 如果函数体不需要返回值，且只有一句话，可以给这个语句前面加一个 Void 关键字。最常见的就是调用一个函数：`let fn ()=void doesNotReturn()`
- 箭头函数没有自己的 this
    箭头函数不会创建自己的 this,所以它没有自己的 this,它只会在自己作用域的上一层继承 this。所以箭头函数中 ths 的指向在它在定义时已经确定了，之后不会改变。
- 箭头函数继承来的 this 指向永远不会改变

```js
var id ='GLOBAL';
var obj={
    id:'OBJ',
    a:function(){
        console.log(this.id);
    },
    b:0=>{
        console.log(this.id);
    }
};
obj.a();//'0BJ'
obj.b();//'GLOBAL'
new obj.a()//undefined
new obj.b()//Uncaught TypeError:obj.b is not a constructor
```

对象 obj 的方法 b 是使用箭头函数定义的，这个函数中的 ts 就永远指向它定义时所处的全局执行环境中的 this,即便这个函数是作为对象 obj 的方法调用，this 依旧指向 Window 对象。需要注意，定义对象的大括号引是无法形成一个单独的执行环境的，它依旧是处于全局执行环境中。

- call()、apply()、bind()等方法不能改变箭头函数中 this 的指向

```js
var id='Global';
let fun1 =()=>{
    console.log(this.id)
}
fun1()
//'G1oba1'
fn1.ca11({id:’0bj'})
//'G1oba1'
fun1.apply ({id:'Obj'})
//'Global'
fun1.bind({id:'Obj'})();//'Global
```

- 箭头函数不能作为构造函数使用构造函数在 new 的步骤在上面已经说过了，实际上第二步就是将函数中的 this 指向该对象。但是由于箭头函数时没有自己的 this 的，且 this 指向外层的执行环境，且不能改变指向，所以不能当做构造函数使用。
- 箭头函数没有自己的 arguments
    箭头函数没有自己的 arguments 对象。在箭头函数中问 arguments 实际上获得的是它外层函数的 arguments 值。
- 箭头函数没有 prototype
- 箭头函数不能用作 Generatori 函数，不能使用 veild 关键字

## 扩展运算符的作用及使用场景

- 对象扩展运算符

对象的扩展运算符(…)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中。

```js
let bar = { a: 1, b: 2 }
let baz = { ...bar } //{a:1,b:2}
```

上述方法实际上等价于：

```js
let bar = { a: 1, b: 2 }
let baz = Object.assign({}, bar) //a:1,b:2
```

Object.assign 方法用于对象的合并，将源对象(source)的所有可枚举属性，复制到目标对象(target)。Object.assign 方法的第一个参数是日标对象，后面的参数都是源对象。（如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性）。

同样，如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉

```js
let bar = {a:1,b:2}
let baz={..bar,..{a:2,b:4}}//{a:2,b:4}
```

利用上述特性就可以很方便的修改对象的部分属性。在 redux 中的 reduceri 函数规定必须是一个纯函数，reducer 中的 state 对象要求不能直接修改，可以通过扩展运算符把修改路径的对象都复制一遍，然后产生一个新的对象返回。

需要注意：扩展运算符对对象实例的拷贝属于浅拷贝

- 数组扩展运算符

数组的扩展运算符可以将一个数组转为用逗号分隔的参数序列，且每次只能展开一层数组。

```js
conso1e.log(...[1, 2, 3])
//123
conso1e.log(...[1, [2, 3, 4], 5])
//1[2,3,4]5
```

将数组转换为参数序列

```js
function add(x, y) {
    return x + y
}
const numbers = [1, 2]
add(...numbers) //3
```

复制数组

```js
const arr1 = [1,2]
const arr2 = [..arr1]
```

合并数组

```js
const arrl ['two','three']
const arr2 =['one',...arrl,'four','five']
//["one","two”,"three”,"four","five"]
```

扩展运算符与解构赋值结合起来，用于生成数组

```js
const [first, ...rest] = [1, 2, 3, 4, 5]
first //1
rest //[2,3,4,5]
```

需要注意：如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。

```js
const [..rest,1ast]=[1,2,3,4,5]//报错
const [first,..rest,1ast]=[1,2,3,4,5]//报错
```

将字符串转为真正的数组

```js
;[...'he11o'] //["h","e","1","1”,"0”]
```

## 如何提取高度嵌套的对象里的指定属性？

```js
const school = {
    classes: {
        stu: {
            name: 'Bob',
            age: 24,
        },
    },
}

const {
    classes: {
        stu: { name },
    },
} = school
console.log(name)
```

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

## 为什么函数的 arguments 参数是类数组而不是数组？如何遍历类数组？

arguments 是一个对象，它的属性是从 0 开始依次递增的数字，还有 callee 和 length 等属性，与数组相似；但是它却没有数组常见的方法属性，如 forEach,reduce 等，所以叫它们类数组。

要扁历类数组，有三个方法：

- 将数组的方法应用到类数组上，这时候就可以使用 cal 和 apply 方法，如：

```js
function foo() {
    Array.prototype.forEach.call(arguments, (a = console.log(a)))
}
```

- 使用 Array.from 方法将类数组转化成数组：

```js
function foo() {
    const arrArgs = Array.from(arguments)
    arrArgs.forEach((a = console.log(a)))
}
```

- 使用展开运算符将类数组转化成数组

```js
function foo() {
    const arrArgs = [...arguments]
    arrArgs.forEach((a = console.log(a)))
}
```

## Map（字典）

Map 对象保存键值对，并且能够记住键的原始插入顺序。任何值（对象或者原始值）都可以作为一个键或一个值。

- Map 对象这种数据结构和和对象类型，都已键值对的形式存储数据，即 key-vlue 形式。
- Map 对象存储的数据是有序的，而我们平常使用的对象是无序的，所以通常当我们需要使用对象形式（键值对）存储数据且需要有序时，采用 Map 对象进行存储。
- Map 对象的键值可以是任意类型，我们平时使用的对象只能使用字符串作为键。

> 基本使用

```js
let defaultMap = new Map([
    ['name', '张三'],
    ['age', 20],
])
```

![ ](/img/interview/Map.jpg)

```js
myMap.set('name', '小猪课堂') // 字符串作为键
myMap.set(12, '会飞的猪') // number 类型作为键
myMap.set({}, '知乎') // 对象类型作为键
```

![ ](/img/interview/Map2.jpg)

> 获取长度

```js
let myMapSize = myMap.size
```

> 获取值

```js
let objKey = {}
myMap.set('name', '小猪课堂') // 字符串作为键
let name = myMap.get('name')
console.log(name) // 小猪课堂 会飞的猪 知乎
```

> 删除某个值

```js
myMap.delete('name')
```

> 判断某个值是否存在

```js
myMap.has('name') // 返回 bool 值
```

> 清楚所有成员

```js
myMap.clear()
```

> 返回键名的遍历器

```js
for (let key of map.keys()) {
    console.log(key)
}
```

> 返回键值的扁历器

```js
for (let value of map.values()) {
    console.log(value)
}
```

> 返回所有成员的遍历器

```js
for (let items of map.entries()) {
    console.log(items)
}
```

> 扁历 Map 的所有成员

```js
map.forEach((value, key, map) => {
    console.log(key, value)
})
```

## Set（集合）

Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。

- Set 对象是一个类数组对象，它长得就很像数组。
- Set 对象存储的值是不重复的，所以我们通常使用它来实现数组去重。
- Set 对象存储的数据不是键值对的形式，而且它可以存储任何类型的数据。

> 基本使用

```js
let defaultSet = new Set(['张三', 12, true])
```

![ ](/img/interview/Set.jpg)

> 插入数据

```js
mySet.add(1)
```

> 获取长度

```js
let mySetSize = mySet.size
```

> 获取值

由于 Set 对象存储的不是键值对形式，所以未提供 get 方法获取值，我们通常遍历它获取值：

```js
mySet.forEach((item) => {
    console.log(item)
})
```

> 删除某个值

```js
mySet.delete(1)
```

> 判断某个值是否存在

```js
mySet.has(1) // 返回Boolean值
```

## Map 与 Set 的区别

- Map 和 Set 查找速度都非常快，时间复杂度为 O(1)，而数组查找的时间复杂度为 O(n)。
- Map 对象初始化的值为一个二维数组，Set 对象初始化的值为一维数组。
- Map 对象和 Set 对象都不允许键重复（可以将 Set 对象的键想象成值）。
- Map 对象的键是不能改的，但是值能改，Set 对象只能通过迭代器来更改值。

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
**proto**可以理解为指针。实例对象中的属性，指向了构造函数的原型（protortpe）
一个实例对象在调用属性和方法的时候，会一次从实例本身、构造函数原型、原型的原型上去查找

![ ](/img/interview/proto.jpg)

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
缺点：Sub 原型变成了 Super 的实例，如果 Super 的实例某个属性是引用值，该引用值就会被应用到所有 Sub 创建的实例中去，会有污染问题。

### 盗用构造函数(构造函数模式+call)

```js
function Super = function(){ this.a = 1 }
function Sub = function(){
       Super.call(this)
       this.b = 2
}

const test = new Sub()
```

优点：每个实例都会有自己的 a 属性，哪怕是引用值也不会被污染
缺点：Super 构造函数中的方法在每个实例上都要创建一遍（除非该方法声明提到全局）；Sub 的实例无法访问 Super 原型上的方法

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
缺点：子类不能访问父类原型上定义的方法（即不能访问 Parent.prototype 上定义的方法），因此所有方法属性都写在构造函数中，每次创建实例都会初始化

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

## call和apply的区别？

它们的作用一模一样，区别仅在于传入参数的形式的不同。

- apply接受两个参数，第一个参数指定了函数体内this对象的指向，第二个参数为一个带下标的集合，这个集合可以为数组，也可以为类数组，appy方法把这个集合中的元素作为参数传递给被调用的函数。
- cal传入的参数数量不固定，跟appy相同的是，第一个参数也是代表函数体内的this指向，从第二个参数开始往后，每个参数被依次传入函数。

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
3. 可用来实现 JS 模块（JQuery 库等）

- 经典面试题：循环中使用闭包解决 var 定义函数的问题

```js
for (var i; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i)
    }, i * 1000)
}
```

首先因为 setTimeout 是个异步函数，所以会先把循环全部执行完毕，这时候 ⅰ 就是 6 了，所以会输出一堆 6。解决办法有三种：

- 第一种是使用闭包的方式

```js
for (var i 1;i <5;i++){
    (function(j){
        setTimeout (function timer(){
            console.log(j)
        },j*1000)
    })(i)
}
```

- 第二种就是使用 set Timeout 的第三个参数，这个参数会被当成 timer 函数的参数传入。

```js
for (var i = 1; i <= 5; i++) {
    setTimeout(
        function timer(j) {
            console.log(j)
        },
        i * 1000,
        i
    )
}
```

- 第三种就是使用let定义i了来解决问题了，这个也是最为推荐的方式

```js
for (let = 1; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i)
    }, 1 * 1000)
}
```

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

1. 如果 obj 里面有时间对象，则 JSON.stringify 后再 JSON.parse 的结果，时间将只是字符串的形式，而不是对象的形式。
2. 如果 obj 里面有 RegExp，则打印出来是空对象。
3. 如果对象中有函数或者 undefined，则会直接被丢掉。
4. 如果 json 里有对象是由构造函数生成的，则会丢掉对象的 constructon。
5. 如果对象中存在循环引用的情况也无法正确实现深拷贝。
6. 如果对象中存在 NAN，则序列化后会变成 null。

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

![ ](/img/interview/task.jpg)

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

![ ](/img/interview/thread.jpg)

## 前端模块化

前端模块化就是复杂的文件编程一个一个独立的模块，比如 js 文件等等，分成独立的模块有利于重用
（复用性）和维护（版本迭代），这样会引来模块之间相互依赖的问题，所以有了 commonJS 规范，
AMD，CMD 规范等等，以及用于 js 打包（编译等处理）的工具 webpack。

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

## setTimeout 最小执行时间是多少

html5 规定的内容：
setTimeout 最小执行时间是 4ms
setInterval 最小执行时间是 10ms

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
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
arr.sort(() => Math.random() - 0.5)
//利用sort return 大于等于0不交换位置，小于0交换位置
// [5, 8, 4, 3, 2, 9, 10, 6, 1, 7]
```

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

![ ](/img/interview/npm.jpg)
