import fs from 'fs'
import path from 'path'
import moment from 'moment'
import reqLogsScheam from '../../model/reqlogs'
import Tool from '../../tool/index'
export function LogReq(req) {
  const time = moment().format('YYYY-MM-DD HH:mm:ss')
  const origin = req.headers.origin
  const ua = Tool.getBrowserInfo(req.headers['user-agent'])
  const referer = req.headers.referer
  const host = req.headers.host
  const ip = Tool.getClientIp(req)
  const url = req.url

  Tool.confirmPath(path.resolve(__dirname, `../../logs/req`))
  fs.appendFile(path.resolve(__dirname, `../../logs/req/req-${moment().format('YYYY-MM-DD-HH')}.log`), `\r\n时间:'${time}'----请求的origin:'${origin}'----请求的浏览器:'${ua}'----请求的referer:'${referer}'----请求的IP:'${ip}'----请求的主机:'${host}'----请求URL:'${url}'`, function (error) {
    if (error) {
      console.log('追加文件失败' + error.message)
    } else {
      new reqLogsScheam({
        time,
        origin,
        ua,
        host,
        referer,
        url,
        ip
      }).save(function (err, data) {})
    }
  })
}