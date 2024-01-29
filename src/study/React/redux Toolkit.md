---
title: redux Toolkit
icon: react
order: 17
date: 2024-01-29
category:
    - react
tag:
    - redux
---

## 基础流程

src 目录下创建 store 文件夹,store 目录下创建 index.js

```js
import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './features/counterSlice.ts'

// configureStore创建一个redux数据
const store = configureStore({
    // 合并多个Slice
    reducer: {
        counter: counterSlice,
    },
})

export default store
```

store 目录下创建 features 文件夹,features 文件夹下创建 counterSlice.js 文件

```js
import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
    value: number;
    title: string;
}
const initialState: CounterState = {
    value: 0,
    title: 'redux toolkit pre',
}

// 创建一个 Slice
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    // 定义 reducers 并生成关联的操作
    reducers: {
        // 定义一个加的方法
        increment: (state, { payload }) => {
            // action 里面有 type 和 payload 两个属性，所有的传参都在payload里面
            state.value += payload.value
        },
        // 定义一个减的方法
        decrement: (state) => {
            state.value -= 1
        },
    },
})
// 导出加减的方法
export const { increment, decrement } = counterSlice.actions

// 默认导出
export default counterSlice.reducer
```

index.js

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

// redux toolkit
import { Provider } from 'react-redux'
import store from './store/index.ts'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)
reportWebVitals()
```

App.js

```jsx
import { useState } from 'react'
// 引入相关的hooks
import { useSelector, useDispatch } from 'react-redux'
// 引入对应的方法
import { increment, decrement } from './store/features/counterSlice.ts'

import logo from './logo.svg'
import './App.css'

function App() {
    // 通过useSelector直接拿到store中定义的value
    const { value } = useSelector((store) => store.counter)
    // 通过useDispatch 派发事件
    const dispatch = useDispatch()
    // 变量
    const [amount, setAmount] = useState(1)
    return (
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                {/* 页面中应用的代码 */}
                <p>{value}</p>
                <input
                    value={amount}
                    onChange={(e) => setAmount(+e.target.value)}
                />
                <button
                    onClick={() => {
                        dispatch(increment({ value: amount }))
                    }}
                >
                    加
                </button>
                <button
                    onClick={() => {
                        dispatch(decrement())
                    }}
                >
                    减
                </button>
            </header>
        </div>
    )
}

export default App
```

## 异步请求

features 文件夹下创建 movieSlice.js

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    list: [],
    totals: 0,
}

// 请求电影列表
const getMovieListApi = () =>
    fetch(
        'https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=24&page_id=1&ret_num=48'
    ).then((res) => res.json())

// thunk函数允许执行异步逻辑, 通常用于发出异步请求。
// createAsyncThunk 创建一个异步action，方法触发的时候会有三种状态：
// pending（进行中）、fulfilled（成功）、rejected（失败）
export const getMovieData = createAsyncThunk('movie/getMovie', async () => {
    const res = await getMovieListApi()
    return res
})

// 创建一个 Slice
export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        // 数据请求完触发
        loadDataEnd: (state, { payload }) => {
            state.list = payload
            state.totals = payload.length
        },
    },
    // extraReducers 字段让 slice 处理在别处定义的 actions，
    // 包括由 createAsyncThunk 或其他slice生成的actions。
    extraReducers(builder) {
        builder
            .addCase(getMovieData.pending, (state) => {
                console.log('🚀 ~ 进行中！')
            })
            .addCase(getMovieData.fulfilled, (state, { payload }) => {
                console.log('🚀 ~ fulfilled', payload)
                state.list = payload.data.list
                state.totals = payload.data.list.length
            })
            .addCase(getMovieData.rejected, (state, err) => {
                console.log('🚀 ~ rejected', err)
            })
    },
})

// 导出方法
export const { loadDataEnd } = movieSlice.actions

// 默认导出
export default movieSlice.reducer
```

修改 index.js

```js
import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './features/counterSlice.ts'
import movieSlice from './features/movieSlice.ts'

// configureStore创建一个redux数据
const store = configureStore({
    // 合并多个Slice
    reducer: {
        counter: counterSlice,
        movie: movieSlice,
    },
})

export default store
```

修改 App.js

```jsx
import { useState } from 'react'
// 引入相关的hooks
import { useSelector, useDispatch } from 'react-redux'
// 引入对应的方法
import {
    increment,
    decrement,
    asyncIncrement,
} from './store/features/counterSlice.ts'
import { getMovieData } from './store/features/movieSlice.ts'
import logo from './logo.svg'
import './App.css'
function App() {
    // 通过useSelector直接拿到store中定义的value
    const { value } = useSelector((store) => store.counter)
    // 通过useSelector直接拿到store中定义的list
    const { list } = useSelector((store) => store.movie)
    // 通过useDispatch 派发事件
    const dispatch = useDispatch()
    // 变量
    const [amount, setAmount] = useState(1)
    return (
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                {/* 页面中应用的代码 */}
                <p>{value}</p>
                <input
                    value={amount}
                    onChange={(e) => setAmount(+e.target.value)}
                />
                <button
                    onClick={() => {
                        dispatch(increment({ value: amount }))
                    }}
                >
                    加
                </button>
                <button
                    onClick={() => {
                        dispatch(decrement())
                    }}
                >
                    减
                </button>
                <button
                    onClick={() => {
                        dispatch(getMovieData())
                    }}
                >
                    获取数据
                </button>
                <ul>
                    {list.map((item) => {
                        return <li key={item.tvId}> {item.name}</li>
                    })}
                </ul>
            </header>
        </div>
    )
}

export default App
```
