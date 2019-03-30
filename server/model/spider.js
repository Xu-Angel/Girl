import mongoose from "mongoose"
const Schema = mongoose.Schema
const area = {
  '北京': '1:11',
  '天津': '1:12',
  '河北': "1:13",
  '山西': "1:14",
  '内蒙古': "1:15",
  '辽宁': "1:21",
  '吉林': "1:22",
  '黑龙江': "1:23",
  '上海': "1:31",
  '江苏': "1:32",
  '浙江': "1:33",
  '安徽': "1:34",
  '福建': "1:35",
  '江西': "1:36",
  '山东': "1:37",
  '河南': "1:41",
  '湖北': "1:42",
  '湖南': "1:43",
  '广东': "1:44",
  '广西': "1:45",
  '海南': "1:46",
  '重庆': "1:50",
  '四川': "1:51",
  '贵州': "1:52",
  '云南': "1:53",
  '西藏': "1:54",
  '陕西': "1:61",
  '甘肃': "1:62",
  '青海': "1:63",
  '宁夏': "1:64",
  '新疆': "1:65",
  '台湾': "1:71",
  '香港': "1:81",
  '澳门': "1:82",
  '美国': "1:98",
  '国外': "1:99",
}
const age = []
const height = []
for (let i = 18; i < 70; i++) {
  age.push(i)

}
for (let i = 150; i < 190; i++) {
  height.push(i)
}
const education = ['高中中专及以下', '大专', '本科', '双学士', '博士', '硕士']
const marriage = ['未婚', '离异', '丧偶']

const spiderSchema = new Schema({
  'cookie': String,
  'area': { type: Object, default: area },
  'tag': { type: Object, default: {} },
  'param': { type: Object, default: {} },
  'age': { type: Array, default: age },
  'height': { type: Array, default: height },
  'education': { type: Array, default: education },
  'marriage': { type: Array, default: marriage }
})

const Spider = mongoose.model('spider', spiderSchema)
Spider.findOne((err, data) => {
  if (!data) {
    const newSpider = new Spider({
      'cookie': '',
      'area': area,
      'tag': {},
      'param': {},
      'age': age,
      'height': height,
      'education': education,
      'marriage': marriage
    });
    newSpider.save()
  }
})
export default Spider