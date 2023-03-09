---
title: GUI
icon: markdown
order: 3
date: 2023-03-09
category:
    - threejs
tag:
    - GUI
---

<IFrame url="https://luotainxu-demo.netlify.app/#/threejs/gui"/>

## 构造函数 [params]

### name ：String

GUI 的名字

### load

### parent

### autoPlace : Booean

### hideable : Booean

打开后通过 h 键切换隐藏或显示

### closed ： Booean

默认打开或者关闭

### closeOnTop ： Boolean

关闭按钮显示在顶部

## 属性

### .domElement : DOMElement

### .parent : dat.gui.GUI

### .autoPlace : Boolean

### .closeOnTop : Boolean

关闭按钮是否显示在顶部

### .preset : String

### .width : Number

宽度

### .name : String

名称

### .closed : Boolean

### .load : Object

### .useLocalStorage : Boolean

### .add(object, property, [min], [max], [step]) ⇒ Controller

| 参数     |  类型  |      描述      |
| :------- | :----: | :------------: |
| object   | Object | 需要修改的对象 |
| property | String |  需要修改的值  |
| [min]    | Number |     最小值     |
| [max]    | Number |     最大值     |
| [step]   | Number |      步长      |

```js
var person = {name: 'Sam'};
gui.add(person, 'name');
```

```js
var person = {age: 45};
gui.add(person, 'age', 0, 100);
```

### .addColor(object, property) ⇒ Controller

```js
var palette = {
  color1: '#FF0000', // CSS string
  color2: [ 0, 128, 255 ], // RGB array
  color3: [ 0, 128, 255, 0.3 ], // RGB with alpha
  color4: { h: 350, s: 0.9, v: 0.3 } // Hue, saturation, value
};
gui.addColor(palette, 'color1');
gui.addColor(palette, 'color2');
gui.addColor(palette, 'color3');
gui.addColor(palette, 'color4');
```
