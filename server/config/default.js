module.exports = {
  port: parseInt(process.env.PORT, 10) || 8088,
  // mongoose.connect('mongodb://username:password@host:port/database?options...');
  // url: 'mongodb://127.0.0.1:27017/girldatabase',
  url: 'mongodb://127.0.0.1:27017/girldatabasev1-1',
  session: {   // => *1000 /1000 express-session
    name: 'SID',
    secret: 'SID',
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 5 * 60 * 60 * 1000,  // 5hours -> millisecondes
    }
  },
  token: 'Girl',
  ipKey: 'FXSBZ-K2OHQ-PUQ57-GOWXM-ZM62Q-27FHP' // 请替换为自己的腾讯位置服务开发密匙https://lbs.qq.com/console/mykey.html?console=mykey
}