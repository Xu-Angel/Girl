import mongoose from "mongoose"
const Schema = mongoose.Schema

const spiderSchema = new Schema({
  'cookie': String,
  'area': { type: Object, default: {} },
  'tag': { type: Object, default: {} },
  'param': {type: Object, default: {}}
})

const Spider = mongoose.model('spider', spiderSchema)

export default Spider