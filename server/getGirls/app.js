const cheerio = require('cheerio')
const request = require('request')
const userAgents = require('./userAgents')
const fs = require('fs')
let userAgent = userAgents[parseInt(Math.random() * userAgents.length)]
request({
  url: 'http://search.jiayuan.com/v2/index.php?key=&sex=f&stc=1:44,23:1&sn=default&sv=1&p=1&pt=824&ft=off&f=select&mt=d',
  method: 'GET',
  headers: { 'User-Agent': userAgent, 'Cookie': 'guider_quick_search=on; accessID=20190319154159216157; SESSION_HASH=2a692d0b91c51c7fd57ca1b7345eeb2cce76b393; user_access=1; COMMON_HASH=cc6ec580692f7e2df42323b614bc63fd; stadate1=199715830; myloc=44%7C4401; myage=33; mysex=f; myuid=199715830; myincome=30; pop_time=1552981575584; PHPSESSID=cedd5f0b12888158b73fd2cbb2e651a2; pop_avatar=1; PROFILE=200715830%3A%25E5%2596%25B5%25E5%2596%25B5%3Af%3Aimages1.jyimg.com%2Fw4%2Fglobal%2Fi%3A0%3A%3A1%3Azwzp_f.jpg%3A1%3A1%3A50%3A10%3A3; main_search:200715830=%7C%7C%7C00; RAW_HASH=rlkZp9VEqWWLHC5Ow6PBxRGvMFdOnXJ%2Ak6hzOXXiNAYIrrW5LGvTMYWqpZvon7EIxXu7feSbpZaKTy3brxcPSwXWRJSsdEKfkiqCVYWrxC3UB3Q.; is_searchv2=1' },
  useQuerystring: {
    key: ' ',
    sex: 'f',
    stc: '1: 44,23: 1',
    sn: 'default',
    sv: 1,
    p: 1,
    pt: 824,
    ft: 'off',
    f: 'select',
    mt: 'd',
  }
}, function (err, res, body) {
    // console.log(body);
    // fs.createWriteStream('./test.txt', body)
    fs.writeFile('tt.html', body) //TODO!
    // const $ = cheerio.load(body)
    // // console.log($);
    // // console.log($('#normal_user_container').text());
    // const $lisArr = $('.user_list li')
    // const arr = []
    // // console.log($lisArr);
    // for (let i = 0; i < $lisArr.length; i++) {
    //   console.log($lisArr.eq(i));
    //   const $img = $lisArr.eq(i).find('.search_userHead a img').attr('src')
    //   const $name = $lisArr.eq(i).find('.user_name a').text()
    //   const $info = $lisArr.eq(i).find('.user_info').text()
    //   arr.push({img: $img, name: $name, info: $info})
    // }
    // $lisArr.each(function (i, e) {
     
    // })
    // console.log(arr)
})