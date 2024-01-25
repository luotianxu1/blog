---
title: useCallback
icon: react
order: 12
date: 2024-01-24
category:
    - React
tag:
    - Hook
---

## 定义

useCallback是对useMemo的特化，它可以返回一个缓存版本的函数，只有当它的依赖项改变时，函数才会被重新创建。这意味着如果依赖没有改变，函数引用保持不变，从而避免了因函数引用改变导致的不必要的重新渲染。

## 为什么需要 useCallback

想象这个场景：你有一个React.memo化的子组件，该子组件接受一个父组件传递的函数作为 prop。如果父组件重新渲染，而且这个函数是在父组件的函数体内定义的，那么每次父组件渲染时，都会为子组件传递一个新的函数实例。这可能会导致子组件不必要地重新渲染，即使该函数的实际内容没有任何变化。

useCallback的主要目的是解决这样的问题。它确保，除非依赖项发生变化，否则函数实例保持不变。这可以防止因为父组件的非相关渲染而导致的子组件的不必要重新渲染。

当然，useCallback真正的应用场景不仅于此，它还可以用于其他需要稳定引用的场景，例如事件处理器、setTimeout/setInterval的回调、函数用于useEffect、useMemo或useCallback等的依赖项、或其他可能因为函数引用改变而导致意外行为的场合。

## 如何使用 useCallback

```jsx
const memoizedCallback = useCallback(
  () => {
    // 函数体
  },
  [dependency1, dependency2, ...] // 依赖数组
);
```

只有当dependency1、dependency2等依赖发生改变时，函数才会重新创建。这对于React.memo化的组件、useEffect、useMemo等钩子的输入特别有用，因为它们都依赖于输入的引用恒定性。

来看个示例：

假设我们有一个TodoList组件，其中有一个TodoItem子组件：

```jsx
function TodoItem({ todo, onDelete }) {
  console.log("TodoItem render:", todo.id);
  return (
    <div>
      {todo.text}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
}

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Learn useCallback" }
  ]);

  const handleDelete = id => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
      ))}
    </div>
  );
}
```

上述代码中，每次TodoList重新渲染时，handleDelete都会被重新创建，导致TodoItem也重新渲染。为了优化这一点，我们可以使用useCallback：

```jsx
const handleDelete = useCallback(id => {
  setTodos(todos => todos.filter(todo => todo.id !== id));
}, []);
```

## useMemo 和 useCallback 的差异

用途与缓存的内容不同：

- useMemo: 用于缓存复杂函数的计算结果或者构造的值。它返回缓存的结果。
- useCallback: 用于缓存函数本身，确保函数的引用在依赖没有改变时保持稳定。

底层关联：

- 从本质上说，useCallback(fn, deps)就是useMemo(() => fn, deps)的语法糖:

```jsx
function useCallback(fn, dependencies) {
  return useMemo(() => fn, dependencies);
}
```

这里有一个用户评论系统示例，CommentsPage组件可显示文章的评论并允许用户提交新评论：

```jsx
import React, { useMemo, useCallback } from 'react';

function CommentsPage({ articleId, user }) {
  // 假设 fetchComments 是一个获取评论数据的函数
  const comments = fetchComments('/comments/' + articleId);

  // 对评论数据进行排序
  const sortedComments = useMemo(() => {
    return comments.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [comments]);

  // 处理新评论的提交
  const handleCommentSubmit = useCallback((commentText) => {
    post('/comments/' + articleId, {
      author: user,
      text: commentText
    });
  }, [articleId, user]);

  return (
    <div>
      <CommentList comments={sortedComments} />
      <CommentForm onSubmit={handleCommentSubmit} />
    </div>
  );
}
```

在这个示例中，useMemo和useCallback用途如下：

- useMemo用途：sortedComments通过对comments数据按日期进行排序得到。我们不希望每次CommentsPage重新渲染时都重新排序评论，除非comments发生变化。因此，我们使用useMemo来缓存排序结果。
- useCallback用途：对于handleCommentSubmit函数，我们不希望它在articleId或user保持不变的情况下有一个新的引用。因此，我们使用useCallback来确保函数引用的稳定性。

## 什么时候使用useCallback

使用useCallback不意味着总是会带来性能提升，这是对useCallback使用场景的简单总结：

使用useCallback：

- 子组件的性能优化：当你将函数作为 prop 传递给已经通过React.memo进行优化的子组件时，使用useCallback可以确保子组件不会因为父组件中的函数重建而进行不必要的重新渲染。
- Hook 依赖：如果你正在传递的函数会被用作其他 Hook（例如useEffect）的依赖时，使用useCallback可确保函数的稳定性，从而避免不必要的副作用的执行。
- 复杂计算与频繁的重新渲染：在应用涉及很多细粒度的交互，如绘图应用或其它需要大量操作和反馈的场景，使用useCallback可以避免因频繁的渲染而导致的性能问题。

避免使用useCallback：

- 过度优化：在大部分情况下，函数组件的重新渲染并不会带来明显的性能问题，过度使用useCallback可能会使代码变得复杂且难以维护。
- 简单组件：对于没有经过React.memo优化的子组件或者那些不会因为 prop 变化而重新渲染的组件，使用useCallback是不必要的。
- 使代码复杂化：如果引入useCallback仅仅是为了“可能会”有性能提升，而实际上并没有明确的证据表明确实有性能问题，这可能会降低代码的可读性和可维护性。
- 不涉及其它 Hooks 的函数：如果一个函数并不被用作其他 Hooks 的依赖，并且也不被传递给任何子组件，那么没有理由使用useCallback。

除此之外，我们还要注意针对useCallback的依赖项设计，我们需要警惕非必要依赖的混入，造成useCallback的效果大打折扣。例如这个非常典型的案例：

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: Date.now(), text };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }, [todos]);  // 这里是问题所在，todos的依赖导致这个useCallback几乎失去了其作用

  return (
    <div>
      <input value={inputValue} onChange={handleInputChange} />
      <button onClick={() => handleAddTodo(inputValue)}>Add Todo</button>
      <ul>
        {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
      </ul>
    </div>
  );
}
```

在上面的示例中，每当todos改变，handleAddTodo都会重新创建，尽管我们使用了useCallback。这实际上并没有给我们带来预期的性能优化。正确的做法是利用setTodos的函数式更新，这样我们就可以去掉todos依赖：

```jsx
const handleAddTodo = useCallback((text) => {
  const newTodo = { id: Date.now(), text };
  setTodos((prevTodos) => [...prevTodos, newTodo]);
}, []);  // 注意这里的空依赖数组
```
