---
title: html
icon: html
order: 8
date: 2023-12-15
category:
    - html
tag:
    - html
---

## css 省略号

### 单行溢出显示省略号

::: normal-demo demo

```html
<div class="content ellipsis">单行溢出显示省略号单行溢出显示省略号</div>
```

```css
.content {
    width: 50px;
    height: 40px;
    background-color: #dae9f9;
}

.ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
```

:::

### 多行溢出显示省略号

::: normal-demo demo

```html
<div class="content ellipsis">
    CSS内容超出部分显示省略号，这个是多行文字内容显示省略号的情况
</div>
```

```css
.content {
    width: 150px;
    height: 32px;
    line-height: 16px;
    background-color: #dae9f9;
}

.ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
```

:::

### 省略号显示在文本前

::: normal-demo demo

```html
<div class="content ellipsis">
    CSS内容超出部分显示省略号，这个是多行文字内容显示省略号的情况
</div>
```

```css
.content {
    width: 150px;
    height: 32px;
    background-color: #dae9f9;
}

.ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    direction: rtl;
}
```

:::

## 换行

```css
wordBreak:"break-all";
```
