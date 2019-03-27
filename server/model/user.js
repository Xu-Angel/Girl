import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
  'id': Number,
  'username': String,
  'password': String,
  'avatar': { type: String, default: '女' },
  'fav': { type: Array, default: [] },
  'yes': { type: Array, default: [] }
})

const User = mongoose.model('allgirl', userSchema)

export default User