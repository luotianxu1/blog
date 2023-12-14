---
title: diff算法原理
icon: vue
order: 7
date: 2023-09-11
category:
    - Vue
tag:
    - diff算法原理
---

```javascript
// Vue实例化
let vm = new Vue({
    el: '#app',
    data() {
        return {
            a: 123,
        }
    },
    template: `<div id="a">hello {{a}}</div>`,
})

setTimeout(() => {
    vm.a = 1
}, 1000)
```

如果我们当初始渲染完成 1 秒后改变了一下模板里面 a 的值 vue 会怎么处理来显示最新的值呢?

1.把上次渲染的真实 dom 删除 然后重新渲染一个新的 dom 节点来应用最新的 a 的值

2.把老的 dom 进行复用 改变一下内部文本节点的 textContent 的值

> 这两种方案 很明显后者的性能开销更小

## 一、patch和讯渲染方法改写

```javascript
export function patch(oldVnode, vnode) {
    // 默认初始化时，是直接用虚拟节点穿件处真实节点 替换掉老节点
    if (oldVnode.nodeType == 1) {
        // 用vnode  来生成真实dom 替换原本的dom元素
        const parentElm = oldVnode.parentNode // 找到他的父亲
        let elm = createElm(vnode) //根据虚拟节点 创建元素
        parentElm.insertBefore(elm, oldVnode.nextSibling)

        parentElm.removeChild(oldVnode)

        return elm
    } else {
        // 在更新的时候，拿老的虚拟节点和新的虚拟节点做对比，将不同的地方更新真实的dom
        // 1、比较两个元素的标签，标签不一样直接替换掉即可
        if (oldVnode.tag !== vnode.tag) {
            return oldVnode.el.parentNode.replaceChild(
                createElm(vnode),
                oldVnode.el
            )
        }

        // 2、有可能是标签一样 <div>1</div> <div>2</div>
        // 文本节点的虚拟节点tag都是undefined
        // 文本的比对
        if (vnode.tag == undefined) {
            // 新老都是文本
            if (oldVnode.text !== vnode.text) {
                return (el.textContent = vnode.text)
            }
        }

        // 标签一样直接复用即可
        let el = (vnode.el = oldVnode.el) // 复用老节点

        // 3、标签一样 并且需要开始比对标签属性和儿子
        // 更新属性，用新的虚拟节点的属性和老的比较，去更新节点
        updateProperties(vnode, oldVnode.data)

        // 儿子比较氛围一下几种情况
        let oldChildren = oldVnode.children || []
        let newChildren = vnode.children || []
        if (oldChildren.length > 0 && newChildren.length > 0) {
            // 双方都有儿子
            // vue用了双指针的方式 来比对
            patchChildren(el, oldChildren, newChildren)
        } else if (newChildren.length > 0) {
            // 老的没儿子 但是新的有儿子
            for (let i = 0; i < newChildren.length; i++) {
                let child = createElm(newChildren[i])
                el.appendChild(child) // 循环创建新节点
            }
        } else if (oldChildren.length > 0) {
            // 老的有儿子 新的没有儿子
            el.innerHTML = `` // 直接删除老节点
        }
    }
}

export function createElm(vnode) {
    let { tag, data, children, text, vm } = vnode
    if (typeof tag === 'string') {
        // 元素
        vnode.el = document.createElement(tag) // 虚拟节点会有一个el属性 对应真实节点

        // 只有元素才有属性
        updateProperties(vnode)

        children.forEach((child) => {
            vnode.el.appendChild(createElm(child))
        })
    } else {
        vnode.el = document.createTextNode(text)
    }
    return vnode.el
}
```

![ ](/img/study/vue/diff.jpg)

## 二、updateProperties更新属性

```javascript
function updateProperties(vnode, oldProps = {}) {
    let newProps = vnode.data || {} // 新的属性
    let el = vnode.el

    // 样式处理 老的style={color:red} 新的 style={background: red}
    let newStyle = newProps.style || {}
    let oldStyle = oldProps.style || {}
    // 老的样式中有 新的没有 删除老的样式
    for (let key in oldStyle) {
        if (!newStyle[key]) {
            // 新的里面不存在这个样式
            el.style[key] = ''
        }
    }

    // 老的有新的没有 需要删除属性
    for (let key in oldProps) {
        if (!newProps[key]) {
            el.removeAttribute(key) // 移除真实dom的属性
        }
    }

    // 新的有 那就直接用新的去做更新即可
    for (let key in newProps) {
        if (key == 'style') {
            for (let styleName in newProps.style) {
                el.style[styleName] = newProps.style[styleName]
            }
        } else if (key == 'class') {
            el.className = newProps.class
        } else {
            el.setAttribute(key, newProps[key])
        }
    }
}
```

## 三、更新子节点

```javascript
function isSameVnode(oldVnode, newVnode) {
    return oldVnode.tag == newVnode.tag && oldVnode.key == newVnode.key
}

function patchChildren(el, oldChildren, newChildren) {
    // DOM中操作有很多常见的逻辑 把节点插入到当前儿子的头部、尾部、儿子倒叙正序

    let oldStartIndex = 0 // 老的索引
    let oldStartVnode = oldChildren[0] // 老的索引指向的节点
    let oldEndIndex = oldChildren.length - 1
    let oldEndVnode = oldChildren[oldEndIndex]
    let newStartIndex = 0
    let newStartVnode = newChildren[0]
    let newEndIndex = newChildren.length - 1
    let newEndVnode = newChildren[newEndIndex]

    const makeIndexByKey = (children) => {
        return children.reduce((memo, current, index) => {
            if (current.key) {
                memo[current.key] = index
            }
            return memo
        }, {})
    }
    // 创建映射表
    const keysMap = makeIndexByKey(oldChildren)

    // 做一个循环同时循环老的和新的，哪个先结束 循环就停止，将多余的删除或者添加进去
    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        // 头头比较 尾尾比较 头尾比较 尾头比较
        // 优化了 向后添加， 向前添加，尾巴移动到头部，头部移动到尾部 ，反转
        if (!oldStartVnode) {
            // 已经被移动走了
            oldStartVnode = oldChildren[++oldStartIndex]
        } else if (!oldEndVnode) {
            oldEndVnode = oldChildren[--oldEndIndex]
        }

        // 同时循环新的节点和 老的节点，有一方循环完毕就结束了
        if (isSameVnode(oldStartVnode, newStartVnode)) {
            // 头头比较，发现标签一致，
            patch(oldStartVnode, newStartVnode)
            oldStartVnode = oldChildren[++oldStartIndex]
            newStartVnode = newChildren[++newStartIndex]
        } else if (isSameVnode(oldEndVnode, newEndVnode)) {
            // 从尾部开始比较
            patch(oldEndVnode, newEndVnode)
            oldEndVnode = oldChildren[--oldEndIndex]
            newEndVnode = newChildren[--newEndIndex]
        }

        // 头尾比较  =》 reverse
        else if (isSameVnode(oldStartVnode, newEndVnode)) {
            patch(oldStartVnode, newEndVnode)
            el.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling) // 移动老的元素，老的元素就被移动走了，不用删除
            oldStartVnode = oldChildren[++oldStartIndex]
            newEndVnode = newChildren[--newEndIndex]
        } else if (isSameVnode(oldEndVnode, newStartVnode)) {
            // 尾头比较
            patch(oldEndVnode, newStartVnode)
            el.insertBefore(oldEndVnode.el, oldStartVnode.el)
            oldEndVnode = oldChildren[--oldEndIndex]
            newStartVnode = newChildren[++newStartIndex]
        } else {
            // 乱序比对   核心diff
            // 1.需要根据key和 对应的索引将老的内容生成程映射表
            let moveIndex = keysMap[newStartVnode.key] // 用新的去老的中查找
            // 不需要移动说明没有key复用的
            if (moveIndex == undefined) {
                // 如果不能复用直接创建新的插入到老的节点开头处
                el.insertBefore(createElm(newStartVnode), oldStartVnode.el)
            } else {
                let moveNode = oldChildren[moveIndex] // 老的虚拟节点
                oldChildren[moveIndex] = null // 此节点已经被移动走了
                el.insertBefore(moveNode.el, oldStartVnode.el)
                patch(moveNode, newStartVnode) // 比较两个节点的属性
            }
            newStartVnode = newChildren[++newStartIndex]
        }
    }
    //  如果老的多 将老节点删除 ， 但是可能里面有null 的情况
    if (oldStartIndex <= oldEndIndex) {
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
            if (oldChildren[i] !== null) el.removeChild(oldChildren[i].el)
        }
    }
    // 如果用户追加了一个怎么办？

    // 这里是没有比对完的
    if (newStartIndex <= newEndIndex) {
        for (let i = newStartIndex; i <= newEndIndex; i++) {
            // el.appendChild(createElm(newChildren[i]))
            // insertBefore方法 他可以appendChild功能 insertBefore(节点,null)  dom api

            //  看一下为指针的下一个元素是否存在
            let anchor =
                newChildren[newEndIndex + 1] == null
                    ? null
                    : newChildren[newEndIndex + 1].el
            el.insertBefore(createElm(newChildren[i]), anchor)
        }
    }
}
```

1.使用双指针移动来进行新老节点的对比

2.用 isSameVnode 来判断新老子节点的头头 尾尾 头尾 尾头 是否是同一节点 如果满足就进行相应的移动指针(头头 尾尾)或者移动 dom 节点(头尾 尾头)操作

3.如果全都不相等 进行暴力对比 如果找到了利用 key 和 index 的映射表来移动老的子节点到前面去 如果找不到就直接插入

4.对老的子节点进行递归 patch 处理

5.最后老的子节点有多的就删掉 新的子节点有多的就添加到相应的位置

## 四、改造原型渲染更新方法_update

```javascript
// src/lifecycle.js

export function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        const vm = this
        // 这里需要区分下到底是首次渲染还是更新
        const prevVnode = vm._vnode
        if (!prevVnode) {
            // 用新的创建的元素，替换老的vm.$el
            vm.$el = patch(vm.$el, vnode)
        } else {
            vm.$el = patch(prevVnode, vnode)
        }
        vm._vnode = vnode
    }
}
```

## 源码

<https://github.com/luotianxu1/learn/tree/main/vue2/06.diff>
