---
title: useContext
icon: react
order: 7
date: 2024-01-24
category:
    - React
tag:
    - Hook
---

## 基础用法

### 创建 Context

首先，我们需要使用 React.createContext 创建一个 context 对象：

```jsx
const MyContext = React.createContext(defaultValue)
```

这里的 defaultValue 是当组件不在任何 Context Provider 内部时的默认值，defaultValue 可以用 null，但 React 官方建议提供一个有意义的默认值，这样可以让调用 usecontext 组件更安全。

### 使用 Context Provider

为了在组件树中使用这个 context，我们需要使用<MyContext.Provider>组件，它接受一个 valueprop，这就是你想在它的子组件中共享的值。

```jsx
<MyContext.Provider value={someValue}>{/* 子组件 */}</MyContext.Provider>
```

### 在组件中访问 Context

在函数组件中，可以使用 useContexthook 来访问这个 context 的值。

```jsx
function MyComponent() {
    const contextValue = useContext(MyContext)
    return <div>{contextValue}</div>
}
```

这里的 contextValue 就是第二步传入的 someValue，而且 contextValue 获取到的永远是最新的值。

### 示例

```jsx
import React, { useContext } from 'react'

// 1. 创建 Context
const ThemeContext = React.createContext('light')

function App() {
    return (
        // 2. 使用 Context Provider
        <ThemeContext.Provider value='dark'>
            <Toolbar />
        </ThemeContext.Provider>
    )
}

function Toolbar() {
    return (
        <div>
            <ThemeButton />
        </div>
    )
}

function ThemeButton() {
    // 3. 在组件中访问 Context
    const theme = useContext(ThemeContext)
    return <button>{theme} theme</button>
}

export default App
```

App 中引用了 ThemeContext 并传了值，ThemeButton 是 App 的孙组件，这二者之间没有通过 Toolbar 进行嵌套传值，但是 ThemeButton 依然通过 useContext 拿到了 App 里的值。

## 进阶技巧

### 动态 Context 值

有的时候 Context 传的值需要动态变化，我们可以基于 useState 去更新状态，更新后的值会实时反应到调用 Context 的组件上。

```jsx
function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light')

    return (
        <ThemeContext.Provider value={theme}>
            <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
                Toggle Theme
            </button>
            {children}
        </ThemeContext.Provider>
    )
}
```

如果要更新对象也是可以的：

```jsx
import React, { useContext } from 'react'

// 1. 创建 Context
const CurrentUserContext = React.createContext('light')

function App() {
    const [currentUser, setCurrentUser] = useState(null)
    return (
        // 2. 使用 Context Provider
        <CurrentUserContext.Provider
            value={{
                currentUser,
                setCurrentUser,
            }}
        >
            <Toolbar />
        </CurrentUserContext.Provider>
    )
}

function Toolbar() {
    return (
        <div>
            <LoginButton />
        </div>
    )
}

function LoginButton() {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext)

    if (currentUser !== null) {
        return <p>You logged in as {currentUser.name}.</p>
    }

    return (
        <Button
            onClick={() => {
                setCurrentUser({ name: 'Advika' })
            }}
        >
            Log in as Weijunext
        </Button>
    )
}

export default App
```

### 覆盖 Provider value

当我们调用多个相同 Context，会实现 value 的覆盖

```jsx
<ThemeContext.Provider value='dark'>
    ...
    <ThemeContext.Provider value='light'>
        <Footer />
    </ThemeContext.Provider>
    ...
</ThemeContext.Provider>
```

## 高级应用——性能优化

当我们在使用 useContext 时，一个经常被提到的问题是性能优化。如果不正确地使用，Context 可能导致不必要的组件渲染，从而影响应用性能。

### 为什么会出现性能问题？

当 Provider 的 value 属性值发生变化时，所有使用了 useContext 的组件都将重新渲染。如果 value 经常变化，或者消费者组件很多，那么这会引起大量的不必要的渲染。

### 怎样解决？

#### 粒度化 Context

如果你的 context 包含许多不同的状态值，尝试将它们分解成更小的 context。例如，而不是只有一个大的 AppContext，你可以有 UserContext、ThemeContext 等。这样，当某一部分的数据发生变化时，只有依赖于那部分数据的组件会重新渲染。

```jsx
import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext(null)
const CurrentUserContext = createContext(null)

export default function MyApp() {
    const [theme, setTheme] = useState('light')
    const [currentUser, setCurrentUser] = useState(null)
    return (
        <ThemeContext.Provider value={theme}>
            <CurrentUserContext.Provider
                value={{
                    currentUser,
                    setCurrentUser,
                }}
            >
                <Toolbar />
                <button
                    onClick={() =>
                        setTheme(theme === 'light' ? 'dark' : 'light')
                    }
                >
                    Toggle Theme
                </button>
            </CurrentUserContext.Provider>
        </ThemeContext.Provider>
    )
}
```

#### 使用多个 Context 提供者

这与上一点相似。你可以为应用中的不同部分使用不同的 context 提供者，确保仅当真正需要的数据更改时才重新渲染组件。

#### 使用 useMemo 和 useCallback 优化 value

为了避免 value 变化造成子孙组件频繁的重新渲染，可以使用 useMemo 和 useCallback 对参数和方法进行缓存，减少 value 的无意义更新。

```jsx
import { useCallback, useMemo } from 'react'

function MyApp() {
    const [currentUser, setCurrentUser] = useState(null)

    const login = useCallback((response) => {
        storeCredentials(response.credentials)
        setCurrentUser(response.user)
    }, [])

    const contextValue = useMemo(
        () => ({
            currentUser,
            login,
        }),
        [currentUser, login]
    )

    return (
        <AuthContext.Provider value={contextValue}>
            <Page />
        </AuthContext.Provider>
    )
}
```
