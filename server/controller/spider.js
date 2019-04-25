import detailModel from '../model/details'
import spiderModel from '../model/spider'
import Base from './basePrototype'
import uidModel from '../model/uids'
import AllGirlModel from '../model/allgirls'
import formidable from 'formidable'
import getList2Json from '../core/spider/getList2Json'
import getDetail from '../core/spider/getdetail'
import async from 'async'
import { getipList } from '../core/config'
import {setTop as _setTop} from '../core/schedule/sortTask'
let G = global
class Spider extends Base {
  constructor() {
    super()
    this.spiDetailByRealUid = this.spiDetailByRealUid.bind(this) // 继承方法 绑定
    this.distinctGirl = this.distinctGirl.bind(this)
  }

  /**
   * 获取爬取的配置
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async getSipderConfig(req, res, next) {
    try {
      const config = await spiderModel.find({})
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

  /**
   * 根据UID爬取详情数据
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async spiDetailByRealUid(req, res, next) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      if (req.session.role !== 2) {
        res.send({
          status: 100,
          message: '对不起，你没有权限操作~'
        })
        return
      }
      const { cookie } = fields
      try {
        let Cur = new Date().getTime()
        //V1.1.0使用总表
        let realUidArr = await AllGirlModel.distinct('realUid') // 映射
        let finUidArr = await detailModel.distinct('realUid')
        let realUids = null

        if (finUidArr.length > 0) {
          realUids = this.difference(realUidArr, finUidArr)
        } else {
          realUids = realUidArr
        }
        let remainLength = realUids.length
        const Length = realUidArr.length
        res.send({
          status: 200,
          message: `爬取详细页任务已开始`,
          data: `查询耗时：${(new Date().getTime() - Cur) / 1000},剩余爬取数为${remainLength}`
        })
        const ipList = await getipList()
        await spiderModel.findOneAndUpdate({}, { $set: { cookie } })
        // 记录任务开始
        async.mapLimit(realUids, 100, async function (realUid, cb) {
          //way-1 详细任务开始 直接拿一波已有IP进行随机  每次请求都随机一个代理IP
          const row = ipList[parseInt(Math.random() * ipList.length)]
          const ip = `${row.type}://${row.host}:${row.port}/`
          let cur = new Date().getTime()
          getDetail(realUid, cookie, ip).then(rs => {

            // 判断当前用户是否是空资料(未审核通过||关闭||隐藏)
            if (rs['学历'] === '' && rs['身高'] === '') {
              remainLength--
              // 异常UID事件
              G.DetailStatusUidErr = { 'text': `异常-realUid:${realUid},花费时间:${(new Date().getTime() - cur) / 1000}seconds,剩余realUid数量：${remainLength}`, 'percent': ((Length - remainLength) / Length) * 100 }
              // console.log(`异常-realUid:${realUid},花费时间:${(new Date().getTime() - cur) / 1000}seconds,剩余realUid数量：${remainLength}`)
              cb(null, realUid) // 结束本次函数 抛出本次异常realUid
            } else {
              // 判断当前的数据有没有薪资 如果没有，说明cookie过期 需要重新拿TODO:停止爬取任务 发送邮件更新cookie
              if (rs['经济实力']['月薪'] === '登录后可见' || rs['经济实力']['购车'] === '登录后可见') {
                //cookie错误事件
                G.DetailStatusCookieErr = { 'text': `传送时间:${new Date()}--请更新cookie以爬取私密信息,剩余realUid数量：${remainLength}` }
                throw new Error(`请更新cookie以爬取私密信息,剩余realUid数量：${remainLength}`)
              }
              rs['realUid'] = realUid
              detailModel.insertMany([rs], function (err, data) {
                // 更新列表的状态
                AllGirlModel.findOneAndUpdate({ realUid }, { $set: { status: true, finishTime: new Date() } }).exec()
                remainLength--
                // 进度事件
                G.DetailStatusRate = { 'text': `传送时间:${new Date()}--end-realUid:${realUid},usedtime:${(new Date().getTime() - cur) / 1000}seconds,remain-realUid-count：${remainLength}`, 'percent': ((Length - remainLength) / Length) * 100 }
                cb(null, ' ') // 代表这个函数结束，传递出去
              })

            }
          }).catch(err => {
            // console.log(err)
            cb(null, ' ')
          })
        }, async (err, data) => {
          console.log(`详细页爬取任务完成`)
        })

      } catch (err) {
        // console.log(err)
        // 发送邮件 报错
        // res.send({
        //   status: 400,
        //   message: `爬取失败,失败原因:${err}`
        // })
      }
    })
  }
  /**
   * 定义爬取列表页配置并开启任务
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async updateTaskConfig(req, res, next) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      if (req.session.role !== 2) {
        res.send({
          status: 100,
          message: '对不起，你没有权限操作~'
        })
        return
      }
      if (err) {
        res.send({
          status: 100,
          message: '表单信息错误'
        })
        return
      }
      try {
        await getList2Json({ startPage: 1, endPage: 150, speed: 1, marriage: 1, education: 30, ...fields })
        res.send({
          status: 100,
          message: `爬取列表页已开始~`
        })
      } catch (err) {
        res.send({
          status: 400,
          message: `操作失败,失败原因:${err}`
        })
      }
    })
  }

  /**
   * 设置权重
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async setTop(req, res, next) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      if (req.session.role !== 2) {
        res.send({
          status: 100,
          message: '对不起，你没有权限操作~'
        })
        return
      }
      try {
        await _setTop()
        res.send({
          status: 100,
          message: `设置权重任务已开始~`
        })
      } catch (err) {
        res.send({
          status: 400,
          message: `操作失败,失败原因:${err}`
        })
      }
    })
  }

  /**
   * WARRING: v0.1 去重方法  已废弃
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async distinctGirl(req, res, next) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      if (req.session.role !== 2) {
        res.send({
          status: 100,
          message: '对不起，你没有权限操作~'
        })
        return
      }
      try {
        console.log('接到请求')
        //let girl = await GirlModel.find({}) // 1. 整表取
        let uids = await GirlModel.distinct('realUid')
        console.log('uids.length:', uids.length)
        console.log('set length ', Array.from(new Set(uids)).length)
        // 去除已完成的uid
        // 切割uid 分布写入
        let fin = await AllGirlModel.find({}, { realUid: 1, _id: 0 })
        let finArr = []
        for (let K in fin) {
          // console.log(fin[K]['realUid'])
          finArr.push(fin[K]['realUid'])
        }
        console.log('finArr.length:', finArr.length)
        res.send({
          status: 200,
          message: `重复表数据总数：${uids.length},去重表已存条数：${finArr.length}`
        })
        const uidArr = this.difference(uids, finArr); // 取出任务剩余的UID  继续进行 **bingo**
        console.log('uidArr.length', uidArr.length)
        // 2.distinct 然后find 再insert
        //console.log(uids)
        // return
        for (let key in uidArr) {
          (function (key) {
            // console.log(key)
            setTimeout(() => {
              GirlModel.find({ realUid: uids[key] }, function (err, data) {
                // 一级赋值结构有问题  需要详细结构
                const { realUid, area, nickname, sex, marriage, height, education, work_location, age, image, randListTag, userIcon, shortnote, matchCondition, helloUrl, top, hidden } = data[0]
                new AllGirlModel({ realUid, area, nickname, sex, marriage, height, education, work_location, age, image, randListTag, userIcon, shortnote, matchCondition, helloUrl, top, hidden }).save(function (err, data) {
                  if (err) {
                    // FIXME: 诡异数据库 catch err  需要重启server  否则uid数会出错
                    console.log('create', err)
                  } else {
                    console.log(data, 'success:')
                  }
                })
              })
            }, key * 30 + 200) // FIXME: 服务器压力值
          })(key)
        }
        // 3. 单表上的操作：利用distinct 出不重复的uid 然后全部UID数组去除Set() 在find&&remove
        // 4. 通过数据库表的导出重复表  建立唯一索引 再导入表  去重
      } catch (err) {
        res.send({
          status: 400,
          message: `去重失败,失败原因:${err}`
        })
      }
    })
  }

  /** WARRING: v0.1 去重方法  已废弃
   * 导出UID,生成UID表
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async exportRealUid(req, res, next) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      if (req.session.role !== 2) {
        res.send({
          status: 100,
          message: '对不起，你没有权限操作~'
        })
        return
      }
      try {
        // 可从总表distict
        let realUids = await AllGirlModel.find({}, { realUid: 1, _id: 0 }) // 映射realUiD 1=Y 0=N (_id 默认也映射) 只导出realUid
        // 重新排序 升序
        await realUids.sort(function (a, b) {
          return a['realUid'] - b['realUid']
        })
        // TODO: 不重复写入
        // return
        await uidModel.remove({}) // 清空
        await uidModel.insertMany(realUids) // 重写
        res.send({
          status: 200,
          message: '成功导出realUid到uids表中',
          data: {
            'length': realUids.length // FIXME:不传给前台
          }
        })
      } catch (err) {
        res.send({
          status: 400,
          message: `导出失败,失败原因:${err}`
        })
      }
    })
  }

}

export default new Spider()