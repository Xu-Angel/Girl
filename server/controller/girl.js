import AllGirlModel from '../model/allgirls'
import detailModel from '../model/details'
import formidable from 'formidable'
import Base from './basePrototype'

class Girl extends Base {
  constructor() {
    super()
    this.getList = this.getList.bind(this)
  }

  /**
   * 获取女性列表数据
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
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
          type: 'GET_ERROR_PARAM',
          message: err.message,
        })
        return
      }
      try {
        const total = await AllGirlModel.count({ ...params })
        let girl = null
        if (total < 10) { //TODO: 优先展示排序规则  1-最新完成爬取页的在前面 2-没完成的话就根据最新创建时间在前面
          girl = await AllGirlModel.find({ ...params }).sort({ 'finishTime': -1, 'createTime': -1 })
        } else {
          girl = await AllGirlModel.find({ ...params }).skip((page - 1) * pageSize).limit(pageSize).sort({ 'finishTime': -1, 'createTime': -1 })
        }
        res.send({
          status: 200,
          message: `获取数据成功`,
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

  /**
   * 获取女性详情
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async getDetail(req, res, next) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send({
          status: 100,
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
          message: err.message,
        })
        return
      }
      try {
        const girl = await detailModel.findOne({ realUid: uid })
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
}

export default new Girl()