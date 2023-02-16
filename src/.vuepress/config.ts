import { defineUserConfig } from 'vuepress'
import { searchProPlugin } from 'vuepress-plugin-search-pro'
import theme from './theme.js'

export default defineUserConfig({
    base: '/',
    locales: {
        '/': {
            lang: 'zh-CN',
            title: '',
            description: '罗天旭的博客',
        },
    },
    theme,
    shouldPrefetch: false,
    plugins: [
        searchProPlugin({
            // 索引全部内容
            indexContent: true,
        }),
    ],
})
