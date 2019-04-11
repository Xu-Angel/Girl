import fs from 'fs'
import path from 'path'
import moment from 'moment'
import reqLogsScheam from '../../model/reqlogs'

function getBrowserInfo(ua) {
  let Sys = {}
  ua = ua.toLowerCase()
  let re = /(msie|firefox|chrome|opera|version).*?([\d.]+)/
  let m = ua.match(re)
  Sys.browser = m[1].replace(/version/, "'safari")
  Sys.ver = m[2]
  return Sys.browser + "的版本是：" + Sys.ver
}

export function LogReq(req) {
  const time = moment().format('YYYY-MM-DD HH:mm:ss')
  const origin = req.headers.origin
  const ua = getBrowserInfo(req.headers['user-agent'])
  const referer = req.headers.referer
  const host = req.headers.host
  const url = req.url
  fs.appendFile(path.resolve(__dirname, '../../logs/req.log'), `\r\n时间:'${time}'----请求的origin:'${origin}'----请求的浏览器:'${ua}'----请求的referer:'${referer}'----请求的主机:'${host}'----请求URL:'${url}'`, function (error) {
    if (error) {
      console.log('追加文件失败' + error.message)
    } else {
      new reqLogsScheam({
        time,
        origin,
        ua,
        host,
        referer,
        url
      }).save(function (err, data) {})
    }
  })
}