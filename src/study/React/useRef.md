---
title: useRef
icon: react
order: 8
date: 2024-01-23
category:
    - React
tag:
    - Hook
---

## 定义

```jsx
// 定义
const inputRef = useRef(null)

// 使用
console.log(inputRef.current)
```

这是 useRef 的使用示例，useRef 返回一个可变的 ref 对象，通过.current 可以获取保存在 useRef 的值。看起来像是一个复杂版的 useState，那么 useState 和 useRef 有什么区别？为什么需要 useRef 呢？

主要原因有两个：

- 持久性：useRef 的返回对象在组件的整个生命周期中都是持久的，而不是每次渲染都重新创建。
- 不会触发渲染：当 useState 中的状态改变时，组件会重新渲染。而当 useRef 的.current 属性改变时，组件不会重新渲染。

总结来说，useRef 既能保存状态，还不会在更新时触发渲染。本文我们就来盘点一下 useRef 的使用场景。

## 常见用途

### 访问 DOM 元素

当我们需要直接与 DOM 元素进行交互（例如，手动获取焦点或测量元素尺寸）时，可以使用 useRef。

```jsx
function TextInput() {
    const inputRef = useRef(null)

    function focusInput() {
        inputRef.current.focus()
    }

    return (
        <div>
            <input ref={inputRef} type='text' />
            <button onClick={focusInput}>Focus the input</button>
        </div>
    )
}
```

我们还可以在组件嵌套的场景使用 useRef

```jsx
import { forwardRef, useRef } from 'react'

const MyInput = forwardRef((props, ref) => {
    return <input {...props} ref={ref} />
})

export default function Form() {
    const inputRef = useRef(null)

    function handleClick() {
        inputRef.current.focus()
    }

    return (
        <>
            <MyInput ref={inputRef} />
            <button onClick={handleClick}>Focus the input</button>
        </>
    )
}
```

### 保存状态但不触发渲染

有时，你可能需要在组件中保存某些值，而不希望每次该值更改时都重新渲染组件。在这种情况下，useRef 很有用。

```jsx
function Timer() {
    const count = useRef(0)

    useEffect(() => {
        const intervalId = setInterval(() => {
            count.current += 1
            console.log(`Elapsed time: ${count.current} seconds`)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [])

    return <div>Check the console to see the elapsed time!</div>
}
```

### 保存上一次的 props 或 state

在某些情况下，你可能需要知道 props 或 state 的上一次值。这时可以使用 useRef 结合 useEffect 来达到目的。

```jsx
function DisplayValue({ value }) {
    const [prevValue, setPrevValue] = useState(null) // 初始时，没有前一个值
    const previousValue = useRef(value)

    useEffect(() => {
        setPrevValue(currentRef.current)
        previousValue.current = value
    }, [value])

    return (
        <div>
            Current Value: {value} <br />
            Previous Value: {prevValue}
        </div>
    )
}
```

当组件首次渲染时，previousValue.current 会被初始化为 value 的当前值。随后，每当 value 发生变化时，useEffect 都会运行并更新 previousValue.current 为新的 value。

但这里有一个微妙之处：由于 useEffect 是在组件渲染之后运行的，因此在组件的渲染过程中，previousValue.current 的值是从前一次渲染中保持不变的。只有当 useEffect 被调用并执行完毕后，previousValue.current 才会更新为新的 value。

## 高级技巧

### 避免在渲染期间读/写 ref

```jsx
function DisplayValue({ value }) {
    const previousValue = useRef(value)

    // 错误：在渲染期间修改 ref
    if (previousValue.current !== value) {
        previousValue.current = value
    }

    return (
        <div>
            Current Value: {value} <br />
            {/* 错误：在渲染期间读 ref */}
            Previous Value: {previousValue.current}
        </div>
    )
}
```

这里，我们尝试在组件的渲染期间更新 previousValue.current。这违反了 React 的工作方式，并可能导致不可预测的行为。例如：

- 不稳定的 UI：由于 React 在多次渲染中可能使用异步和优化技术，直接在渲染期间修改 refs 可能导致 UI 不一致。
- 依赖更新：如果其他效应或钩子依赖于 ref 的值，它们可能不会在期望的时刻运行，因为直接修改 ref 不会触发重新渲染或其他效应。

这是为什么我们通常在 useEffect 内部更新 refs。在 useEffect 内部，我们可以确保组件已经完成渲染，并且不会在渲染期间发生任何不期望的副作用。

### 避免重复创建 ref

如果我们在创建 ref 时，想要通过计算或有副作用的方法获取初值，可能会用下面这种写法。这种写法会导致 getInitialCount()在每次组建渲染的时候都被调用。虽然 useRef 的设计让它只从首次渲染的时候获取初值，但这种做法仍然会造成不必要的性能损耗。

```jsx
function ClickCounter() {
    // bad。这里的问题是，每次组件渲染时，getInitialCount都会被调用，尽管它的返回值只在第一次渲染时被使用。
    const countRef = useRef(getInitialCount())

    function handleClick() {
        countRef.current += 1
        console.log(`Button clicked ${countRef.current} times.`)
    }

    return <button onClick={handleClick}>Click me!</button>
}
```

解决这种场景下的 ref 创建也很简单，那就是用 null 作为初始值，渲染的过程判断仅在 null 时去计算或调用有副作用的方法。

```jsx
function ClickCounter() {
    // good
    const countRef = useRef(null)
    // good
    if (countRef.current === null) {
        countRef.current = getInitialCount()
    }

    function handleClick() {
        countRef.current += 1
        console.log(`Button clicked ${countRef.current} times.`)
    }

    return <button onClick={handleClick}>Click me!</button>
}
```

### 与 useReducer 使用

当我们需要复杂的状态逻辑且希望避免额外的渲染时，可以考虑将 useRef 与 useReducer 结合使用。

例如：跟踪 useReducer 的 action 数量。

```jsx
const initialState = { count: 0 }
function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 }
        default:
            throw new Error()
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const actionsCountRef = useRef(0)

    function handleIncrement() {
        dispatch({ type: 'increment' })
        actionsCountRef.current += 1
        console.log(`Actions count: ${actionsCountRef.current}`)
    }

    return (
        <>
            Count: {state.count}
            <button onClick={handleIncrement}>Increment</button>
        </>
    )
}
```

### 与第三方库集成

在使用非 React 库（如 D3、jQuery）时，我们可能需要使用 useRef 来获得对真实 DOM 节点的引用。

```jsx
import { useRef, useEffect } from 'react'
import * as d3 from 'd3'

function BarChart() {
    const chartRef = useRef(null)

    useEffect(() => {
        const svg = d3.select(chartRef.current)
        // ... 使用 D3 进行图表绘制
    }, [])

    return <svg ref={chartRef}></svg>
}
```

### 动画处理

```jsx
import { useEffect, useRef } from 'react'

function MovingBox() {
    const boxRef = useRef(null)
    const animationFrameRef = useRef(null)

    useEffect(() => {
        const boxElem = boxRef.current
        let position = 0

        const animate = () => {
            position += 1
            if (position > window.innerWidth) {
                position = -100 // 如果方块移动到屏幕的右侧，则从左侧重新开始
            }
            boxElem.style.transform = `translateX(${position}px)`
            animationFrameRef.current = requestAnimationFrame(animate)
        }

        animationFrameRef.current = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(animationFrameRef.current) // 在组件卸载时取消动画
        }
    }, [])

    return (
        <div
            ref={boxRef}
            style={{ width: '100px', height: '100px', background: 'blue' }}
        ></div>
    )
}

export default MovingBox
```

### 事件监听

使用 useRef 监听不由 React 管理的 DOM 事件。

例如：窗口大小变化

```jsx
function WindowSize() {
    const widthRef = useRef(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            widthRef.current = window.innerWidth
            console.log(`Width: ${widthRef.current}`)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return <div>Check the console for window width updates!</div>
}
```
