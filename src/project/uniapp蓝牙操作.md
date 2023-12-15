---
title: uniapp蓝牙
icon: uniapp
order: 7
date: 2023-08-29
category:
    - uniapp
tag:
    - 蓝牙
---

## 总体思路

1. 初始化：打开蓝牙模块
2. 搜寻：检测附近存在的设备
3. 连接：找到目标设备进行
4. 监听：开启监听功能，接收其他设备传过来的数据
5. 发送指令：不管发送数据还是读取数据，都可以理解为向外发送指令

## 初始化阶段

使用[uni.openBluetoothAdapter](https://uniapp.dcloud.net.cn/api/system/bluetooth.html#openbluetoothadapter)这个 api 就可以初始化蓝牙模块。其他蓝牙相关 API 必须在 uni.openBluetoothAdapter 调用之后使用。否则 API 会返回错误（ errCode=10000 ）。

```vue
<template>
    <view>
        <button @click="initBlue">初始化蓝牙</button>
    </view>
</template>
<script setup>
// 【1】初始化蓝牙
function initBlue() {
    uni.openBluetoothAdapter({
        success(res) {
            console.log('初始化蓝牙成功')
            console.log(res)
        },
        fail(err) {
            console.log('初始化蓝牙失败')
            console.error(err)
        },
    })
}
</script>
```

## 搜索附近设备

这一步需要 2 个 api 配合完成。所以可以分解成以下 2 步：

1. 开启搜寻功能：[uni.startBluetoothDevicesDiscovery](https://uniapp.dcloud.net.cn/api/system/bluetooth.html#startbluetoothdevicesdiscovery)
2. 监听搜寻到新设备：[uni.onBluetoothDeviceFound](https://uniapp.dcloud.net.cn/api/system/bluetooth.html#onbluetoothdevicefound)

开发蓝牙相关功能时，操作逻辑更像是推送，所以“开启搜索”和“监听新设备”是分开操作的。

uni.startBluetoothDevicesDiscovery 可以让设备开始搜索附近蓝牙设备，但这个方法比较耗费系统资源，建议在连接到设备之后就使用 uni.stopBluetoothDevicesDiscovery 停止继续搜索。

uni.startBluetoothDevicesDiscovery 方法里可以传入一个对象，该对象接收几个参数，但初学的话我们只关注 success 和 fail。如果你的项目中硬件佬有提供 service 的 uuid 给你的话，你也可以在 services 里传入。

在使用 uni.startBluetoothDevicesDiscovery （开始搜索）后，可以使用 uni.onBluetoothDeviceFound 进行监听，这个方法里面接收一个回调函数。

```vue
<template>
    <view>
        <scroll-view scroll-y class="box">
            <view class="item" v-for="item in blueDeviceList">
                <view>
                    <text>id: {{ item.deviceId }}</text>
                </view>
                <view>
                    <text>name: {{ item.name }}</text>
                </view>
            </view>
        </scroll-view>
        <button @click="initBlue">初始化蓝牙</button>
        <button @click="discovery">搜索附近蓝牙设备</button>
    </view>
</template>
<script setup>
import { ref } from 'vue'

// 搜索到的蓝牙设备列表
const blueDeviceList = ref([])

// 【1】初始化蓝牙
function initBlue() {
    uni.openBluetoothAdapter({
        success(res) {
            console.log('初始化蓝牙成功')
            console.log(res)
        },
        fail(err) {
            console.log('初始化蓝牙失败')
            console.error(err)
        },
    })
}

// 【2】开始搜寻附近设备
function discovery() {
    uni.startBluetoothDevicesDiscovery({
        success(res) {
            console.log('开始搜索') // 开启监听回调
            uni.onBluetoothDeviceFound(found)
        },
        fail(err) {
            console.log('搜索失败')
            console.error(err)
        },
    })
}

// 【3】找到新设备就触发该方法
function found(res) {
    console.log(res)
    blueDeviceList.value.push(res.devices[0])
}
</script>

<style>
.box {
    width: 100%;
    height: 400rpx;
    box-sizing: border-box;
    margin-bottom: 20rpx;
    border: 2px solid dodgerblue;
}
.item {
    box-sizing: border-box;
    padding: 10rpx;
    border-bottom: 1px solid #ccc;
}
button {
    margin-bottom: 20rpx;
}
</style>
```

上面代码的逻辑是，如果开启 “寻找附近设备” 功能成功，接着就开启 “监听寻找到新设备的事件” 。

搜索到的设备会返回以下数据：

```json
{
    "devices": [
        {
            "deviceId": "B4:10:7B:C4:83:14",
            "name": "蓝牙设备名",
            "RSSI": -58,
            "localName": "",
            "advertisServiceUUIDs": ["0000FFF0-0000-1000-8000-00805F9B34FB"],
            "advertisData": {}
        }
    ]
}
```

## 连接设备

连接目标设备只需要 1 个 api 就能完成。但根据文档提示，我们连接后还需要关闭 “搜索附近设备” 的功能，这个很好理解，既然找到了，再继续找就是浪费资源。

流程如下：

1. 获取设备 ID：根据 [uni.onBluetoothDeviceFound](https://uniapp.dcloud.net.cn/api/system/bluetooth.html#onbluetoothdevicefound) 回调，拿到设备 ID
2. 连接设备：使用设备 ID 进行连接 [uni.createBLEConnection](https://uniapp.dcloud.net.cn/api/system/ble.html#createbleconnection)
3. 停止搜索：[uni.stopBluetoothDevicesDiscovery](https://uniapp.dcloud.net.cn/api/system/bluetooth.html#stopbluetoothdevicesdiscovery)

```vue
<template>
    <view>
        <scroll-view scroll-y class="box">
            <view
                class="item"
                v-for="item in blueDeviceList"
                @click="connect(item)"
            >
                <view>
                    <text>id: {{ item.deviceId }}</text>
                </view>
                <view>
                    <text>name: {{ item.name }}</text>
                </view>
            </view>
        </scroll-view>

        <button @click="initBlue">初始化蓝牙</button>

        <button @click="discovery">搜索附近蓝牙设备</button>
        ​
    </view>
</template>
​
<script setup>
import { ref } from 'vue'
​
// 搜索到的蓝牙设备列表
const blueDeviceList = ref([])
​
// 【1】初始化蓝牙
function initBlue() {
    uni.openBluetoothAdapter({
        success(res) {
            console.log('初始化蓝牙成功')
            console.log(res)
        },
        fail(err) {
            console.log('初始化蓝牙失败')
            console.error(err)
        }
    })
}
​
// 【2】开始搜寻附近设备
function discovery() {
    uni.startBluetoothDevicesDiscovery({
        success(res) {
            console.log('开始搜索')
            // 开启监听回调
            uni.onBluetoothDeviceFound(found)
        },
        fail(err) {
            console.log('搜索失败')
            console.error(err)
        }
    })
}
​
// 【3】找到新设备就触发该方法
function found(res) {
    console.log(res)
    blueDeviceList.value.push(res.devices[0])
}
​
// 蓝牙设备的id
const deviceId = ref('')
​
// 【4】连接设备
function connect(data) {
    console.log(data)
​
    deviceId.value = data.deviceId
​
    uni.createBLEConnection({
        deviceId: deviceId.value,
        success(res) {
            console.log('连接成功')
            console.log(res)
            // 停止搜索
            stopDiscovery()
        },
        fail(err) {
            console.log('连接失败')
            console.error(err)
        }
    })
}
​
// 【5】停止搜索
function stopDiscovery() {
    uni.stopBluetoothDevicesDiscovery({
        success(res) {
            console.log('停止成功')
            console.log(res)
        },
        fail(err) {
            console.log('停止失败')
            console.error(err)
        }
    })
}
</script>
​
<style>
.box {
    width: 100%;
    height: 400rpx;
    box-sizing: border-box;
    margin-bottom: 20rpx;
    border: 2px solid dodgerblue;
}
.item {
    box-sizing: border-box;
    padding: 10rpx;
    border-bottom: 1px solid #ccc;
}
button {
    margin-bottom: 20rpx;
}
</style>
```

## 监听

在连接完设备后，就要先开启监听数据的功能。这样才能接收到发送读写指令后设备给你回调的信息。

要开启监听，首先需要知道蓝牙设备提供了那些服务，然后通过服务获取特征值，特征值会告诉你哪个可读，哪个可写。最后根据特征值进行消息监听。

步骤如下：

1. 获取蓝牙设备服务：[uni.getBLEDeviceServices](https://uniapp.dcloud.net.cn/api/system/ble.html#getbledeviceservices)
2. 获取特征值：[uni.getBLEDeviceCharacteristics](https://uniapp.dcloud.net.cn/api/system/ble.html#getbledevicecharacteristics)
3. 开启消息监听：[uni.notifyBLECharacteristicValueChange](https://uniapp.dcloud.net.cn/api/system/ble.html#notifyblecharacteristicvaluechange)
4. 接收消息监听传来的数据：[uni.onBLECharacteristicValueChange](https://uniapp.dcloud.net.cn/api/system/ble.html#onblecharacteristicvaluechange)

### 第一步，获取蓝牙服务

```vue
<template>
    <view>
        <!-- 省略上一步的代码 -->
        <button @click="getServices">获取蓝牙服务</button>
    </view>
</template>
​
<script setup>
import { ref } from 'vue'
​
// 省略上一步的代码……
​
// 【6】获取服务
function getServices() {
    uni.getBLEDeviceServices({
        deviceId: deviceId.value, // 设备ID，在上一步【4】里获取
        success(res) {
            console.log(res)
        },
        fail(err) {
            console.error(err)
        }
    })
}
</script>
```

### 第二步，获取指定服务的特征值

获取特征值，需要传 设备 ID 和 服务 ID。

```vue
<template>
    <view>
        <!-- 省略前面几步代码 -->
        <button @click="getCharacteristics">获取特征值</button>
    </view>
</template>
​
<script setup>
import { ref } from 'vue'
​
// 省略前面几步代码
​
// 【7】获取特征值
function getCharacteristics() {
    uni.getBLEDeviceCharacteristics({
        deviceId: deviceId.value, // 设备ID，在【4】里获取到
        serviceId: '0000FFE0-0000-1000-8000-00805F9B34FB', // 服务UUID，在【6】里能获取到
        success(res) {
            console.log(res)
        },
        fail(err) {
            console.error(err)
        }
    })
}
</script>
```

成功输出

```json
{
    "characteristics": [
        {
            "uuid": "0000FFE1-0000-1000-8000-00805F9B34FB",
            "properties": {
                "read": true,
                "write": true,
                "notify": true,
                "indicate": false
            }
        }
    ],
    "errMsg": "getBLEDeviceCharacteristics:ok"
}
```

characteristics 字段里保存了该服务的所有特征值，我的设备这个服务只有 1 个特征值，并且读、写、消息推送都为 true。

你的设备可能不止一条特征值，需要监听那条特征值这需要你和硬件佬协商的（通常也是硬件佬直接和你说要监听哪条）。

### 第三步，开启消息监听并接收消息监听传来的数据

根据已经拿到的 设备 ID、服务 ID、特征值，就可以开启对应的监听功能。

使用 [uni.notifyBLECharacteristicValueChange](https://uniapp.dcloud.net.cn/api/system/ble.html#notifyblecharacteristicvaluechange) 开启消息监听。

使用 [uni.onBLECharacteristicValueChange](https://uniapp.dcloud.net.cn/api/system/ble.html#onblecharacteristicvaluechange) 方法触发监听到的消息。

```vue
<template>
    <view>
        <!-- 省略前面几步代码 -->
        <button @click="notify">开启消息监听</button>
    </view>
</template>
​
<script setup>
import { ref } from 'vue'
​
// 省略前面几步代码
​
// 【8】开启消息监听
function notify() {
    uni.notifyBLECharacteristicValueChange({
        deviceId: deviceId.value, // 设备ID，在【4】里获取到
        serviceId: '0000FFE0-0000-1000-8000-00805F9B34FB', // 服务UUID，在【6】里能获取到
        characteristicId: '0000FFE1-0000-1000-8000-00805F9B34FB', // 特征值，在【7】里能获取到
        success(res) {
            console.log(res)
            
            // 接受消息的方法
            listenValueChange()
        },
        fail(err) {
            console.error(err)
        }
    })
}
​
// ArrayBuffer转16进度字符串示例
function ab2hex(buffer) {
  const hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('')
}
​
// 将16进制的内容转成我们看得懂的字符串内容
function hexCharCodeToStr(hexCharCodeStr) {
    var trimedStr = hexCharCodeStr.trim();
    var rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
    var len = rawStr.length;
    if (len % 2 !== 0) {
            alert("存在非法字符!");
            return "";
    }
    var curCharCode;
    var resultStr = [];
    for (var i = 0; i < len; i = i + 2) {
            curCharCode = parseInt(rawStr.substr(i, 2), 16);
            resultStr.push(String.fromCharCode(curCharCode));
    }
    return resultStr.join("");
}
​
// 【9】监听消息变化
function listenValueChange() {
    uni.onBLECharacteristicValueChange(res => {
        // 结果
        console.log(res)
        
        // 结果里有个value值，该值为 ArrayBuffer 类型，所以在控制台无法用肉眼观察到，必须将该值转换为16进制
        let resHex = ab2hex(res.value)
        console.log(resHex)
​
        // 最后将16进制转换为ascii码，就能看到对应的结果
        let result = hexCharCodeToStr(resHex)
        console.log(result)
    })
}
</script>
```

## 发送指令

从 uni-app 和 微信小程序 提供的蓝牙 api 来看，发送指令只要有 2 个方法：

[uni.writeBLECharacteristicValue](https://uniapp.dcloud.net.cn/api/system/ble.html#writeblecharacteristicvalue)：向低功耗蓝牙设备特征值中写入二进制数据。

[uni.readBLECharacteristicValue](https://uniapp.dcloud.net.cn/api/system/ble.html#readblecharacteristicvalue)：读取低功耗蓝牙设备的特征值的二进制数据值。

这里需要理清一个概念，本节的内容为 “发送指令” ，也就是说，从你的 app 或小程序向其他蓝牙设备发送指令，而这个指令分 2 种情况，一种是你要发送一些数据给蓝牙设备，另一种情况是你叫蓝牙设备给你发点信息。

### uni.writeBLECharacteristicValue

uni.writeBLECharacteristicValue 从文档可以看出，这个 api 是可以发送一些数据给蓝牙设备，但发送的值要转成 ArrayBuffer 。

```vue
<template>
    <view>
        <!-- 省略前面几步代码 -->
        <button @click="send">发送数据</button>
    </view>
</template>
​
<script setup>
import { ref } from 'vue'
​
// 省略前面几步代码
​
// 【10】发送数据
function send() {
    // 向蓝牙设备发送一个0x00的16进制数据
    let msg = 'hello'
    const buffer = new ArrayBuffer(msg.length)
    const dataView = new DataView(buffer)
    // dataView.setUint8(0, 0)
    for (var i = 0; i < msg.length; i++) {
      dataView.setUint8(i, msg.charAt(i).charCodeAt())
    }
    uni.writeBLECharacteristicValue({
      deviceId: deviceId.value, // 设备ID，在【4】里获取到
      serviceId: '0000FFE0-0000-1000-8000-00805F9B34FB', // 服务UUID，在【6】里能获取到
      characteristicId: '0000FFE1-0000-1000-8000-00805F9B34FB', // 特征值，在【7】里能获取到
      value: buffer,
      success(res) {
        console.log(res)
      },
      fail(err) {
        console.error(err)
      }
    })
}
</script>
```

此时，如果 uni.writeBLECharacteristicValue 走 success ，证明你已经把数据向外成功发送了，但不代表设备一定就收到了。通常设备收到你发送过去的信息，会返回一条消息给你，而这个回调消息会在 uni.onBLECharacteristicValueChange。但这是蓝牙设备那边控制的，你作为前端佬，人家“已读不回”你也拿人家没办法。

### uni.readBLECharacteristicValue

在 “监听” 部分，我们使用了 uni.getBLEDeviceCharacteristics 获取设备的特征值，我的设备提供的特征值支持 read ，所以可以使用 uni.readBLECharacteristicValue 向蓝牙设备发送一条 “读取” 指令。然后在 uni.onBLECharacteristicValueChange 里可以接收设备发送过来的数据。

```vue
<template>
    <view>
        <!-- 省略前面几步代码 -->
        <button @click="read">读取数据</button>
    </view>
</template>
​
<script setup>
import { ref } from 'vue'
​
// 省略前面几步代码
​
// 【11】读取数据
function read() {
    uni.readBLECharacteristicValue({
        deviceId: deviceId.value,
        serviceId: serviceId.value,
        characteristicId: characteristicId.value,
        success(res) {
            console.log('读取指令发送成功')
            console.log(res)
        },
        fail(err) {
            console.log('读取指令发送失败')
            console.error(err)
        }
    })
}
</script>
```

## 完整代码

```vue
<template>
    <view>
        <scroll-view scroll-y class="box">
            <view
                class="item"
                v-for="item in blueDeviceList"
                @click="connect(item)"
            >
                <view>
                    <text>id: {{ item.deviceId }}</text>
                </view>
                <view>
                    <text>name: {{ item.name }}</text>
                </view>
            </view>
        </scroll-view>
        <button @click="initBlue">1 初始化蓝牙</button>
        <button @click="discovery">2 搜索附近蓝牙设备</button>
        <button @click="getServices">3 获取蓝牙服务</button>
        <button @click="getCharacteristics">4 获取特征值</button>
        <button @click="notify">5 开启消息监听</button>
        <button @click="send">6 发送数据</button>
        <button @click="read">7 读取数据</button>
        <view class="msg_x">
            <view class="msg_txt"> 监听到的内容：{{ message }} </view>
            <view class="msg_hex">
                监听到的内容（十六进制）：{{ messageHex }}
            </view>
        </view>
    </view>
</template>
​
<script setup>
import { ref } from 'vue'
​
// 搜索到的蓝牙设备列表
const blueDeviceList = ref([])
​
// 【1】初始化蓝牙
function initBlue() {
    uni.openBluetoothAdapter({
        success(res) {
            console.log('初始化蓝牙成功')
            console.log(res)
        },
        fail(err) {
            console.log('初始化蓝牙失败')
            console.error(err)
        }
    })
}
​
// 【2】开始搜寻附近设备
function discovery() {
    uni.startBluetoothDevicesDiscovery({
        success(res) {
            console.log('开始搜索')
            // 开启监听回调
            uni.onBluetoothDeviceFound(found)
        },
        fail(err) {
            console.log('搜索失败')
            console.error(err)
        }
    })
}
​
// 【3】找到新设备就触发该方法
function found(res) {
    console.log(res)
    blueDeviceList.value.push(res.devices[0])
}
​
// 蓝牙设备的id
const deviceId = ref('')
​
// 【4】连接设备
function connect(data) {
    console.log(data)

    deviceId.value = data.deviceId // 将获取到的设备ID存起来

    uni.createBLEConnection({
        deviceId: deviceId.value,
        success(res) {
            console.log('连接成功')
            console.log(res)
            // 停止搜索
            stopDiscovery()
            uni.showToast({
                title: '连接成功'
            })
        },
        fail(err) {
            console.log('连接失败')
            console.error(err)
            uni.showToast({
                title: '连接成功',
                icon: 'error'
            })
        }
    })
}
​
// 【5】停止搜索
function stopDiscovery() {
    uni.stopBluetoothDevicesDiscovery({
        success(res) {
            console.log('停止成功')
            console.log(res)
        },
        fail(err) {
            console.log('停止失败')
            console.error(err)
        }
    })
}
​
// 【6】获取服务
function getServices() {
    // 如果是自动链接的话，uni.getBLEDeviceServices方法建议使用setTimeout延迟1秒后再执行
    uni.getBLEDeviceServices({
        deviceId: deviceId.value,
        success(res) {
            console.log(res) // 可以在res里判断有没有硬件佬给你的服务
            uni.showToast({
                title: '获取服务成功'
            })
        },
        fail(err) {
            console.error(err)
            uni.showToast({
                title: '获取服务失败',
                icon: 'error'
            })
        }
    })
}
​
// 硬件提供的服务id，开发中需要问硬件佬获取该id
const serviceId = ref('0000FFE0-0000-1000-8000-00805F9B34FB')
​
// 【7】获取特征值
function getCharacteristics() {
    // 如果是自动链接的话，uni.getBLEDeviceCharacteristics方法建议使用setTimeout延迟1秒后再执行
    uni.getBLEDeviceCharacteristics({
        deviceId: deviceId.value,
        serviceId: serviceId.value,
        success(res) {
            console.log(res) // 可以在此判断特征值是否支持读写等操作，特征值其实也需要提前向硬件佬索取的
            uni.showToast({
                title: '获取特征值成功'
            })
        },
        fail(err) {
            console.error(err)
            uni.showToast({
                title: '获取特征值失败',
                icon: 'error'
            })
        }
    })
}
​
const characteristicId = ref('0000FFE1-0000-1000-8000-00805F9B34FB')
​
// 【8】开启消息监听
function notify() {
    uni.notifyBLECharacteristicValueChange({
        deviceId: deviceId.value, // 设备id
        serviceId: serviceId.value, // 监听指定的服务
        characteristicId: characteristicId.value, // 监听对应的特征值
        success(res) {
            console.log(res)
            listenValueChange()
            uni.showToast({
                title: '已开启监听'
            })
        },
        fail(err) {
            console.error(err)
            uni.showToast({
                title: '监听失败',
                icon: 'error'
            })
        }
    })
}
​
// ArrayBuffer转16进度字符串示例
function ab2hex(buffer) {
  const hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('')
}
​
// 将16进制的内容转成我们看得懂的字符串内容
function hexCharCodeToStr(hexCharCodeStr) {
    var trimedStr = hexCharCodeStr.trim();
    var rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
    var len = rawStr.length;
    if (len % 2 !== 0) {
            alert("存在非法字符!");
            return "";
    }
    var curCharCode;
    var resultStr = [];
    for (var i = 0; i < len; i = i + 2) {
            curCharCode = parseInt(rawStr.substr(i, 2), 16);
            resultStr.push(String.fromCharCode(curCharCode));
    }
    return resultStr.join("");
}
​
// 监听到的内容
const message = ref('')
const messageHex = ref('') // 十六进制
​
// 【9】监听消息变化
function listenValueChange() {
    uni.onBLECharacteristicValueChange(res => {
        console.log(res)
        let resHex = ab2hex(res.value)
        console.log(resHex)
        messageHex.value = resHex
        let result = hexCharCodeToStr(resHex)
        console.log(String(result))
        message.value = String(result)
    })
}
​
// 【10】发送数据
function send() {
    // 向蓝牙设备发送一个0x00的16进制数据
    let msg = 'hello'

    const buffer = new ArrayBuffer(msg.length)
    const dataView = new DataView(buffer)
    // dataView.setUint8(0, 0)

    for (var i = 0; i < msg.length; i++) {
      dataView.setUint8(i, msg.charAt(i).charCodeAt())
    }

    uni.writeBLECharacteristicValue({
      deviceId: deviceId.value,
      serviceId: serviceId.value,
      characteristicId: characteristicId.value,
      value: buffer,
      success(res) {
        console.log('writeBLECharacteristicValue success', res.errMsg)
            uni.showToast({
                title: 'write指令发送成功'
            })
      },
        fail(err) {
            console.error(err)
            uni.showToast({
                title: 'write指令发送失败',
                icon: 'error'
            })
        }
    })
}
​
// 【11】读取数据
function read() {
    uni.readBLECharacteristicValue({
        deviceId: deviceId.value,
        serviceId: serviceId.value,
        characteristicId: characteristicId.value,
        success(res) {
            console.log(res)
            uni.showToast({
                title: 'read指令发送成功'
            })
        },
        fail(err) {
            console.error(err)
            uni.showToast({
                title: 'read指令发送失败',
                icon: 'error'
            })
        }
    })
}
</script>
​
<style>
.box {
    width: 98%;
    height: 400rpx;
    box-sizing: border-box;
    margin: 0 auto 20rpx;
    border: 2px solid dodgerblue;
}
.item {
    box-sizing: border-box;
    padding: 10rpx;
    border-bottom: 1px solid #ccc;
}
button {
    margin-bottom: 20rpx;
}
​ .msg_x {
    border: 2px solid seagreen;
    width: 98%;
    margin: 10rpx auto;
    box-sizing: border-box;
    padding: 20rpx;
}
​ .msg_x .msg_txt {
    margin-bottom: 20rpx;
}
</style>
```

## 封装

```js
import { duplicateRemoval } from '../../utils/common.js'

let bluetoothData // 写入蓝牙需要的其他数据
const Buffer = require('buffer/').Buffer

export default class Bluetooth {
    constructor() {
        this.autocConnenction = false
        this.isOpenBle = false // 是否开启蓝牙
        this.deviceList = [] // 搜索到的所有设备
        this.deviceName = null // 设备名称
        this.deviceId = null // 设备id
        this.sericeId = null // 服务id
        this.notifyId = null
        this.writeId = null
        this.sericeList = [] // 连接设备的所有服务
        this.openBluetoothAdapter()
        this.type = null // 连接蓝牙后写入数据类型
        this.getLockBytes = []
        this.deviceHistoryList = [] // 连接蓝牙的历史记录
        this.isWriteSuccess = null // 写入数据是否成功
        this.startFoundDeviceTimeout = null
    }

    showToast(title, type) {
        uni.hideLoading()
        uni.showToast({
            title: title,
            icon: type,
        })
    }

    // 打开蓝牙
    openBluetoothAdapter() {
        return new Promise((resolve, reject) => {
            uni.openBluetoothAdapter({
                success: (res) => {
                    console.log('初始化蓝牙成功', res)
                    this.showToast('初始化蓝牙成功', 'success')
                    this.isOpenBle = true
                    resolve(res)
                },
                fail: (err) => {
                    console.log('初始化蓝牙失败', err)
                    this.showToast('请打开蓝牙', 'error')
                    if (err.errCode === 10001) {
                        //监听蓝牙适配器状态变化事件
                        uni.onBluetoothAdapterStateChange(function (res) {
                            if (res.available) {
                                resolve(res)
                            } else {
                                reject(err)
                            }
                        })
                    }
                },
            })
        })
    }

    /**
     * 开始搜索附近蓝牙
     * @param {*} deviceName 设备名称
     * @param {*} type 自动连接设备后要执行的操作
     * @param {*} data 发送数据时需要的数据
     * @returns
     */
    startBluetoothDevicesDiscovery(deviceName, type = '', data = {}) {
        if (!this.isOpenBle) {
            return this.showToast('请检查蓝牙是否打开！', 'error')
        }
        this.isWriteSuccess = null
        // 获取连接蓝牙的历史数据，如果连过这个设备就跳过搜索的步骤
        this.deviceHistoryList = uni.getStorageSync('deviceHistoryList') || []
        console.log(this.deviceHistoryList, '历史记录')
        console.log('正在搜索设备')

        // 如果传入设备名称，自动连接设备
        if (deviceName) {
            this.autocConnenction = true
            this.deviceName = deviceName
            this.type = type
            bluetoothData = data
            uni.showLoading({
                title: '搜索中...',
            })
        }

        // 有历史连接数据
        if (this.deviceHistoryList.length !== 0) {
            let historyList = this.deviceHistoryList.map(
                (item) => item.deviceName
            )
            if (historyList.includes(deviceName)) {
                const blueData = this.deviceHistoryList.find(
                    (item) => item.deviceName === deviceName
                )
                console.log('已连接过此设备，跳过搜索', blueData)
                this.sericeId = blueData.sericed
                this.deviceId = blueData.deviceId
                this.createBLEConnenction(blueData)
                return new Promise((resolve, reject) => {
                    resolve(blueData)
                })
            }
        }

        // 无历史连接数据，开始搜索蓝牙
        this.deviceList = []
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                uni.startBluetoothDevicesDiscovery({
                    success: (res) => {
                        console.log('开始搜素附近设备成功', res)
                        // 如果有自动连接的设备，20s超时
                        if (this.autocConnenction) {
                            this.startFoundDeviceTimeout = setTimeout(() => {
                                this.stopBluetoothDevicesDiscovery()
                                clearTimeout(this.startFoundDeviceTimeout)
                                this.showToast(`搜索超时`, 'error')
                            }, 20000)
                        }
                        this.startFoundDevice(deviceName)
                        resolve(res)
                    },
                    fail: (err) => {
                        console.log('开始搜素附近设备失败', err)
                        this.showToast(`搜索设备失败`, 'error')
                        this.isWriteSuccess = 'error'
                        reject(err)
                    },
                })
            }, 500)
        })
    }

    // 处理搜索结果
    startFoundDevice(deviceName) {
        uni.onBluetoothDeviceFound((res) => {
            const devices = this.deviceList.map((item) => item.deviceName)
            res.devices.forEach((device) => {
                if (!devices.includes(device.deviceName) && device.name) {
                    this.deviceList.push(device)
                }
                // 如果有自动连接的设备，并且发现设备，清除定时器，自动连接
                if (this.autocConnenction && device.name == deviceName) {
                    console.log('找到设备', device)
                    this.showToast('找到设备', 'success')
                    this.stopBluetoothDevicesDiscovery()
                    clearTimeout(this.startFoundDeviceTimeout)
                    this.startFoundDeviceTimeout = null
                    this.createBLEConnenction(device)
                }
            })
        })
    }

    // 关闭搜索附近蓝牙
    stopBluetoothDevicesDiscovery() {
        return new Promise((resolve, reject) => {
            uni.stopBluetoothDevicesDiscovery({
                success: (res) => {
                    console.log('停止搜索设备成功', res)
                    resolve(res)
                },
                fail: (err) => {
                    console.log('停止搜索设备失败', err)
                    reject(err)
                },
            })
        })
    }

    // 连接设备
    createBLEConnenction(device) {
        console.log('正在连接设备', device)
        uni.showLoading({
            title: '设备连接中...',
        })
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                uni.createBLEConnection({
                    deviceId: device.deviceId,
                    success: (res) => {
                        console.log('设备连接成功', res)
                        this.showToast('设备连接成功', 'success')
                        this.deviceId = device.deviceId
                        if (this.autocConnenction) {
                            this.getBLEDeviceServices()
                        }
                        resolve(res)
                    },
                    fail: (err) => {
                        console.log('设备连接失败', err)
                        this.showToast('设备连接失败', 'error')
                        if (err.errCode == 10003) {
                            setTimeout(() => {
                                this.startBluetoothDevicesDiscovery(
                                    this.deviceName,
                                    this.type,
                                    bluetoothData
                                )
                            }, 400)
                        } else {
                            this.isWriteSuccess = 'error'
                            reject(err)
                        }
                    },
                    complete: () => {
                        this.stopBluetoothDevicesDiscovery()
                    },
                })
            }, 500)
        })
    }

    // 获取设备所有服务
    getBLEDeviceServices() {
        uni.showLoading({
            title: '获取设备服务中...',
        })
        console.log('获取设备服务中')
        this.sericeList = []
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                uni.getBLEDeviceServices({
                    deviceId: this.deviceId,
                    success: (res) => {
                        console.log('获取设备服务成功', res)
                        this.showToast('获取设备服务成功', 'success')
                        for (let service of res.services) {
                            if (service.isPrimary) {
                                this.sericeList.push(service.uuid)
                            }
                        }
                        switch (this.type) {
                            case 'openBluetoothClock': {
                                this.sericeId = this.sericeList[1]
                                break
                            }
                            default: {
                                this.sericeId = this.sericeList[0]
                            }
                        }
                        // 去重并保存连接记录
                        let blue = {
                            deviceName: this.deviceName,
                            deviceId: this.deviceId,
                            sericed: this.sericeId,
                        }
                        this.deviceHistoryList.push(blue)
                        this.deviceHistoryList = duplicateRemoval(
                            this.deviceHistoryList,
                            'deviceId'
                        )
                        uni.setStorageSync(
                            'deviceHistoryList',
                            this.deviceHistoryList
                        )
                        if (this.autocConnenction) {
                            this.getBLEDeviceCharacteristics(this.sericeId)
                        }
                        resolve(this.sericeList)
                    },
                    fail: (err) => {
                        console.log('获取设备服务失败', err)
                        this.showToast('获取设备服务失败', 'error')
                        this.isWriteSuccess = 'error'
                        this.closeBLEConnection()
                        reject(err)
                    },
                })
            }, 500)
        })
    }

    // 获取设备特征值
    getBLEDeviceCharacteristics(id) {
        uni.showLoading({
            title: '获取设备特征值中...',
        })
        const sericeId = id || this.sericeId
        console.log('获取设备特征值中', this.deviceId, sericeId)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                uni.getBLEDeviceCharacteristics({
                    deviceId: this.deviceId,
                    serviceId: sericeId,
                    success: (res) => {
                        console.log('获取设备特征值成功', res)
                        this.showToast('获取设备特征值成功', 'success')

                        console.log(
                            '读取低功耗设备特征值中',
                            res.characteristics
                        )
                        for (let character of res.characteristics) {
                            if (character.properties.notify) {
                                this.notifyId = character.uuid
                                this.notifyBLECharacteristicValueChange()
                            }
                            if (character.properties.write) {
                                this.writeId = character.uuid
                            }
                        }
                        let result = {
                            notifyId: this.notifyId,
                            writeId: this.writeId,
                        }
                        console.log('读取低功耗设备特征值成功', result)

                        resolve(result)
                    },
                    fail: (err) => {
                        console.log('获取设备特征值失败', err)
                        this.showToast('获取设备特征值失败', 'error')
                        this.isWriteSuccess = 'error'
                        this.closeBLEConnection()
                        reject(err)
                    },
                })
            }, 500)
        })
    }

    // 消息监听
    notifyBLECharacteristicValueChange() {
        uni.notifyBLECharacteristicValueChange({
            deviceId: this.deviceId,
            serviceId: this.sericeId,
            characteristicId: this.notifyId,
            state: true,
            success: (res) => {
                console.log('消息监听成功', res)
                this.getLockBytes = []
                this.onBLECharacteristicValueChange()
                this.wirteData()
            },
            fail: (err) => {
                console.log('消息监听失败', err)
                this.isWriteSuccess = 'error'
                this.closeBLEConnection()
            },
        })
    }

    // 开始监听
    onBLECharacteristicValueChange() {
        console.log('开始监听')
        uni.onBLECharacteristicValueChange((characteristic) => {
            // 接收消息
            this.closeBLEConnection()
        })
    }

    // 写入数据
    wirteData() {
        let olebuffer
        switch (this.type) {
            case 'openBluetoothClock': {
                // 需要发送的数据
                olebuffer = sealLock('open')
                break
            }
        }
        let step = Math.ceil(olebuffer.byteLength / 20.0)
        let buffer
        let str = ''
        for (var i = 0; i < step; i++) {
            if (i == step - 1) {
                buffer = olebuffer.slice(
                    20 * i,
                    20 * i + (olebuffer.byteLength % 20)
                )
            } else {
                buffer = olebuffer.slice(i * 20, (i + 1) * 20)
            }
            str += Uint8ArrayToHex(buffer)
            this.writeBLECharacteristicValue(buffer.buffer)
            sleep(100)
        }
    }

    writeBLECharacteristicValue(buffer) {
        console.log('写入数据中', buffer)
        uni.writeBLECharacteristicValue({
            deviceId: this.deviceId,
            serviceId: this.sericeId,
            characteristicId: this.writeId,
            value: buffer,
            success: (res) => {
                console.log('写入数据成功')
            },
            fail: (err) => {
                this.showToast('写入数据失败', 'error')
                this.isWriteSuccess = 'error'
                this.closeBLEConnection()
            },
        })
    }

    // 关闭连接
    closeBLEConnection() {
        uni.closeBLEConnection({
            deviceId: this.deviceId,
            success: (res) => {
                console.log('关闭设备连接成功', res)
            },
            fail: (err) => {
                console.log('关闭设备连接失败', err)
            },
        })
    }
}
```
