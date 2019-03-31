const cheerio = require('cheerio')
const request = require('request')
const userAgents = require('./userAgents')
const fs = require('fs')
let userAgent = userAgents[parseInt(Math.random() * userAgents.length)]
module.exports = function (realUid, cookie) {
  console.log(cookie, 'inner');
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.jiayuan.com/${realUid}`,
      method: 'GET',
      headers: {
        'User-Agent': userAgent,
        // 'Cookie': 'accessID=20190309214241558161; ip_loc=45; stadate1=3471673; myloc=45%7C4401; myage=33; mysex=f; myuid=3471673; myincome=30; PHPSESSID=c3875d8c3d9c2060789b542ca4ce7315; user_access=1; main_search:200715830=%7C%7C%7C00; COMMON_HASH=cc6ec580692f7e2df42323b614bc63fd; last_login_time=1553315969; PROFILE=200715830%3A%25E5%2596%25B5%25E5%2596%25B5%3Af%3Aimages1.jyimg.com%2Fw4%2Fglobal%2Fi%3A0%3A%3A1%3Azwzp_f.jpg%3A1%3A1%3A50%3A10%3A3.0; is_searchv2=1; td_cookie=18446744069830179450; pop_avatar=1; RAW_HASH=VEmv-00D63-wNkfn0-BAwBX2nUaCItfEXaFrtHHEzFen9SqK9jG95cklrFRcCxXOG83NbEa6hzr81Aj1j4t5Fz8S%2A1FvQ96zc%2AEox9aiUnl59yA.; SESSION_HASH=a10029b896cd86adf0035c81923b4ee1e9030e94; pop_time=1553353756931'
        // 'Cookie': 'accessID=20190324140855593289; PHPSESSID=f33c7af0044c59feae8fed408cd6eafe; SESSION_HASH=5b388ece638a148fa5042c5b1d9bc09e81b6b2d7; user_access=1; stadate1=199815830; myloc=45%7C4401; myage=33; mysex=f; myuid=199815830; myincome=30; main_search:200715830=%7C%7C%7C00; COMMON_HASH=cc6ec580692f7e2df42323b614bc63fd; sl_jumper=%26cou%3D17%26omsg%3D0%26dia%3D0%26lst%3D1970-01-01; last_login_time=1553743152; PROFILE=200715830%3A%25E5%2596%25B5%25E5%2596%25B5%3Af%3Aimages1.jyimg.com%2Fw4%2Fglobal%2Fi%3A0%3A%3A1%3Azwzp_f.jpg%3A1%3A1%3A50%3A10%3A3.0; pop_avatar=1; RAW_HASH=DDRlqfkx6PDJeR7Xeun8nO4v0oGCYa4YLIlUeYNjN2Hq9Q5%2AgFajtwCQuCG-85dGkMKtoaDDB0liECd0Ic-WpsM7HyfLAbjWfja5Iln78w1d9P0.'
        'Cookie':cookie
      },
      // proxy: 'http://116.209.58.93:9999/'
    }, function (err, res, body) {
      const $ = cheerio.load(body)
      // console.log(err,res,body)
      const all = {}
      const infoLis = $('.member_info_list li')
    //  console.log( $('.member_name').text())
      all['概要'] = $('.member_name').text()
      all['学历'] = infoLis.eq(0).find('.pr em').text()
      all['身高'] = infoLis.eq(1).find('.pr em').text()
      all['购车'] = infoLis.eq(2).find('.pr em').text()
      all['月薪'] = infoLis.eq(3).find('.pr em').text()
      all['住房'] = infoLis.eq(4).find('.pr em').text()
      all['体重'] = infoLis.eq(5).find('.pr em').text()
      all['星座'] = infoLis.eq(6).find('.pr em').text()
      all['民族'] = infoLis.eq(7).find('.pr em').text()
      all['属相'] = infoLis.eq(8).find('.pr em').text()
      all['血型'] = infoLis.eq(9).find('.pr em').text()
      const jsArrs = $('.js_box')
      all['自我介绍'] = jsArrs.eq(0).find('.js_text').html()
      if ($('.DNA_xq ul').html()) {
        all['爱情DNA'] = $('.DNA_xq ul').html()
      }
      all['情感故事'] = jsArrs.eq(1).find('.js_text').text()
      // all.zoyq = jsArrs.eq(2).html()
      const zoyqLsit = jsArrs.eq(2).find('.js_list li')
      // console.log(zoyqLsit.eq(0).find('div').text())
      const ZQYQ = {}
      ZQYQ['年龄'] = zoyqLsit.eq(0).find('div').text()
      ZQYQ['身高'] = zoyqLsit.eq(1).find('div').text()
      ZQYQ['民族'] = zoyqLsit.eq(2).find('div').text()
      ZQYQ['学历'] = zoyqLsit.eq(3).find('div').text()
      ZQYQ['是否有照片'] = zoyqLsit.eq(4).find('div').text()
      ZQYQ['婚姻状况'] = zoyqLsit.eq(5).find('div').text()
      ZQYQ['居住地'] = zoyqLsit.eq(6).find('div').text()
      ZQYQ['诚信'] = zoyqLsit.eq(7).find('div').text()
      all['择偶要求'] = ZQYQ
      const shxg = jsArrs.eq(3).find('.js_list li')
      const SHFS = {}
      SHFS['嗜好习惯'] = {}
      SHFS['嗜好习惯']['吸烟'] = shxg.eq(0).find('div').text()
      SHFS['嗜好习惯']['饮酒'] = shxg.eq(1).find('div').text()
      SHFS['嗜好习惯']['锻炼习惯'] = shxg.eq(2).find('div').text()
      SHFS['嗜好习惯']['饮食习惯'] = shxg.eq(3).find('div').text()
      SHFS['嗜好习惯']['逛街购物'] = shxg.eq(4).find('div').text()
      SHFS['嗜好习惯']['宗教信仰'] = shxg.eq(5).find('div').text()
      SHFS['嗜好习惯']['作息习惯'] = shxg.eq(6).find('div').text()
      SHFS['嗜好习惯']['交际圈子'] = shxg.eq(7).find('div').text()
      SHFS['嗜好习惯']['最大消费'] = shxg.eq(8).find('div').text()
      SHFS['家务'] = {}
      SHFS['家务']['程度'] = jsArrs.eq(3).find('.pt25').eq(0).find('.cur').text()
      SHFS['家务']['家务分配'] = jsArrs.eq(3).find('.about_box').eq(0).find('div').text()
      SHFS['宠物'] = {}
      SHFS['宠物']['关于宠物'] = jsArrs.eq(3).find('.about_box').eq(1).find('div').text()
      SHFS['宠物']['程度'] = jsArrs.eq(3).find('.pt25').eq(1).find('.cur').text()
      all['生活方式'] = SHFS
      const jjslArr = jsArrs.eq(4).find('.js_list li')
      const JJSL = {}
      JJSL['月薪'] = jjslArr.eq(0).find('div').text()
      JJSL['购房'] = jjslArr.eq(1).find('div').text()
      JJSL['购车'] = jjslArr.eq(2).find('div').text()
      JJSL['经济观念'] = jjslArr.eq(3).find('div').text()
      JJSL['投资理财'] = jjslArr.eq(4).find('div').text()
      JJSL['外债贷款'] = jjslArr.eq(5).find('div').text()
      all['经济实力'] = JJSL
      
      const gz = jsArrs.eq(5).find('.js_list').eq(0).find('li')
      const xx = jsArrs.eq(5).find('.js_list').eq(1).find('li')
      const GZXX = {}
      GZXX['工作'] = {}
      GZXX['工作']['职业职位'] = gz.eq(0).find('div').text()
      GZXX['工作']['公司行业'] = gz.eq(1).find('div').text()
      GZXX['工作']['公司类型'] = gz.eq(2).find('div').text()
      GZXX['工作']['福利待遇'] = gz.eq(3).find('div').text()
      GZXX['工作']['工作状态'] = gz.eq(4).find('div').text()
      GZXX['工作']['调动工作可能性'] = gz.eq(5).find('div').text()
      GZXX['工作']['事业与家庭'] = gz.eq(6).find('div').text()
      GZXX['工作']['海外工作可能性'] = gz.eq(7).find('div').text()
      GZXX['学习'] = xx.eq(0).text()
      all['工作学习'] = GZXX
      const gyzj = jsArrs.eq(6).find('.js_list').eq(0).find('li')
      const gyjt = jsArrs.eq(6).find('.js_list').eq(1).find('li')
      const HYGN = {}
      HYGN['关于自己'] = {}
      HYGN['关于自己']['籍贯'] = gyzj.eq(0).find('div').text()
      HYGN['关于自己']['户口'] = gyzj.eq(1).find('div').text()
      HYGN['关于自己']['国籍'] = gyzj.eq(2).find('div').text()
      HYGN['关于自己']['个性特征'] = gyzj.eq(3).find('div').text()
      HYGN['关于自己']['幽默感'] = gyzj.eq(4).find('div').text()
      HYGN['关于自己']['脾气'] = gyzj.eq(5).find('div').text()
      HYGN['关于自己']['对待感情'] = gyzj.eq(6).find('div').text()
      HYGN['关于自己']['是否要小孩'] = gyzj.eq(7).find('div').text()
      HYGN['关于自己']['何时结婚'] = gyzj.eq(8).find('div').text()
      HYGN['关于自己']['能否接受异地恋'] = gyzj.eq(9).find('div').text()
      HYGN['关于自己']['理想婚姻'] = gyzj.eq(10).find('div').text()
      HYGN['关于家庭'] = {}
      HYGN['关于家庭']['愿与对方父母同住'] = gyjt.eq(0).find('div').text()
      HYGN['关于家庭']['家中排行'] = gyjt.eq(1).find('div').text()
      HYGN['关于家庭']['父母情况'] = gyjt.eq(2).find('div').text()
      HYGN['关于家庭']['兄弟姐妹'] = gyjt.eq(3).find('div').text()
      HYGN['关于家庭']['父母经济情况'] = gyjt.eq(4).find('div').text()
      HYGN['关于家庭']['父母医保情况'] = gyjt.eq(5).find('div').text()
      HYGN['关于家庭']['父母的工作'] = gyjt.eq(6).find('div').text()
      all['婚姻观念'] = HYGN
      const bigImg = $('#bigImg a img')
      const bigImgArr = []
      bigImg.each(function (i, e) {
        bigImgArr[i] = bigImg.eq(i).attr('_src');
      })
      const smallImg = $('#smallImg a img')
      const smallImgArr = []
      smallImg.each((i, e) => {
        smallImgArr[i] = smallImg.eq(i).attr('_src');
      })
    
      all['照片'] = {'big': bigImgArr, 'samll': smallImgArr}
      // fs.writeFileSync('detail1.json', JSON.stringify(all)) //TODO!
      resolve(all)
      })
  })
}