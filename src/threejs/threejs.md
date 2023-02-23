---
title: threejs
icon: markdown
order: 1
date: 2023-02-17
category:
  - threejs
tag:
  - threejs
---

<!-- more -->

123

<Test/>

::: vue-demo 一个 Vue Composition 演示

```vue
<template>
  <div class="box">
    <code>vuepress-theme-hope</code> is
    <span @click="handler">{{ message }}</span
    >!
  </div>
</template>
<script>
const { ref } = Vue;

export default {
  setup() {
    const message = ref("powerful");

    const handler = () => {
      message.value = "very " + message.value;
    };

    return {
      message,
      handler,
    };
  },
};
</script>
<style>
.box {
  color: red;
  width: 100%;
  height: 100px;
  background:green;
}
</style>
```

:::
