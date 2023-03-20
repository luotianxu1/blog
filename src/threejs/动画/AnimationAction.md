---
title: AnimationAction
icon: markdown
order: 3
date: 2023-03-20
category:
    - threejs
tag:
    - 动画
---

## AnimationAction

AnimationActions 用来调度存储在AnimationClips中的动画。

说明: AnimationAction的大多数方法都可以链式调用

<IFrame url="https://luotainxu-demo.netlify.app/#/threejs/animation"/>

## 构造器

### AnimationAction( mixer : AnimationMixer, clip : AnimationClip, localRoot : Object3D )

- mixer - 被此动作控制的 *动画混合器*
- clip - *动画剪辑* 保存了此动作当中的动画数据
- localRoot - 动作执行的根对象

说明: 不要直接调用这个构造函数，而应该先用AnimationMixer.clipAction实例化一个AnimationAction，因为这个方法提供了缓存以提高性能。

## 属性

### .clampWhenFinished : Boolean

如果 clampWhenFinished 值设为true, 那么动画将在最后一帧之后自动暂停（paused）

如果 clampWhenFinished 值为false, enabled 属性值将在动作的最后一次循环完成之后自动改为false, 那么这个动作以后就不会再执行。

默认值为false

说明: 动作如果被中断了，clampWhenFinished将无效 (只有当最后一次循环执行完毕之后才能起效）

### .enabled : Boolean

enabled 值设为false会禁用动作, 也就是无效.默认值是true

当enabled被重新置为true, 动画将从当前时间（time）继续 (将 enabled 置为 false 不会重置此次动作)

说明: 将enabled置为true不会让动画自动重新开始。只有满足以下条件时才会马上重新开始: 暂停（paused）值为false, 同时动作没有失效 (执行停止(stop)命令或重置(reset)命令， 且权重(weight)和时间比例(timeScale)都不能为0

### .loop : Number

循环模式 (可以通过setLoop改变)。默认值是 THREE.LoopRepeat (重复repetitions次数无穷)

必须是以下值之一：

- THREE.LoopOnce - 只执行一次
- THREE.LoopRepeat - 重复次数为repetitions的值, 且每次循环结束时候将回到起始动作开始下一次循环。
- THREE.LoopPingPong - 重复次数为repetitions的值, 且像乒乓球一样在起始点与结束点之间来回循环。

### .paused : Boolean

paused置为true会通过将动作的有效时间比例改为0来使动作暂停执行。默认值是false

### .repetitions : Number

整个动作过程动画剪辑（AnimationClip）执行的次数，可以通过setLoop修改。默认值是Infinity

如果循环模式（loop mode）值被设置为THREE.LoopOnce，repetitions值将会无效。

### .time : Number

动作开始的时间点 (单位是秒, 从0开始计时).

这个值被限定在 0到clip.duration(根据循环状态)范围之内. 可以通过改变时间比例（timeScale) (使用 setEffectiveTimeScale 或者 setDuration)来将它相对于全局的混合器缩放.

### .timeScale : Number

时间(time)的比例因子. 值为0时会使动画暂停。值为负数时动画会反向执行。默认值是1。

关于timeScale属性/方法 (不同于 time) 有: getEffectiveTimeScale, halt, paused, setDuration, setEffectiveTimeScale, stopWarping, syncWith, warp.

### .weight : Number

动作的影响程度 (取值范围[0, 1]). 0 (无影响)到1（完全影响）之间的值可以用来混合多个动作。默认值是1

关于weight的属性/方法有: crossFadeFrom, crossFadeTo, enabled, fadeIn, fadeOut, getEffectiveWeight, setEffectiveWeight, stopFading.

### .zeroSlopeAtEnd : Boolean

启用平滑插值，无须单独剪辑开始、循环和结束。默认值是true

### .zeroSlopeAtStart : Boolean

启用平滑插值，无须单独剪辑开始、循环和结束。默认值是true

## 方法

### .crossFadeFrom ( fadeOutAction : AnimationAction, durationInSeconds : Number, warpBoolean : Boolean ) : this

在传入的时间段内，让此动作淡入(fade in),同时让另一个动作淡出。此方法可链式调用。

如果warpBoolean值是true, 额外的 warping (时间比例的渐变)将会被应用。

说明: 与 fadeIn/fadeOut一样, 淡入淡出动作开始/结束时的权重是1.

### .crossFadeTo ( fadeInAction : AnimationAction, durationInSeconds : Number, warpBoolean : Boolean ) : this

在传入的时间段内, 让此动作淡出（fade out），同时让另一个动作淡入。此方法可链式调用。

如果warpBoolean值是true, 额外的 warping (时间比例的渐变)将会被应用。

说明: 与 fadeIn/fadeOut一样, 淡入淡出动作开始/结束时的权重是1.

### .fadeIn ( durationInSeconds : Number ) : this

在传入的时间间隔内，逐渐将此动作的权重（weight）由0升到1。此方法可链式调用。

### .fadeOut ( durationInSeconds : Number ) : this

在传入的时间间隔内，逐渐将此动作的权重（weight）由1降至0。此方法可链式调用。

### .getEffectiveTimeScale () : Number

返回有效时间比例(考虑当前的变形状态和paused值).

### .getEffectiveWeight () : number

返回影响权重(考虑当前淡入淡出状态和enabled的值).

### .getClip () : AnimationClip

返回存有此动作的动画数据的剪辑

### .getMixer () : AnimationMixer

返回负责完成此动作的混合器

### .getRoot () : Object3D

返回执行此动作的根对象

### .halt ( durationInSeconds : Number ) : this

在传入的时间间隔内，通过从当前值开始逐渐降低时间比例(timeScale)使动画逐渐减速至0。此方法可链式调用。

### .isRunning () : Boolean

返回当前此动作的时间(time)是否正在流逝

除了在混合器中被激活之外 (参见isScheduled)必须满足以下条件才会返回true: paused值等于false, enabled值为true, timeScale值不为0, 而且没有安排延时启动(startAt).

说明 isRunning 为true并不意味着此动画一定会切实地被看到。仅当权重(weight)被设置为非零值时才是这种情况。

### .isScheduled () : Boolean

如果动作是在混合器中被激活的，返回true。

说明: 这并不意味着动画正在执行中 (需要额外判断isRunning值)

### .play () : this

让混合器激活动作。此方法可链式调用。

说明: 激活动作并不意味着动画会立刻开始: 如果动作在此之前已经完成（到达最后一次循环的结尾），或者如果已经设置了延时 启动(通过 startAt)，则必须先执行重置操作（reset）。 一些其它的设置项 (paused=true, enabled=false, weight=0, timeScale=0) 也可以阻止动画的开始。

### .reset () : this

重置动作。此方法可链式调用。

该方法会将暂停值 paused 设为false, 启用值enabled 设为true,时间值 time设为0, 中断任何预定的淡入淡出和变形, 以及移除内部循环次数以及延迟启动。

说明: 停止方法stop内调用了重置方法（reset）, 但是 .reset不会调用 .stop。 这就表示: 如果你想要这两者, 重置并且停止, 不要调用reset; 而应该调用stop。

### .setDuration ( durationInSeconds : Number ) : this

设置单此循环的持续时间(通过调整时间比例（timeScale）以及停用所有的变形)。此方法可以链式调用。

### .setEffectiveTimeScale ( timeScale : Number ) : this

设置时间比例（timeScale）以及停用所有的变形)。 此方法可以链式调用。

如果暂停 （paused）值为false, 有效的时间比例(一个内部属性) 也会被设为该值; 否则有效时间比例 (直接影响当前动画 将会被设为0.

说明: 如果时间比例.timeScale 被此方法设为0，暂停值paused不会被自动改为true。

### .setEffectiveWeight ( weight : Number ) : this

设置权重（weight）以及停止所有淡入淡出。该方法可以链式调用。

如果启用属性（enabled）为true, 那么有效权重(一个内部属性) 也会被设为该值; 否则有效权重 (直接影响当前动画)将会被设为0.

说明: 如果该方法将权重weight值设为0，启用值enabled不会被自动改为false。

### .setLoop ( loopMode : Number, repetitions : Number ) : this

设置循环（loop mode）及循环重复次数（repetitions）。改方法可被链式调用。

### .startAt ( startTimeInSeconds : Number ) : this

定义延时启动的事件 (通常会传入AnimationMixer.time + deltaTimeInSeconds)。 该方法可以链式调用。

说明: 如果 startAt方法是和play方法一起链式调用, 或者动画已经在混合器中被激活 (通过先行调用play, 同时没有停止或重置)，动画将仅在给定时间开始.

### .stop () : this

让混合器停止动作。该方法可以被链式调用。

动作会马上停止以及完全[page:.reset 重置].

说明: 你可以通过mixer.stopAllAction在一个混合器中一举停止所有处于激活态的动作。

### .stopFading () : this

停止动作中所有预定的淡入淡出（fading）。该方法可以被链式调用。

### .stopWarping () : this

停用动作中所有预定的变形warping。该方法可被链式调用。

### .syncWith ( otherAction : AnimationAction ) : this

将此动作与传入的其它动作同步。此方法可被链式调用。

同步是通过将动作的时间(time)或时间比例(timeScale)与另一动作设置一致来实现的 (停用所有预定的变形)。

说明: 另一动作的 time 和 timeScale未来变化将不会被检测到.

### .warp ( startTimeScale : Number, endTimeScale : Number, durationInSeconds : Number ) : this

在传入的事件间隔内，通过逐渐将时间比例timeScale由startTimeScale修改至endTimeScale来改变回放速度。该方法可被链式调用。

## 事件

有两个事件分别表示了单次循环的结束和全部动作的结束，你可以这样对它们做出响应:

```js
mixer.addEventListener( 'loop', function( e ) { …} );
mixer.addEventListener( 'finished', function( e ) { …} );
```
