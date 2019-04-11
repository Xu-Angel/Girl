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

  // 每天00：00爬取全区列表任务
  const ListRule = new schedule.RecurrenceRule()
  ListRule.hour = 0
  ListRule.minute = 0
  ListRule.second = 0
  const ListTask = schedule.scheduleJob(ListRule, async function () {
    console.log('全区列表任务开始执行!', moment().format('YYYY-MM-DD HH:mm:ss'))
    await getList2Json({
      startPage: 1, endPage: 150, speed: 1, marriage: 0, education: 30, area: ["北京","天津","河北","山西","内蒙古","辽宁","吉林","黑龙江","上海","江苏","浙江","安徽","福建","江西","山东","河南","湖北","湖南","广东","广西","海南","重庆","四川","贵州","云南","西藏","陕西","甘肃","青海","宁夏","新疆","台湾","香港","澳门","美国","国外"
    ] })
  })
}