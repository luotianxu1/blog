import { defineClientConfig } from '@vuepress/client'
import 'element-plus/dist/index.css'
import elementplus from 'element-plus'

export default defineClientConfig({
    enhance({ app }) {
        app.use(elementplus)
    },
})
