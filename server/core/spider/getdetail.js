const cheerio = require('cheerio')
const request = require('request')
import spiderModel from '../../model/spider'
let userAgent = userAgents[parseInt(Math.random() * userAgents.length)]

import { userAgents } from '../config'

/**
 * 爬取女性详情页
 * @param {*} realUid 女性对应的UID，必须
 * @param {*} cookie 用于爬取隐私,必须
 */
export default function (realUid, cookie, ip) {
  console.log(ip)

  if (!cookie) {
    cookie = spiderModel.find('cookie').exec()
  }
  return new Promise((resolve, reject) => {
    try {
      request({
        url: `http://www.jiayuan.com/${realUid}`,
        method: 'GET',
        headers: {
          'User-Agent': userAgent,
          'Cookie': cookie
        },
        proxy: ip,
        timeout: 10000 // 十秒断开
      }, function (err, res, body) {
        if (err) reject(err)
        try {
          const $ = cheerio.load(body)
          const all = {}
          const infoLis = $('.member_info_list li')
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
          const zoyqLsit = jsArrs.eq(2).find('.js_list li')
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

          all['照片'] = { 'big': bigImgArr, 'small': smallImgArr }
          // fs.writeFileSync('detail1.json', JSON.stringify(all)) //TODO!
          resolve(all)
        } catch (error) {
          reject(error)
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}