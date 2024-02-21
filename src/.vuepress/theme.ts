import { hopeTheme } from 'vuepress-theme-hope'
import { MyNavbar } from './navbar/index.js'
import { MySidebar } from './sidebar/index.js'

export default hopeTheme({
    hostname: 'https://luotianxu1.github.io', // hostname 当前网站部署到的域名
    // 文章显示的默认作者
    author: {
        name: '罗天旭',
        url: 'https://luotianxu1.github.io',
        email: '1265062404@qq.com',
    },
    navbar: MyNavbar, // 顶部导航栏
    navbarIcon: true, // 是否在导航栏显示图标
    logo: '/logo.svg', // 导航栏图标
    repo: 'vuepress-theme-hope/vuepress-theme-hope',
    repoDisplay: true, // 是否在导航栏内显示仓库链接
    navbarAutoHide: 'mobile', // 向下滚动时自动隐藏导航栏
    hideSiteNameOnMobile: true, // 在移动视图下隐藏站点名称
    // 主题色选择器
    themeColor: true,
    darkmode: 'switch', // 深色模式
    fullscreen: true, // 全屏
    // 自定义导航栏布局
    navbarLayout: {
        start: ['Brand'],
        center: ['Links'],
        end: ['Search', 'Outlook', 'Repo'],
    },
    sidebar: MySidebar, // 侧边栏
    sidebarIcon: true, // 在侧边栏显示图标
    headerDepth: 2, // 侧边栏嵌套的标题深度
    breadcrumb: true, // 全局启用路径导航
    breadcrumbIcon: true, // 在路径导航显示图标
    prevLink: true, // 在页面底部显示上一篇链接
    nextLink: true, // 在页面底部显示下一篇链接
    titleIcon: true, // 在页面标题旁显示图标
    // 文章信息
    pageInfo: [
        'Author',
        'Original',
        'Date',
        'Category',
        'Tag',
        'ReadingTime',
        'Word',
    ],
    lastUpdated: true, // 显示页面最后更新时间
    contributors: true, // 显示页面贡献者
    editLink: false, // 展示编辑此页链接
    footer: '', // 页脚内容
    copyright: 'Copyright © <罗天旭>', // 版权信息
    displayFooter: true, // 显示页脚
    home: '/', // 主页路径
    toc: true, // 在桌面模式下右侧展示标题列表
    backToTop: true, // 显示返回顶部按钮
    print: true, // 在桌面模式下显示打印按钮
    // 加密配置
    encrypt: {
        global: false, // 是否全局加密
        // 加密配置，为一个对象，键名为匹配的路径，键值为对应的密码，接受字符串或字符串数组。
        config: {
            // 这会加密整个 guide 目录，并且两个密码都是可用的
            // "/guide/": ["1234", "5678"],
            // 这只会加密 config/page.html
            // "/config/page.html": "1234"
            '/interview/': ['luotx'],
        },
    },
    iconAssets: '//at.alicdn.com/t/c/font_3926889_56pydlf2405.css', // 字体图标资源链接
    iconPrefix: 'iconfont icon-',
    // page meta
    metaLocales: {
        editLink: '在 GitHub 上编辑此页',
    },
    docsDir: 'docs',
    // 博客选项
    blog: {
        name: '罗天旭', // 姓名
        intro: 'https://github.com/luotianxu1', // 填写后将可以点击“博主信息”中的头像或姓名进入个人介绍页
        avatar: '/img/author/author.jpg', // 头像
        description: '搬砖',
        // 媒体链接配置
        medias: {
            Github: 'https://github.com/luotianxu1',
        },
        roundAvatar: true, // 裁头像为圆形形状
        sidebarDisplay: 'mobile', // 是否在侧边栏展示博主信息
        timeline: '昨日不在', // 时间轴的顶部文字
        articlePerPage: 10, // 每页的文章数量
        // 文章列表中展示的文章信息
        articleInfo: [
            'Author',
            'Original',
            'Date',
            'PageView',
            'Category',
            'Tag',
            'ReadingTime',
        ],
    },
    plugins: {
        blog: true,
        // all features are enabled for demo, only preserve features you need here
        mdEnhance: {
            align: true,
            attrs: true,
            chart: true,
            codetabs: true,
            container: true,
            demo: true,
            echarts: true,
            figure: true,
            flowchart: true,
            gfm: true,
            imgLazyload: true,
            imgSize: true,
            include: true,
            katex: true,
            mark: true,
            mermaid: true,
            playground: {
                presets: ['ts', 'vue'],
            },
            presentation: {
                plugins: ['highlight', 'math', 'search', 'notes', 'zoom'],
            },
            stylize: [
                {
                    matcher: 'Recommended',
                    replacer: ({ tag }) => {
                        if (tag === 'em')
                            return {
                                tag: 'Badge',
                                attrs: { type: 'tip' },
                                content: 'Recommended',
                            }
                    },
                },
            ],
            sub: true,
            sup: true,
            tabs: true,
            vPre: true,
            vuePlayground: true,
        },
        components: {
            components: ['SiteInfo'],
        },
    },
})
