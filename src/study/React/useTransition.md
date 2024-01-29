---
title: useTransition
icon: react
order: 13
date: 2024-01-25
category:
    - React
tag:
    - Hook
---

## 定义

```jsx
const [isPending, startTransition] = useTransition()
```

- isPending：是一个布尔值，当过渡状态仍在进行中时，其值为 true；否则为 false。
- startTransition：是一个函数，当你希望启动一个新的过渡状态时调用它。

## 工作原理

- 并发模式下的状态更新分类: 在 React 的并发模式中，不是所有的状态更新都被视为等同的。React 将更新分为不同的优先级类别，其中某些更新（如输入处理）被认为是更加紧急的，而其他更新（如从服务器获取数据）则可以中断或者延后更新。
- 使用 startTransition 进行状态更新: 当你使用 startTransition 函数进行状态更新时，你实际上告诉 React：这个更新不是非常紧急的，如果有更重要的更新要处理，你可以中断或延后这个次要更新。
- isPending 的用途: isPending 为我们提供了一个标识，告诉我们是否有一个 startTransition 正在执行。我们可以根据 isPending 来设置过渡状态的样式。

## 使用范围和注意事项

- 只有当你能访问某个状态的 set 函数时，你才能将更新包装进 useTransition 中。
- 传递给 startTransition 的函数必须是同步的，而不能是异步的。
- 如果你想根据某个 prop 或自定义 Hook 的值来启动一个过渡，那么你应该尝试使用 useDeferredValue。
- 不能用于控制文本输入。因为输入框是需要实时更新的，如果用 useTransition 降低了渲染优先级，可能造成输入“卡顿”。
- 不要在 startTransition 内部使用 setTimeout，如果一定要用 setTimeout，你可以在 startTransition 外层使用

````jsx
    startTransition(() => {
    // ❌ Setting state *after* startTransition call
    setTimeout(() => {
      setPage('/about');
    }, 1000);
    ```

});

setTimeout(() => {
startTransition(() => {
// ✅ Setting state _during_ startTransition call
setPage('/about');
});
}, 1000);
````

## 示例

### 有无 useTransition 的对比

想象一个场景，页面上有多个 tab，其中一个请求耗时较长，我们快速点击 tab 切换内容，但总是会在请求耗时的 tab 上卡顿一下，代码如下：

```jsx
import React, { useState, memo } from 'react'

const TabContainer = () => {
    const [tab, setTab] = useState('about')

    // 核心：切换选项卡
    function selectTab(nextTab) {
        setTab(nextTab)
    }

    return (
        <div>
            <div>
                <TabButton
                    isActive={tab === 'about'}
                    onClick={() => selectTab('about')}
                >
                    About
                </TabButton>
                <TabButton
                    isActive={tab === 'posts'}
                    onClick={() => selectTab('posts')}
                >
                    Posts (slow)
                </TabButton>
                <TabButton
                    isActive={tab === 'contact'}
                    onClick={() => selectTab('contact')}
                >
                    Contact
                </TabButton>
            </div>
            <hr />
            {tab === 'about' && <AboutTab />}
            {tab === 'posts' && <PostsTab />}
            {tab === 'contact' && <ContactTab />}
        </div>
    )
}

const PostsTab = memo(() => {
    let items = []
    for (let i = 0; i < 500; i++) {
        items.push(<SlowPost key={i} index={i} />)
    }
    return <ul>{items}</ul>
})

const SlowPost = ({ index }) => {
    let startTime = performance.now()
    while (performance.now() - startTime < 10) {}
    return <li>Post on weijunext.com #{index + 1}</li>
}

// 省略非关键代码
// ……

export default TabContainer
```

如果我们想用 useTransition 保持 UI 的响应，只需要用 startTransition 包裹切换选项卡的 set

```jsx
const [isPending, startTransition] = React.useTransition()

function selectTab(nextTab) {
    startTransition(() => {
        setTab(nextTab)
    })
}
```

这样我们快速切换 tab，无论点到哪一个 tab 都不会卡顿。

### useTransition 和 Suspense 实现路由流畅切换

当与路由结合使用时，React.Suspense 允许我们延迟渲染新的路由内容，直到所需的数据被完全加载。而 useTransition 则允许我们可控地开始这种可能导致 UI 变化的过渡——导航到新页面。

```jsx
import React, { useState } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

const [location, setLocation] = useState(window.location)
const [isPending, startTransition] = React.unstable_useTransition()

// 使用 startTransition 来更新 location 状态，能够延迟显示新页面的内容，直到数据加载完毕
function handleNavigation(newLocation) {
    startTransition(() => {
        setLocation(newLocation)
    })
}

// 主应用组件
function App() {
    return (
        <div>
            <BrowserRouter>
                {/* 导航 */}
                <nav>
                    <CustomLink to='/about'>About</CustomLink>
                    <CustomLink to='/contact'>Contact</CustomLink>
                </nav>

                {/* 使用 React.Suspense 来处理组件的懒加载 */}
                <React.Suspense fallback={<LoadingIndicator />}>
                    <Switch location={location}>
                        <Route path='/about' component={AboutPage} />
                        <Route path='/contact' component={ContactPage} />
                        {/* ...其他路由... */}
                    </Switch>
                </React.Suspense>

                {/* 使用 isPending 显示或隐藏全局加载指示器 */}
                {isPending && <LoadingIndicator />}
            </BrowserRouter>
        </div>
    )
}

export default App
```

通过这种方式，我们可以优雅地处理路由切换，并确保在数据加载时为用户提供一个流畅的体验。
