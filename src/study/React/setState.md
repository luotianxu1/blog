---
title: setState
icon: react
order: 4
date: 2024-01-23
category:
    - React
tag:
    - setState
---

## 用法

### 基本用法

```jsx
this.setState({ key: value })
```

### 用函数作为参数

```jsx
this.setState((prevState, props) => {
    // 在这里可以基于 prevState 和 props 计算新的状态
    return newState
})
```

这种方式的函数参数接收两个参数：prevState 和 props。其中：

- prevState：表示组件当前的状态。React 会确保在调用函数之前，prevState 是最新的状态。
- props：表示组件的属性。与 prevState 一样，React 会确保在调用函数之前，props 是最新的属性。

在函数内部，可以使用这两个参数来计算新的状态对象，然后将其返回。React 会使用这个新状态对象合并到当前状态中，并在合适的时机触发组件的重新渲染。

使用函数作为 setState 的参数是一种安全且性能更好的方式来更新状态，特别是在需要基于当前状态进行计算时。

### setState 传入第二个参数 callback

```jsx
this.setState({ key: value }, () => {
    // 在这里可以访问更新后的状态
})
```

setState 是异步的，这意味着你不能立即在调用后获取更新后的状态。但是，你可以传递一个回调函数作为第二个参数，在状态更新后被调用

### 示例

```jsx
import React, { Component } from 'react'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: 'HelloReact',
            count: 0,
        }
    }
    changeText() {
        // 1.setState基本使用
        this.setState({ message: 'Hello USTB' })

        // 2.setState使用回调函数作为参数

        // 优点1:可以在回调函数中编写状态的处理逻辑
        // 优点2:会将之前的state和props传递给函数
        this.setState((prevState, props) => {
            console.log('最新state:', prevState)
            console.log('props信息', props)
            return {
                message: 'Hello USTB（采用回调函数作为参数）',
            }
        })

        // 3.setState传入第二个参数callback
        // 该函数会在状态更新完成并重新渲染组件后被调用。这可以用来执行与更新状态相关的操作，以及在确保状态更新后执行其他逻辑。

        this.setState({ message: 'Hello USTB(验证setState是异步)' }, () => {
            // 在回调中获取更新后的状态
            console.log('setState的回调函数中打印message', this.state.message)
        })
        console.log('执行setState后立马打印message：', this.state.message)
    }
    render() {
        const { message, count } = this.state
        return (
            <div>
                <h2>{message}</h2>
                <button onClick={(e) => this.changeText()}>改变文本</button>
                <h2>{count}</h2>
                <button>+1</button>
            </div>
        )
    }
}

export default App
```

## 连续更新状态

setState 调用展示了一个常见的陷阱，它可能会导致不正确的结果。连续的多个 setState 调用可能在同一批次中被合并执行，导致只有最后一个调用的状态更新生效。在你的例子中，前两次加一后减两，最终导致 count 为 -2。

```jsx
import React, { Component } from 'react'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0,
        }
    }
    increment() {
        console.log('--------')
        // 只会执行一次render函数，下列三行最后执行结果是 -2
        this.setState({ count: this.state.count + 1 })
        this.setState({ count: this.state.count + 1 })
        this.setState({ count: this.state.count - 2 })
    }
    render() {
        console.log('执行render函数')
        const { count } = this.state
        return (
            <div>
                <h2>{count}</h2>
                <button onClick={(e) => this.increment()}>+1</button>
            </div>
        )
    }
}

export default App
```

使用回调函数作为 setState 的参数，将状态更新逻辑嵌套在回调函数内。在这个方法中，你使用回调函数的方式进行连续的状态更新，这样每次更新都基于前一个更新的结果，避免了合并问题。这种方式保证了状态的正确更新。

```jsx
import React, { Component } from 'react'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0,
        }
    }
    increment() {
        console.log('--------')
        // 如果在一个事件函数中，需要连续对一个状态进行更改，需要为setState传入回调函数
        // 下列三个setState执行完后，counter值为0
        this.setState((state) => {
            return {
                counter: state + 1,
            }
        })
        this.setState((state) => {
            return {
                counter: state + 1,
            }
        })
        this.setState((state) => {
            return {
                counter: state - 2,
            }
        })
    }
    render() {
        console.log('执行render函数')
        const { count } = this.state
        return (
            <div>
                <h2>{count}</h2>
                <button onClick={(e) => this.increment()}>+1</button>
            </div>
        )
    }
}

export default App
```

## setState 为什么是异步

### 异步的意义

React 的 setState 是异步的设计是出于性能优化和避免不必要的渲染的考虑。这种设计在大多数情况下可以提高应用的性能和响应性。

- 性能优化： 当调用 setState 来更新组件的状态时，React 并不会立即进行重新渲染。而是会将更新放入一个队列中，然后在合适的时机批量处理这些更新，从而减少不必要的重复渲染。这样可以提高性能，避免频繁的 DOM 操作。
- 合并更新： React 会合并相邻的 setState 调用，避免重复的渲染。这意味着如果在一次事件处理函数中多次调用了 setState，React 会将这些调用合并成一个更新操作，只触发一次重新渲染。这种合并减少了不必要的渲染成本。
- 批量更新： 当多个组件都有状态更新时，React 会将这些更新批量处理，然后一次性更新所有组件，避免了不必要的重复渲染和频繁的 DOM 操作。

### 同步可能会产生的问题

下列案例阐述了假如 setState 是同步可能会产生的问题。如果 setState 是同步执行，会立马更新 message 的值，而并未执行 render 函数，给子组件 Hello 传递的 message 参数还是之前的旧值(HelloReact)，就会造成 state 和 props 不一致。

```jsx
import React, { Component } from 'react'
import Hello from './Hello'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: 'HelloReact',
        }
    }
    changeText() {
        // 如果setState是同步调用，那么会立马更新message的值，而并未执行render函数
        // 那么给子组件Hello传递的message参数还是之前的旧值(HelloReact)，就会造成state和props不一致
        this.setState({ message: 'Hello USTB' })
    }
    render() {
        console.log('执行render函数')
        const { message } = this.state
        return (
            <div>
                <h2>{message}</h2>
                <button onClick={(e) => this.changeText()}>改变文本</button>
                <Hello message={message} />
            </div>
        )
    }
}

export default App
```

## setState 一定是异步吗

在 React 的不同版本中，setState 的行为可能有所不同，但通常情况下，React 会将 setState 设计为异步操作，以提高性能和优化渲染。

setState 是否是异步需要根据 React 的版本来确定，在 React18 中，setState 操作一定是异步的。在 React18 版本之前，在组件生命周期或 React 合成事件中，setState 是异步。仍然有一些特殊情况下，setState 可能会被视为同步操作。

- 使用 setTimeout： 在某些早期的 React 版本中，使用 setTimeout 调用 setState 可能会导致同步更新，即在调用 setState 后立即执行重新渲染。这是因为在 setTimeout 中的代码会被推迟到下一个事件循环执行，而 React 的更新通常是在事件循环的末尾批量执行的，所以此时的 setState 可能会被立即处理。将 setState 的更新放在 setTimeout 的回调函数中。这样也能够在更新状态后立即访问到最新的状态。

- 原生 DOM 事件调用： 在一些原生事件处理函数中，例如 DOM 元素的点击事件处理函数，早期的 React 版本可能会将 setState 视为同步操作。这是因为原生事件是在浏览器的事件循环中触发的，而 React 的更新也是在事件循环中执行的，因此在一些情况下，setState 调用可能会立即更新组件。

## React18 中如何将 setState 设置为同步

### flushSync

flushSync 是 React 18 引入的一个新特性，用于在某些情况下强制同步地执行 React 更新。在 React 中，通常情况下，更新是异步批处理的，以优化性能并提高用户体验。然而，有时候需要在特定情况下控制更新的同步执行，这就是 flushSync 的用武之地。

flushSync 的作用是立即执行挂起的异步更新，而不管是在哪个生命周期、回调函数或事件处理程序中触发的。这可以确保相关的 UI 更新在调用 flushSync 之前被同步地执行。

flushSync 接受一个回调函数作为参数，该回调函数中包含需要同步执行的更新逻辑。当调用 flushSync 时，React 会尝试在当前任务中同步地处理更新，而不等到事件循环的下一个迭代。

一些常见的用例包括：

- 强制同步渲染： 在某些情况下，可能需要确保组件的渲染是同步的，以避免更新之间的不一致状态。
- 在 React 事件处理函数中同步更新： 如果在 React 的事件处理函数中调用了 flushSync，React 将会在当前事件循环中同步执行更新，而不是等到下一个循环。
- 同步读取更新后的 DOM 状态： 在使用 flushSync 后，可以立即读取更新后的 DOM 状态，而不需要等待渲染完成。

flushSync 应该谨慎使用，因为它可能会阻塞渲染并影响性能。通常情况下，应该优先考虑使用 React 的标准异步更新机制，以获得更好的性能和用户体验。只有在特定的场景下，确实需要控制同步更新时，才考虑使用 flushSync。

### 示例

```jsx
import React, { Component } from 'react'
import { flushSync } from 'react-dom' // 导入 flushSync 函数

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: 'HelloReact',
            count: 0,
        }
    }

    // 点击按钮后触发的方法，异步改变 message
    changeText() {
        this.setState({ message: 'Hello USTB' })
        console.log('message:', this.state.message) // 这里打印的是旧的 state.message
    }

    // 点击按钮后触发的方法，同步改变 message
    changeTextSync() {
        flushSync(() => {
            this.setState({ message: 'Hello Sync' }) // 同步更新状态
        })
        console.log('message:', this.state.message) // 这里打印的是新的 state.message
    }

    render() {
        console.log('执行 render 函数')
        const { message } = this.state
        return (
            <div>
                <h2>{message}</h2>
                <button onClick={(e) => this.changeText()}>改变文本</button>
                <button onClick={(e) => this.changeTextSync()}>
                    同步改变文本
                </button>
            </div>
        )
    }
}

export default App
```
