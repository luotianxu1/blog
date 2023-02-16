import { navbar } from 'vuepress-theme-hope'

export const MyNavbar = navbar([
    '/',
    { text: '面试题', icon: 'discover', link: '/interview/' },
    {
        text: '博文',
        icon: 'edit',
        prefix: '/posts/',
        children: [
            {
                text: '苹果',
                icon: 'edit',
                prefix: 'apple/',
                children: [
                    { text: '苹果1', icon: 'edit', link: '1' },
                    { text: '苹果2', icon: 'edit', link: '2' },
                    '3',
                    '4',
                ],
            },
        ],
    },
    {
        text: 'Github主页',
        icon: 'github',
        link: 'https://github.com/luotianxu1/',
    },
])
