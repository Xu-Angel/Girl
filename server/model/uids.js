import mongoose from 'mongoose'
const Schema = mongoose.Schema

const uidSchema = new Schema({
  'realUid': Number,
})

uidSchema.index({ 'realUid': 1 }, {unique: true})

const Uid = mongoose.model('uids', uidSchema)

export default Uid