import AllGirlModel from '../../model/allgirls'
import DetailModel from '../../model/details'
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
 * 给每条数据进行权重计算
*/
export async function setTop() {
  const girls = await AllGirlModel.find({top: 0})
  let numArr = []
  const len = girls.length
  for (let i = 0; i < len; i++) {
    numArr.push(i)
  }
  async.mapLimit(numArr, 100, async function (num, cb) {
    const girl = girls[num]
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
    cb(null, realUid)
  }, function (err, rs) {
    console.log(`本次设置权重的的realUid：\n${rs}`, '权重设置完成')
  })
}