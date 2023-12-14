---
title: homeBrew安装mysql
icon: mysql
order: 1
date: 2023-10-22
category:
    - Mysql
tag:
    - Mysql
---

# 安装

安装

```
brew install mysql
```

开启MySQL服务

```
brew services start mysql@5.7
```

设置一个root密码,可以使用以下命令进入MySQL：

```
mysql -u root
```

设置root密码：

```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密码';
```

# 删除

如果需要关闭MySQL服务

```
brew services stop mysql@5.7
```

删除以下文件

- MySQL二进制文件：/opt/homebrew/Cellar/mysql/{版本号}/bin
- MySQL配置文件：/opt/homebrew/etc/my.cnf
- MySQL数据目录：/opt/homebrew/var/mysql
- MySQL日志文件：/opt/homebrew/var/log/mysql
