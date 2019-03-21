// 处理girl表
import GirlModel from '../model/girl'
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
          const girl = await GirlModel.find({}).skip(page * pageSize).limit(pageSize).sort({ '_id': -1 })
          const total = await GirlModel.count({})
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
}

export default new Girl()