# 接口文档

**请更换为自己server服务在的网址**

```
baseUrl: http://localhost:8088
```
## 目录：
[1、登录注册](#1登录注册)<br/>
[2、获取用户信息](#2获取用户信息)<br/>
[3、获取女生详情](#3获取女生详情)<br/>
[4、获取女生列表](#4获取女生列表)<br/>
[5、获取搜索参数](#5获取搜索参数)<br/>
[5、开启爬取详情页任务](#5开启爬取详情页任务)<br/>
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
### 3、获取女生详情
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
### 4、获取女生列表
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
### 5、获取搜索参数
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
### 6、开启爬取详情页任务
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
