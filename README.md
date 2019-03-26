# 关于

闲暇时间XJBG的一个项目，作为单身汪，一个下午突发奇想想看看相亲网上的妹子，造福广大兄弟，于是这个项目诞生了。整个项目暂时分为两个部分，后台管理系统，数据服务端。Vue技术栈的管理系统，express的数据服务端，基于node的爬虫。

**个人的力量是渺小的，希望众人拾材火焰高，如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍**

[线上地址: http://girl.xutianshi.top](http://girl.xutianshi.top) 直接登录即可

## 技术栈

nodejs + express + mongodb + mongoose + es6/7 + vue + element-ui

## 目标功能

- 后台功能
  - [ ] 妹子列表
    - [x] 默认展示
    - [ ] 展示规则 ?
    - [ ] 整表展示 ?
    - [ ] 根据登录IP显示 ?
  - [x] 妹子详情
    - [x] 列表小图,点击看大图
    - [x] 返回上次列表
    - [ ] 详情展示UI设计
  - [ ] 筛选✨✨
    - [ ] 根据关键字如年龄、收入、属相、地区
    - [ ] 根据信息完善程度进行权重比较
  - [x] 用户
    - [x] 登录、注册
    - [ ] 第三方登录
  - [ ] 权限验证
    - [ ] 路由权限
    - [ ] 按钮权限
    - [ ] 超级管理员

- 移动端功能
  - [ ] 列表展示
  - [ ] 详情展示

- 服务端功能
  - [ ] 代理IP爬取、使用、导出、导入
  - [ ] 信息来源可配置化
  - [ ] 爬取关键字、cookie可配置化
  - [ ] 邮件提醒
  - [ ] 定时爬取任务
    - [ ] 00时、13时IP爬取任务
    - [ ] 每天01：00~10：00 爬取地区用户
    - [ ] 每天12：00~22：00 爬取用户详情
    - [ ] 根据UID进行数据去重
    - [ ] 每天03：00更新日志
  - [ ] 统计类
    - [ ] 访问日志
    - [ ] 爬虫日志
    - [ ] 运行日志

- 服务器端功能
  - [x] 部署上线
  - [ ] 自动化部署

## Server

服务端

表设计>: [model](./model.md)

数据返回格式
  - status *
    - 100 参数错误，需重新填写
    - 101 参数正常，但数据有误
    - 200 响应成功，且数据操作正常
    - 400 程序运行错误，系统捕获错误
  - data *
  - message

## admin
  
后台管理系统端

api文档>: [api文档](./api.md)

## 项目布局

```
|-- admin                          后台管理系统
    |-- build                      webpack构建
    |   |-- build.js
    |   |-- webpack.prod.conf.js
    |-- config                      运行配置
    |   |-- dev.env.js              开发配置
    |   |-- prod.env.js             生产配置
    |-- dist                        静态资源打包目录
    |-- mock                        mock数据
    |-- src                         源码目录
    |   |-- permission.js           权限文件
    |   |-- api                     接口
    |   |   |-- login.js
    |   |-- assets                  资源文件
    |   |-- components              全局组件
    |   |   |-- Breadcrumb
    |   |-- icons
    |   |-- router                  Vue-router
    |   |   |-- index.js
    |   |-- store                   Vuex
    |   |   |-- getters.js
    |   |   |-- index.js
    |   |   |-- modules
    |   |       |-- app.js
    |   |       |-- user.js
    |   |-- styles                 全局样式
    |   |   |-- element-ui.scss
    |   |-- utils                  工具集
    |   |   |-- auth.js
    |   |-- views                   页面文件夹
    |       |-- detail              页面
    |       |-- layout              布局
    |       |   |-- Layout.vue
    |       |   |-- components
    |-- static                      静态资源
        |-- .gitkeep
|-- server                          数据服务端
    |-- config                      运行配置
    |   |-- default.js              默认配置
    |   |-- development.js          开发配置
    |-- controller                  处理中心，负责路由及数据库的具体操作
    |   |-- admin.js
    |   |-- basePrototype.js
    |   |-- girl.js
    |   |-- spider.js
    |-- core                        爬虫脚本
    |   |-- schedule.js
    |-- getGirls                    爬虫草稿
    |   |-- xsls                    存放Excel
    |-- ipProxy                     爬虫草稿
    |   |-- app.js
    ├── middleware                  中间件
    │   ├── check.js                权限验证
    │   └── statistic.js            API数据统计
    |-- model
    |   |-- admins.js               管理员模型
    |   |-- allgirsl.js             脏模型
    |   |-- details.js              用户详情模型
    |   |-- index.js
    |-- mongodb                     连接数据库
    |   |-- db.js
    |-- public                      静态资源目录
    |-- routes                      路由配置
        |-- ...
```