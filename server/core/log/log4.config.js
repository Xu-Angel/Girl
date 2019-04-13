import log4js from 'log4js'
import path from 'path'
import Tool from '../../tool/index'
const basePath = path.resolve(__dirname, "../../logs")
const errorPath = basePath + "/error/"
const resPath = basePath + "/response/"

const errorFilename = errorPath + "/error"
const resFilename = resPath + "/response"

log4js.configure({
  appenders: {
    errorLog: {
      type: "dateFile", //日志类型
      filename: errorFilename, //日志输出位置
      alwaysIncludePattern: true, //是否总是有后缀名
      pattern: "yyyy-MM-dd-hh.log" //后缀，每小时创建一个新的日志文件
      // pattern: "yyyy-MM-dd.log" //后缀，每天创建一个新的日志文件
    },
    responseLog: {
      type: "dateFile",
      filename: resFilename,
      alwaysIncludePattern: true,
      pattern: "yyyy-MM-dd-hh.log"
    },
    // replaceConsole: true//把console输出的内容也写入log文件
  },
  categories: {
    errorLog: { appenders: ['errorLog'], level: 'error' },
    responseLog: { appenders: ["responseLog"], level: "info" },
    default: { appenders: ['responseLog','errorLog',], level: 'trace' }
  },
  // pm2: true,
  // pm2InstanceVar: 'INSTANCE_ID',
  disableClustering: true
})
//创建log的根目录'logs'
if (basePath) {
  Tool.confirmPath(basePath)
  //根据不同的logType创建不同的文件目录
  Tool.confirmPath(errorPath)
  Tool.confirmPath(resPath)
}

export default log4js