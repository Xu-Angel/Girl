import detailModel from '../model/details'
import Base from './basePrototype'
import allGirlModel from '../model/allgirls'
import AdminModel from "../model/admins"
import formidable from 'formidable'
class Common extends Base {
  constructor() {
    super()
  }
  /**
   * 获取统计数
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async getCounts(req, res, next) {
    try {
      const girlCount = await allGirlModel.count() // 列表女性条数
      const finishedCount = await detailModel.count() // 女性详情完成条数
      const userCount = await AdminModel.count() // 用户数
      res.send({
        status: 200,
        data: {
          girlCount,
          finishedCount,
          userCount
        }
      })
    } catch (error) {
      res.send({
        status: 400,
        message: `获取失败,失败原因:${err}`
      })
    }
  }
}

export default new Common()