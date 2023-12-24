---
title: MVC与MVVM
icon: react
order: 2
date: 2023-12-24
category:
    - React
tag:
    - MVC
    - MVVM
---

- 我们不会直接操作DOM
- 我们去操作数据【当我们修改了数据，框架会按照相关的数据，让页面重新渲染】
- 框架底层实现视图的渲染，也是基于操作DOM完成的
  - 构建了一套虚拟DOM-〉真实DOM的渲染关系
  - 有效避免了DOM的重排/重绘
- 开发效率更高、最后的性能也相对较好

React框架采用MVC体系，Vue框架采用MVVM体系。

MVC：model数据蹭+view视图层+controller控制层

MVVM：model数据层+view视图层+viewModel数据/视图监听层
