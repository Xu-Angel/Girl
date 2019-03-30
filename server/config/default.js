module.exports = {
  port: parseInt(process.env.PORT, 10) || 8088,
  // mongoose.connect('mongodb://username:password@host:port/database?options...');
  // url: 'mongodb://root:password123@127.0.0.1:27017/Girls?authSource=admin',
  // url: 'mongodb://root:password123@123.207.72.208:27017/girldatabase?authSource=admin',
  url: 'mongodb://127.0.0.1:27017/girldatabase',
  // url: 'mongodb://root:password123@123.207.72.208:27017/girldatabasev1?authSource=admin',
  session: {
    name: 'SID',
    secret: 'SID',
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 365 * 24 * 60 * 60 * 1000,
    }
  },
  token: 'Girl'
}