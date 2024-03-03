---
title: React面试题
icon: markdown
order: 5
date: 2023-02-17
category:
    - 面试
tag:
    - React
---

## 一、组件基础

### 1.React 事件机制

```jsx
<div onClick={this.handleClick.bind(this)}>点我</div>
```

React 并不是将 click 事件绑定到了 div 的真实 DOM 上，而是在 document 处监听了所有的事件，当事件发生并且冒泡到 document 处的时候，React 将事件内容封装并交由真正的处理函数运行。这样的方式不仅仅减少了内存的消耗，还能在组件挂在销毁时统一订阅和移除事件。

除此之外，冒泡到 document 上的事件也不是原生的浏览器事件，而是由 react 自己实现的合成事件（SyntheticEvent）。因此如果不想要是事件冒泡的话应该调用 event.preventDefault()方法，而不是调用 event.stopProppagation()方法。

![ ](/img/interview/react.jpg)

实现合成事件的目的如下：

- 合成事件首先抹平了浏览器之间的兼容问题，另外这是一个跨浏览器原生事件包装器，赋予了跨浏览器开发的能力；
- 对于原生浏览器事件来说，浏览器会给监听器创建一个事件对象。如果你有很多的事件监听，那么就需要分配很多的事件对象，造成高额的内存分配问题。但是对于合成事件来说，有一个事件池专门来管理它们的创建和销毁，当事件需要被使用时，就会从池子中复用对象，事件回调结束后，就会销毁事件对象上的属性，从而便于下次复用事件对象。

### 2.React 的事件和普通的 HTML 事件有什么不同？

区别：

- 对于事件名称命名方式，原生事件为全小写，react 事件采用小驼峰；
- 对于事件函数处理语法，原生事件为字符串，react 事件为函数；
- react 事件不能采用 return false 的方式来阻止浏览器的默认行为，而必须要地明确地调用 preventDefault()来阻止默认行为。

合成事件是 react 模拟原生 DOM 事件所有能力的一个事件对象，其优点如下：

- 兼容所有浏览器，更好的跨平台；
- 将事件统一存放在一个数组，避免频繁的新增与删除（垃圾回收）。
- 方便 react 统一管理和事务机制。

事件的执行顺序为原生事件先执行，合成事件后执行，合成事件会冒泡绑定到 document 上，所以尽量避免原生事件与合成事件混用，如果原生事件阻止冒泡，可能会导致合成事件不执行，因为需要冒泡到 document 上合成事件才会执行。

### 3.React 组件中怎么做事件代理？它的原理是什么？

React 基于 Virtual DOM 实现了一个 SyntheticEvent 层（合成事件层），定义的事件处理器会接收到一个合成事件对象的实例，它符合 W3C 标准，且与原生的浏览器事件拥有同样的接口，支持冒泡机制，所有的事件都自动绑定在最外层上。

在 React 底层，主要对合成事件做了两件事：

- 事件委派：React 会把所有的事件绑定到结构的最外层，使用统一的事件监听器，这个事件监听器上维持了一个映射来保存所有组件内部事件监听和处理函数。
- 自动绑定：React 组件中，每个方法的上下文都会指向该组件的实例，即自动绑定 this 为当前组件。

### 4.React 高阶组件、Render props、hooks 有什么区别，为什么要不断迭代

这三者是目前 react 解决代码复用的主要方式：

- 高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。具体而言，高阶组件是参数为组件，返回值为新组件的函数。
- render props 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术，更具体的说，render prop 是一个用于告知组件需要渲染什么内容的函数 prop。
- 通常，render props 和高阶组件只渲染一个子节点。让 Hook 来服务这个使用场景更加简单。这两种模式仍有用武之地，（例如，一个虚拟滚动条组件或许会有一个 renderltem 属性，或是一个可见的容器组件或许会有它自己的 DOM 结构）。但在大部分场景下，Hook 足够了，并且能够帮助减少嵌套。

#### HOC

> 高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。

简言之，HOC 是一种组件的设计模式，HOC 接受一个组件和额外的参数（如果需要），返回一个新的组件。HOC 是纯函数，没有副作用。

```jsx
// hoc的定义
function withSubscription(WrappedComponent, selectData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: selectData(DataSource, props)
      };
    }
    // 一些通用的逻辑处理
    render() {
      // ... 并使用新数据渲染被包装的组件!
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };

// 使用
const BlogPostWithSubscription = withSubscription(BlogPost,(DataSource, props) => DataSource.getBlogPost(props.id));
```

HOC 的优缺点 ∶

- 优点 ∶ 逻辑服用、不影响被包裹组件的内部逻辑。
- 缺点 ∶ hoc 传递给被包裹组件的 props 容易和被包裹后的组件重名，进而被覆盖

#### Render props

> "render prop"是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术

具有 render prop 的组件接受一个返回 React 元素的函数，将 render 的渲染逻辑注入到组件内部。在这里，"render"的命名可以是任何其他有效的标识符。

```jsx
// DataProvider组件内部的渲染逻辑如下
class DataProvider extends React.Components {
    state = {
        name: 'Tom',
    }

    render() {
        return (
            <div>
                <p>共享数据组件自己内部的渲染逻辑</p>
                {this.props.render(this.state)}
            </div>
        )
    }
}

// 调用方式
;<DataProvider render={(data) => <h1>Hello {data.name}</h1>} />
```

由此可以看到，render props 的优缺点也很明显 ∶

- 优点：数据共享、代码复用，将组件内的 state 作为 props 传递给调用者，将渲染逻辑交给调用者。
- 缺点：无法在 return 语句外访问数据、嵌套写法不够优雅

#### Hooks

> Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。通过自定义 hook，可以复用代码逻辑。

```jsx
// 自定义一个获取订阅数据的hook
function useSubscription() {
  const data = DataSource.getComments();
  return [data];
}

function CommentList(props) {
  const {data} = props;
  const [subData] = useSubscription();
    ...
}
// 使用
<CommentList data='hello' />
```

以上可以看出，hook 解决了 hoc 的 prop 覆盖的问题，同时使用的方式解决了 render props 的嵌套地狱的问题。hook 的优点如下 ∶

- 使用直观；
- 解决 hoc 的 prop 重名问题；
- 解决 render props 因共享数据 而出现嵌套地狱的问题；
- 能在 return 之外使用数据的问题。

需要注意的是：hook 只能在组件顶层使用，不可在分支语句中使用。

#### 总结

Hoc、render props 和 hook 都是为了解决代码复用的问题，但是 hoc 和 render props 都有特定的使用场景和明显的缺点。hook 是 react16.8 更新的新的 API，让组件逻辑复用更简洁明了，同时也解决了 hoc 和 render props 的一些缺点。

### 5.对 React-Fiber 的理解，它解决了什么问题？

React V15 在渲染时，会递归比对 VirtualDOM 树，找出需要变动的节点，然后同步更新它们， 一气呵成。这个过程期间， React 会占据浏览器资源，这会导致用户触发的事件得不到响应，并且会导致掉帧，导致用户感觉到卡顿。

为了给用户制造一种应用很快的“假象”，不能让一个任务长期霸占着资源。 可以将浏览器的渲染、布局、绘制、资源加载(例如 HTML 解析)、事件响应、脚本执行视作操作系统的“进程”，需要通过某些调度策略合理地分配 CPU 资源，从而提高浏览器的用户响应速率, 同时兼顾任务执行效率。

所以 React 通过 Fiber 架构，让这个执行过程变成可被中断。“适时”地让出 CPU 执行权，除了可以让浏览器及时地响应用户的交互，还有其他好处:

- 分批延时对 DOM 进行操作，避免一次性操作大量 DOM 节点，可以得到更好的用户体验；
- 给浏览器一点喘息的机会，它会对代码进行编译优化（JIT）及进行热代码优化，或者对 reflow 进行修正。

核心思想：Fiber 也称协程或者纤程。它和线程并不一样，协程本身是没有并发或者并行能力的（需要配合线程），它只是一种控制流程的让出机制。让出 CPU 的执行权，让 CPU 能在这段时间执行其他的操作。渲染的过程可以被中断，可以将控制权交回浏览器，让位给高优先级的任务，浏览器空闲后再恢复渲染。

### 6.React.Component 和 React.PureComponent 的区别

PureComponent 表示一个纯组件，可以用来优化 React 程序，减少 render 函数执行的次数，从而提高组件的性能。

在 React 中，当 prop 或者 state 发生变化时，可以通过在 shouldComponentUpdate 生命周期函数中执行 return false 来阻止页面的更新，从而减少不必要的 render 执行。React.PureComponent 会自动执行 shouldComponentUpdate。

不过，pureComponent 中的 shouldComponentUpdate() 进行的是浅比较，也就是说如果是引用数据类型的数据，只会比较不是同一个地址，而不会比较这个地址里面的数据是否一致。浅比较会忽略属性和或状态突变情况，其实也就是数据引用指针没有变化，而数据发生改变的时候 render 是不会执行的。如果需要重新渲染那么就需要重新开辟空间引用数据。PureComponent 一般会用在一些纯展示组件上。

使用 pureComponent 的好处：当组件更新时，如果组件的 props 或者 state 都没有改变，render 函数就不会触发。省去虚拟 DOM 的生成和对比过程，达到提升性能的目的。这是因为 react 自动做了一层浅比较。

### 7.Component, Element, Instance 之间有什么区别和联系？

- 元素：一个元素 element 是一个普通对象(plain object)，描述了对于一个 DOM 节点或者其他组件 component，你想让它在屏幕上呈现成什么样子。元素 element 可以在它的属性 props 中包含其他元素(译注:用于形成元素树)。创建一个 React 元素 element 成本很低。元素 element 创建之后是不可变的。
- 组件：一个组件 component 可以通过多种方式声明。可以是带有一个 render()方法的类，简单点也可以定义为一个函数。这两种情况下，它都把属性 props 作为输入，把返回的一棵元素树作为输出。
- 实例：一个实例 instance 是你在所写的组件类 component class 中使用关键字 this 所指向的东西(译注:组件实例)。它用来存储本地状态和响应生命周期事件很有用。

函数式组件(Functional component)根本没有实例 instance。类组件(Class component)有实例 instance，但是永远也不需要直接创建一个组件的实例，因为 React 帮我们做了这些。

### 8.React.createClass 和 extends Component 的区别有哪些？

React.createClass 和 extends Component 的 bai 区别主要在于：

- 语法区别
  - createClass 本质上是一个工厂函数，extends 的方式更加接近最新的 ES6 规范的 class 写法。两种方式在语法上的差别主要体现在方法的定义和静态属性的声明上。
  - createClass 方式的方法定义使用逗号，隔开，因为 creatClass 本质上是一个函数，传递给它的是一个 Object；而 class 的方式定义方法时务必谨记不要使用逗号隔开，这是 ES6 class 的语法规范。
- propType 和 getDefaultProps
  - React.createClass：通过 proTypes 对象和 getDefaultProps()方法来设置和获取 props.
  - React.Component：通过设置两个属性 propTypes 和 defaultProps
- 状态的区别
  - React.createClass：通过 getInitialState()方法返回一个包含初始值的对象
  - React.Component：通过 constructor 设置初始状态
- this 区别
  - React.createClass：会正确绑定 this
  - React.Component：由于使用了 ES6，这里会有些微不同，属性并不会自动绑定到 React 类的实例上。
- Mixins
  - React.createClass：使用 React.createClass 的话，可以在创建组件时添加一个叫做 mixins 的属性，并将可供混合的类的集合以数组的形式赋给 mixins。
  - 如果使用 ES6 的方式来创建组件，那么 React mixins 的特性将不能被使用了。

### 9.React 高阶组件是什么，和普通组件有什么区别，适用什么场景

> 高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。

高阶组件（HOC）就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件，它只是一种组件的设计模式，这种设计模式是由 react 自身的组合性质必然产生的。我们将它们称为纯组件，因为它们可以接受任何动态提供的子组件，但它们不会修改或复制其输入组件中的任何行为。

```jsx
// hoc的定义
function withSubscription(WrappedComponent, selectData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: selectData(DataSource, props)
      };
    }
    // 一些通用的逻辑处理
    render() {
      // ... 并使用新数据渲染被包装的组件!
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };

// 使用
const BlogPostWithSubscription = withSubscription(BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id));
```

#### HOC 的优缺点

- 优点 ∶ 逻辑服用、不影响被包裹组件的内部逻辑。
- 缺点 ∶hoc 传递给被包裹组件的 props 容易和被包裹后的组件重名，进而被覆盖

#### 适用场景

- 代码复用，逻辑抽象
- 渲染劫持
- State 抽象和更改
- Props 更改

#### 具体应用例子

- 权限控制：利用高阶组件的 条件渲染 特性可以对页面进行权限控制，权限控制一般分为两个维度：页面级别和 页面元素级别

```jsx
  // HOC.js

function withAdminAuth(WrappedComponent) {
    return class extends React.Component {
        state = {
            isAdmin: false,
        }
        async UNSAFE_componentWillMount() {
            const currentRole = await getCurrentUserRole();
            this.setState({
                isAdmin: currentRole === 'Admin',
            });
        }
        render() {
            if (this.state.isAdmin) {
                return <WrappedComponent {...this.props} />;
            } else {
                return (<div>您没有权限查看该页面，请联系管理员！</div>);
            }
        }
    };
}

// pages/page-a.js
class PageA extends React.Component {
    constructor(props) {
        super(props);
        // something here...
    }
    UNSAFE_componentWillMount() {
        // fetching data
    }
    render() {
        // render page with data
    }
}
export default withAdminAuth(PageA);

// pages/page-b.js
class PageB extends React.Component {
    constructor(props) {
        super(props);
    // something here...
        }
    UNSAFE_componentWillMount() {
    // fetching data
    }
    render() {
    // render page with data
    }
}
export default withAdminAuth(PageB);
```

- 组件渲染性能追踪：借助父组件子组件生命周期规则捕获子组件的生命周期，可以方便的对某个组件的渲染时间进行记录 ∶

```jsx
class Home extends React.Component {
    render() {
        return <h1>Hello World.</h1>
    }
}
function withTiming(WrappedComponent) {
    return class extends WrappedComponent {
        constructor(props) {
            super(props)
            this.start = 0
            this.end = 0
        }
        UNSAFE_componentWillMount() {
            super.componentWillMount && super.componentWillMount()
            this.start = Date.now()
        }
        componentDidMount() {
            super.componentDidMount && super.componentDidMount()
            this.end = Date.now()
            console.log(
                `${WrappedComponent.name} 组件渲染时间为 ${
                    this.end - this.start
                } ms`
            )
        }
        render() {
            return super.render()
        }
    }
}

export default withTiming(Home)
```

注意：withTiming 是利用 反向继承 实现的一个高阶组件，功能是计算被包裹组件（这里是 Home 组件）的渲染时间。

#### 页面复用

```jsx
const withFetching = fetching => WrappedComponent => {
    return class extends React.Component {
        state = {
            data: [],
        }
        async UNSAFE_componentWillMount() {
            const data = await fetching();
            this.setState({
                data,
            });
        }
        render() {
            return <WrappedComponent data={this.state.data} {...this.props} />;
        }
    }
}

// pages/page-a.js
export default withFetching(fetching('science-fiction'))(MovieList);
// pages/page-b.js
export default withFetching(fetching('action'))(MovieList);
// pages/page-other.js
export default withFetching(fetching('some-other-type'))(MovieList);
```

### 10.对 componentWillReceiveProps 的理解

该方法当 props 发生变化时执行，初始化 render 时不执行，在这个回调函数里面，你可以根据属性的变化，通过调用 this.setState()来更新你的组件状态，旧的属性还是可以通过 this.props 来获取,这里调用更新状态是安全的，并不会触发额外的 render 调用。

使用好处：在这个生命周期中，可以在子组件的 render 函数执行前获取新的 props，从而更新子组件自己的 state。 可以将数据请求放在这里进行执行，需要传的参数则从 componentWillReceiveProps(nextProps)中获取。而不必将所有的请求都放在父组件中。于是该请求只会在该组件渲染时才会发出，从而减轻请求负担。componentWillReceiveProps 在初始化 render 的时候不会执行，它会在 Component 接受到新的状态(Props)时被触发，一般用于父组件状态更新时子组件的重新渲染。

### 11.哪些方法会触发 React 重新渲染？重新渲染 render 会做些什么？

#### 哪些方法会触发 react 重新渲染?

- setState（）方法被调用

setState 是 React 中最常用的命令，通常情况下，执行 setState 会触发 render。但是这里有个点值得关注，执行 setState 的时候不一定会重新渲染。当 setState 传入 null 时，并不会触发 render。

```jsx
class App extends React.Component {
    state = {
        a: 1,
    }

    render() {
        console.log('render')
        return (
            <React.Fragement>
                <p>{this.state.a}</p>
                <button
                    onClick={() => {
                        this.setState({ a: 1 }) // 这里并没有改变 a 的值
                    }}
                >
                    Click me
                </button>
                <button onClick={() => this.setState(null)}>
                    setState null
                </button>
                <Child />
            </React.Fragement>
        )
    }
}
```

- 父组件重新渲染

只要父组件重新渲染了，即使传入子组件的 props 未发生变化，那么子组件也会重新渲染，进而触发 render

#### 重新渲染 render 会做些什么?

- 会对新旧 VNode 进行对比，也就是我们所说的 Diff 算法。
- 对新旧两棵树进行一个深度优先遍历，这样每一个节点都会一个标记，在到深度遍历的时候，每遍历到一和个节点，就把该节点和新的节点树进行对比，如果有差异就放到一个对象里面
- 遍历差异对象，根据差异的类型，根据对应对规则更新 VNode

React 的处理 render 的基本思维模式是每次一有变动就会去重新渲染整个应用。在 Virtual DOM 没有出现之前，最简单的方法就是直接调用 innerHTML。Virtual DOM 厉害的地方并不是说它比直接操作 DOM 快，而是说不管数据怎么变，都会尽量以最小的代价去更新 DOM。React 将 render 函数返回的虚拟 DOM 树与老的进行比较，从而确定 DOM 要不要更新、怎么更新。当 DOM 树很大时，遍历两棵树进行各种比对还是相当耗性能的，特别是在顶层 setState 一个微小的修改，默认会去遍历整棵树。尽管 React 使用高度优化的 Diff 算法，但是这个过程仍然会损耗性能.

### 12.React 如何判断什么时候重新渲染组件？

组件状态的改变可以因为 props 的改变，或者直接通过 setState 方法改变。组件获得新的状态，然后 React 决定是否应该重新渲染组件。只要组件的 state 发生变化，React 就会对组件进行重新渲染。这是因为 React 中的 shouldComponentUpdate 方法默认返回 true，这就是导致每次更新都重新渲染的原因。

当 React 将要渲染组件时会执行 shouldComponentUpdate 方法来看它是否返回 true（组件应该更新，也就是重新渲染）。所以需要重写 shouldComponentUpdate 方法让它根据情况返回 true 或者 false 来告诉 React 什么时候重新渲染什么时候跳过重新渲染。

### 13.React 声明组件有哪几种方法，有什么不同？

React 声明组件的三种方式：

- 函数式定义的无状态组件
- ES5 原生方式 React.createClass 定义的组件
- ES6 形式的 extends React.Component 定义的组件

#### (1)无状态函数式组件

它是为了创建纯展示组件，这种组件只负责根据传入的 props 来展示，不涉及到 state 状态的操作

组件不会被实例化，整体渲染性能得到提升，不能访问 this 对象，不能访问生命周期的方法

#### (2)ES5 原生方式 React.createClass // RFC

React.createClass 会自绑定函数方法，导致不必要的性能开销，增加代码过时的可能性。

#### (3)ES6 继承形式 React.Component // RCC

目前极为推荐的创建有状态组件的方式，最终会取代 React.createClass 形式；相对于 React.createClass 可以更好实现代码复用。

无状态组件相对于于后者的区别：

与无状态组件相比，React.createClass 和 React.Component 都是创建有状态的组件，这些组件是要被实例化的，并且可以访问组件的生命周期方法。

### 14.对有状态组件和无状态组件的理解及使用场景

#### (1)有状态组件

特点：

- 是类组件
- 有继承
- 可以使用 this
- 可以使用 react 的生命周期
- 使用较多，容易频繁触发生命周期钩子函数，影响性能
- 内部使用 state，维护自身状态的变化，有状态组件根据外部组件传入的 props 和自身的 state 进行渲染。

使用场景：

- 需要使用到状态的。
- 需要使用状态操作组件的（无状态组件的也可以实现新版本 react hooks 也可实现）

总结：

类组件可以维护自身的状态变量，即组件的 state ，类组件还有不同的生命周期方法，可以让开发者能够在组件的不同阶段（挂载、更新、卸载），对组件做更多的控制。类组件则既可以充当无状态组件，也可以充当有状态组件。当一个类组件不需要管理自身状态时，也可称为无状态组件。

#### (2)无状态组件

特点：

- 不依赖自身的状态 state
- 可以是类组件或者函数组件。
- 可以完全避免使用 this 关键字。（由于使用的是箭头函数事件无需绑定）
- 有更高的性能。当不需要使用生命周期钩子时，应该首先使用无状态函数组件
- 组件内部不维护 state ，只根据外部组件传入的 props 进行渲染的组件，当 props 改变时，组件重新渲染。

使用场景：

- 组件不需要管理 state，纯展示

优点：

- 简化代码、专注于 render
- 组件不需要被实例化，无生命周期，提升性能。 输出（渲染）只取决于输入（属性），无副作用
- 视图和数据的解耦分离

缺点：

- 无法使用 ref
- 无生命周期方法
- 无法控制组件的重渲染，因为无法使用 shouldComponentUpdate 方法，当组件接受到新的属性时则会重渲染

总结：

组件内部状态且与外部无关的组件，可以考虑用状态组件，这样状态树就不会过于复杂，易于理解和管理。当一个组件不需要管理自身状态时，也就是无状态组件，应该优先设计为函数组件。比如自定义的 `<Button/>`、 `<Input />` 等组件。

### 15.对 React 中 Fragment 的理解，它的使用场景是什么？

在 React 中，组件返回的元素只能有一个根元素。为了不添加多余的 DOM 节点，我们可以使用 Fragment 标签来包裹所有的元素，Fragment 标签不会渲染出任何元素。React 官方对 Fragment 的解释：

> React 中的一个常见模式是一个组件返回多个元素。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。

```jsx
import React, { Component, Fragment } from 'react'

// 一般形式
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
// 也可以写成以下形式
render() {
  return (
    <>
      <ChildA />
      <ChildB />
      <ChildC />
    </>
  );
}
```

### 16.React 如何获取组件对应的 DOM 元素？

可以用 ref 来获取某个子节点的实例，然后通过当前 class 组件实例的一些特定属性来直接获取子节点实例。ref 有三种实现方法:

- 字符串格式：字符串格式，这是 React16 版本之前用得最多的，例如：`<p ref="info">span</p>`
- 函数格式：ref 对应一个方法，该方法有一个参数，也就是对应的节点实例，例如：`<p ref={ele => this.info = ele}></p>`
- createRef 方法：React 16 提供的一个 API，使用 React.createRef()来实现

### 17.React 中可以在 render 访问 refs 吗？为什么？

```jsx
<>
    <span id='name' ref={this.spanRef}>
        {this.state.title}
    </span>
    <span>{this.spanRef.current ? '有值' : '无值'}</span>
</>
```

不可以，render 阶段 DOM 还没有生成，无法获取 DOM。DOM 的获取需要在 pre-commit 阶段和 commit 阶段：

![ ](/img/interview/react2.jpg)

### 18.对 React 的插槽(Portals)的理解，如何使用，有哪些使用场景

> Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案

Portals 是 React 16 提供的官方解决方案，使得组件可以脱离父组件层级挂载在 DOM 树的任何位置。通俗来讲，就是我们 render 一个组件，但这个组件的 DOM 结构并不在本组件内。

```jsx
ReactDOM.createPortal(child, container)
```

- 第一个参数 child 是可渲染的 React 子项，比如元素，字符串或者片段等;
- 第二个参数 container 是一个 DOM 元素。

一般情况下，组件的 render 函数返回的元素会被挂载在它的父级组件上：

```jsx
import DemoComponent from './DemoComponent';
render() {
  // DemoComponent元素会被挂载在id为parent的div的元素上
  return (
    <div id="parent">
        <DemoComponent />
    </div>
  );
}
```

然而，有些元素需要被挂载在更高层级的位置。最典型的应用场景：当父组件具有 overflow: hidden 或者 z-index 的样式设置时，组件有可能被其他元素遮挡，这时就可以考虑要不要使用 Portal 使组件的挂载脱离父组件。例如：对话框，模态窗。

```jsx
import DemoComponent from './DemoComponent';
render() {
  // react会将DemoComponent组件直接挂载在真实的 dom 节点 domNode 上，生命周期还和16版本之前相同。
  return ReactDOM.createPortal(
    <DemoComponent />,
    domNode,
  );
}
```

### 19.在 React 中如何避免不必要的 render？

React 基于虚拟 DOM 和高效 Diff 算法的完美配合，实现了对 DOM 最小粒度的更新。大多数情况下，React 对 DOM 的渲染效率足以业务日常。但在个别复杂业务场景下，性能问题依然会困扰我们。此时需要采取一些措施来提升运行性能，其很重要的一个方向，就是避免不必要的渲染（Render）。这里提下优化的点：

- shouldComponentUpdate 和 PureComponent

在 React 类组件中，可以利用 shouldComponentUpdate 或者 PureComponent 来减少因父组件更新而触发子组件的 render，从而达到目的。shouldComponentUpdate 来决定是否组件是否重新渲染，如果不希望组件重新渲染，返回 false 即可。

- 利用高阶组件

在函数组件中，并没有 shouldComponentUpdate 这个生命周期，可以利用高阶组件，封装一个类似 PureComponet 的功能

- 使用 React.memo

React.memo 是 React 16.6 新的一个 API，用来缓存组件的渲染，避免不必要的更新，其实也是一个高阶组件，与 PureComponent 十分类似，但不同的是， React.memo 只能用于函数组件。

### 20.对 React-Intl 的理解，它的工作原理？

React-intl 是雅虎的语言国际化开源项目 FormatJS 的一部分，通过其提供的组件和 API 可以与 ReactJS 绑定。

React-intl 提供了两种使用方法，一种是引用 React 组件，另一种是直接调取 API，官方更加推荐在 React 项目中使用前者，只有在无法使用 React 组件的地方，才应该调用框架提供的 API。它提供了一系列的 React 组件，包括数字格式化、字符串格式化、日期格式化等。

在 React-intl 中，可以配置不同的语言包，他的工作原理就是根据需要，在语言包之间进行切换。

### 21.对 React context 的理解

在 React 中，数据传递一般使用 props 传递数据，维持单向数据流，这样可以让组件之间的关系变得简单且可预测，但是单项数据流在某些场景中并不适用。单纯一对的父子组件传递并无问题，但要是组件之间层层依赖深入，props 就需要层层传递显然，这样做太繁琐了。

Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。

可以把 context 当做是特定一个组件树内共享的 store，用来做数据传递。简单说就是，当你不想在组件树中通过逐层传递 props 或者 state 的方式来传递数据时，可以使用 Context 来实现跨层级的组件数据传递。

JS 的代码块在执行期间，会创建一个相应的作用域链，这个作用域链记录着运行时 JS 代码块执行期间所能访问的活动对象，包括变量和函数，JS 程序通过作用域链访问到代码块内部或者外部的变量和函数。

假如以 JS 的作用域链作为类比，React 组件提供的 Context 对象其实就好比一个提供给子组件访问的作用域，而 Context 对象的属性可以看成作用域上的活动对象。由于组件 的 Context 由其父节点链上所有组件通 过 getChildContext（）返回的 Context 对象组合而成，所以，组件通过 Context 是可以访问到其父组件链上所有节点组件提供的 Context 的属性。

### 22. 为什么 React 并不推荐优先考虑使用 Context？

- Context 目前还处于实验阶段，可能会在后面的发行版本中有很大的变化，事实上这种情况已经发生了，所以为了避免给今后升级带来大的影响和麻烦，不建议在 app 中使用 context。
- 尽管不建议在 app 中使用 context，但是独有组件而言，由于影响范围小于 app，如果可以做到高内聚，不破坏组件树之间的依赖关系，可以考虑使用 context
- 对于组件之间的数据通信或者状态管理，有效使用 props 或者 state 解决，然后再考虑使用第三方的成熟库进行解决，以上的方法都不是最佳的方案的时候，在考虑 context。
- context 的更新需要通过 setState()触发，但是这并不是很可靠的，Context 支持跨组件的访问，但是如果中间的子组件通过一些方法不影响更新，比如 shouldComponentUpdate() 返回 false 那么不能保证 Context 的更新一定可以使用 Context 的子组件，因此，Context 的可靠性需要关注

### 23.React 中什么是受控组件和非控组件？

#### （1）受控组件

在使用表单来收集用户输入时，例如等元素都要绑定一个 change 事件，当表单的状态发生变化，就会触发 onChange 事件，更新组件的 state。这种组件在 React 中被称为受控组件，在受控组件中，组件渲染出的状态与它的 value 或 checked 属性相对应，react 通过这种方式消除了组件的局部状态，使整个状态可控。react 官方推荐使用受控表单组件。

受控组件更新 state 的流程：

- 可以通过初始 state 中设置表单的默认值
- 每当表单的值发生变化时，调用 onChange 事件处理器
- 事件处理器通过事件对象 e 拿到改变后的状态，并更新组件的 state
- 一旦通过 setState 方法更新 state，就会触发视图的重新渲染，完成表单组件的更新

受控组件缺陷：

表单元素的值都是由 React 组件进行管理，当有多个输入框，或者多个这种组件时，如果想同时获取到全部的值就必须每个都要编写事件处理函数，这会让代码看着很臃肿，所以为了解决这种情况，出现了非受控组件。

#### （2）非受控组件

如果一个表单组件没有 value props（单选和复选按钮对应的是 checked props）时，就可以称为非受控组件。在非受控组件中，可以使用一个 ref 来从 DOM 获得表单值。而不是为每个状态更新编写一个事件处理程序。

> 要编写一个非受控组件，而不是为每个状态更新都编写数据处理函数，你可以使用 ref 来从 DOM 节点中获取表单数据。

> 因为非受控组件将真实数据储存在 DOM 节点中，所以在使用非受控组件时，有时候反而更容易同时集成 React 和非 React 代码。如果你不介意代码美观性，并且希望快速编写代码，使用非受控组件往往可以减少你的代码量。否则，你应该使用受控组件。

例如，下面的代码在非受控组件中接收单个属性：

```jsx
class NameForm extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(event) {
        alert('A name was submitted: ' + this.input.value)
        event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type='text' ref={(input) => (this.input = input)} />
                </label>
                <input type='submit' value='Submit' />
            </form>
        )
    }
}
```

总结：页面中所有输入类的 DOM 如果是现用现取的称为非受控组件，而通过 setState 将输入的值维护到了 state 中，需要时再从 state 中取出，这里的数据就受到了 state 的控制，称为受控组件。

### 24.React 中 refs 的作用是什么？有哪些应用场景？

Refs 提供了一种方式，用于访问在 render 方法中创建的 React 元素或 DOM 节点。Refs 应该谨慎使用，如下场景使用 Refs 比较适合：

- 处理焦点、文本选择或者媒体的控制
- 触发必要的动画
- 集成第三方 DOM 库

Refs 是使用 React.createRef() 方法创建的，他通过 ref 属性附加到 React 元素上。要在整个组件中使用 Refs，需要将 ref 在构造函数中分配给其实例属性：

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
    }
    render() {
        return <div ref={this.myRef} />
    }
}
```

由于函数组件没有实例，因此不能在函数组件上直接使用 ref：

```jsx
function MyFunctionalComponent() {
    return <input />
}
class Parent extends React.Component {
    constructor(props) {
        super(props)
        this.textInput = React.createRef()
    }
    render() {
        // 这将不会工作！
        return <MyFunctionalComponent ref={this.textInput} />
    }
}
```

但可以通过闭合的帮助在函数组件内部进行使用 Refs：

```jsx
function CustomTextInput(props) {
    // 这里必须声明 textInput，这样 ref 回调才可以引用它
    let textInput = null
    function handleClick() {
        textInput.focus()
    }
    return (
        <div>
            <input
                type='text'
                ref={(input) => {
                    textInput = input
                }}
            />
            <input
                type='button'
                value='Focus the text input'
                onClick={handleClick}
            />
        </div>
    )
}
```

注意：

- 不应该过度的使用 Refs
- ref 的返回值取决于节点的类型：
  - 当 ref 属性被用于一个普通的 HTML 元素时，React.createRef() 将接收底层 DOM 元素作为他的 current 属性以创建 ref。
  - 当 ref 属性被用于一个自定义的类组件时，ref 对象将接收该组件已挂载的实例作为他的 current。
- 当在父组件中需要访问子组件中的 ref 时可使用传递 Refs 或回调 Refs。

### 25.React 中除了在构造函数中绑定 this，还有别的方式吗？

- 在构造函数中绑定 this

```jsx
constructor(props){
      super(props);
       this.state={
           msg:'hello world',
       }
       this.getMsg = this.getMsg.bind(this)
   }
```

- 函数定义的时候使用箭头函数

```jsx
constructor(props){
    super(props);
    this.state={
           msg:'hello world',
    }
    render(){
      <button onClcik={()=>{alert(this.state.msg)}}>点我</button>
    }
}
```

- 函数调用是使用 bind 绑定 this

```jsx
<button onClick={this.getMsg.bind(this)}>点我</button>
```

### 26.React 组件的构造函数有什么作用？它是必须的吗？

构造函数主要用于两个目的：

- 通过将对象分配给 this.state 来初始化本地状态
- 将事件处理程序方法绑定到实例上

所以，当在 React class 中需要设置 state 的初始值或者绑定事件时，需要加上构造函数，官方 Demo：

```jsx
class LikeButton extends React.Component {
    constructor() {
        super()
        this.state = {
            liked: false,
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        this.setState({ liked: !this.state.liked })
    }
    render() {
        const text = this.state.liked ? 'liked' : "haven't liked"
        return (
            <div onClick={this.handleClick}>
                You {text} this. Click to toggle.
            </div>
        )
    }
}
ReactDOM.render(<LikeButton />, document.getElementById('example'))
```

构造函数用来新建父类的 this 对象；子类必须在 constructor 方法中调用 super 方法；否则新建实例时会报错；因为子类没有自己的 this 对象，而是继承父类的 this 对象，然后对其进行加工。如果不调用 super 方法；子类就得不到 this 对象。

注意：

- constructor () 必须配上 super(), 如果要在 constructor 内部使用 this.props 就要 传入 props , 否则不用
- JavaScript 中的 bind 每次都会返回一个新的函数, 为了性能等考虑, 尽量在 constructor 中绑定事件

### 27.React.forwardRef 是什么？它有什么作用？

React.forwardRef 会创建一个 React 组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中。这种技术并不常见，但在以下两种场景中特别有用：

- 转发 refs 到 DOM 组件
- 在高阶组件中转发 refs

### 28.类组件与函数组件有什么异同？

相同点：

组件是 React 可复用的最小代码片段，它们会返回要在页面中渲染的 React 元素。也正因为组件是 React 的最小编码单位，所以无论是函数组件还是类组件，在使用方式和最终呈现效果上都是完全一致的。

我们甚至可以将一个类组件改写成函数组件，或者把函数组件改写成一个类组件（虽然并不推荐这种重构行为）。从使用者的角度而言，很难从使用体验上区分两者，而且在现代浏览器中，闭包和类的性能只在极端场景下才会有明显的差别。所以，基本可认为两者作为组件是完全一致的。

不同点：

- 它们在开发时的心智模型上却存在巨大的差异。类组件是基于面向对象编程的，它主打的是继承、生命周期等核心概念；而函数组件内核是函数式编程，主打的是 immutable、没有副作用、引用透明等特点。
- 之前，在使用场景上，如果存在需要使用生命周期的组件，那么主推类组件；设计模式上，如果需要使用继承，那么主推类组件。但现在由于 React Hooks 的推出，生命周期概念的淡出，函数组件可以完全取代类组件。其次继承并不是组件最佳的设计模式，官方更推崇“组合优于继承”的设计概念，所以类组件在这方面的优势也在淡出。
- 性能优化上，类组件主要依靠 shouldComponentUpdate 阻断渲染来提升性能，而函数组件依靠 React.memo 缓存渲染结果来提升性能。
- 从上手程度而言，类组件更容易上手，从未来趋势上看，由于 React Hooks 的推出，函数组件成了社区未来主推的方案。
- 类组件在未来时间切片与并发模式中，由于生命周期带来的复杂度，并不易于优化。而函数组件本身轻量简单，且在 Hooks 的基础上提供了比原先更细粒度的逻辑组织与复用，更能适应 React 的未来发展。

## 二、数据管理

## 三、生命周期

### 1.React 的生命周期有哪些？

React 通常将组件生命周期分为三个阶段：

- 装载阶段（Mount），组件第一次在 DOM 树中被渲染的过程；
- 更新过程（Update），组件状态发生变化，重新更新渲染的过程；
- 卸载过程（Unmount），组件从 DOM 树中被移除的过程；

![ ](/img/interview/react3.jpg)

## 四、组件通信

### 1.父子组件的通信方式？

父组件向子组件通信：父组件通过 props 向子组件传递需要的信息。

```jsx
// 子组件: Child
const Child = (props) => {
    return <p>{props.name}</p>
}
// 父组件 Parent
const Parent = () => {
    return <Child name='react'></Child>
}
```

子组件向父组件通信：: props+回调的方式。

```jsx
// 子组件: Child
const Child = (props) => {
    const cb = (msg) => {
        return () => {
            props.callback(msg)
        }
    }
    return <button onClick={cb('你好!')}>你好</button>
}
// 父组件 Parent
class Parent extends Component {
    callback(msg) {
        console.log(msg)
    }
    render() {
        return <Child callback={this.callback.bind(this)}></Child>
    }
}
```

### 2.跨级组件的通信方式？

父组件向子组件的子组件通信，向更深层子组件通信：

- 使用 props，利用中间组件层层传递,但是如果父组件结构较深，那么中间每一层组件都要去传递 props，增加了复杂度，并且这些 props 并不是中间组件自己需要的。
- 使用 context，context 相当于一个大容器，可以把要通信的内容放在这个容器中，这样不管嵌套多深，都可以随意取用，对于跨越多层的全局数据可以使用 context 实现。

```jsx
// context方式实现跨级组件通信 
// Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据
const BatteryContext = createContext();
//  子组件的子组件 
class GrandChild extends Component {
    render(){
        return (
            <BatteryContext.Consumer>
                {
                    color => <h1 style={{"color":color}}>我是红色的:{color}</h1>
                }
            </BatteryContext.Consumer>
        )
    }
}
//  子组件
const Child = () =>{
    return (
        <GrandChild/>
    )
}
// 父组件
class Parent extends Component {
      state = {
          color:"red"
      }
      render(){
          const {color} = this.state
          return (
          <BatteryContext.Provider value={color}>
              <Child></Child>
          </BatteryContext.Provider>
          )
      }
}
```

### 3.非嵌套关系组件的通信方式？

即没有任何包含关系的组件，包括兄弟组件以及不在同一个父级中的非兄弟组件。

- 可以使用自定义事件通信（发布订阅模式）
- 可以通过redux等进行全局状态管理
- 如果是兄弟组件通信，可以找到这两个兄弟节点共同的父节点, 结合父子间通信方式进行通信。

### 4.如何解决 props 层级过深的问题

- 使用Context API：提供一种组件之间的状态共享，而不必通过显式组件树逐层传递props；
- 使用Redux等状态库。

### 5.组件通信的方式有哪些

- ⽗组件向⼦组件通讯: ⽗组件可以向⼦组件通过传 props 的⽅式，向⼦组件进⾏通讯
- ⼦组件向⽗组件通讯: props+回调的⽅式，⽗组件向⼦组件传递props进⾏通讯，此props为作⽤域为⽗组件⾃身的函 数，⼦组件调⽤该函数，将⼦组件想要传递的信息，作为参数，传递到⽗组件的作⽤域中
- 兄弟组件通信: 找到这两个兄弟节点共同的⽗节点,结合上⾯两种⽅式由⽗节点转发信息进⾏通信
- 跨层级通信: Context 设计⽬的是为了共享那些对于⼀个组件树⽽⾔是“全局”的数据，例如当前认证的⽤户、主题或⾸选语⾔，对于跨越多层的全局数据通过 Context 通信再适合不过
- 发布订阅模式: 发布者发布事件，订阅者监听事件并做出反应,我们可以通过引⼊event模块进⾏通信
- 全局状态管理⼯具: 借助Redux或者Mobx等全局状态管理⼯具进⾏通信,这种⼯具会维护⼀个全局状态中⼼Store,并根据不同的事件产⽣新的状态
