const cheerio = require('cheerio')
const request = require('request')
const userAgents = require('./userAgents')
let userAgent = userAgents[parseInt(Math.random() * userAgents.length)]
var proxys = []; //保存从网站上获取到的代理
var useful = []; //保存检查过有效性的代理


/**
 * 获取www.xicidaili.com提供的免费代理
 */
module.exports = function getXici(pageNum) {
  return new Promise((resolve, reject) => {
    url = `http://www.xicidaili.com/nn/${pageNum}` // 
    console.log('start');
    request({
      url: url,
      method: "GET",
      headers: { 'User-Agent': userAgent },
      proxy: 'http://27.29.44.220:9999/'
    }, async function (error, response, body) {
      if (!error) {
        var $ = cheerio.load(body);
        var trs = $("#ip_list tr");
        for (var i = 1; i < trs.length; i++) {
          var proxy = {};
          tr = trs.eq(i);
          tds = tr.children("td");
          proxy['ip'] = tds.eq(1).text();
          proxy['port'] = tds.eq(2).text();
          var speed = tds.eq(6).children("div").attr("title");
          speed = speed.substring(0, speed.length - 1);
          var connectTime = tds.eq(7).children("div").attr("title");
          connectTime = connectTime.substring(0, connectTime.length - 1);
          if (speed <= 5 && connectTime <= 1) { //用速度和连接时间筛选一轮
            proxys.push(proxy);
          }
        }
      }

      if (error) {
        console.log('error:', error);
      }
      //尝试请求百度的静态资源公共库中的jquery文件
      // var url = "http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js";
      var url = "http://xutianshi.top";
      var flag = proxys.length; //检查是否所有异步函数都执行完的标志量
      for (var i = 0; i < proxys.length; i++) {
        var proxy = proxys[i];
        await request({
          url: url,
          proxy: "http://" + proxy['ip'] + ":" + proxy['port'],
          method: 'GET',
          timeout: 5000 //5s没有返回则视为代理不行
        }, function (error, response, body) {
          flag--;
          if (!error) {
            if (response.statusCode == 200) {
              //这里因为nodejs的异步特性，不能push(proxy),那样会存的都是最后一个
              useful.push(response.request['proxy']['href']);
              console.log(response.request['proxy']['href'], "useful!", 'pageNum:' + pageNum);
            } else {
              console.log(response.request['proxy']['href'], "failed!", 'pageNum:' + pageNum);
            }
          } else {
            console.log("One proxy failed!", 'pageNum:' + pageNum);
          }
          if (flag == 0) {
            resolve(useful) // 返回有用的IP 数组
          }
          console.log(flag);
        });
      }
        console.log('finished for');
    });
  })
}