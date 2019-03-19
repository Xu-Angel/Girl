const cheerio = require('cheerio')
const request = require('request')
const mongoose = require('mongoose')
const async = require('async')
const Schema = mongoose.Schema
const db = mongoose.createConnection('mongodb://127.0.0.1:27017/ipTable', { useNewUrlParser: true })
const getXici = require('./getproxy')
// 暂时是随机爬一页的IP 下来存入数据库
const ipSchema = new Schema({
  ori: String,
  iplist: Array,
  create_time: { type: Date, default: Date.now },
})
const ipTable = db.model('iptable', ipSchema)
let data = null
const deepFlatten = arr => [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v) : v))
// ipTable.find({ _id: '5c90895d068a8347c077cd1f' }).then(rs => {
//   console.log(rs[0].iplist);
//   data = [...new Set(deepFlatten(rs[0].iplist))]
//   ipTable.updateOne({ _id: '5c90895d068a8347c077cd1f' }, { iplist: data }).then(rs => {
//     console.log(rs[0].iplist);
//   })
// })

// 开启爬虫['', '',]
const pageNum = parseInt(1 + Math.random() * 10)
const pageArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// request({
//   // url: 'http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js',
//   url: 'http://xutianshi.top',
//   headers: {
//     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
//   },
//   proxy: 'http://210.5.10.87:53281/'
// }, (error, response, body) => {
//     console.log(body, error, response);
// })

async.mapLimit(pageArr, 3, function (pageNum, cb) {
  getXici(pageNum).then(rs => {
    console.log(pageNum, 'pageNum');
    cb(null, rs)
  })
}, function (err, rs) {
    if (rs.length > 0) {
    console.log('final');
    const deepFlatten = arr => [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v) : v))
    rs = [...new Set(deepFlatten(rs))]
    new ipTable({ ori: 'kaixindaili', iplist: rs }).save().then((err, data) => {
      console.log(data, err);
    })
  }
})