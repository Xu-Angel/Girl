# 接口文档
```
baseUrl: http://girl.xutianshi.top
```
## 目录：
[1、登录注册](#1登录注册)<br/>
[2、获取用户信息](#2获取用户信息)<br/>
[3、获取女生详情](#3获取女生详情)<br/>
[4、获取女生列表](#4获取女生列表)<br/>
## 接口列表：
### 1、登录注册
- [ ] 状态 请求URL:  
```
http://girl.xutianshi.top/admin/login
```
#### POST 参数类型：form-data
|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|username      |Y       |string   |用户名 |
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
### 2、获取用户信息
- [ ] 状态 请求URL：
```
http://girl.xutianshi.top/admin/info
```
#### GET 参数类型：param
|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id      |Y       |Number   |用户id |
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
http://girl.xutianshi.top/girl/getDetail
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
http://girl.xutianshi.top/girl/list
```
#### POST 参数类型：form-data
|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|page      |Y       |Number   |页码 |
|pageSize      |Y       |Number   |一页条数 |
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
