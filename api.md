# 接口文档

**请更换为自己server服务在的网址**

```
baseUrl: http://localhost:8088
```
## 目录：
[1、登录注册](#1登录注册)<br/>
[2、获取用户信息](#2获取用户信息)<br/>
[3、用户退出](#3用户退出)<br/>
[4、获取女生详情](#4获取女生详情)<br/>
[5、获取女生列表](#5获取女生列表)<br/>
[6、获取搜索参数](#6获取搜索参数)<br/>
[7、开启爬取详情页任务](#7开启爬取详情页任务)<br/>
[8、获取统计数](#8获取统计数)<br/>
[9、开启IP爬取任务](#9开启IP爬取任务)<br/>
[10、IP池去重](#10IP池去重)<br/>
[11、获取IP列表](#11获取IP列表)<br/>
[12、检测IP有效性](#12检测IP有效性)<br/>
[13、去重女性列表数据](#13去重女性列表数据)<br/>
[14、配置并开启爬取列表页任务](#14配置并开启爬取列表页任务)<br/>
[15、导出UID到UID表](#15导出UID到UID表)<br/>
[16、更改管理员头像以外的信息](#16更改管理员头像以外的信息)<br/>
[17、更改管理员头像](#17更改管理员头像)<br/>
[18、websocket-详情页脚本](#18websocket-详情页脚本)<br/>
[19、websocket-列表页脚本](#19websocket-列表页脚本)<br/>
[20、websocket-IP池脚本](#20websocket-IP池脚本)<br/>
[21、路由访问列表](#21路由访问列表)<br/>
[22、删除某条路由访问记录](#22删除某条路由访问记录)<br/>
[23、删除日志文件](#23删除日志文件)<br/>
[24、获取日志文件列表](#24获取日志文件列表)<br/>
## 接口列表：
### 1、登录注册
- [x] 状态 请求URL:  
```
eg:  http://localhost:8088/admin/login
```
#### POST 参数类型：form-data
|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|username      |Y       |string   |管理员名 |
|password      |Y       |string   |密码 |
#### 返回示例：
```javascript
{
  "status":200,
  "message":"登录成功",
  "token":"Girl",
  "data":{
    "role":1, // 管理员权限类型
    "avatar":"/img/default_avatar.png",
    "name":"admin",
    "id": 1
    }
  }
```
### 2、获取管理员信息
- [x] 状态 请求URL：
```
eg: http://localhost:8088/admin/info
```
#### GET 参数类型：param
|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id      |Y       |Number   |管理员id |
#### 返回示例：
```javascript
{
  "status":200,
  "data":{
    "avatar":"/img/default_avatar.png",
    "username":"admin",
    "id":1,
    "role":1
    }
}
```
### 3、用户退出
- [x] 状态 请求URL：
```
eg: http://localhost:8088/admin/logout
```
#### POST 参数类型：param

#### 返回示例：
```javascript
{
  "status":200,
  "message": '退出成功'
}
```
### 4、获取女生详情
- [x] 状态 请求URL：
```
eg: http://localhost:8088/girl/getDetail
```
#### POST 参数类型：form-data
|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|uid      |Y       |Number   |女生uid |
#### 返回示例：
```javascript
{
  "status":200,
  "data":{
    "detail":{
      //  很多数据
    }
    }
}
```
### 5、获取女生列表
- [x] 状态 请求URL：
```
eg: http://localhost:8088/girl/list
```
#### POST 参数类型：form-data
|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|page      |Y       |Number   |页码 |
|pageSize      |Y       |Number   |条数 |
|area      |N       |String   |搜索参数:地区 |
|age      |N       |Number   |搜索参数:年龄 |
|height      |N       |Number   |搜索参数:身高 |
|education      |N       |String   |搜索参数:学历 |
|marriage      |N       |String   |搜索参数:状况 |

#### 返回示例：
```javascript
{
  "status":200,
  "data":{
    "items":[
      {"age": 26,"height": 181,....},//  很多数据
      {},//  很多数据
    ],
    "total": 2215 // 总条数
    }
}
```
### 6、获取搜索参数
- [x] 状态 请求URL：
```
eg: http://localhost:8088/spider/getSipderConfig
```
#### GET

#### 返回示例：
```javascript
{
 status: 200,
    data: {
      area: [],        // 地区
      age: [],        // 年龄
      height: [],    // 身高
      education: [], // 学历
      marriage: [] // 状况
      }
}
```
### 7、开启爬取详情页任务
- [x] 状态 请求URL：
```
eg: http://localhost:8088/spider/spiDetailByRealUid
```
#### GET

#### 返回示例：
```javascript
{
  status: 200,
  message: `爬取详细页任务已经开始`,
  data: '查询耗时：6s,剩余爬取数为18000,本次开始爬取时间Thu Mar 28 2019 20:56:56 GMT+0800 (中国标准时间)'
}
```
### 8、获取统计数
- [x] 状态 请求URL：
```
eg: http://localhost:8088/common/getCounts
```
#### GET

#### 返回示例：
```javascript
{
  data: {
    girlCount: 76783,
    finishedCount: 57047,
    userCount: 1
    }
  status: 200
}
```

### 9、开启IP池爬取任务
- [x] 状态 请求URL：
```
eg: http://localhost:8088/ip/startSpiIpPool
```
#### POST
#### 返回示例：
```javascript
{
  data: {
    girlCount: 76783,
    finishedCount: 57047,
    userCount: 1
    }
  status: 200
}
```
### 10、IP池去重
- [x] 状态 请求URL：
```
eg: http://localhost:8088/ip/distinct
```
### 11、获取IP列表
- [x] 状态 请求URL：
```
eg: http://localhost:8088/ip/getIpList
```
### 12、检测IP有效性
- [x] 状态 请求URL：
```
eg: http://localhost:8088/ip/checkIp
```
### 13、去重女性列表数据
v0.1版本已废除
- [x] 状态 请求URL：
```
eg: http://localhost:8088/spider/distinctGirl
```
### 14、配置并开启爬取列表页任务
- [x] 状态 请求URL：
```
eg: http://localhost:8088/spider/updateTaskConfig
```
### 15、导出UID到UID表
- [x] 状态 请求URL：
```
eg: http://localhost:8088/spider/exportRealUid
```
### 16、更改管理员头像以外的信息
- [x] 状态 请求URL：
```
eg: http://localhost:8088/spider/updateInfo
```
### 17、更改管理员头像
- [x] 状态 请求URL：
```
eg: http://localhost:8088/spider/updateAvatar
```
### 18、websocket-详情页脚本
- [x] 状态 请求URL：
```
eg: http://localhost:8088/socket/start/getDetail
```
### 19、websocket-列表页脚本
- [x] 状态 请求URL：
```
eg: http://localhost:8088/socket/start/getList
```
### 20、websocket-IP池脚本
- [x] 状态 请求URL：
```
eg: http://localhost:8088/socket/start/getIp
```
### 21、路由访问列表
- [x] 状态 请求URL：
```
eg: http://localhost:8088/log/getVisit
```
### 22、删除某条路由访问记录
- [x] 状态 请求URL：
```
eg: http://localhost:8088/log/delReq
```
### 23、删除日志文件
- [x] 状态 请求URL：
```
eg: http://localhost:8088/log/delFile
```
### 24、获取日志文件列表
- [x] 状态 请求URL：
```
eg: http://localhost:8088/log/getFile
```

