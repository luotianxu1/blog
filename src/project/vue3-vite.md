---
title: vue3+vite基础模板
icon: markdown
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
npm install
```

### 运行项目

```npm
npm run dev
```

![ ](/img/project/vue1.jpg)

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
npm install -g commitizen@4.2.4
npm i cz-customizable@6.3.0 --save-dev
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
npm install --save-dev @commitlint/config-conventional@12.1.4 @commitlint/cli@12.1.4
npm install husky@7.0.1 --save-dev
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
   "src/**/*.{ts,js,vue}": [      //src目录下所有的js和vue文件
     "eslint --fix",           // 自动修复
     "git add"                 // 自动提交时修复
   ]
 }
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

## 按需引入 element-plus

### 安装

```npm
npm install element-plus --save
npm install -D unplugin-vue-components unplugin-auto-import
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
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
    // ...
    plugins: [
        AutoImport({
            resolvers: [ElementPlusResolver()],
            imports: ['vue', 'vue-router', 'pinia'],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
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

AutoImport 中 enabled 配置第一次运行时改为 true，后面即可改回 false

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
