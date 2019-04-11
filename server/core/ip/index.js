const async = require('async')
const getXici = require('./getproxy')
const getText = require('./getIpPool')
const request = require('request')
const path = require('path')
import ipSchema from '../../model/ips'
import ippoolSchema from '../../model/ippools'
let G = global

/**
 * 爬取西刺代理的IP v1.0版本
 * @param {Object} config 
 */
export function spiIp(config) {
  return new Promise((resolve, reject) => {
    let pageArr = []
    for (let i = config.start; i < config.end + 1; i++) {
      pageArr.push(i)
    }
    async.mapLimit(pageArr, 2, function (pageNum, cb) {
      getXici(pageNum).then(rs => {
        ipSchema.insertMany(rs).then((err, data) => {
          cb(null, '')
        })
      }).catch(err => {
        reject(err)
      })
    }, function (err, rs) {
      console.log(rs, '所有任务完成')
    })
    resolve()
  })

}

/**
 * 爬取代理池IP入库
 */
export async function getIpPool() {
  return new Promise(async (resolve, reject) => {
    try {
      await getText()
      const json = require(path.resolve(__dirname, `../../db/ipPool.json`))
      const data = json.data
      let numArr = []
      const len = data.length
      for (let i = 0; i < len; i++) {
        numArr.push(i)
      }
      async.mapLimit(numArr, 50, function (num, cb) {
        const tempData = data[num]
        const ip = tempData['type'] + '://' + tempData['host'] + ':' + tempData['port'] + '/'
        // 入库筛选 检测当前IP有效性
        check(ip).then(async (rs) => {
          if (rs.code === 1) {
            await new ippoolSchema({ ...tempData, createTime: new Date() }).save((err, data) => {
              if (err) {
                G.IpStatusIpErr = { 'text': `入库的时候发生错误:${err}` }
              } else {
                G.IpStatusRate = { 'text': `第${num}条IP-${ip}成功入库`, 'percent': (num / len) * 100 }
              }
            })
          } else if (rs.code === 2) {
            // IP 无效
            G.IpStatusIpErr = { 'text': `无效IP${rs.ip}，已过滤` }
          }
          cb(null, '-')
        }).catch(err => {
          cb(null, '|')
          G.IpStatusIpErr = { 'text': `requrest错误${err.error}，已过滤` }
        })
      }, function (err, rs) {
        console.log(rs, '所有任务完成')
      })
    } catch (error) {
      console.log(error)
    }
    resolve()
  })

}

export function check(ip) {
  return new Promise((resolve, reject) => {
    //尝试请求百度的静态资源公共库中的jquery文件
    const url = "http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"
    try {
      request({
        url,
        proxy: ip,
        method: 'GET',
        timeout: 5000 //5s没有返回则视为代理不行
      }, function (error, response, body) {
        if (error) {
          reject({
            code: 3,
            error
          })
        }
        if (!error) {
          if (response.statusCode == 200) {
            resolve({
              code: 1
            })
          } else {
            resolve(0)
          }
        }
      })
    } catch (error) {
      resolve({
        code: 2,
        ip
      })
    }
  })
}