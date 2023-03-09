<template>
    <div class="main">
        <div class="fullBtn" @click="changeFull" title="打开新窗口">
            <TopRight color="#ccc" />
        </div>
        <iframe :src="url" frameborder="0"></iframe>
    </div>
</template>

<script lang="ts" setup>
import { TopRight } from '@element-plus/icons-vue'
const props = defineProps({
    url: {
        required: false,
        type: String,
        default: '',
    },
})
const changeFull = () => {
    window.open(props.url)
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
    bottom: 0;
    right: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 50%;
    border: 1px solid #ccc;
    z-index: 99999;
    box-shadow: 0 2px 8px var(--card-shadow);
}

iframe {
    width: 100%;
    height: 100%;
}
</style>
