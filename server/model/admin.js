import mongoose from 'mongoose'
const Schema = mongoose.Schema

const adminSchema = new Schema({
  'username': String,
  'password': String,
  'id': Number,
  'avatar': { type: String, default: 'default_avatar.jpg' }
})

adminSchema.index({ id: 1 });

const Admin = mongoose.model('Admin', adminSchema)

export default Admin