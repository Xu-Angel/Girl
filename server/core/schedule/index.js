const schedule = require('node-schedule')
import moment from 'moment'
import { getIpPool } from '../ip/index'
import { default as getList2Json } from '../spider/getList2Json'

export default function () {
  // 每20分钟爬取一次IP池
  const IPTask = schedule.scheduleJob('*/20 * * * *', async function () {
    console.log('IP池定时任务开始执行!', moment().format('YYYY-MM-DD HH:mm:ss'))
    await getIpPool()
  })

  const params = {
    startPage: 1, endPage: 150, speed: 1, marriage: 1, education: 30, area: ["北京","天津","河北","山西","内蒙古","辽宁","吉林","黑龙江","上海","江苏","浙江","安徽","福建","江西","山东","河南","湖北","湖南","广东","广西","海南","重庆","四川","贵州","云南","西藏","陕西","甘肃","青海","宁夏","新疆","台湾","香港","澳门","美国","国外"
    ]
  }
  
  // 每天的晚上8点1分30秒触发 常规爬150
  const ListTaskE = schedule.scheduleJob('30 1 20 * * *', async function () {
    console.log('全区列表任务开始执行!', moment().format('YYYY-MM-DD HH:mm:ss'))
    await getList2Json({ ...params, task: true })
  })

  // 每天的凌晨1点1分30秒触发  爬250页
  const ListTaskO = schedule.scheduleJob('30 1 1 * * *', async function () {
    console.log('全区列表任务开始执行!', moment().format('YYYY-MM-DD HH:mm:ss'))
    await getList2Json({ ...params, task: true, endPage: 250 })
  })
}

/* 
每分钟的第30秒触发： '30 * * * * *'

每小时的1分30秒触发 ：'30 1 * * * *'

每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'

每月的1日1点1分30秒触发 ：'30 1 1 1 * *'

2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'

每周1的1点1分30秒触发 ：'30 1 1 * * 1'
*/
/* 
*  *  *  *  *  *
┬ ┬ ┬ ┬ ┬ ┬
│ │ │ │ │  |
│ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
│ │ │ │ └───── month (1 - 12)
│ │ │ └────────── day of month (1 - 31)
│ │ └─────────────── hour (0 - 23)
│ └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
*表示通配符，匹配任意，当秒是*时，表示任意秒数都触发，/表示每
*/