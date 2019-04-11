const cheerio = require('cheerio')
const request = require('request')
import { userAgents } from '../config'

let userAgent = userAgents[parseInt(Math.random() * userAgents.length)]
let proxys = [] //保存从网站上获取到的代理
let useful = [] //保存检查过有效性的代理


/**
 * 获取www.xicidaili.com提供的免费代理 v1.0版本 现在暂时弃用
 */
module.exports = function getXici(pageNum) {
  return new Promise((resolve, reject) => {
    let url = `http://www.xicidaili.com/nn/${pageNum}` // 
    console.log('start');
    request({
      url,
      method: "GET",
      headers: { 'User-Agent': userAgent },
      // proxy: 'http://27.29.44.220:9999/'
    }, async function (error, response, body) {
      if (!error) {
        const $ = cheerio.load(body);
        const trs = $("#ip_list tr");
        for (var i = 1; i < trs.length; i++) {
          let proxy = {}
          let tr = trs.eq(i)
          let tds = tr.children("td")
          proxy['ip'] = tds.eq(1).text()
          proxy['port'] = tds.eq(2).text()
          proxy['address'] = tds.eq(3).text()
          let speed = tds.eq(6).children("div").attr("title")
          console.log(speed)
          proxy['speed'] = speed
          proxy['type'] = tds.eq(4).text()
          proxy['ori'] = '西刺'
          let connectTime = tds.eq(7).children("div").attr("title")
          connectTime = connectTime.substring(0, connectTime.length - 1)
          if (speed <= 5 && connectTime <= 1) { //用速度和连接时间筛选一轮
            proxys.push(proxy)
          }
          proxys.push(proxy)
        }
      }

      if (error) {
        console.log('error:', error)
      }
      let testUrl = "http://xutianshi.top"
      let flag = proxys.length; //检查是否所有异步函数都执行完的标志量
      for (let i = 0; i < proxys.length; i++) {
        let proxy = proxys[i];
        await request({
          url: testUrl,
          proxy: "http://" + proxy['ip'] + ":" + proxy['port'],
          method: 'GET',
          timeout: 5000 //5s没有返回则视为代理不行
        }, function (error, response, body) {
          flag--
          if (!error) {
            if (response.statusCode == 200) {
              useful.push({
                ip: response.request['proxy']['href'],
                address: proxy.address,
                type: proxy.type,
                ori: proxy.ori,
                createTime: new Date(),
                speed: proxy.speed
              });
              console.log(response.request['proxy']['href'], "useful!", 'pageNum:' + pageNum)
            } else {
              console.log(response.request['proxy']['href'], "failed!", 'pageNum:' + pageNum)
            }
          } else {
            console.log("One proxy failed!", 'pageNum:' + pageNum)
          }
          if (flag == 0) {
            resolve(useful) // 返回有用的IP 数组
          }
          console.log(flag)
        });
      }
      console.log('finished for')
    });
  })
}