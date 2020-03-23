import detailModel from '../model/details'
import Base from './basePrototype'
import allGirlModel from '../model/allgirls'
import AdminModel from "../model/admins"
import ipPoolModel from '../model/ippools'
import formidable from 'formidable'
import { stc } from "../core/config"


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
  async getLine(req, res, next) {
    try {
      // const dat = await allGirlModel.find({ createTime: /2019\-04\-01/g }) // 列表女性条数
      // const dat = await allGirlModel.count({ createTime: { $gt: '2019-04-01', $lt: '2019-04-02' } }) // 列表女性条数
      /* 
      统计出人数对象{date, count,}
      86400 000
      new Date('2019-04-01').getTime()
      new Date('2020-01-03').getTime()
      */
      const Province = Object.keys(stc)
      const provicePeople = []
      for (const val of Province) {
        const people = await allGirlModel.count({ area: val })
        provicePeople.push({province: val, count: people})
      }
      const dayMil = 86400000
      const startDayMil = new Date('2019-04-01').getTime()
      const dayCount = (new Date('2020-01-03').getTime() - new Date('2019-04-01').getTime()) / dayMil
      const LineArr = []
      for (let i = 0; i < dayCount; i++) {
        const curDay = startDayMil + i * dayMil
        const curDayCount = await allGirlModel.count({ createTime: { $gt: startDayMil + i * dayMil, $lt: startDayMil + (i+1)*dayMil } })
        LineArr.push({date: new Date(curDay).toLocaleDateString(), count: curDayCount})
      }
      console.log(LineArr)
      res.send({
        status: 200,
        data: {
          LineCount: LineArr,
          stc: Province,
          provicePeopleCount: provicePeople
        }
      })
    } catch (error) {
      res.send({
        status: 400,
        message: `获取失败,失败原因:${error}`
      })
    }
  }
}

export default new Common()