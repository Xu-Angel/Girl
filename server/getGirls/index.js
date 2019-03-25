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
      let n = 1
      let t = 1000 * 4
      let timer = setInterval(() => {
        getJsonP(n, stc, userAgent, key)
        n++
        if (n === 501) {
          console.log(`地区${key}任务已经结束`);
          clearInterval(timer)
        }
        t = 1000 * 30 * Math.random() * 5
      }, t)
    }, NN);
 })(stc[key],key,N)
  N = N + 1000 * 60 * 35 // 35mins  跑一个地区
  // N = N + 1000// 35mins  跑一个地区
  console.log(key,N);
}


function getJsonP(n, stc, userAgent,key) {
  return request({
    url: 'http://search.jiayuan.com/v2/search_v2.php',
    method: 'POST',
    headers: { 'User-Agent': userAgent },
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
    fs.writeFileSync(`./json/json_${key}/jsonP${n}.json`, unescape(body.replace(/\\u/g, '%u').replace(/##jiayser##\/\/$/g, '').replace(/\\/g, '').replace(/^##jiayser##/, '')))
    console.log(`地区${key}第${n}页已经转成JSON文件`);
  })
}