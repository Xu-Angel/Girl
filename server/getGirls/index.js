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
    headers: { 'User-Agent': userAgent, 'Cookie': 'guider_quick_search=on; accessID=20190319154159216157; SESSION_HASH=2a692d0b91c51c7fd57ca1b7345eeb2cce76b393; user_access=1; COMMON_HASH=cc6ec580692f7e2df42323b614bc63fd; stadate1=199715830; myloc=44%7C4401; myage=33; mysex=f; myuid=199715830; myincome=30; PHPSESSID=cedd5f0b12888158b73fd2cbb2e651a2; pop_avatar=1; PROFILE=200715830%3A%25E5%2596%25B5%25E5%2596%25B5%3Af%3Aimages1.jyimg.com%2Fw4%2Fglobal%2Fi%3A0%3A%3A1%3Azwzp_f.jpg%3A1%3A1%3A50%3A10%3A3; main_search:200715830=%7C%7C%7C00; RAW_HASH=rlkZp9VEqWWLHC5Ow6PBxRGvMFdOnXJ%2Ak6hzOXXiNAYIrrW5LGvTMYWqpZvon7EIxXu7feSbpZaKTy3brxcPSwXWRJSsdEKfkiqCVYWrxC3UB3Q.; is_searchv2=1; pop_time=1552995793927' },
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