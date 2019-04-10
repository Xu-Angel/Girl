const request = require('request')
const fs = require('fs')
const path = require('path')
// import { userAgents } from '../config'
// const userAgents = require('../config')

// let userAgent = userAgents[parseInt(Math.random() * userAgents.length)]



/**
 * 获取国外IP池
 */
module.exports =  function test() {
  return new Promise((resolve, reject) => {
    const url = `https://raw.githubusercontent.com/fate0/proxylist/master/proxy.list`
    request({
      url,
      method: "GET",
      headers: { 'User-Agent':  'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12' },
    }, async function (error, response, body) {
      const reg = new RegExp(`},
      ]}`, 'm')
      const data = `{"data":[${unescape(body.replace(/\\/g, '').replace(/}/g, '},'))}]}`.trim().replace(reg, `}
    ]}`)
        fs.writeFileSync(path.resolve(__dirname, '../../db/ipPool.json'), data)
        resolve(data)
    });
  })
}