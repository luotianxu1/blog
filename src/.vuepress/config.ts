import { defineUserConfig } from 'vuepress'
import { searchProPlugin } from 'vuepress-plugin-search-pro'
import { autoCatalogPlugin } from 'vuepress-plugin-auto-catalog'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import theme from './theme.js'
import { getDirname, path } from '@vuepress/utils'

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
        autoCatalogPlugin(),
        // 注册vue组件
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, './components/'),
            componentsPatterns: ['**/*.vue'],
        }),
    ],
})
