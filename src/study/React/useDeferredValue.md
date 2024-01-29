---
title: useDeferredValue
icon: react
order: 14
date: 2024-01-25
category:
    - React
tag:
    - Hook
---

## useTransition 和 useDeferredValue 的差异

- useTransition 主要关注点是状态的过渡。它允许开发者控制某个更新的延迟更新，还提供了过渡标识，让开发者能够添加过渡反馈。
- useDeferredValue 主要关注点是单个值的延迟更新。它允许你把特定状态的更新标记为低优先级。

如果你想提供过渡反馈，就用 useTransition，如果不需要提供过渡反馈，用 useDeferredValue 就可以。

## 基础使用

```jsx
const deferredValue = useDeferredValue(someValue)
```

其中 someValue 是你想要延迟的值，它可以是任何类型。

deferredValue 的渲染有两种情况：

- 在初始渲染时，deferredValue 的值将与 someValue 的值相同。
- 在 UI 更新期间，因为 deferredValue 的优先级较低，即使并发模式下 deferredValue 已在后台更新，React 也会先使用旧值渲染，当其它高优先级的状态更新完成，才会把 deferredValue 新值渲染出来。

## 示例分析

想象一个场景，你在大数据量场景下做查询，前端渲染就需要延迟更新列表，还希望只有最后一次查询的数据被保留，这时候 useDeferredValue 就派上用场了，例如：

```jsx
import { useState, useDeferredValue, memo } from 'react'

export default function App() {
    const [text, setText] = useState('')
    const deferredText = useDeferredValue(text)
    return (
        <>
            {/* 输入框的值直接与 text 绑定，所以输入框会实时显示用户的输入 */}
            <input value={text} onChange={(e) => setText(e.target.value)} />
            {/* SlowList 组件接受 deferredText 作为属性，渲染优先级会被降低 */}
            {/* 在 UI 真正更新前，如果 deferredText 被更新多次，也只会保留最后一次的结果 */}
            <SlowList text={deferredText} />
        </>
    )
}

const SlowList = memo(function SlowList({ text }) {
    const arr = []
    for (let i = 0; i < 200; i++) {
        let startTime = performance.now()
        while (performance.now() - startTime < 1) {}
        if (String(i).includes(text)) {
            arr.push(<li key={i}>{i}</li>)
        }
    }
    return <ul className='items'>{arr}</ul>
})
```

如果你想对照不用 useDeferredValue 的效果，只要把`<SlowList>`修改掉就可以：

```jsx
<SlowList text={text} />
```

## 注意事项

- useDeferredValue 仅在开启 React 并发模式的时候才有效

```jsx
// React v18以前
ReactDOM.render(<app />, rootNode) // ❌ 无法开启useTransition

// React v18
ReactDOM.createRoot(rootNode).render(<app />) // ✅ 开启useTransition
```

- 传递给 useDeferredValue 的值应该是原始值（如字符串和数字）或在渲染外部创建的对象。

为什么对象需要创建在外部创建？这其实和 JavaScript 的机制有关，即使每次创建相同的对象，JavaScript 依然会每次生成新的引用。这意味着每次你在组件的渲染函数中创建一个新的对象并将其传递给 useDeferredValue，你都是在传递一个新的、与上一次渲染不同的引用。

```jsx
function MyComponent() {
    const obj = { name: 'John' } // 每次 MyComponent 重新渲染时，都会创建一个新的 obj 对象，它们的引用是不同的

    // useDeferredValue 通过 Object.is 来检查值是否有变化，引用不同的对象会被当作不同的值
    const deferredValue = useDeferredValue(obj)

    // ...其他代码...
}
```

- 当同一个 useDeferredValue 在渲染前接收到多次不同的值时，只有最后一个会被渲染。想象一下，前端在做大数据量查询的时候，我们当然希望只有最后一次查询的数据成功渲染。
- 和 useTransition 一样，useDeferredValue 只会中断或延迟 UI 的渲染，不会阻止网络请求。
- useDeferredValue 与`<Suspense>`结合使用，在 useDeferredValue 更新时，`<Suspense>`的 fallback 是不会出现的，页面上是继续显示 useDeferredValue 的旧值。这一点和 useTransition 不一样。

## 和节流、防抖的关系

从上面的学习可以看出来，useDeferredValue 在某些场景下是可以替换掉节流和防抖的，我们先来分析它们各自的特性，然后看看它们分别适用什么场景？

防抖与节流的局限性：

- 这两种方法都是为了控制函数的执行频率，但它们是阻塞的，可能会导致不流畅的用户体验。

useDeferredValue 的优势：

- 它与 React 深度集成，可以适应用户的设备。如果设备性能好，延迟的重新渲染会很快完成；如果设备性能差，重新渲染会相应地延迟。
- 它不需要选择固定的延迟，与防抖和节流不同。
- 由 useDeferredValue 执行的重新渲染是可中断的。这意味着在 React 重新渲染期间，如果发生了其他更新，React 会中断当前的渲染并处理新的更新。

适用场景：

- 如果要优化的工作不是在渲染期间进行的，例如减少网络请求，那么防抖和节流仍然是有用的。
- 如果优化的目标是和渲染有关的，建议使用 useDeferredValue
