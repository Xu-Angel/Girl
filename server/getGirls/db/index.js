const mongoose = require('mongoose')
const Schema = mongoose.Schema
const stc = require('../area')
const db = mongoose.createConnection('mongodb://root:password123@123.207.72.208:27017/girldatabasev1?authSource=admin', { useNewUrlParser: true,   useCreateIndex: true })

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
  'hidden': { type: Boolean, default: false }
})

girlSchema.index({ realUid: 1 })

const Girl = db.model('allgirl', girlSchema)

let N = 0
for (var key in stc) {
  // console.log(key, 'stc-:', stc[key])
  (function(key,NN) {
    setTimeout(() => {
      console.log(`地区${key}任务已经开始`)
      // 执行任务
      let n = 1
      let t = 1000 * 0.3   // 0.3s 压力极限？ 3*25 docs avg: 855b * 25 * 3 ~~ 62kb/s =>
      let timer = setInterval(() => {
        pushOne(key,n)
        n++
        if (n === 501) {
          console.log(`地区${key}任务已经结束`);
          clearInterval(timer)
        }
      }, t)
    }, NN);
 })(key,N)
  N = N + 1000 * 60 * 3 // 3mins  跑一个地区
  console.log(key,N)
}

function pushOne(area,I = 1) {
  const json = require(`./json/json_${area}/jsonP${I}.json`)
  json.userInfo.forEach(async(v, i) => {
    await new Girl({ ...v,area }).save(function (err, data) {
      if (err) { console.log(err) } else {
        console.log(data)
        console.log(`${area} page ${I} finished`)
      }
    })
  })
}

