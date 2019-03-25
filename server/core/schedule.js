var schedule = require('node-schedule');
// second (0-59)
// minute (0-59)
// hour (0-23)
// date (1-31)
// month (0-11)
// year
// dayOfWeek (0-6) Starting with Sunday
/* 
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
*/
//  rule: '*/1 * * * * *'   每秒
//  rule: '*/5 * * * *'   每五分钟
var rule = new schedule.RecurrenceRule();
rule.second = 2; // 每分钟的第二秒执行
 
var j = schedule.scheduleJob(rule, function(){
  console.log('The answer to life, the universe, and everything!', new Date());
});
// 星期天下午两点半
var j = schedule.scheduleJob({hour: 14, minute: 30, dayOfWeek: 0}, function(){
  console.log('Time for tea!');
});

// 定时一个区间 五秒后开始执行  十秒后 停止
let startTime = new Date(Date.now() + 5000);
let endTime = new Date(startTime.getTime() + 5000);
var jj = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, function(){
  console.log('Time for tea!');
});

/* 

定时任务：
  1. 两小时跑完一个地区的150页列表页 150 * 20 === 3000个信息
  2. 两小时跑完3000个信息的详细页
  3. 跑IP代理-> 一小时跑一次
  4. 更新cookie? 五小时一次？
*/