---
title: Lod
icon: markdown
order: 2
date: 2023-04-28
category:
    - threejs
tag:
    - Lod
---

<IFrame url="https://luotainxu-demo.netlify.app/#/threejs/other/lod"/>

## 添加 Lod

```js
// 多层次细节展示
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
})
let lod = new THREE.LOD()
for (let i = 0; i < 5; i++) {
    const geometry = new THREE.SphereGeometry(1, 22 - i * 5, 22 - i * 5)
    const mesh = new THREE.Mesh(geometry, material)
    lod.addLevel(mesh, i * 5)
}
lod.position.set(10, 0, 10)
scene.add(lod)
```
