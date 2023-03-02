<template>
    <div class="main" :class="isFull ? 'full' : ''">
        <div
            class="fullBtn"
            @click="changeFull"
            :title="isFull ? '退出全屏' : '全屏'"
        >
            <FullScreen />
        </div>
        <iframe :src="name" frameborder="0"></iframe>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { FullScreen } from '@element-plus/icons-vue'
const props = defineProps({
    name: {
        required: false,
        type: String,
        default: '',
    },
})
const isFull = ref(false)
const changeFull = () => {
    isFull.value = !isFull.value
}
</script>

<style scoped lang="scss">
.main {
    width: 100%;
    height: 400px;
    position: relative;
}

.fullBtn {
    position: absolute;
    top: 0;
    left: 0;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border: 1px solid #ccc;
    z-index: 99999;
    box-shadow: 0 2px 8px var(--card-shadow);
}

iframe {
    width: 100%;
    height: 100%;
}

.full {
    position: absolute;
    left: 0;
    top: var(--navbar-height);
    z-index: 999;
    width: 100%;
    height: 100%;
}
</style>
