---
title: useEffect
icon: react
order: 9
date: 2024-01-23
category:
    - React
tag:
    - Hook
---

## 定义

```jsx
useEffect(setup, dependencies?)
```

useEffect 接受两个参数：

- setup 函数：这是包含我们的 Effect 逻辑的函数。setup 函数里还可以选择返回一个 cleanup 函数，cleanup 函数会在组件卸载的时候执行。
- 依赖数组（optional dependencies） ：这是 setup 代码内部引用的所有响应式值的列表。响应式值包括 props、state 以及直接在组件主体中声明的所有变量和函数。依赖数组可以不传递、传空数组和非空数组。

## 用法详解

### 基础使用

最简单的用法，在 useEffect 函数组件中执行副作用（例如：数据获取、手动修改 DOM、订阅事件等）。

```jsx
import React, { useState, useEffect } from 'react'

function Example() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        document.title = `点击了 ${count} 次`
    })

    return (
        <div>
            <p>点击了 {count} 次</p>
            <button onClick={() => setCount(count + 1)}>点击我</button>
        </div>
    )
}
```

### 不同的依赖数组的区别

```jsx
import React, { useState, useEffect } from 'react'

function Example() {
    const [leftCount, setLeftCount] = useState(0)
    const [rightCount, setRightCount] = useState(0)

    useEffect(() => {
        console.log(`Button left clicked ${leftCount} times`)
        document.title = `Button left clicked ${leftCount} times`
    })

    useEffect(() => {
        console.log(`Button right clicked ${rightCount} times`)
    }, [rightCount])

    useEffect(() => {
        console.log(`I have a empty array of dependencies.`)
    }, [])

    return (
        <div className='flex'>
            <div>
                <p>左按钮点击了 {leftCount} 次</p>
                <button onClick={() => setLeftCount(count + 1)}>左按钮</button>
            </div>
            <div>
                <p>右按钮点击了 {rightCount} 次</p>
                <button onClick={() => setRightCount(count + 1)}>右按钮</button>
            </div>
        </div>
    )
}
```

这个示例中，我们写了 3 个 useEffect，添加了不同的依赖数组，它们分别会有这样的表现：

- 第一个 useEffect 没有添加依赖数组，它的触发时机有：

  - 组件挂载、卸载的时候
  - 页面每一次 re-render 的时候，即 leftCount 和 rightCount 更新的时候，也是左按钮和右按钮点击的时候

- 第二个 useEffect 依赖数组添加了 rightCount，它的触发时机有：

  - 组件挂载、卸载的时候
  - rightCount 触发的 re-render 的时候，即 rightCount 更新的时候，也是右按钮点击的时候

- 第三个 useEffect 依赖数组说空的，它的触发时机有：
  - 组件挂载、卸载的时候

### 清除函数的作用

```jsx
useEffect(() => {
    ……

    return () => {
        // 组件卸载会执行这里面的代码
    };
}, []);
```

#### 应用场景 1:清除定时器

如果你在 useEffect 中设置了一个定时器（如 setTimeout 或 setInterval），在组件卸载前，你应该清除它，以防止它在组件不在 DOM 中时仍然执行。

```jsx
useEffect(() => {
    const timer = setInterval(() => {
        console.log('console once per second.')
    }, 1000)

    return () => {
        clearInterval(timer)
    }
}, [])
```

#### 应用场景 2:事件监听器

为全局对象（如 window 或 document）或特定 DOM 元素添加的事件监听器应当在组件卸载或不再需要它们时被移除。

```jsx
useEffect(() => {
    const handleResize = () => {
        console.log('Window resized!')
    }

    window.addEventListener('resize', handleResize)

    return () => {
        window.removeEventListener('resize', handleResize)
    }
}, [])
```

#### 应用场景 3:WebSockets 聊天室

当使用 WebSockets 或其他实时通信技术时，你可能会在组件加载时建立一个连接，而在组件卸载时需要断开这个连接。

```jsx
useEffect(() => {
    const socket = new WebSocket('ws://weijunext.com/socket')

    socket.onmessage = (event) => {
        console.log(event.data)
    }

    return () => {
        socket.close()
    }
}, [])
```

#### 应用场景 4:请求的取消

对于可能在组件卸载后才完成的异步请求（如使用 Axios 发起的 HTTP 请求），你应该在组件卸载前取消它们，以防止设置已卸载组件的状态。

```jsx
useEffect(() => {
    const source = axios.CancelToken.source()

    axios
        .get('/api/some-endpoint', { cancelToken: source.token })
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            if (axios.isCancel(error)) {
                console.log('Request cancelled')
            } else {
                console.error(error)
            }
        })

    return () => {
        source.cancel('Component unmounted')
    }
}, [])
```

#### 应用场景 5:DOM 直接操作和第三方 DOM 库

如果使用了直接操作 DOM 的方法或使用了如 D3、animation 这样的第三方库来操作 DOM，你可能需要在组件卸载时清理或还原某些操作。

```jsx
useEffect(() => {
    const animation = new FadeInAnimation(ref.current)
    animation.start(1000)
    return () => {
        animation.stop()
    }
}, [])
```

### 跳过初始渲染

在某些情况下，当组件首次渲染时，我们不希望立即执行某些操作。这些操作可能包括发送网络请求、触发某些动画或其他任务。而是只有在某个值或依赖项发生变化后，我们才希望执行这些任务。

假设我们有一个 count 状态，我们希望当 count 值发生变化时显示一个通知，但不希望在组件首次加载时显示这个通知。

```jsx
import React, { useState, useEffect, useRef } from 'react'

function Counter() {
    const [count, setCount] = useState(0)
    const mounted = useRef(false)

    useEffect(() => {
        if (mounted.current) {
            alert('Count value changed!')
        } else {
            mounted.current = true
        }
    }, [count])

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Increase</button>
            <p>Count: {count}</p>
        </div>
    )
}

export default Counter
```
