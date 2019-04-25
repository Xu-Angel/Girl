import AllGirlModel from '../../model/allgirls'
import DetailModel from '../../model/details'
import moment from 'moment'
const async = require('async')
/*
权重计算 top:
+0 -> +5
age: 18-25 25-30 30-35 35-   // 有五分
shortnote: 20字
详细页的照片 每一张 + 2
*/

const m = ['丧偶', '离异', '未婚']
/**
 * way1-main:兼容 V1.1.0以及之前的数据，以前没做权重
 * 给每条数据进行权重计算
*/
export async function setTop() {
  let numArr = []
  const len = await AllGirlModel.count({top: 0})  // 直接根据个数 做查找 减少服务器消耗 
  for (let i = 0; i < len; i++) {
    numArr.push(i)
  }
  async.mapLimit(numArr, 1, async function (num, cb) { // 控制一个请求 防止重复查找，而不是根绝UID 来做并发 20W数据下此方式好点，不是必要实时数据 类background模式
    const girl = await AllGirlModel.findOne({ top: 0 })
    const realUid = girl['realUid']
    let top = 0
    top += m.findIndex(e => e === girl['marriage']) * 5 // 婚姻
    top += parseInt((10 / girl['age']) * 50)// 年龄
    if (girl['shortnote'] > 20) top += 5 //简介大于20字符长度 +5分
    if (girl.status) { // 有详情
      const detail = await DetailModel.find({ realUid })
      top += detail[0]['照片']['small'].length * 5 // 一张照片 +5分
    }
    await AllGirlModel.findOneAndUpdate({ realUid }, { $set: { top } }).exec()
    console.log(`本条权重数据完成：${realUid}, ${moment().format('YYYY-MM-DD HH:mm:ss')}`)
    cb(null, realUid)
  }, function (err, rs) {
    console.log(`权重设置完成:${moment().format('YYYY-MM-DD HH:mm:ss')}`)
  })
}