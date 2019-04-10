import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ipPool = new Schema({
  type: String,
  host: String,
  port: Number,
  type: String,
  anonymity: { type:String, default: '未知' },
  country: { type: String, default: '未知' },
  response_time: { type: Number, default: 0 },
  from: { type: String, default: '未知' }
})

ipPool.index({ 'host': 1, }, { unique: true })

const ipPools = mongoose.model('ipPools', ipPool)

export default ipPools