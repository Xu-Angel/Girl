const request = require('request')
const userAgents = require('./userAgents')
const fs = require('fs')
const stc = require('./area')
let N = 0
for (var key in stc) {
  // console.log(key, 'stc-:', stc[key])
  // 创建文件夹
  if (!fs.existsSync(`./json/json_${key}`)) {
    fs.mkdirSync(`./json/json_${key}`)
  }
  (function(stc,key,NN) {
    setTimeout(() => {
      console.log(`地区${key}任务已经开始`);
      // 执行任务
      let userAgent = userAgents[parseInt(Math.random() * userAgents.length)]
      let n = 10000
      let t = 1000 * 1
      let timer = setInterval(() => {
        getJsonP(n, stc, userAgent, key)
        n++
        if (n === 500) {
          console.log(`地区${key}任务已经结束`)
          clearInterval(timer)
        }
      }, t)
    }, NN);
 })(stc[key],key,N)
  N = N + 1000 * 60 * 35 // 35mins  跑一个地区
  // N = N + 1000// 35mins  跑一个地区
  console.log(key,N)
}


function getJsonP(n, stc, userAgent,key) {
  return request({
    url: 'http://search.jiayuan.com/v2/search_v2.php',
    method: 'POST',
    headers: {
      'User-Agent': userAgent,
      'Cookie': 'guider_quick_search=off; td_cookie=18446744070375537760; accessID=20190318214241558161; stadate1=199815830; myloc=45%7C4401; myage=33; mysex=f; myuid=199815830; myincome=30; is_searchv2=1; SESSION_HASH=1f93072086f683ef8d66bc4eb04d6bcdd854d972; user_access=1; COMMON_HASH=cc6ec580692f7e2df42323b614bc63fd; PROFILE=200715830%3A%25E5%2596%25B5%25E5%2596%25B5%3Af%3Aimages1.jyimg.com%2Fw4%2Fglobal%2Fi%3A0%3A%3A1%3Azwzp_f.jpg%3A1%3A1%3A50%3A10%3A3.0; PHPSESSID=3b4463e91faa6f6faa5ae11baba4ee6c; pop_avatar=1; main_search:200715830=%7C%7C%7C00; RAW_HASH=KEWU-nYjqqkgAI4o5lYy3l2MDkkDZjNixjD21B-dSS3OUirlzN4FB6tP5BMwUCCD6HwGaHJxCJTLVNfNaa911JBNpQm7odagGJqalksgGIfEwAY.'  },
    formData: {
      'sex': 'f',
      'key': '',
      'stc': `${stc},23:1`,
      'sn': 'default',
      'sv': 1,
      'p': n,
      'f': 'select',
      'listStyle': 'bigPhoto',
      'pri_uid': 0,
      'jsversion': 'v5'
    }
  }, function (err, res, body) {
    // console.log();
   
    const json = unescape(body.replace(/\\u/g, '%u').replace(/##jiayser##\/\/$/g, '').replace(/\\/g, '').replace(/^##jiayser##/, '').replace(/゛/g, '').replace(//g, '').replace(/color="red"/g, ''))
    fs.writeFileSync(`./json/json_${key}/jsonP${n}.json`, json)
    console.log(`地区${key}第${n}页已经转成JSON文件`)
  })
}