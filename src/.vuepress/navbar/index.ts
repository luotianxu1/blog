import { navbar } from 'vuepress-theme-hope'

export const MyNavbar = navbar([
    {
        text: '主页',
        icon: 'discover',
        prefix: '/',
        link: '/',
    },
    {
        text: '基础',
        icon: 'discover',
        prefix: '/study/',
        link: '/study/',
    },
    {
        text: 'threejs',
        icon: 'edit',
        prefix: '/threejs/',
        link: '/threejs/',
    },
    {
        text: '其他',
        icon: 'edit',
        prefix: '/other/',
        link: '/other/',
    },
    {
        text: 'Github主页',
        icon: 'github',
        link: 'https://github.com/luotianxu1/',
    },
])
