const mongoose = require('mongoose')
const Schema = mongoose.Schema

const db = mongoose.createConnection('mongodb://127.0.0.1:27017/Girls', {
  useCreateIndex: true,
  useNewUrlParser: true
})

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
const adminSchema = new Schema({
  'username': String,
  'password': String,
  'id': Number,
  'avatar': { type: String, default: 'default_avatar.jpg' }
})

const idsSchema = new mongoose.Schema({
  admin_id: Number
});

const Ids = mongoose.model('Ids', idsSchema);
Ids.findOne((err, data) => {
  if (!data) {
    const newIds = new Ids({
      admin_id: 0,
    });
    newIds.save();
  }
})
adminSchema.index({ id: 1 });

const Girl = db.model('Girl', girlSchema)
const Admin = db.model('Admin', adminSchema)

module.exports = { Girl, Admin, Ids }