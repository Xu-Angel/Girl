const request = require('request')
const userAgents = require('./userAgents')
const fs = require('fs')
const path = require('path')
const stc = require('./area')
import { pushOne } from './genJson2DB'
let N = 0
export default function (config = {}) {
  return new Promise((reolve, reject) => {
    for (var key in stc) {
      // 根据area  进行任务分发 匹配stc
      if (config.area.includes(key) ) {
        // 判断当前地区文件夹是否创建
        // 4:50.0,28:0 硕士
        // 4:60.0,28:0 博士
        // 4:40.0,28:0 双学士
        // 4:30.0,28:0 本科
        // 4:20.0,28:0 大专
        // 4:10.0,28:0 高中中专及以下
        // 6:1 未婚
        // 6:2 离异
        // 6:3 丧偶
        if (config.education) {
          config.education = `4:${config.education}.0,28:0,`
        }
        if (config.marriage) {
          config.marriage = `6:${config.marriage},`
        }
        
        if (!fs.existsSync(path.resolve(__dirname, `../../db/json/${key}`))) {
          fs.mkdirSync(path.resolve(__dirname, `../../db/json/${key}`))
        }
        (function (stc, key, NN) {
          setTimeout(() => {
            console.log(`地区${key}任务已经开始`)
            // 执行任务
            // TODO:IP代理随机
            let userAgent = userAgents[parseInt(Math.random() * userAgents.length)]
            let n = config.startPage
            let t = 1000 * config.speed
            let timer = setInterval(() => {
              getJsonP(n, stc, userAgent, key)
              n++
              if (n === config.endPage + 1) {
                console.log(`地区${key}任务已经结束`)
                clearInterval(timer)
              }
            }, t)
          }, NN);
        })(stc[key], key, N)
        N = N + 1000 * config.endPage * (config.speed + 0.2) // 跑一个地区时间
        console.log(key, N)
      }

    }
    // 



    function getJsonP(n, stc, userAgent, key) {
      return request({
        url: 'http://search.jiayuan.com/v2/search_v2.php',
        method: 'POST',
        headers: {
          'User-Agent': userAgent
        },
        // 2:24.25  年龄24-25
        // 28:1 高级白领
        formData: {
          'sex': 'f',
          'key': '',
          'stc': `${stc},23:1,${config.education}${config.marriage}`,
          'sn': 'default',
          'sv': 1,
          'p': n,
          'f': 'select',
          'listStyle': 'bigPhoto',
          'pri_uid': 0,
          'jsversion': 'v5'
        }
      }, async function (err, res, body) {
        try {
          fs.writeFileSync(path.resolve(__dirname, `../../db/json/${key}/${n}.json`), unescape(body.replace(/\\u/g, '%u').replace(/##jiayser##\/\/$/g, '').replace(/\\/g, '').replace(/^##jiayser##/, '').replace(/゛/g, '').replace(//g, '').replace(/color="red"/g, '')))
          console.log(`地区-${key}-页码-${n}已经转成JSON文件`)
          // 写入数据库
          await pushOne(key, n)
        } catch (error) {
          console.log(`爬取列表页的时候发生错误:${error}`)
        }
      })
    }
    reolve()
  })
}