import mongoose from "mongoose"
import {stc as area} from '../core/config'
const Schema = mongoose.Schema
const age = []
const height = []
for (let i = 18; i < 70; i++) {
  age.push(i)

}
for (let i = 150; i < 190; i++) {
  height.push(i)
}
const education = ['高中中专及以下', '大专', '本科', '双学士', '硕士', '博士']
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
      'marriage': marriage,
      'listStatus':0,
      'detailStatus':0
    });
    newSpider.save()
  }
})
export default Spider