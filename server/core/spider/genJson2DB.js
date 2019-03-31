const stc = require('./area')
const path = require('path')
import GirlModel from '../../model/allgirls'

export function genAll2DB(config = {}) {
  let N = 0
  for (var key in stc) {
    // console.log(key, 'stc-:', stc[key])
    (function (key, NN) {
      setTimeout(() => {
        console.log(`地区${key}任务已经开始`)
        // 执行任务
        let n = 1
        let t = 1000 * 0.3 // 0.3s 压力极限？ 3*25 docs avg: 855b * 25 * 3 ~~ 62kb/s =>
        let timer = setInterval(() => {
          pushOne(key, n)
          n++
          if (n === 501) {
            console.log(`地区${key}任务已经结束`)
            clearInterval(timer)
          }
        }, t)
      }, NN);
    })(key, N)
    N = N + 1000 * 60 * 3 // 3mins  跑一个地区
    console.log(key, N)
  }
}

export function pushOne(area, I = 1) {
  return new Promise((resolve, reject) => {
    try {
      const json = require(path.resolve(__dirname, `../../db/json/${area}/${I}.json`))
      json.userInfo.forEach(async (v, i) => {
        await new GirlModel({ ...v, area }).save(function (err, data) {
          if (err) { console.log(err) } else {
            console.log(`地区 ${area} 第 ${I} 页 第 ${i} 条 写入数据库完成`)
          }
        })
      })
      resolve()
    } catch (error) {
      console.log(`数据库写入${area}/${I}.json-时候发生错误：${error}`)
    }
  })
}