import mongoose from 'mongoose'
const Schema = mongoose.Schema

const reqLogSchema = new Schema({
  time: Date,
  origin: String,
  ua: String,
  host: String,
  referer: String,
  url: String,
  ip: String
})

const reqLogs = mongoose.model('reqLogs', reqLogSchema)

export default reqLogs