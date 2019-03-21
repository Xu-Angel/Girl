import mongoose from 'mongoose'
import config from 'config-lite'
import chalk from 'chalk'

mongoose.connect(config.url, {
  useCreateIndex: true,
  useNewUrlParser: true
})

mongoose.Promise = global.Promise // 使用Node的Promise  接管

const db = mongoose.connection  // 全局链接 
// createConnection  具名链接

db.once('open', () => {
  console.log(
    chalk.green('连接数据库成功')
  )
})

db.on('error', function (error) {
  console.error(
    chalk.red('Error in MongoDb connection: ' + error)
  )
  mongoose.disconnect()
})

db.on('close', function () {
  console.log(
    chalk.red('数据库断开，重新连接数据库')
  )
  mongoose.connect(config.url, {
    server: { auto_reconnect: true },
    useCreateIndex: true,
    useNewUrlParser: true
  })
})

export default db