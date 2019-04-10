import express from 'express'
import router from './routes/index.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import connectMongo from 'connect-mongo'
import config from 'config-lite' // 1.V 版本调用方式
import chalk from 'chalk'
import history from 'connect-history-api-fallback'
import http from 'http'
import mongoose from 'mongoose'
import { default as IO } from 'socket.io'
import socket from './socket/index'
import db from './mongodb/db.js' // 链接数据库
import fs from 'fs'
const app = express()

app.all('*', (req, res, next) => {
  //追加方法
fs.appendFile("./json.txt",'\r\n' + req.url , function(error)  {
  if (error)
  console.log('追加文件失败' + error.message)
  else
  console.log('追加成功：' + req.url)
  });
  if (!['localhost:8088', 'girl.xutianshi.top','localhost:9529'].includes(req.headers.host)) {
    res.send(`${req.headers.host}在${new Date()}访问，已被拦截,总有刁民想害朕，锦衣卫护驾`)
  } else { // 跨域处理
    const { origin, Origin, referer, Referer } = req.headers
    const allowOrigin = origin || Origin || referer || Referer || '*'
    res.header("Access-Control-Allow-Origin", allowOrigin)
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    res.header("Access-Control-Allow-Credentials", true) //可以带cookies
    res.header("X-Powered-By", 'Express')
    // res.header("X-Token", config.token)
    if (req.method == 'OPTIONS') {
      res.sendStatus(200)
    } else {
      next()
    }
  }
})

const MongoStore = connectMongo(session) // 持久化session 到数据库

app.use(cookieParser())
app.use(session({ // 使用session
  name: config.session.name,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  cookie: config.session.cookie,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}))
router(app)

app.use(history())
app.use(express.static('./public'))

const server = http.createServer(app)
const io = IO(server)
socket(io)


server.listen(config.port, () => {
  console.log(
    chalk.green(`成功监听端口：${config.port}`)
  )
})