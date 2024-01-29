---
title: redux
icon: react
order: 15
date: 2024-01-29
category:
    - react
tag:
    - redux
---

## 基础

### index.js

在 Src 目录下新建 store 文件夹 /src/store/index.js

```js
import { createStore } from 'redux'

let initial = {
    supNum: 10,
    oppNum: 5,
}
const reducer = function reducer(state = initial, action) {
    // 浅拷贝，不直接修改容器中的状态,而是在return 时再修改
    state = { ...state }
    switch (action.type) {
        case 'VOTE_SUP':
            state.supNum++
            break
        case 'VOTE_OPP':
            state.oppNum++
            break
        default:
            break
    }
    return state
}
const store = createStore(reducer)

export default store
```

### ThemeContext.js

根目录创建上下文 context 文件 /src/ThemeContext.js

```js
import React from 'react'
const ThemeContext = React.createContext()
export default ThemeContext
```

### 在 main.jsx 中导入 store

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import Vote from './views/Vote'
import store from './store'
import ThemeContext from './ThemeContext'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <ConfigProvider locale={zhCN}>
        <ThemeContext.Provider
            value={{
                store,
            }}
        >
            <Vote></Vote>
        </ThemeContext.Provider>
    </ConfigProvider>
)
```

### Vote.jsx

```jsx
import React, { useContext, useState, useEffect } from 'react'
import VoteMain from './VoteMain'
import VoteFooter from './VoteFooter'
import ThemeContext from '../ThemeContext'

const Vote = function Vote() {
    const { store } = useContext(ThemeContext)
    let { supNum, oppNum } = store.getState()

    let [_, setNum] = useState(0)
    useEffect(() => {
        let unsubcribe = store.subscribe(() => {
            setNum(+new Date())
        })
        return () => {
            unsubcribe()
        }
    }, [_])

    return (
        <div className='vote-box'>
            <div className='header'>
                <h2 className='title'>React</h2>
                <span className='num'>{supNum + oppNum}</span>
            </div>
            <VoteMain></VoteMain>
            <VoteFooter></VoteFooter>
        </div>
    )
}

export default Vote
```

### VoteFooter.jsx

```jsx
import { Button } from 'antd'
import React, { useContext } from 'react'
import ThemeContext from '../ThemeContext'

const VoteFooter = function VoteFooter() {
    const { store } = useContext(ThemeContext)

    return (
        <div className='footer'>
            <Button
                type='primary'
                onClick={() => {
                    store.dispatch({ type: 'VOTE_SUP' })
                }}
            >
                支持
            </Button>
            <Button
                type='primary'
                danger
                onClick={() => {
                    store.dispatch({ type: 'VOTE_OPP' })
                }}
            >
                反对
            </Button>
        </div>
    )
}

export default VoteFooter
```

### VoteMain.jsx

```jsx
import React from 'react'
import ThemeContext from '../ThemeContext'

class VoteMain extends React.Component {
    static contextType = ThemeContext
    render() {
        const { store } = this.context
        let { supNum, oppNum } = store.getState()
        return (
            <div className='main'>
                <p>支持人数:{supNum}人</p>
                <p>反对人数:{oppNum}人</p>
            </div>
        )
    }

    componentDidMount() {
        const { store } = this.context
        store.subscribe(() => {
            this.forceUpdate()
        })
    }
}

export default VoteMain
```

## 工程化

### ThemeContext.js

在 Src 目录下新建 ThemeContext.js /src/ThemeContext.js

```js
import React from 'react'

const ThemeContext = React.createContext()

export default ThemeContext
```

### index.js

在 Src 目录下新建 store 文件夹 /src/store/index.js

```js
import { createStore } from 'redux'
import reducer from './reducers'

const store = createStore(reducer)
export default store
```

### 在 main.jsx 中导入 store

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import Vote from './views/Vote'
import store from './store'
import ThemeContext from './ThemeContext'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <ConfigProvider locale={zhCN}>
        <ThemeContext.Provider
            value={{
                store,
            }}
        >
            <Vote></Vote>
        </ThemeContext.Provider>
    </ConfigProvider>
)
```

### reducers

在 sotre 文件下新建 reducers 文件并创建 index.js /src/store/reducers/index.js

```js
// 合并各个模块的reducer
import { combineReducers } from 'redux'
import voteReducer from './voteReducer'

const reducer = combineReducers({
    vote: voteReducer,
})

export default reducer
```

在 reducers 文件下新建 voteReducer.js /src/store/reducers/voteReducer.js

```js
import * as TYPES from '../action.types'

const initial = {
    supNum: 10,
    oppNum: 5,
}

export default function persionReducer(state = initial, action) {
    state = { ...state }

    switch (action.type) {
        case TYPES.VOTE_SUP:
            state.supNum++
            break
        case TYPES.VOTE_OPP:
            state.oppNum++
            break
        default:
    }

    return state
}
```

在 store 文件下新建 action.types.js /src/store/action.types.js

```js
// 统一管理需要派发的行为标识
export const VOTE_SUP = 'VOTE_SUP'
export const VOTE_OPP = 'VOTE_OPP'
```

### actions

在 sotre 文件下新建 actions 文件并创建 index.js /src/store/actions/index.js

```js
import voteAction from './voteAction'

const action = {
    vote: voteAction,
}

export default action
```

在 actions 文件下新建 voteAction.js /src/store/actions/voteAction.js

```js
import * as TYPES from '../action.types'

const voteAction = {
    support() {
        return {
            type: TYPES.VOTE_SUP,
        }
    },
    oppose() {
        return {
            type: TYPES.VOTE_OPP,
        }
    },
}

export default voteAction
```

### Vote.jsx

```jsx
import React, { useContext, useState, useEffect } from 'react'
import VoteMain from './VoteMain'
import VoteFooter from './VoteFooter'
import ThemeContext from '../ThemeContext'

const Vote = function Vote() {
    const { store } = useContext(ThemeContext)
    let { supNum, oppNum } = store.getState().vote

    let [_, setNum] = useState(0)
    useEffect(() => {
        let unsubscribe = store.subscribe(() => {
            setNum(+new Date())
        })
        return () => {
            unsubscribe()
        }
    }, [_])

    return (
        <div className='vote-box'>
            <div className='header'>
                <h2 className='title'>React</h2>
                <span className='num'>{supNum + oppNum}</span>
            </div>
            <VoteMain></VoteMain>
            <VoteFooter></VoteFooter>
        </div>
    )
}

export default Vote
```

### VoteFooter.jsx

```jsx
import { Button } from 'antd'
import React, { useContext } from 'react'
import ThemeContext from '../ThemeContext'
import action from '../store/actions'

const VoteFooter = function VoteFooter() {
    const { store } = useContext(ThemeContext)

    return (
        <div className='footer'>
            <Button
                type='primary'
                onClick={() => {
                    store.dispatch(action.vote.support())
                }}
            >
                支持
            </Button>
            <Button
                type='primary'
                danger
                onClick={() => {
                    store.dispatch(action.vote.oppose())
                }}
            >
                反对
            </Button>
        </div>
    )
}

export default VoteFooter
```

### VoteMain.jsx

```jsx
import React from 'react'
import ThemeContext from '../ThemeContext'

class VoteMain extends React.Component {
    static contextType = ThemeContext
    render() {
        const { store } = this.context
        let { supNum, oppNum } = store.getState().vote

        return (
            <div className='main'>
                <p>支持人数:{supNum}人</p>
                <p>反对人数:{oppNum}人</p>
            </div>
        )
    }

    componentDidMount() {
        const { store } = this.context
        store.subscribe(() => {
            this.forceUpdate()
        })
    }
}

export default VoteMain
```

## 中间件

修改/store/index.js

```jsx
import { applyMiddleware, createStore } from 'redux'
import reducer from './reducers'
import reduxLogger from 'redux-logger'
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'

const store = createStore(
    reducer,
    applyMiddleware(reduxLogger, reduxThunk, reduxPromise)
)

export default store
```

修改/store/actions/voteAction.js

```jsx
import * as TYPES from '../action.types'

const delay = (interval = 1000) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, interval)
    })
}

const voteAction = {
    // redux-thunk
    support() {
        return async (dispatch) => {
            await delay() // 模拟网络请求
            dispatch({
                type: TYPES.VOTE_SUP,
            })
        }
    },
    // redux-promise
    async oppose() {
        await delay(2000)
        return {
            type: TYPES.VOTE_OPP,
        }
    },
}

export default voteAction
```
