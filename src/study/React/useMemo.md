---
title: useMemo
icon: react
order: 11
date: 2024-01-24
category:
    - React
tag:
    - Hook
---

## 定义

它的核心目的是通过缓存计算结果，避免在组件渲染时进行不必要的重复计算，从而优化性能。这意味着只有当其依赖项发生变化时，useMemo 才会重新计算这个值，否则它将重用之前的结果。

```jsx
const cachedValue = useMemo(calculateValue, dependencies)
```

- calculateValue：这是一个用于计算我们想要缓存的值的函数。为了确保结果的稳定性和预测性，这个函数应该是一个纯函数。这意味着，它在相同的输入下总是返回相同的输出，并且没有任何副作用。
- dependencies：这是一个数组，包含 useMemo 所依赖的变量或值。当数组中的任何值发生变化时，calculateValue 函数将被重新执行。

## 基础用法

useMemo 接受两个参数：一个函数和一个依赖项数组。

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
```

在上面的例子中，computeExpensiveValue 是一个可能需要很长时间来计算的函数。我们只有当 a 或 b 改变时，才重新调用这个函数。否则，我们会使用之前缓存的值。

用一个例子来看 useMemo 的执行时机：

```jsx
import React, { useMemo, useState } from 'react'

function filterUsers(users, searchTerm) {
    return users.filter((user) => user.name.includes(searchTerm))
}

function useMemoDemo() {
    const [searchTerm, setSearchTerm] = useState('')
    const [isDark, setIsDark] = useState(false)

    const allUsers = useMemo(() => {
        let list = []
        for (let i = 1; i <= 500; i++) {
            list.push({ id: i, name: `User${i}` })
        }
        return list
    }, [])

    const useMemoCurrentUsers = useMemo(() => {
        console.log('with useMemo')
        return filterUsers(allUsers, searchTerm)
    }, [allUsers, searchTerm])

    return (
        <div>
            {/* 每一次更改查询框内容，都会触发useMemo */}
            <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search by name...'
            />

            {/* 每一次更改背景色，都不会触发useMemo */}
            <button onClick={() => setIsDark((pre) => !pre)}>
                {isDark ? 'Dark mode' : 'Light mode'}
            </button>

            <div>
                <div>
                    <h2>With useMemo</h2>
                    <div style={{ background: isDark ? '#000' : '' }}>
                        {useMemoCurrentUsers.map((user) => (
                            <div key={user.id}>{user.name}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default useMemoDemo
```

## 高级用法

### 缓存组件

useMemo 的作用不知局限于缓存数据，它还可以缓存组件。

如果你在渲染某个组件时有昂贵的计算，并且你想在某些依赖未改变时避免这些计算，那么也可以使用 useMemo 来缓存这个组件。用法如下：

```jsx
function ParentComponent(props) {
    const [someData, setSomeData] = useState(initialData)

    const MemoizedExpensiveComponent = useMemo(() => {
        return <ExpensiveComponent data={someData} />
    }, [someData])

    return (
        <div>
            {MemoizedExpensiveComponent}
            {/* 其他组件和逻辑 */}
        </div>
    )
}
```

如果上一节的示例，我们想把用户列表的组件缓存起来，可以这么做：

```jsx
function UserList({ allUsers, searchTerm }) {
    const filteredUsers = filterUsers(allUsers, searchTerm)
    return (
        <>
            {useMemoCurrentUsers.map((user) => (
                <div key={user.id}>{user.name}</div>
            ))}
        </>
    )
}

function Comparison1() {
    // ……

    const MemoizedUserList = useMemo(() => {
        return <UserList allUsers={allUsers} searchTerm={searchTerm} />
    }, [allUsers, searchTerm])

    return (
        <div>
            {/* …… */}
            <h2>With useMemo</h2>
            <div style={{ background: isDark ? '#000' : '' }}>
                {MemoizedUserList}
            </div>
            {/* …… */}
        </div>
    )
}

export default Comparison1
```

现在，整个 UserList 组件被缓存，只有当 allUsers、searchTerm 或 isDark 发生变化时，才会重新计算。

除了 useMemo 能够缓存组件，React 还提供了 memo 这个高阶组件来完成相似的工作。

```jsx
const UserList = memo(function UserList({ allUsers, searchTerm }) {
    const filteredUsers = filterUsers(allUsers, searchTerm)
    return (
        <>
            {filteredUsers.map((user) => (
                <div key={user.id}>{user.name}</div>
            ))}
        </>
    )
})

function Comparison1() {
    // ……

    return (
        <div>
            {/* …… */}
            <h2>With useMemo</h2>
            <div style={{ background: isDark ? '#000' : '' }}>
                <UserList allUsers={allUsers} searchTerm={searchTerm} />
            </div>
            {/* …… */}
        </div>
    )
}

export default Comparison1
```

使用 memo 高阶组件包裹后，只有当 props 发生变化时重新渲染。这种方式和上面使用 useMemo 缓存组件的作用是一样的，但代码可读性更强，也是 React 官方更推荐的方式。

考虑到 useMemo 和 memo 的特点，我们可以这么说：

- 当你想避免因为数据变化而产生的不必要的计算时，使用 useMemo；
- 当你想避免因为 props 未变而产生的不必要的组件重渲染时，使用 memo。

### 缓存函数

除了缓存数据和组件，useMemo 还能够缓存函数。你只需要在 useMemo 里 return 一个函数即可，如下：

```jsx
const handleUserClick = useMemo(() => {
    return (userName) => {
        alert(`Clicked on: ${userName}`)
    }
}, [])
```

### 反例：过渡优化

useMemo 是用于优化的工具，但有时，如果过度使用它们，可能会导致性能更差或代码更加复杂。下面看一个过度优化的例子：

想象这个场景，我们有一个简单的组件，只显示一个数字和一个按钮，点击按钮会增加这个数字。

```jsx
import React, { useState, useMemo } from 'react'

function Counter() {
    const [count, setCount] = useState(0)

    const handleIncrease = useMemo(() => {
        return () => {
            setCount(count + 1)
        }
    }, [count])

    return (
        <div>
            <div>{count}</div>
            <button onClick={handleIncrease}>Increase</button>
        </div>
    )
}

export default Counter
```

这里的问题是：

- 不必要的复杂性：原始的组件是简单的，并且性能表现得很好。引入 useMemo 只是增加了代码的复杂性，而并没有带来任何实际的性能提升。
- 增加了性能开销：useMemo 本身也有开销。在这种情况下，任何由 useMemo 带来的小优势都被其自身的开销抵消了，因为每次 count 变化，handleIncrease 都会重新计算。
- 可读性下降：对于后来查看代码的其他开发者来说，看到 useMemo 可能会引起困惑。他们可能会花费时间思考为什么这里需要优化，尽管实际上并不需要。

综上所述，不是所有的组件都需要优化，特别是当它们已经足够简单和高效的时候。过度使用优化工具可能会导致更差的性能和更低的代码可读性。
