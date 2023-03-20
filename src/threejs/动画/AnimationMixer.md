---
title: AnimationMixer
icon: markdown
order: 1
date: 2023-03-20
category:
    - threejs
tag:
    - 动画
---

## AnimationMixer

动画混合器是用于场景中特定对象的动画的播放器。当场景中的多个对象独立动画时，每个对象都可以使用同一个动画混合器。

<IFrame url="https://luotainxu-demo.netlify.app/#/threejs/animation"/>

## 构造器

### AnimationMixer( rootObject : Object3D )

- rootObject - 混合器播放的动画所属的对象

## 属性

### .time : Number

全局的混合器时间(单位秒; 混合器创建的时刻记作0时刻)

### .timeScale : Number

全局时间(mixer time)的比例因子

## 方法

## .clipAction (clip : AnimationClip, optionalRoot : Object3D) : AnimationAction

返回所传入的剪辑参数的AnimationAction, 根对象参数可选，默认值为混合器的默认根对象。第一个参数可以是动画剪辑(AnimationClip)对象或者动画剪辑的名称。

如果不存在符合传入的剪辑和根对象这两个参数的动作, 该方法将会创建一个。传入相同的参数多次调用将会返回同一个剪辑实例。

## .existingAction (clip : AnimationClip, optionalRoot : Object3D) : AnimationAction

返回传入剪辑的已有AnimationAction, 根对象参数可选，默认值为混合器的默认根对象。

第一个参数可以是动画剪辑(AnimationClip)对象或者动画剪辑的名称。

## .getRoot () : Object3D

返回混合器的根对象

## .stopAllAction () : this

停用混合器上所有预定的动作

## .update (deltaTimeInSeconds : Number) : this

推进混合器时间并更新动画

通常在渲染循环中完成, 传入按照混合器的时间比例(timeScale)缩放过的clock.getDelta

## .setTime (timeInSeconds : Number) : this

设置全局混合器到一个给定的时间，并相应地更新动画。

当你需要在一个动画里跳转到一个精确的时间，该函数将是十分有用的。输入的参数将会被混合器的timeScale进行缩放。

## .uncacheClip (clip : AnimationClip) : undefined

释放剪辑的所有内存资源

## .uncacheRoot (root : Object3D) : undefined

释放根对象的所有内存资源

## .uncacheAction (clip : AnimationClip, optionalRoot : Object3D) : undefined

释放动作的所有内存资源
