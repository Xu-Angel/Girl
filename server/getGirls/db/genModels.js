const mongoose = require('mongoose')

const Schema = mongoose.Schema

const girlSchema = new Schema({
  'nickname': String,
  'sex': { type: String, default: '女' },
  'marriage': { type: String, default: '未婚' },
  'height': { type: Number, default: 160 },
  'education': String,
  'income': { type: Number, default: Math.random() * 50000 },
  'workLocation': String,
  'age': { type: Number, default: 18 },
  'image': String,
  'randListTag': String,
  'userIcon': String,
  'helloUrl': String,
  'sendMsgUrl': String,
  'shortNote': String,
  'matchCondition': String,
  'realUid': Number
})

const Girl = mongoose.model('Girl', girlSchema)

module.exports = Girl