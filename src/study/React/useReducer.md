---
title: useReducer
icon: react
order: 6
date: 2024-01-24
category:
    - React
tag:
    - Hook
---

## 基础用法

与 useState 相似，useReducer 也是 React 的 Hook，而且也只能放在组件最顶层使用。与前者不同的地方在于，它是通过 action 来更新状态的，使状态更新逻辑更具可读性。

useReducer 接收三个参数：

- reducer 函数：指定如何更新状态的还原函数，它必须是纯函数，以 state 和 dispatch 为参数，并返回下一个状态。
- 初始状态：初始状态的计算值。
- （可选的）初始化参数：用于返回初始状态。如果未指定，初始状态将设置为 initialArg；如果有指定，初始状态将被设置为调用 init(initialArg)的结果。

useReducer 返回两个参数：

- 当前的状态：当前状态。在第一次渲染时，它会被设置为 init(initialArg)或 initialArg（如果没有 init 的情况下）。
- dispatch：调度函数，用于调用 reducer 函数，以更新状态并触发重新渲染。

```jsx
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```

通常情况下，我们只会用到 useReducer 的前两个参数，如这个计数器组件：

```jsx
const initialState = { count: 0 }

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 }
        case 'decrement':
            return { count: state.count - 1 }
        default:
            throw new Error()
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <>
            Count: {state.count}
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        </>
    )
}
```

使用 dispatch 的注意事项

- dispatch 调用后，状态更新是异步的，因此立刻读取状态可能仍是旧的。

```jsx
function addCount() {
    dispatch({ type: 'increment' })
    console.log(state.count) // 打印出来的不是新值
}

;<button onClick={addCount}>+</button>
```

- React 对 dispatch 有一个优化机制：如果 dispatch 触发更新前后的值相等（使用 Object.is 判断），实际上 React 不会进行重新渲染，这是出于性能考虑。

使用 reducer 函数的注意事项

你在 reducer 里面更新对象和数组的状态，需要创建一个新的对象或数组，而不是在原对象和数组上修改，这一点和 useState 是一样的。

## 使用 init 函数

我们先假设一个场景，计数器的值保存在 localStorage 里面，进入页面的时候，我们希望从 localStorage 中读取值来作为 useReducer 初值，如果没有 init，我们可以这样做：

```jsx
function getInitialCount() {
    const savedCount = localStorage.getItem('count')
    return savedCount ? Number(savedCount) : 0
}

function counterReducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 }
        case 'DECREMENT':
            return { count: state.count - 1 }
        default:
            return state
    }
}

function Counter() {
    const [state, dispatch] = useReducer(counterReducer, getInitialCount())

    // 使用useEffect来监听状态的变化，并将其保存到localStorage
    useEffect(() => {
        localStorage.setItem('count', state.count)
    }, [state.count])

    return (
        <>
            Count: {state.count}
            <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
            <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
        </>
    )
}
```

在这个例子中，我们直接调用 getInitialCount 函数作为 useReducer 的第二个参数，从而得到初始状态。当 React 初始化这个组件时，它会执行这个函数并使用其返回值作为初始状态。

如果在第三个参数里进行初始化，代码是这样写：

```jsx
function init(initialValue) {
    // 尝试从localStorage中读取值
    const savedCount = localStorage.getItem('count')

    // 如果有值并且可以被解析为数字，则返回它，否则返回initialValue
    return { count: savedCount ? Number(savedCount) : initialValue }
}

function counterReducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 }
        case 'DECREMENT':
            return { count: state.count - 1 }
        default:
            return state
    }
}

function Counter() {
    const [state, dispatch] = useReducer(counterReducer, 0, init)

    // 使用useEffect来监听状态的变化，并将其保存到localStorage
    useEffect(() => {
        localStorage.setItem('count', state.count)
    }, [state.count])

    return (
        <>
            Count: {state.count}
            <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
            <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
        </>
    )
}
```

这两种方式看似差不多，但它们区别很大：

- 1、执行时机：
  - 直接调用函数作为第二个参数：这个函数会在每次组件渲染时执行。
  - 使用 init 函数：init 函数只在组件初次渲染时执行一次。
- 2、访问到的数据：
  - 直接调用函数作为第二个参数：这个函数只能访问到定义它时的作用域内的数据。
  - 使用 init 函数：由于 init 函数接受 initialArg 作为参数，这使得 init 函数具有更大的灵活性，能够基于传入的参数进行计算。
- 3、代码组织：

  - 直接调用函数作为第二个参数：这通常更简洁，适合那些简单的初始化逻辑。
  - 使用 init 函数：它提供了更清晰的代码组织结构，特别是当初始化逻辑相对复杂或需要根据传入的参数变化时。

- 4、性能：
- 直接调用函数作为第二个参数：如果这个函数执行了一些计算密集或副作用的操作，那么在每次组件渲染时都会执行，可能会导致性能问题。
- 使用 init 函数：由于它只在组件的初始化阶段执行一次，所以对于那些计算密集的初始化操作，使用 init 函数可能会更为高效。

总结一下，两者都可以用于初始化状态，如果你的初始化逻辑简单并且没有性能顾虑，可以直接使用一个函数作为 useReducer 的第二个参数，但如果你需要基于传入的参数来决定初始化逻辑或者想确保性能最优的做法，那么应该使用 init 函数。

## useReducer 与 Redux 的差异

虽然 useReducer 和 Redux 都采用了 action 和 reducer 的模式来处理状态，但它们在实现和使用上有几个主要的区别：

- 范围：useReducer 通常在组件或小型应用中使用，而 Redux 被设计为大型应用的全局状态管理工具。
- 中间件和扩展：Redux 支持中间件，这允许开发者插入自定义逻辑，例如日志、异步操作等。而 useReducer 本身不直接支持，但我们可以模拟中间件的效果。
- 复杂性：对于简单的状态管理，useReducer 通常更简单和直接。但当涉及到复杂的状态逻辑和中间件时，Redux 可能更具优势。
