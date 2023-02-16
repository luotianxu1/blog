import { navbar } from 'vuepress-theme-hope'

export const MyNavbar = navbar([
    '/',
    { text: '演示', icon: 'discover', link: '/demo/' },
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
        link: 'https://github.com/Luotianxu-ltx/',
    },
])
