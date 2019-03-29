// 处理girl表
import detailModel from '../model/details'
import spiderModel from '../model/spider'
import Base from './basePrototype'
import uidModel from '../model/uids'
import uniGirlModel from '../model/unigirls'
import config from 'config-lite'
import AdminModel from "../model/admins"

class Common extends Base {
  constructor() {
    super()
  }
  async getCounts(req, res, next) {
    try {
      let girlCount = await uniGirlModel.count()
      let finishedCount = await detailModel.count()
      let userCount = await AdminModel.count()
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