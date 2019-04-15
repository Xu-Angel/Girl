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
import task from './core/schedule/index'
import { LogReq } from './core/log/index'
import log4 from './core/log/log4'
import path from 'path'
import serveStatic from 'serve-static'
const app = express()
app.set('trust proxy', 'loopback') // 获取外网IP
app.all('*', async (req, res, next) => {
  const start = new Date()
  let ms
  if (!['localhost:8088', 'girl.xutianshi.top', 'localhost:9529'].includes(req.headers.host)) {
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
      LogReq(req)
      try {
        await next()
        ms = new Date() - start
        log4.i(req, ms)
      } catch (error) {
        log4.e(req, error, ms)
      }
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
app.use(serveStatic(path.resolve(__dirname, './public')))   // 静态根目录
app.use('/logs', serveStatic(path.resolve(__dirname, './logs')))  // 日志文件夹

const server = http.createServer(app)
const io = IO(server)
socket(io)


server.listen(config.port, () => {
  console.log(
    chalk.green(`成功监听端口：${config.port}`)
  )
})

task()