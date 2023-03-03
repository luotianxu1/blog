import { navbar } from 'vuepress-theme-hope'

export const MyNavbar = navbar([
    {
        text: '主页',
        icon: 'zhuye',
        prefix: '/',
        link: '/',
    },
    {
        text: '基础',
        icon: 'zaixianxuexi',
        prefix: '/study/',
        link: '/study/',
    },
    {
        text: '面试',
        icon: 'mianshi',
        prefix: '/interview/',
        link: '/interview/',
    },
    {
        text: 'threejs',
        icon: 'threejs',
        prefix: '/threejs/',
        link: '/threejs/',
    },
    {
        text: '项目',
        icon: 'threejs',
        prefix: '/project/',
        link: '/project/',
    },
    {
        text: '其他',
        icon: 'qita',
        prefix: '/other/',
        link: '/other/',
    },
    {
        text: 'Github主页',
        icon: 'github',
        link: 'https://github.com/luotianxu1/',
    },
])
