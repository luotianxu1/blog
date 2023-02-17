import { navbar } from 'vuepress-theme-hope'

export const MyNavbar = navbar([
    {
        text: '主页',
        icon: 'discover',
        prefix: '/',
        link: '/',
    },
    {
        text: '面试题',
        icon: 'discover',
        prefix: '/interview/',
        link: '/interview/',
    },
    {
        text: 'threejs',
        icon: 'edit',
        prefix: '/threejs/',
        link: '/threejs/',
    },
    {
        text: 'Github主页',
        icon: 'github',
        link: 'https://github.com/luotianxu1/',
    },
])
