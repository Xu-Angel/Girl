import mongoose from 'mongoose'
const Schema = mongoose.Schema

const girlSchema = new Schema({
  'realUid': Number,
  'area': String,
  'nickname': String,
  'sex': { type: String, default: '女' },
  'marriage': { type: String, default: '未婚' },
  'height': Number,
  'education': String,
  'work_location': String,
  'age': { type: Number, default: 18 },
  'image': String,
  'randListTag': String,
  'userIcon': String,
  'shortnote': String,
  'matchCondition': String,
  'helloUrl': String,
  'top': { type: Number, default: 0 },
  'hidden': { type: Boolean, default: false },
  'status': { type: Boolean, default: false },
  'createTime': {type: Date, default: new Date()},
  'finishTime': {type: Date, default: new Date()}
})

girlSchema.index({ 'realUid': 1 })

const uniGirl = mongoose.model('unigirl', girlSchema)

export default uniGirl