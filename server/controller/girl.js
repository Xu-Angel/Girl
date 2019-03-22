// 处理girl表
import GirlModel from '../model/girl'
import uniGirlModel from '../model/uniGirl'
import formidable from 'formidable'
import Base from './basePrototype'

class Girl extends Base {
  constructor() {
    super()
    this.getList = this.getList.bind(this)
  }

  async getList(req, res, next) {
    const form = new formidable.IncomingForm();
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
        const girl = await uniGirlModel.find({}).skip(page * pageSize).limit(pageSize).sort({ '_id': -1 })
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

  async distinct(req, res, next) {
    try {
      let girl = await GirlModel.find({})
      girl.forEach((v, i, arr) => {
        const real = v.realUid
        const _id = v._id
          arr.forEach((v, i, arr) => {
            if (v.realUid === real && _id !== v._id) {
              girl.splice(i,1)
              // console.log(test.splice(i,1), 'splice')
            }
          })
      })
      uniGirlModel.insertMany(girl, function (err, data) {
        GirlModel.remove({ }, function (err) {
          if (err) return handleError(err)
          console.log('去重girls表成功,girls表清空成功，精数据在unigirls表中')
        });
      })
      res.send({
        status: 200,
        message: '去重girls表成功,girls表清空成功，精数据在unigirls表中',
        data: {
          items: girl
        }
      })
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
}

export default new Girl()