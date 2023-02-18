import { sidebar } from 'vuepress-theme-hope'

export const MySidebar = sidebar({
    '/interview/': [
        {
            text: '面试',
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
