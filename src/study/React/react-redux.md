---
title: react-redux
icon: react
order: 16
date: 2024-01-29
category:
    - react
tag:
    - redux
---

## index.js

src 目录下 index.jsx

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import Vote from './views/Vote'
import store from './store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <Vote></Vote>
        </Provider>
    </ConfigProvider>
)
```

## store

src 目录下新建 store 文件夹,创建 index.js

```jsx
import { createStore } from 'redux'
import reducer from './reducers'

const store = createStore(reducer)
export default store
```

## reducers

store 文件夹下创建 reducers 文件夹,创建 index.js

```js
// 合并各个模块的reducer
import { combineReducers } from 'redux'
import voteReducer from './voteReducer'

const reducer = combineReducers({
    vote: voteReducer,
})

export default reducer
```

reducers 文件夹下创建 voteReducer.js

```js
// Persion模块下reducer
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

store 文件夹下创建 action.types.js

```js
// 统一管理需要派发的行为标识
export const VOTE_SUP = 'VOTE_SUP'
export const VOTE_OPP = 'VOTE_OPP'
```

## actions

store 文件夹下创建 actions 文件夹,创建 index.js

```js
import voteAction from './voteAction'

const action = {
    vote: voteAction,
}

export default action
```

store 文件夹下创建 voteAction.js

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

## Vote.jsx

```jsx
import React from 'react'
import VoteMain from './VoteMain'
import VoteFooter from './VoteFooter'
import { connect } from 'react-redux'

const Vote = function Vote(props) {
    let { supNum, oppNum } = props
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

// export default connect((state) => {
//     return {
//         supNum: state.vote.supNum,
//         oppNum: state.vote.oppNum
//     }
// })(Vote)

export default connect((state) => {
    return state.vote
})(Vote)
```

## VoteFooter.jsx

```jsx
import { Button } from 'antd'
import React from 'react'
import action from '../store/actions'
import { connect } from 'react-redux'

const VoteFooter = function VoteFooter(props) {
    let { support, oppose } = props
    return (
        <div className='footer'>
            <Button type='primary' onClick={support}>
                支持
            </Button>
            <Button type='primary' danger onClick={oppose}>
                反对
            </Button>
        </div>
    )
}

// export default connect(null, (dispatch) => {
//     return {
//         support: () => dispatch(action.vote.support()),
//         oppose: () => dispatch(action.vote.oppose()),
//     }
// })(VoteFooter)

export default connect(null, action.vote)(VoteFooter)
```

## VoteMain.jsx

```jsx
import React from 'react'
import { connect } from 'react-redux'

class VoteMain extends React.Component {
    render() {
        let { supNum, oppNum } = this.props
        return (
            <div className='main'>
                <p>支持人数:{supNum}人</p>
                <p>反对人数:{oppNum}人</p>
            </div>
        )
    }
}

export default connect((state) => state.vote)(VoteMain)
```
