// 处理girl表
import detailModel from '../model/details'
import Base from './basePrototype'
import uidModel from '../model/uids'
import config from 'config-lite'
const getDetail = require('../getGirls/getdetail')
const async = require('async')

class Spider extends Base {
  constructor() {
    super()
  }

  // 手动路由方法
  async spiDetailByRealUid(req, res, next) {
    try {
      let cur = new Date().getTime()
      let realUidArr = await uidModel.find({}, { realUid: 1, _id: 0 }) // 映射
      // realUids.splice(10, realUids.length - 1) // 第一次拿前面500条
      // const realUids  = realUidArr.slice(10, 110) // 
        // TODO:根绝有无薪资情况 判定cookie 状态
      const realUids = realUidArr.slice(18000, 22160) // TODO: 根据请求进行新爬取
      // const realUids = [{
      //     realUid: 3471673
      //   },
      //   {
      //     realUid: 4894622
      //   },
      //   {
      //     realUid: 5385145
      //   },
      //   {
      //     realUid: 12142457
      //   },
      //   {
      //     realUid: 12285103
      //   },
      //   {
      //     realUid: 13191857
      //   },
      // ]
      // 解码 UTF82Native unescape(('爱情DNA').replace(/&#x/g, '%u').replace(/;/g, ''))
      async.mapLimit(realUids, 2, function (realUid, cb) {
        setTimeout(() => {
          getDetail(realUid['realUid']).then(rs => {
            console.log(rs, 'outer')
            rs['uid'] = realUid['realUid']
            // detailModel.create(rs)
            cb(null, rs)
            // cb()
          })
        }, 1000 * Math.ceil((Math.random() * 2)))
      }, function (err, data) {
        console.log(data, '222222')
        detailModel.insertMany(data)
        console.log('耗时：', (new Date().getTime() - cur) / 1000, '秒')
        res.send({
          status: 200,
          message: '本次UID爬取详细页写入details表完成',
          data: {
            items: data
          }
        })
      })
    } catch (err) {
      res.send({
        status: 400,
        message: `爬取失败,失败原因:${err}`
      })
    }
  }

}

export default new Spider()