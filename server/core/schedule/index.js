const schedule = require('node-schedule')
import moment from 'moment'
import { getIpPool, checkIpPool } from '../ip/index'
import { default as getList2Json } from '../spider/getList2Json'
import { setTop } from './sortTask'

export default function () {

  // 每30分钟倍数爬取一次IP池
  const IpTask = schedule.scheduleJob('*/30 * * * *', async function () {
    console.log('IP池爬取任务开始执行!', moment().format('YYYY-MM-DD HH:mm:ss'))
    await getIpPool()
  })

  const params = {
    startPage: 1,
    endPage: 150,
    speed: 1,
    marriage: 1,
    education: 30,
    area: ["北京", "天津", "河北", "山西", "内蒙古", "辽宁", "吉林", "黑龙江", "上海", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "广西", "海南", "重庆", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "青海", "宁夏", "新疆", "台湾", "香港", "澳门", "美国", "国外"]
  }
  // 美妙的一天从检查权重开始
  const SortTask = schedule.scheduleJob('30 1 0 * * *', async function () {
    console.log('检查权重开始执行!', moment().format('YYYY-MM-DD HH:mm:ss'))
    await setTop()
  })
  // 再检查一次代理池
  const CheckIpPoolTask = schedule.scheduleJob('20 40 0 * * *', async function () {
    console.log('IP池检查任务开始执行!', moment().format('YYYY-MM-DD HH:mm:ss'))
    await checkIpPool()
  })
  // 凌晨1点1分30秒触发  爬250页
  const ListTaskO = schedule.scheduleJob('30 1 1 * * *', async function () {
    console.log('全区列表任务开始执行!', moment().format('YYYY-MM-DD HH:mm:ss'))
    await getList2Json({ ...params, task: true, endPage: 250 })
  })
  // 凌晨4点1分30秒触发  爬100页
  const ListTaskO_ = schedule.scheduleJob('30 1 4 * * *', async function () {
    console.log('全区列表任务开始执行!', moment().format('YYYY-MM-DD HH:mm:ss'))
    await getList2Json({ ...params, task: true, endPage: 100 })
  })
  // 爬150页
  const ListTaskO__ = schedule.scheduleJob('30 1 6 * * *', async function () {
    console.log('全区列表任务开始执行!', moment().format('YYYY-MM-DD HH:mm:ss'))
    await getList2Json({ ...params, task: true,  startPage: 200, endPage: 350 })
  })
   // 再检查一次代理池
   const CheckIpPoolTask_ = schedule.scheduleJob('20 50 7 * * *', async function () {
    console.log('IP池检查任务开始执行!', moment().format('YYYY-MM-DD HH:mm:ss'))
    await checkIpPool()
  })
  // 早上列表爬取任务 轻量爬50页 模拟用户访问
  const ListTask_ = schedule.scheduleJob('30 1 8 * * *', async function () {
    console.log('全区列表任务开始执行!', moment().format('YYYY-MM-DD HH:mm:ss'))
    await getList2Json({ ...params, task: true, endPage: 50 })
  })
  const ListTask__ = schedule.scheduleJob('28 1 10 * * *', async function () {
    console.log('全区列表任务开始执行!', moment().format('YYYY-MM-DD HH:mm:ss'))
    await getList2Json({ ...params, task: true, endPage: 50 })
  })
  const ListTask___ = schedule.scheduleJob('28 1 12 * * *', async function () {
    console.log('全区列表任务开始执行!', moment().format('YYYY-MM-DD HH:mm:ss'))
    await getList2Json({ ...params, task: true, endPage: 50 })
  })
  // 洗完澡传个cookie 爬下详细页 看下每日成果 美滋滋
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