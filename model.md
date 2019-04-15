# 表设计

#### id id表
管理数据的唯一性

|键|是否必选|类型|默认|说明|
|:-----|:-------:|:-----|:-----|:-----|
|admin_id      |Y       |Number  |- |管理员id |
|user_id      |Y       |Number  |- |用户id |
|upload_id      |Y       |Number |-  |上传图片id |

#### ip ip表 v1.1.0已废弃

|键|是否必选|类型|默认|说明|
|:-----|:-------:|:-----|:-----|:-----|
|ori      |Y       |String  |- |来源 |
|ip      |Y       |String  |- |IP |
|address      |Y       |String |-  |对应地址 |
|type      |Y       |String |-  |类型 |
|speed      |Y       |String |-  |速度 |
|createTime      |Y       |String |-  |数据入库时间 |

#### ipPool ip池表 v1.1.0

|键|是否必选|类型|默认|说明|
|:-----|:-------:|:-----|:-----|:-----|
|type      |Y       |String  |- |来源 |
|host      |Y       |String  |- |IP 唯一索引|
|port      |Y       |String |-  |端口 |
|anonymity      |Y       |String |-  |类型 |
|country      |Y       |String |-  |国家 |
|response_time      |Y       |String |-  |响应时间 |
|from      |Y       |String |-  |来源 |
|createTime      |Y       |String |-  |数据入库时间 |

#### reqLog 请求日志表 v1.1.0

|键|是否必选|类型|默认|说明|
|:-----|:-------:|:-----|:-----|:-----|
|time      |Y       |Date  |- |请求时间 |
|origin      |Y       |String  |- |origin|
|ua      |Y       |String |-  |ua |
|host      |Y       |String |-  |host |
|ip      |Y       |String |-  |ip |
|url      |Y       |String |-  |url |

#### uid 女性uid表

管理女性数据的唯一性

|键|是否必选|类型|默认|说明|
|:-----|:-------:|:-----|:-----|:-----|
|realUid      |Y       |Number  |- |女性uid |

#### upload 图片上传表

管理上传的图片

|键|是否必选|类型|默认|说明|
|:-----|:-------:|:-----|:-----|:-----|
|id      |Y       |Number  |- |图片id,来自id表upload_id |
|url      |Y       |String  |- |图片url |
|size      |Y       |Number  |- |图片大小 |

#### admin 管理员表

后台用户，分为普通管理员和超级管理员

|键|是否必选|类型|默认|说明|
|:-----|:-------:|:-----|:-----|:-----|
|id      |Y       |Number  |- |管理员id,来自id表admin_id |
|username      |Y       |String |-  |管理员名字 |
|password      |Y       |String |-  |管理员密码 |
|avatar      |N       |String  |- |管理员头像，可修改 |
|role      |Y       |Number  |1 |1:普通管理、 2:超级管理员 |

#### spider 爬虫表

爬虫配置

|键|是否必选|类型|默认|说明|
|:-----|:-------:|:-----|:-----|:-----|
|cookie      |Y       |String  |- |详细页的cookie |
|area      |Y       |Object |-  |选项的地区参数 |
|tag      |Y       |Object |-  |标签的参数 |
|param      |Y       |Object  |- |爬列表页的参数 |
|age      |Y       |Array  |- |爬列表页的参数 |
|height      |Y       |Array  |- |爬列表页的参数 |
|education      |Y       |Array  |- |爬列表页的参数 |
|marriage      |Y       |Array  |- |爬列表页的参数 |

#### task 任务表

任务配置//TODO:

|键|是否必选|类型|默认|说明|
|:-----|:-------:|:-----|:-----|:-----|
|-      |Y       |-  |- |- |

#### user 用户表
前台用户

|键|是否必选|类型|默认|说明|
|:-----|:-------:|:-----|:-----|:-----|
|id      |Y       |Number  |- |用户id,来自id表user_id |
|username      |Y       |String |-  |用户名字 |
|password      |Y       |String |-  |用户密码 |
|avatar      |N       |String  |- |用户头像，可修改 |
|fav      |N       |Array  |- |收藏的女性uid |
|yes      |N       |Array  |- |赞过的女性uid |

#### allgirl 女性概要总表

所有女性数据数据

|键|是否必选|类型|默认|说明|
|:-----|:-------:|:-----|:-----|:-----|
|realUid      |Y       |Number  |- |女性uid 唯一索引|
|area      |Y       |String  |- |爬取时所在地区 |
|nickname      |Y       |Number  |- |女性昵称 |
|sex      |Y       |String  |- |性别 |
|marriage      |Y       |String  |- |婚况 |
|height      |Y       |Number/String  |- |女性身高 |
|education      |Y       |String  |- |女性学历 |
|work_location      |Y       |String  |- |女性工作地 |
|age      |Y       |Number  |- |女性年龄 |
|image      |Y       |String  |- |女性头像 |
|randListTag      |Y       |String  |- |女性标签 |
|userIcon      |Y       |String  |- |女性标识 |
|shortnote      |Y       |String  |- |女性留言 |
|matchCondition      |Y       |String  |- |择偶要求 |
|helloUrl      |Y       |String  |- |打招呼 |
|top      |Y       |Number  |0 |受欢迎程度,用于前台展示 |
|hidden      |Y       |Boolean  |false |用于显示隐藏 |
|createTime      |Y       |Date  |- |数据入库时间 |
|finishTime      |N       |Date  |- |对应详细数据完成时间 |

#### unigirl 女性概要表 v0.1版本废弃

净数据存放 混合索引 搜索表   v0.1版本,已废除

|键|是否必选|类型|默认|说明|
|:-----|:-------:|:-----|:-----|:-----|
|realUid      |Y       |Number  |- |女性uid |
|area      |Y       |String  |- |爬取时所在地区 |
|nickname      |Y       |Number  |- |女性昵称 |
|sex      |Y       |String  |- |性别 |
|marriage      |Y       |String  |- |婚况 |
|height      |Y       |Number/String  |- |女性身高 |
|education      |Y       |String  |- |女性学历 |
|work_location      |Y       |String  |- |女性工作地 |
|age      |Y       |Number  |- |女性年龄 |
|image      |Y       |String  |- |女性头像 |
|randListTag      |Y       |String  |- |女性标签 |
|userIcon      |Y       |String  |- |女性标识 |
|shortnote      |Y       |String  |- |女性留言 |
|matchCondition      |Y       |String  |- |择偶要求 |
|helloUrl      |Y       |String  |- |打招呼 |
|top      |Y       |Number  |0 |受欢迎程度,用于前台展示 |
|hidden      |Y       |Boolean  |false |用于显示隐藏 |
|status      |Y       |Boolean  |false |爬取状态 |

#### detail  女性详细表

|键|是否必选|类型|默认|说明|
|:-----|:-------:|:-----|:-----|:-----|
|realUid      |Y       |Number  |- |女性realUid 唯一索引|
|概要      |Y       |String  |- |概要 |
|学历      |Y       |String  |- |学历 |
|身高      |Y       |String  |- |身高 |
|购车      |Y       |String  |- |购车 |
|月薪      |Y       |String  |- |月薪 |
|住房      |Y       |String  |- |住房 |
|体重      |Y       |Number  |- |体重 |
|星座      |Y       |String  |- |星座 |
|民族      |Y       |String  |- |属相 |
|血型      |Y       |String  |- |血型 |
|照片      |Y       |Object  |- |照片 |
|自我介绍      |Y       |String  |- |自我介绍 |
|情感故事      |Y       |String  |- |情感故事 |
|爱情DNA      |N       |String  |'' |爱情DNA |
|择偶要求      |Y       |Object  |- |择偶要求 |
|生活方式      |Y       |Object  |- |生活方式 |
|经济实力      |Y       |Object  |- |经济实力 |
|工作学习      |Y       |Object  |- |工作学习 |
|婚姻观念      |Y       |Object  |- |婚姻观念 |
|createTime      |Y       |Date  |- |数据入库时间 |
