import detailModel from '../model/details'
import Base from './basePrototype'
import allGirlModel from '../model/allgirls'
import AdminModel from "../model/admins"
import ipPoolModel from '../model/ippools'
import formidable from 'formidable'
import { stc } from "../core/config"
const fs = require('fs')
const path = require('path')
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
     

      const m = ['丧偶', '离异', '未婚']
      const marriagePeo = []
      for (const val of m) {
        const people = await allGirlModel.count({ marriage: val })
        marriagePeo.push({marriage: val, count: people})
      }
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
  /**
   * 获取混应状况
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async getMarriage(req, res, next) {
    try {
      const m = ['丧偶', '离异', '未婚']
      const marriagePeo = []
      for (const val of m) {
        const people = await allGirlModel.count({ marriage: val })
        marriagePeo.push({marriage: val, count: people})
      }
      res.send({
        status: 200,
        data: {
          marriagePeo
        }
      })
    } catch (error) {
      res.send({
        status: 400,
        message: `获取失败,失败原因:${error}`
      })
    }
  }

  async getWords(req, res, next) {
    try {
      console.log('o');
      // const data = await allGirlModel.find({}, { shortnote: 1, _id: 0 }).skip(10000).limit(5000)
      // let str = ''
      // data.forEach(v => {
      //   str+=v.shortnote
      // })
      // 运行时 路径不同 最好补全
      const words = fs.readFileSync(path.join(__dirname, './words.txt'), {encoding: 'utf-8'})
      const ar = JSON.parse(words)
      ar.sort((a, b) => { return (a.count - b.count) })
      const map = ar.filter(v => (!/[。。，、！！；]/.test(v)))
      res.send({
        data: {
          // str: str.replace(/[\/&;…a-zA-Z#"\[\]]|\s+|\.{2,}|。{2,}/g, ''),
          ar: map
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