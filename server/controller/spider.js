import detailModel from '../model/details'
import spiderModel from '../model/spider'
import Base from './basePrototype'
import uidModel from '../model/uids'
import AllGirlModel from '../model/allgirls'
import formidable from 'formidable'
import getList2Json from '../core/spider/getList2Json'
import getDetail from '../core/spider/getdetail'
import async from 'async'
import { IO } from '../app'

// TODO:WSS
class Spider extends Base {
  constructor() {
    super()
    this.spiDetailByRealUid = this.spiDetailByRealUid.bind(this) // 继承方法 绑定
    this.distinctGirl = this.distinctGirl.bind(this) // 继承方法 绑定
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
      // return
      const { cookie } = fields
      console.log(cookie, 'cookie')
      try {
        let Cur = new Date().getTime()
        // let realUidArr = await uidModel.find({}, { realUid: 1, _id: 0 }) // 映射
        let realUidArr = await uidModel.distinct('realUid') // 映射
        let finUidArr = await detailModel.distinct('realUid')
        await spiderModel.findOneAndUpdate({}, { $set: { cookie } })
        let realUids = null
        console.log(realUidArr, 'realUidArr')
        console.log(finUidArr, 'finUidArr')
        // 临时方法更新旧的列表数据状态
        // for (let key in finUidArr) {
        //   // uidModel.find({realUid:finUidArr[key]})
        //   await AllGirlModel.findOneAndUpdate({ realUid: finUidArr[key] }, { $set: { status: true } })
        // }
        // return
        if (finUidArr.length > 0) {
          realUids = this.difference(realUidArr, finUidArr)
        } else {
          realUids = realUidArr
        }
        let remainLength = realUids.length
        const Length = realUidArr.length
        res.send({
          status: 200,
          message: `爬取详细页任务配置已保存`,
          data: `查询耗时：${(new Date().getTime() - Cur) / 1000},剩余爬取数为${remainLength}`
        })

        //! 建立socket 通信 等待前台启用爬虫任务

        const TASK = function (socket) {
          async.mapLimit(realUids, 2, async function (realUid, cb) {
            let cur = new Date().getTime()
            getDetail(realUid, cookie).then(rs => {

              // 判断当前用户是否是空资料(未审核通过||关闭||隐藏)
              if (rs['学历'] === '' && rs['身高'] === '') {
                remainLength--
                // 异常UID事件
                socket.emit('uidErr', { 'text': `异常-realUid:${realUid},花费时间:${(new Date().getTime() - cur) / 1000}seconds,剩余realUid数量：${remainLength}`, 'percent': ((Length - remainLength) / Length) * 100 })
                // console.log(`异常-realUid:${realUid},花费时间:${(new Date().getTime() - cur) / 1000}seconds,剩余realUid数量：${remainLength}`)
                cb(null, realUid) // 结束本次函数 抛出本次异常realUid
              } else {
                // 判断当前的数据有没有薪资 如果没有，说明cookie过期 需要重新拿TODO:停止爬取任务 发送邮件更新cookie
                if (rs['经济实力']['月薪'] === '登录后可见' || rs['经济实力']['购车'] === '登录后可见') {
                  //cookie错误事件
                  socket.emit('cookieErr', { 'text': `请更新cookie以爬取私密信息,剩余realUid数量：${remainLength}` })
                  cb(null, ' ') // 代表这个函数结束，传递出去
                  throw new Error(`请更新cookie以爬取私密信息,剩余realUid数量：${remainLength}`)
                } else {
                  rs['realUid'] = realUid
                  detailModel.insertMany([rs], function (err, data) {
                    // 更新列表的状态
                    AllGirlModel.findOneAndUpdate({ realUid }, { $set: { status: true, finishTime: new Date() } }).exec()
                    remainLength--
                    // 进度事件
                    socket.emit('rate', { 'text': `end-realUid:${realUid},usedtime:${(new Date().getTime() - cur) / 1000}seconds,remain-realUid-count：${remainLength}`, 'percent': ((Length - remainLength) / Length) * 100 })
                    cb(null, ' ') // 代表这个函数结束，传递出去
                  })
                }
              }
            }).catch(err => {
              console.log(err)
              cb(null, ' ')
            })
          }, (err, data) => {
            console.log(`所有任务完成：${data}`)
          })
        }
        //! 前台连接任务开启 TODO:停止任务
        IO.of('/socket/start/getDetail').on('connect', (socket) => {
          let task = TASK(socket)
        })
      } catch (err) {
        console.log(err)
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
          message: `爬取列表页配置已保存~`
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

  /**
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
        // await uidModel.remove({}) // 清空 v0.1方法已废弃
        await uidModel.insertMany(realUids) // 重写
        res.send({
          status: 200,
          message: '成功导出realUid到uids表中',
          data: {
            'uids': realUids
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