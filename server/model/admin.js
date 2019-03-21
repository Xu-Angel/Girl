import mongoose from 'mongoose'
const Schema = mongoose.Schema

const adminSchema = new Schema({
  'username': String,
  'password': String,
  'id': Number,
  'avatar': { type: String, default: '/img/default_avatar.png' },
  'role': Number,  //1:普通管理、 2:超级管理员
})

adminSchema.index({ id: 1 });

const Admin = mongoose.model('Admin', adminSchema)

export default Admin