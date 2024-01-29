---
title: useState
icon: react
order: 5
date: 2024-01-23
category:
    - React
tag:
    - Hook
---

## 基本用法

useState 主要用于给组件添加状态变量。注意，我们只能在组件的顶层或自定义的 Hooks 中调用 useState。

## 初始化

### 基础定义

```jsx
const [age, setAge] = useState(42)
```

### 惰性初始化函数

对于需要计算得到的初始状态，可以使用函数传递给 useState。这样，函数只在初次渲染时执行，而非每次渲染。

```jsx
const initialState = () => Number(window.localStorage.getItem('count'))
const [count, setCount] = React.useState(initialState)
```

## 更新状态

### 直接更新

```jsx
setAge(newState)
```

```jsx
// 示例2: 使用直接更新
import { useState } from 'react'

export default function Counter() {
    const [age, setAge] = useState(42)
    function increment() {
        setAge(age + 1) // 直接更新
    }
    return (
        <>
            <h1>Your age: {age}</h1>
            <button
                onClick={() => {
                    increment()
                    increment()
                    increment()
                }}
            >
                +3
            </button>
        </>
    )
}
// 结果：点击 +3 时，可能只更新为 43。
```

### 函数式更新

```jsx
setState((prevState) => prevState + 1)
```

```jsx
// 示例1: 使用函数式更新
import { useState } from 'react'

export default function Counter() {
    const [age, setAge] = useState(42)

    function increment() {
        setAge((a) => a + 1) // 函数式更新
    }

    return (
        <>
            <h1>Your age: {age}</h1>
            <button
                onClick={() => {
                    increment()
                    increment()
                    increment()
                }}
            >
                +3
            </button>
        </>
    )
}
// 结果：点击 +3 时，age 更新为 45。
```

### 对象更新

```jsx
setForm({
    ...form,
    name: e.target.value, // 更新这个属性
})

// 错误示例：
// form.name = e.target.value
```

### 数组更新

```jsx
setTodos([
    ...todos,
    {
        id: nextId++,
        title: title,
        done: false,
    },
])

// 错误示例
// todos.push({
//   id: nextId++,
//   title: title,
//   done: false
// });
// setTodos(todos);
```

### 函数更新

把函数存储到 state 里是很少见的做法。

错误的示例：

```jsx
const [fn, setFn] = useState(someFunction)

function handleClick() {
    setFn(someOtherFunction)
}
```

根据上文，我们知道这样的用法是把函数的返回值存储或更新到状态中，并不是把函数存储到状态中。

如果你想在状态中存储一个函数，你需要使用一个箭头函数来“包裹”它。这是正确的做法：

```jsx
const [fn, setFn] = useState(() => someFunction)

function handleClick() {
    setFn(() => someOtherFunction)
}
```

那么我们什么时候会需要这样使用？这里介绍一些可能的场景：

- 可配置的行为: 你可能有一个组件，它的行为可以由父组件进行配置。在这种情况下，你可以将函数作为状态存储，以便在组件的生命周期中更改或更新它。
- 动态创建的函数: 在某些情况下，你可能需要基于组件的某些属性或状态动态创建函数。将这些函数存储为状态可以确保你只在必要时重新创建它们。
- 回调和外部交互: 如果你的组件与外部系统交互，并且需要提供回调函数，你可能希望在状态中存储这些回调函数，以便在适当的时候更改或更新它们。
- 延迟执行的函数: 在某些情况下，你可能想要在将来的某个时间点执行函数（例如，使用 setTimeout）。将函数存储为状态可以确保即使组件的其他部分发生变化，你也可以访问到最初的函数引用。
- 与第三方库的集成: 有些第三方库可能要求你提供并在后续更改函数。在这种情况下，将函数作为状态存储可能会更加方便。
