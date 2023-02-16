import { sidebar } from 'vuepress-theme-hope'

export const MySidebar = sidebar({
    '/': [
        '',
        {
            text: '如何使用',
            icon: 'creative',
            prefix: 'demo/',
            link: 'demo/',
            children: 'structure',
        },
        'slides',
    ],
})
