import fs from 'fs'

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
  }

}



export default Tool 