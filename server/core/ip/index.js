const async = require('async')
const getXici = require('./getproxy')
const request = require('request')
import ipSchema from '../../model/ips'

export function spiIp(config) {
  console.log(config, '777');
  return new Promise((resolve, reject) => {
    let pageArr = [] //TODO: 设置爬取页数
    for (let i = config.start; i < config.end + 1; i++) {
      pageArr.push(i)
    }
    console.log('task start')
    async.mapLimit(pageArr, 2, function (pageNum, cb) {
      console.log(pageNum, '14');
      getXici(pageNum).then(rs => {
        console.log(rs)
        // throw new Error('etst')
        ipSchema.insertMany(rs).then((err, data) => {
          console.log(data, err)
          console.log(pageNum, 'pageNum')
          cb(null, '')
        })
      }).catch(err => {
        reject(err)
      })
    }, function (err, rs) {
      console.log(rs, 'fianl')
    })
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
          reject(error)
        }
        console.log(response);
        if (!error) {
          if (response.statusCode == 200) {
            resolve(1)
          } else {
            resolve(0)
          }
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}