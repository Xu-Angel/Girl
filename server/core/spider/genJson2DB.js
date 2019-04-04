import { stc } from '../config'
import GirlModel from '../../model/allgirls'
const path = require('path')
const fs = require('fs')
let G = global
/**
 * 将全部文件存入数据库
 * @param {*} config 
 */
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

/**
 * 将单个JSON文件存入数据库
 * @param {*} area 
 * @param {*} I 
 */
export function pushOne(area, I = 1, endPage) {
  return new Promise(async (resolve, reject) => {
    try {
      const json = require(path.resolve(__dirname, `../../db/json/${area}/${I}.json`))
      await json.userInfo.forEach(async (v, i) => {
        await new GirlModel({ ...v, area, createTime: new Date() }).save(function (err, data) {
          if (err) {
            console.log(err)
            G.ListStatuspageErr = { 'text': `传送时间:${new Date()}--数据库写入${area}/${I}.json的第${i}条数据-时候发生错误：${err}` }
          } else {
            // 进度事件
            G.ListStatusRate = { 'text': `传送时间:${new Date()}--地区 ${area} 第 ${I} 页 第 ${i} 条 写入数据库完成`, 'percent': (I / endPage) * 100 }
            console.log(`地区 ${area} 第 ${I} 页 第 ${i} 条 写入数据库完成`)
          }
        })
      })
      // await fs.unlinkSync(path.resolve(__dirname, `../../db/json/${area}/${I}.json`))
      // console.log(`地区 ${area} 第 ${I} 页 JSON文件已删除`)
      resolve()
    } catch (error) {
      console.log(`数据库写入${area}/${I}.json-时候发生错误：${error}`)
      // 错误事件
      G.ListStatuspageErr = { 'text': `传送时间:${new Date()}--数据库写入${area}/${I}.json-时候发生错误：${error}` }
      fs.renameSync(path.resolve(__dirname, `../../db/json/${area}/${I}.json`), path.resolve(__dirname, `../../db/json/${area}/problem_${I}.json`))
    }
  })
}