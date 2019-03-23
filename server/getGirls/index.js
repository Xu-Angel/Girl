const request = require('request')
const userAgents = require('./userAgents')
const fs = require('fs')
let userAgent = userAgents[parseInt(Math.random() * userAgents.length)]
let n = 1
let t = 1000 * 10
setInterval(() => {
  getJsonP(n)
  n++
  t = 1000 * 30 * Math.random() * 5
}, t)

function getJsonP(n) {
   return request({
    url: 'http://search.jiayuan.com/v2/search_v2.php',
    method: 'POST',
    headers: { 'User-Agent': userAgent },
    formData: {
      'sex': 'f',
      'key': '',
      'stc': '2:18.30,1:44,23:1',
      'sn': 'default',
      'sv': 1,
      'p': n,
      'f': 'select',
      'listStyle': 'bigPhoto',
      'pri_uid': 200715830,
      'jsversion': 'v5'
    }
  }, function (err, res, body) {
    // console.log();
    fs.writeFileSync(`./json/jsonP_${n}.json`, unescape(body.replace(/\\u/g, '%u').replace(/##jiayser##\/\/$/g, '').replace(/\\/g, '').replace(/^##jiayser##/, '')))
    console.log(`第${n}页已经转成JSON文件，30S后下一页爬取, 本次任务随机间隔为：${t}`);
  })
}