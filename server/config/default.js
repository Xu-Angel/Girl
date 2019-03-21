module.exports = {
  port: parseInt(process.env.PORT, 10) || 8088,
  url: 'mongodb://127.0.0.1:27017/Girls',
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