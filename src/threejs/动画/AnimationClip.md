---
title: AnimationClip
icon: markdown
order: 2
date: 2023-03-20
category:
    - threejs
tag:
    - 动画
---

## AnimationClip

动画剪辑（AnimationClip）是一个可重用的关键帧轨道集，它代表动画。

<IFrame url="https://luotainxu-demo.netlify.app/#/threejs/animation"/>

## 构造器

AnimationClip( name : String, duration : Number, tracks : Array )

- name - 此剪辑的名称
- duration - 持续时间 (单位秒). 如果传入负数, 持续时间将会从传入的数组中计算得到。
- tracks - 一个由关键帧轨道（KeyframeTracks）组成的数组。

## 属性

### .duration : Number

剪辑的持续时间 (单位秒). 可以通过resetDuration从轨道数组（tracks）计算出来。

### .name : String

剪辑的名称. 调用findByName根据名称搜索某个剪辑

### .tracks : Array

一个包含该剪辑中有动画的所有属性的关键帧轨道（KeyframeTrack）的数组。

### .uuid : String

剪辑实例的UUID，自动分配且不可编辑。

## 方法

### .clone () : AnimationClip

### .optimize () : this

通过移除等效的顺序键（在变形目标序列中很常见）来优化每一个轨道

### .resetDuration () : this

将剪辑的持续时间（duration）设为最长的关键帧轨道(KeyframeTrack)的持续时间。

### .toJSON () : Object

Returns a JSON object representing the serialized animation clip.

### .trim () : this

修剪所有的轨道到该剪辑的持续时间。

### .validate () : Boolean

对剪辑中的每个轨道执行最小验证。如果所有轨道都有效，返回true。

## 静态方法

### .CreateClipsFromMorphTargetSequences ( name : String, morphTargetSequence : Array, fps : Number, noLoop : Boolean ) : Array

返回从几何体的变形目标序列(morph target sequences)创建的新动画剪辑(AnimationClip)数组，并尝试将变形目标名称分类为基于动画组的模式，如“Walk_001、Walk_002、Run_001、Run_002……”。

### .CreateFromMorphTargetSequence ( name : String, morphTargetSequence : Array, fps : Number, noLoop : Boolean ) : AnimationClip

返回一个由几何体变形目标数组(morph targets array)得到的新动画剪辑，接收名称和帧率参数。

说明: 帧率是必须参数, 但是动画速度可能会在AnimationAction中被animationAction.setDuration方法重写。

### .findByName ( objectOrClipArray : Object, name : String ) : AnimationClip

根据名称搜索动画剪辑(AnimationClip), 接收一个动画剪辑数组或者一个包含名为"animation"的数组的网格（或几何体）作为第一个参数。

### .parse ( json : Object ) : AnimationClip

解析剪辑的JSON表示，并返回一个动画剪辑(AnimationClip)。

### .parseAnimation ( animation : Object, bones : Array ) : AnimationClip

解析动画层级格式并返回动画剪辑。

### .toJSON ( clip : AnimationClip ) : Object

接收一个动画剪辑为参数并返回一个JSON对象.
