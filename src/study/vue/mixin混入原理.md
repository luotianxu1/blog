---
title: mixin混入原理
icon: vue
order: 8
date: 2023-09-11
category:
    - Vue
tag:
    - mixin混入原理
---

```javascript
Vue.mixin({
  created() {
    console.log("我是全局混入");
  },
});

// Vue实例化
let vm = new Vue({
  el: "#app",
  data() {
    return {
      a: { a: { a: { b: 456 } } },
      aa: 1,
      bb: 2,
    };
  },
  created() {
    console.log("我是自己的");
  },
  template: `<div id="a">hello 这是我自己写的Vue{{name}}
          </div>`,
});
```

## 一、定义全局 Mixin 函数

```javascript
import { mergeOptions } from '../utils'

export function initGlobalApi(Vue) {
    Vue.options = {} // 用来存放全局的配置 , 每个组件初始化的时候都会和options选项进行合并
    Vue.mixin = function (options) {
        // 合并对象 先考虑生命周期，先不考虑其他的合并
        this.options = mergeOptions(this.options, options)
        return this
    }
}
```

新建 global-api 文件夹 把 mixin 定义为 Vue 的全局方法 核心方法就是利用 mergeOptions 把传入的选项混入到自己的 options 上面

```javascript
// src/index.js
import { initMixin } from "./init.js";
// Vue就是一个构造函数 通过new关键字进行实例化
function Vue(options) {
  // 这里开始进行Vue初始化工作
  this._init(options);
}
// 此做法有利于代码分割
initMixin(Vue);
export default Vue;
```

## 二、mergeOptions 方法

```javascript
// src/util.js

export const lifeCycleHooks = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
]
// 策略模式
let strats = {} // 存放各种策略

// 生命周期的合并
function mergeHook(parentVal, childVal) {
    if (childVal) {
        if (parentVal) {
            return parentVal.concat(childVal) // 后续
        } else {
            return [childVal] // 第一次
        }
    } else {
        return parentVal
    }
}
lifeCycleHooks.forEach((hook) => {
    strats[hook] = mergeHook
})

export function mergeOptions(parent, child) {
    // 遍历父亲，可能是父亲有，儿子没有
    const options = {}

    for (let key in parent) {
        // 父亲和儿子都有在这就处理了
        mergeField(key)
    }

    // 儿子有父亲没有
    for (let key in child) {
        if (parent.hasOwnProperty(key)) {
            continue
        }
        mergeField(key)
    }

    function mergeField(key) {
        let parentVal = parent[key]
        let childVal = child[key]
        // 策略模式
        if (strats[key]) {
            // 如果有对应的策略就调用对应的策略即可
            options[key] = strats[key](parentVal, childVal)
        } else {
            if (isObject(parentVal) && isObject(childVal)) {
                options[key] = { ...parentVal, ...childVal }
            } else {
                // 父亲中有，儿子中没有
                options[key] = child[key] || parent[key]
            }
        }
    }

    return options
}
```

## 生命周期

```javascript
// src/lifecycle.js

export function callHook(vm, hook) {
  // 依次执行生命周期对应的方法
  const handlers = vm.$options[hook];
  if (handlers) {
    for (let i = 0; i < handlers.length; i++) {
      handlers[i].call(vm); //生命周期里面的this指向当前实例
    }
  }
}

```

```javascript
// src/init.js

Vue.prototype._init = function (options) {
  const vm = this;
  // 这里的this代表调用_init方法的对象(实例对象)
  //  this.$options就是用户new Vue的时候传入的属性和全局的Vue.options合并之后的结果

  vm.$options = mergeOptions(vm.constructor.options, options);
  callHook(vm, "beforeCreate"); //初始化数据之前
  // 初始化状态
  initState(vm);
  callHook(vm, "created"); //初始化数据之后
  // 如果有el属性 进行模板渲染
  if (vm.$options.el) {
    vm.$mount(vm.$options.el);
  }
};
```

```javascript
// src/lifecycle.js
export function mountComponent(vm, el) {
  vm.$el = el;
  // 引入watcher的概念 这里注册一个渲染watcher 执行vm._update(vm._render())方法渲染视图
  callHook(vm, "beforeMount"); //初始渲染之前
  let updateComponent = () => {
    vm._update(vm._render());
  };
  new Watcher(
    vm,
    updateComponent,
    () => {
      callHook(vm, "beforeUpdate"); //更新之前
    },
    true
  );
  callHook(vm, "mounted"); //渲染完成之后
}
```

## 源码

<https://github.com/luotianxu1/learn/tree/main/vue2/06.diff>
