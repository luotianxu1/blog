import { sidebar } from 'vuepress-theme-hope'

export const MySidebar = sidebar({
    '/study/': [
        {
            text: '基础',
            icon: 'creative',
            children: 'structure',
        },
    ],
    '/threejs/': [
        {
            text: 'threejs',
            icon: 'creative',
            children: 'structure',
        },
    ],
    '/other/': [
        {
            text: '其他',
            icon: 'creative',
            children: 'structure',
        },
    ],
})
