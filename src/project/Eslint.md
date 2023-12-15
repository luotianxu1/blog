---
title: Eslint
icon: eslint
order: 5
date: 2023-06-15
category:
    - eslint
tag:
    - eslint
---

## Delete `␍`eslint(prettier/prettier)

罪魁祸首是git的一个配置属性：core.autocrlf

由于历史原因，windows下和linux下的文本文件的换行符不一致。

Windows在换行的时候，同时使用了回车符CR(carriage-return character)和换行符LF(linefeed character)
而Mac和Linux系统，仅仅使用了换行符LF
老版本的Mac系统使用的是回车符CR

### 配置.prettierrc文件

```bash
"endOfLine": "auto"
```

### 修改git

如果你用的是windows，文件编码是UTF-8且包含中文，最好全局将autocrlf设置为false。

```bash
git config --global core.autocrlf false
```

注意：git全局配置之后，你需要重新拉取代码。
