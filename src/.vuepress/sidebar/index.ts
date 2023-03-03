import { sidebar } from 'vuepress-theme-hope'

export const MySidebar = sidebar({
    '/study/': [
        {
            text: '基础',
            icon: 'zaixianxuexi',
            children: 'structure',
        },
    ],
    '/interview/': [
        {
            text: '面试',
            icon: 'mianshi',
            children: 'structure',
        },
    ],
    '/threejs/': [
        {
            text: 'threejs',
            icon: 'threejs',
            children: 'structure',
        },
    ],
    '/project/': [
        {
            text: 'project',
            icon: 'threejs',
            children: 'structure',
        },
    ],
    '/other/': [
        {
            text: '其他',
            icon: 'qita',
            children: 'structure',
        },
    ],
})
