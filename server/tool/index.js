import fs from 'fs'
import request from 'request'

const Tool = {
  /**
   * 根据UA返回来浏览器信息
   * @param {*} ua
   */
  getBrowserInfo(ua) {
    let Sys = {}
    ua = ua.toLowerCase()
    let re = /(msie|firefox|chrome|opera|version).*?([\d.]+)/
    let m = ua.match(re)
    Sys.browser = m[1].replace(/version/, "'safari")
    Sys.ver = m[2]
    return Sys.browser + "的版本是：" + Sys.ver
  },
  /**
   * 判断文件夹是否存在 并创建
   * @param {*} pathStr
   */
  confirmPath(pathStr) {
    if (!fs.existsSync(pathStr)) {
      fs.mkdirSync(pathStr)
      console.log("createPath: " + pathStr)
    }
  },
  /**
   * 获取外网client的IP
   * @param {request} req
   */
  getClientIp(req) {
    return (req.ip || req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress || '').match(/\d+.\d+.\d+.\d+/)
  },
  /**
   * 根据IP返回信息
   * @param {*} ip 
   */
  getRegion(ip) {
    return new Promise((resolve, reject) => {
      request({
        url: ` http://apis.juhe.cn/ip/ipNew?ip=${ip}&key=d8f5585d01ff69ea22e468d8ccbafbed`,
      }, (err, res, body) => {
          if (res) {
            resolve(body.replace(/^"/, '').replace(/"$/, ''))
          }
          if (err) {
            reject(err)
          }
      })
    })
  }
}

export default Tool 