const request = require('request')
const fs = require('fs')
const path = require('path')
import { userAgents } from '../config'

let userAgent = userAgents[parseInt(Math.random() * userAgents.length)]



/**
 * 获取国外IP池,生成JSON文件
 */
module.exports = function getText() {
  return new Promise((resolve, reject) => {
    const url = `https://raw.githubusercontent.com/fate0/proxylist/master/proxy.list`
    request({
      url,
      method: "GET",
      headers: { 'User-Agent': userAgent },
    }, async function (error, response, body) {
      try {
        if (!error) {
          let tempData = unescape(body.replace(/\\/g, '').replace(/}/g, '},'))
          tempData = tempData.substr(0, tempData.length - 1)
          const data = ('{"data":[' + tempData + ']}').replace(/,]}/, ']}')
          fs.writeFileSync(path.resolve(__dirname, '../../db/ipPool.json'), data)
          resolve()
        }
      } catch (error) {
        reject(error)
      }
    })
  })
}