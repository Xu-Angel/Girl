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
  'createTime': Date,
  'finishTime': Date
})
girlSchema.index({ 'realUid': 1, }, { unique: true })
girlSchema.index({ 'createTime': -1, })
girlSchema.index({ 'finishTime': -1, })
// girlSchema.index({ 'realUid': 1 })

const Girl = mongoose.model('allgirl', girlSchema)

export default Girl