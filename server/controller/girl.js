// 处理girl表
import GirlModel from '../model/allgirsl'
import uniGirlModel from '../model/unigirls'
import detailModel from '../model/details'
import uidModel from '../model/uids'
import formidable from 'formidable'
import Base from './basePrototype'

class Girl extends Base {
  constructor() {
    super()
    this.getList = this.getList.bind(this)
  }

  async getList(req, res, next) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      console.log(fields);
      if (err) {
        res.send({
          status: 100,
          type: 'FORM_DATA_ERROR',
          message: '表单信息错误'
        })
        return
      }
      const { page, pageSize } = fields
      try {
        if (!page) {
          throw new Error('页码参数错误')
        } else if (!pageSize) {
          throw new Error('分页大小参数错误')
        }
      } catch (err) {
        res.send({
          status: 400,
          type: 'GET_ERROR_PARAM',
          message: err.message,
        })
        return
      }
      try {
        const girl = await uniGirlModel.find({}).skip(page * pageSize).limit(pageSize).sort({ '_id': 1 })
        const total = await uniGirlModel.count({})
        res.send({
          status: 200,
          data: {
            items: girl,
            total
          }
        })
      } catch (err) {
        res.send({
          status: 400,
          message: `查询失败,失败原因:${err}`
        })
      }
    })
  }

  async getDetail(req, res, next) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      console.log(fields);
      if (err) {
        res.send({
          status: 100,
          type: 'FORM_DATA_ERROR',
          message: '表单信息错误'
        })
        return
      }
      const { uid } = fields
      try {
        if (!uid) {
          throw new Error('参数错误')
        }
      } catch (err) {
        res.send({
          status: 400,
          type: 'GET_ERROR_PARAM',
          message: err.message,
        })
        return
      }
      try {
        const girl = await detailModel.findOne({ uid })
        girl['照片'].small = girl['照片'].samll
        delete girl['照片'].samll
        res.send({
          status: 200,
          data: {
            detail: girl
          }
        })
      } catch (err) {
        res.send({
          status: 400,
          message: `查询失败,失败原因:${err}`
        })
      }
    })
  }

  // 手动路由方法
  async distinct(req, res, next) {
    try {
      console.log('接到请求')
      //let girl = await GirlModel.find({}) // 1. 整表取
      let uids = await GirlModel.distinct('realUid')
      console.log('uids.length:',uids.length)
      // 去除已完成的uid
      // 切割uid 分布写入
      let fin = await uniGirlModel.find({}, { realUid: 1, _id: 0 })
      let finArr = []
      for (let K in fin) {
        // console.log(fin[K]['realUid'])
        finArr.push(fin[K]['realUid'])
      }
      console.log('finArr.length:', finArr.length)
      const difference = (a, b) => {
        const s = new Set(b)
        return a.filter(v => !s.has(v))
      }
      const uidArr = difference(uids,finArr); // [3]
      // console.log('uidArr.length',uidArr.length)
      // 2.distinct 然后find 再insert
      //console.log(uids)
      // return
      for (let key in uidArr) {
        (function (key) {
          console.log(key)
          setTimeout(() => {
            GirlModel.find({ realUid: uids[key] }, function (err, data) {
              // console.log(key, 'datastart', data, 'dataend')
              // console.log('datastart0',data[0],'dataend0')
              // const {
              //   _id,
              //   __v,
              //   ...unidata,
              // } = data[0]
              // console.log('unidatastart',unidata, 'unidataend')

              // console.log(unidata['_doc'], 'unidata[_doc]')
              // 一级赋值结构有问题  需要详细结构
              const { realUid, area, nickname, sex, marriage, height, education, work_location, age, image, randListTag, userIcon, shortnote, matchCondition, helloUrl, top, hidden } = data[0]
              new uniGirlModel({ realUid, area, nickname, sex, marriage, height, education, work_location, age, image, randListTag, userIcon, shortnote, matchCondition, helloUrl, top, hidden }).save(function (err, data) {
                if (err) {
                  console.log('create', err)
                } else {
                  // console.log(data, 'success:')
                }
              })
            })
          }, key * 30 + 200)
        })(key)
      }
      // 3. 单表上的操作：利用distinct 出不重复的uid 然后全部UID数组去除Set() 在find&&remove
      // girl.forEach((v, i, arr) => {
      //   const real = v.realUid
      //   const _id = v._id
      //   arr.forEach((v, i, arr) => {
      //     if (v.realUid === real && _id !== v._id) {
      //       girl.splice(i, 1)
      //       // console.log(test.splice(i,1), 'splice')
      //     }
      //   })
      // })
      // uniGirlModel.insertMany(girl, function (err, data) {
      //     console.log('去重girls表数据已在unigirls表中')
      //   // GirlModel.remove({}, function (err) {
      //   // });
      // })

      // res.send({
      //   status: 200,
      //   message: '去重girls表成功,girls表清空成功，精数据在unigirls表中',
      //   data: {
      //     items: girl
      //   }
      // })
      // GirlModel.findOne({ realUid: 200715830 }, function (err, data) {
      //   console.log(data)
      // })
    } catch (err) {
      res.send({
        status: 400,
        message: `去重失败,失败原因:${err}`
      })
    }
  }
  // 手动路由方法
  async exportRealUid(req, res, next) {
    try {
      // 可从总表distict
      let realUids = await uniGirlModel.find({}, { realUid: 1, _id: 0 }) // 映射realUiD 1=Y 0=N (_id 默认也映射) 只导出realUid
      // 重新排序 升序
      await realUids.sort(function (a, b) {
        return a['realUid'] - b['realUid']
      })
      // TODO: 不重复写入
      return
      uidModel.insertMany(realUids)
      res.send({
        status: 200,
        message: '成功导出realUid到uids表中',
        data: {
          'uids': realUids
        }
      })
      // GirlModel.findOne({ realUid: 200715830 }, function (err, data) {
      //   console.log(data)
      // })
    } catch (err) {
      res.send({
        status: 400,
        message: `导出失败,失败原因:${err}`
      })
    }
  }
}

export default new Girl()