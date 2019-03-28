// 处理girl表
import detailModel from '../model/details'
import spiderModel from '../model/spider'
import Base from './basePrototype'
import uidModel from '../model/uids'
import uniGirlModel from '../model/unigirls'
import config from 'config-lite'
import { error } from 'util';
const getDetail = require('../getGirls/getdetail')
const async = require('async')

class Spider extends Base {
  constructor() {
    super()
    this.spiDetailByRealUid = this.spiDetailByRealUid.bind(this) // 继承方法 绑定
  }
  async getSipderConfig(req, res, next) {
    try {
      let config = await spiderModel.find({})
      // console.log(config)
      let area = []
      for (let key in config[0]['area']) {
        area.push(key)
      }
      res.send({
        status: 200,
        data: {
          area,
          cookie: config[0]['cookie'],
          age: config[0]['age'],
          height: config[0]['height'],
          education: config[0]['education'],
          marriage: config[0]['marriage']
        }
      })
    } catch (error) {
      res.send({
        status: 400,
        message: `获取失败,失败原因:${err}`
      })
    }

  }
  // 手动路由方法
  async spiDetailByRealUid(req, res, next) {
    try {
      let Cur = new Date().getTime()
      // let realUidArr = await uidModel.find({}, { realUid: 1, _id: 0 }) // 映射
      let realUidArr = await uidModel.distinct('realUid') // 映射
      let finUidArr = await detailModel.distinct('realUid')
      let realUids = null
      console.log(realUidArr, 'realUidArr')
      console.log(finUidArr, 'finUidArr')
      // 临时方法更新旧的列表数据状态
      // for (let key in finUidArr) {
      //   // uidModel.find({realUid:finUidArr[key]})
      //   await uniGirlModel.findOneAndUpdate({ realUid: finUidArr[key] }, { $set: { status: true } })
      // }
      // return
      if (finUidArr.length > 0) {
        realUids = this.difference(realUidArr, finUidArr)
      } else {
        realUids = realUidArr
      }
      let remainLength = realUids.length
      res.send({
        status: 200,
        message: `爬取详细页任务已经开始`,
        data: `
        查询耗时：${(new Date().getTime() - Cur) / 1000},
        剩余爬取数为${remainLength},
        本次开始爬取时间${new Date()}
        `
        // items: realUids
      })
      // console.log(realUids)
      // realUids.splice(10, realUids.length - 1) // 第一次拿前面500条
      // const realUids  = realUidArr.slice(10, 110) // 
      // TODO:根绝有无薪资情况 判定cookie 状态
      // const realUids = realUidArr.slice(0, 2) // TODO: 根据请求进行新爬取
      // const realUids = [{
      //     realUid: 3471673
      //   },
      //   {
      //     realUid: 4894622
      //   },
      // ]
      // 解码 UTF82Native unescape(('爱情DNA').replace(/&#x/g, '%u').replace(/;/g, ''))
      async.mapLimit(realUids, 2, async function (realUid, cb) {
        let cur = new Date().getTime()
        getDetail(realUid).then(rs => {
          // 判断当前用户是否是空资料(未审核通过||关闭||隐藏)
          if (rs['住房'] === '' && rs['学历'] === '' && rs['学历'] === '' && rs['身高'] === '') {
            remainLength--
            console.log(`异常-realUid:${realUid},花费时间:${(new Date().getTime() - cur) / 1000}seconds,剩余realUid数量：${remainLength}`)
            cb(null, realUid) // 结束本次函数 抛出本次异常realUid
          } else {
            // 判断当前的数据有没有薪资 如果没有，说明cookie过期 需要重新拿TODO:停止爬取任务 发送邮件更新cookie
            if (rs['经济实力']['月薪'] === '登陆后可见' || rs['经济实力']['购车'] === '登陆后可见') throw new Error(`请更新cookie以爬取私密信息,剩余realUid数量：${remainLength}`)
            rs['realUid'] = realUid
            detailModel.insertMany([rs], function (err, data) {
              // 更新列表的状态
              uniGirlModel.findOneAndUpdate({ realUid }, { $set: { status: true } }).exec()
              remainLength--
              console.log(`end-realUid:${realUid},usedtime:${(new Date().getTime() - cur) / 1000}seconds,remain-realUid-count：${remainLength}`)
              cb(null, ' ') // 代表这个函数结束，传递出去
            })
          }
        })
      }, (err, data) => {
        console.log(`所有任务完成：${data}`)
      })
    } catch (err) {
      console.log(err)
      // 发送邮件 报错
      // res.send({
      //   status: 400,
      //   message: `爬取失败,失败原因:${err}`
      // })
    }
  }

}

export default new Spider()