import Base from './basePrototype'
import formidable from 'formidable'
import reqLogsScheam from '../model/reqlogs'
class Log extends Base {
  constructor() {
    super()
  }

  async getVisit(req, res, next) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      try {
        const { page, pageSize, ...params } = fields
        for (let key in params) {
          const v = params[key]
          if (v === '' || v === undefined || v === 'undefind') {
            delete params[key]
          }
        }
        try {
          if (!page) {
            throw new Error('页码参数错误')
          } else if (!pageSize) {
            throw new Error('分页大小参数错误')
          }
        } catch (err) {
          res.send({
            status: 400,
            message: err.message,
          })
          return
        }
        const total = await reqLogsScheam.count({ ...params })
        let items = null
        if (total < 10) {
          items = await reqLogsScheam.find({ ...params }).sort({ "_id": -1 })
        } else {
          items = await reqLogsScheam.find({ ...params }).skip((page - 1) * pageSize).limit(pageSize).sort({ "_id": -1 })
        }
        res.send({
          status: 200,
          data: {
            items: items,
            total
          }
        })
      } catch (error) {
        res.send({
          status: 400,
          message: `获取失败,失败原因:${err}`
        })
      }
    })
  }

  async delReq(req, res, next) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      const { _id } = fields
      reqLogsScheam.findOneAndDelete({ _id }).exec()
      res.send({
        status: 200,
        message: `删除成功~`
      })
    })
  }
}

export default new Log()