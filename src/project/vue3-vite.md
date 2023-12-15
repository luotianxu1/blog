---
title: vue3+vite基础模板
icon: vue
order: 1
date: 2023-03-03
category:
    - 项目
tag:
    - vue3
---

## 通过脚手架初始化项目

### 下载项目

```npm
npm create vue@3
```

![ ](/img/project/vue.jpg)

### 安装依赖

```npm
pnpm install
```

### 运行项目

```npm
npm run dev
```

![ ](/img/project/vue1.jpg)

## 安装 scss

```npm
pnpm install sass -D
```

## git

### 初始化 git 本地仓库

```git
git init
```

### 添加所有文件

```git
git add .
```

### 提交文件

```git
git commit -m '你的提交信息'
```

### 链接到 github

```git
git remote add origin https://github.com/xxxxxxxx/vue3-base.git
```

### 推送到 github

```git
git push --set-upstream origin master
```

## 设置 commit 规范

### 安装依赖

```npm
npm install -g commitizen
pnpm add cz-customizable -D
```

### 修改 package.json

在`package.json`中进行新增

```json
"config": {
  "commitizen": {
    "path": "node_modules/cz-customizable"
  }
}
```

### 创建配置文件

在根目录下新建`.cz-config.js`文件并写入配置 之后就可以用`git cz`来代替`git commit`

```js
module.exports = {
    // 可选类型
    types: [
        { value: 'feat', name: 'feat:     新功能' },
        { value: 'fix', name: 'fix:      修复' },
        { value: 'docs', name: 'docs:     文档变更' },
        { value: 'style', name: 'style:    代码格式(不影响代码运行的变动)' },
        {
            value: 'refactor',
            name: 'refactor: 重构(既不是增加feature，也不是修复bug)',
        },
        { value: 'perf', name: 'perf:     性能优化' },
        { value: 'test', name: 'test:     增加测试' },
        { value: 'chore', name: 'chore:    构建过程或辅助工具的变动' },
        { value: 'revert', name: 'revert:   回退' },
        { value: 'build', name: 'build:    打包' },
    ],
    // 消息步骤
    messages: {
        type: '请选择提交类型:',
        customScope: '请输入修改范围(可选):',
        subject: '请简要描述提交(必填):',
        body: '请输入详细描述(可选):',
        footer: '请输入要关闭的issue(可选):',
        confirmCommit: '确认使用以上信息提交？(y/n/e/h)',
    },
    // 跳过问题
    skipQuestions: ['body', 'footer'],
    // subject文字长度默认是72
    subjectLimit: 72,
}
```

现在就可以用`git cz`来代替`git commit`

![ ](/img/project/vue2.jpg)

## 强制 commit 规范

### 安装依赖

```npm
 pnpm add @commitlint/config-conventional @commitlint/cli husky -D
```

### 初始化

```npm
npx husky install
```

### 创建配置文件

在根目录下新建`commitlint.config.js`文件并写入配置

```js
module.exports = {
    // 继承的规则
    extends: ['@commitlint/config-conventional'],
    // 定义规则类型
    rules: {
        // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
        'type-enum': [
            2,
            'always',
            [
                'feat', // 新功能 feature
                'fix', // 修复 bug
                'docs', // 文档注释
                'style', // 代码格式(不影响代码运行的变动)
                'refactor', // 重构(既不增加新功能，也不是修复bug)
                'perf', // 性能优化
                'test', // 增加测试
                'chore', // 构建过程或辅助工具的变动
                'revert', // 回退
                'build', // 打包
            ],
        ],
        // subject 大小写不做校验
        'subject-case': [0],
    },
}
```

### 在 package.json 中新增指令

```test
"prepare": "husky install"
```

### 执行指令

```npm
npm run prepare
```

### 添加 commit-msg 钩子,执行信息校验

```npm
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

### 测试

![ 不符合规则 ](/img/project/vue4.jpg)

![ 符合规则 ](/img/project/vue5.jpg)

## eslint

### 创建配置文件

修改.eslintrc.cjs文件

```js
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/multi-word-component-names': 'off', // 文件命名必须改成驼峰规范
    // eslint (http://eslint.cn/docs/rules)
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'no-multiple-empty-lines': ['error', { max: 1 }], // 不允许多个空行
    'no-use-before-define': 'off', // 禁止在 函数/类/变量 定义之前使用它们
    'no-irregular-whitespace': 'off', // 禁止不规则的空白
    // vue (https://eslint.vuejs.org/rules)
    'vue/attributes-order': 'off', // vue api使用顺序，强制执行属性顺序
    'vue/one-component-per-file': 'off', // 强制每个组件都应该在自己的文件中
    'vue/html-closing-bracket-newline': 'off', // 在标签的右括号之前要求或禁止换行
    'vue/max-attributes-per-line': 'off', // 强制每行的最大属性数
    'vue/multiline-html-element-content-newline': 'off', // 在多行元素的内容之前和之后需要换行符
    'vue/singleline-html-element-content-newline': 'off', // 在单行元素的内容之前和之后需要换行符
    'vue/require-default-prop': 'off', // 此规则要求为每个 prop 为必填时，必须提供默认值
    eqeqeq: 'error' // 要求使用 === 和 !==
  }
}

```

创建.eslintignore文件

```text
dist
node_modules
```

## prettie

### 创建配置文件

修改 .prettierrc.json 为 .prettierrc.js

```js
// @see: https://www.prettier.cn

module.exports = {
 // 超过最大值换行
 printWidth: 130,
 // 缩进字节数
 tabWidth: 2,
 // 使用制表符而不是空格缩进行
 useTabs: true,
 // 结尾不用分号(true有，false没有)
 semi: false,
 // 使用单引号(true单双引号，false双引号)
 singleQuote: false,
 // 更改引用对象属性的时间 可选值"<as-needed|consistent|preserve>"
 quoteProps: "as-needed",
 // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
 bracketSpacing: true,
 // 多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。） 可选值"<none|es5|all>"，默认none
 trailingComma: "none",
 // 在JSX中使用单引号而不是双引号
 jsxSingleQuote: false,
 //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号 ,always：不省略括号
 arrowParens: "avoid",
 // 如果文件顶部已经有一个 doclock，这个选项将新建一行注释，并打上@format标记。
 insertPragma: false,
 // 指定要使用的解析器，不需要写文件开头的 @prettier
 requirePragma: false,
 // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
 proseWrap: "preserve",
 // 在html中空格是否是敏感的 "css" - 遵守CSS显示属性的默认值， "strict" - 空格被认为是敏感的 ，"ignore" - 空格被认为是不敏感的
 htmlWhitespaceSensitivity: "css",
 // 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
 endOfLine: "auto",
 // 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码
 rangeStart: 0,
 rangeEnd: Infinity,
 // Vue文件脚本和样式标签缩进
 vueIndentScriptAndStyle: false
}
```

新建 .prettierignore

```text
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*

```

## stylelint

### 安装依赖

```npm
pnpm install stylelint@13.13.1 stylelint-config-prettier@9.0.3 stylelint-config-standard@22.0.0 stylelint-order@4.1.0 stylelint-scss@3.20.1 -D
```

### 创建配置文件

新建.stylelintrc.cjs文件

```js
module.exports = {
 root: true,
 plugins: ["stylelint-order", "stylelint-scss"],
 extends: ["stylelint-config-standard", "stylelint-config-prettier"],
 rules: {
  "selector-pseudo-class-no-unknown": [
   true,
   {
    ignorePseudoClasses: ["global", "v-deep", "deep"]
   }
  ],
  "selector-pseudo-element-no-unknown": [
   true,
   {
    ignorePseudoElements: ["v-deep", "deep"]
   }
  ],
  "at-rule-no-unknown": [
   true,
   {
    ignoreAtRules: ["function", "if", "each", "include", "mixin", "for"]
   }
  ],
  "no-empty-source": null,
  "named-grid-areas-no-invalid": null,
  "unicode-bom": "never",
  "no-descending-specificity": null,
  "font-family-no-missing-generic-family-keyword": null,
  "declaration-colon-space-after": "always-single-line",
  "declaration-colon-space-before": "never",
  "declaration-block-trailing-semicolon": ["always", { ignore: ["single-declaration"] }],
  "rule-empty-line-before": [
   "always",
   {
    ignore: ["after-comment", "first-nested"]
   }
  ],
  "unit-no-unknown": [true, { ignoreUnits: ["rpx"] }],
  "order/order": [
   [
    "dollar-variables",
    "custom-properties",
    "at-rules",
    "declarations",
    {
     type: "at-rule",
     name: "supports"
    },
    {
     type: "at-rule",
     name: "media"
    },
    "rules"
   ],
   { severity: "warning" }
  ],
  // Specify the alphabetical order of the attributes in the declaration block
  "order/properties-order": [
   "position",
   "top",
   "right",
   "bottom",
   "left",
   "z-index",
   "display",
   "float",
   "width",
   "height",
   "max-width",
   "max-height",
   "min-width",
   "min-height",
   "padding",
   "padding-top",
   "padding-right",
   "padding-bottom",
   "padding-left",
   "margin",
   "margin-top",
   "margin-right",
   "margin-bottom",
   "margin-left",
   "margin-collapse",
   "margin-top-collapse",
   "margin-right-collapse",
   "margin-bottom-collapse",
   "margin-left-collapse",
   "overflow",
   "overflow-x",
   "overflow-y",
   "clip",
   "clear",
   "font",
   "font-family",
   "font-size",
   "font-smoothing",
   "osx-font-smoothing",
   "font-style",
   "font-weight",
   "hyphens",
   "src",
   "line-height",
   "letter-spacing",
   "word-spacing",
   "color",
   "text-align",
   "text-decoration",
   "text-indent",
   "text-overflow",
   "text-rendering",
   "text-size-adjust",
   "text-shadow",
   "text-transform",
   "word-break",
   "word-wrap",
   "white-space",
   "vertical-align",
   "list-style",
   "list-style-type",
   "list-style-position",
   "list-style-image",
   "pointer-events",
   "cursor",
   "background",
   "background-attachment",
   "background-color",
   "background-image",
   "background-position",
   "background-repeat",
   "background-size",
   "border",
   "border-collapse",
   "border-top",
   "border-right",
   "border-bottom",
   "border-left",
   "border-color",
   "border-image",
   "border-top-color",
   "border-right-color",
   "border-bottom-color",
   "border-left-color",
   "border-spacing",
   "border-style",
   "border-top-style",
   "border-right-style",
   "border-bottom-style",
   "border-left-style",
   "border-width",
   "border-top-width",
   "border-right-width",
   "border-bottom-width",
   "border-left-width",
   "border-radius",
   "border-top-right-radius",
   "border-bottom-right-radius",
   "border-bottom-left-radius",
   "border-top-left-radius",
   "border-radius-topright",
   "border-radius-bottomright",
   "border-radius-bottomleft",
   "border-radius-topleft",
   "content",
   "quotes",
   "outline",
   "outline-offset",
   "opacity",
   "filter",
   "visibility",
   "size",
   "zoom",
   "transform",
   "box-align",
   "box-flex",
   "box-orient",
   "box-pack",
   "box-shadow",
   "box-sizing",
   "table-layout",
   "animation",
   "animation-delay",
   "animation-duration",
   "animation-iteration-count",
   "animation-name",
   "animation-play-state",
   "animation-timing-function",
   "animation-fill-mode",
   "transition",
   "transition-delay",
   "transition-duration",
   "transition-property",
   "transition-timing-function",
   "background-clip",
   "backface-visibility",
   "resize",
   "appearance",
   "user-select",
   "interpolation-mode",
   "direction",
   "marks",
   "page",
   "set-link-source",
   "unicode-bidi",
   "speak"
  ]
 },
 ignoreFiles: ["**/*.js", "**/*.jsx", "**/*.tsx", "**/*.ts"]
}
```

新建.stylelintignore文件

```text
/dist/*
/public/*
public/*
node_modules/*
```

### 修改package.json

新增命令

```text
"lint:stylelint": "stylelint --fix \"**/*.{vue,less,postcss,css,scss}\" --cache --cache-location node_modules/.cache/stylelint/",
```

## 统一编辑器配置

根目录下新增`.editorconfig`文件

```test
# @see: http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
end_of_line = lf # 控制换行类型(lf | cr | crlf)
insert_final_newline = true # 始终在文件末尾插入一个新行
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
max_line_length = 130 # 最大行长度

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off # 关闭最大行长度限制
trim_trailing_whitespace = false # 关闭末尾空格修剪
```

## 强制代码格式化

### 创建配置文件

```npm
npx husky add .husky/pre-commit
```

### 修改配置文件

将`.husky/pre-commit`文件钟的 undefind 改为`npx lint-staged`

### 修改 package.json

```json
 "lint-staged": {
  "src/**/*.{ts,js,vue}": [
   "eslint --fix",
   "prettier --write",
   "stylelint --fix",
   "git add"
  ],
  "*.{scss,less,styl,html}": [
   "stylelint --fix",
   "prettier --write",
   "git add"
  ]
 }
```

## mac 获取权限

对于 liux 或者 macos 系统中，可能会出现 因为没有将钩子 '.husky/pre-commit' 设置为可执行 钩子被忽略的错误。

执行

```text
chmod +x .husky/pre-commit
```

```text
chmod +x .husky/commit-msg
```

## 按需引入 element-plus

### 安装

```npm
pnpm i element-plus
pnpm install unplugin-vue-components unplugin-auto-import vite-plugin-style-import consola -D
```

### ts 配置

```json
// tsconfig.json
{
    "compilerOptions": {
        // ...
        "types": ["element-plus/global"]
    }
}
```

### 按需引入

```ts
// vite.config.ts
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import { createStyleImportPlugin, ElementPlusResolve } from "vite-plugin-style-import"

export default defineConfig({
 plugins: [
    // ...
  AutoImport({
   resolvers: [ElementPlusResolver()],
   imports: ["vue", "vue-router", "pinia"],
   dts: "src/types/auto-imports.d.ts",
   eslintrc: {
    enabled: false, // Default `false`
    filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
    globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
   }
  }),
  Components({
   resolvers: [ElementPlusResolver()],
   dts: "src/types/components.d.ts"
  }),
  // 自动引入element-plus样式
  createStyleImportPlugin({
   resolves: [ElementPlusResolve()],
   libs: [
    {
     libraryName: "element-plus",
     esModule: true,
     resolveStyle: name => {
      return `element-plus/theme-chalk/${name}.css`
     }
    }
   ]
  })
 ],
})
```

## ts 类型检查

### 创建文件

在 src 目录下创建`types`文件

### 修改自动引入

```ts
export default defineConfig({
    // ...
    plugins: [
        // ...
        AutoImport({
            resolvers: [ElementPlusResolver()],
            imports: ['vue', 'vue-router', 'pinia'],
            dts: 'src/types/auto-imports.d.ts',
            eslintrc: {
                enabled: false, // Default `false`
                filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
                globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
            },
        }),
        Components({
            resolvers: [ElementPlusResolver()],
            dts: 'src/types/components.d.ts',
        }),
    ],
})
```

AutoImport 中 enabled 配置有新引入的依赖改为true，其他时间为false

### 修改 tsconfig.json

```json
{
    "extends": "@vue/tsconfig/tsconfig.web.json",
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": ["./src/*"],
            "@assets/*": ["./src/assets/*"]
        },
        "types": ["element-plus/global"],
        "typeRoots": ["./node_modules/@types/", "./src/types/"]
    },
    "references": [
        {
            "path": "./tsconfig.node.json"
        }
    ],
    "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
    "exclude": ["node_modules"]
}
```

## github 地址

<https://github.com/luotianxu1/vue3-base>
