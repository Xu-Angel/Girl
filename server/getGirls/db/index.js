const fs = require('fs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const db = mongoose.createConnection('mongodb://127.0.0.1:27017/Girls', { useNewUrlParser: true })

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
const f = 'jsonGirl'
// const f = 'test'
const Girl = db.model('Girl', girlSchema)
// const jsonArr = fs.readdirSync(`../${f}`)
// 两层循环会导致连接超时  
// jsonArr.forEach((v, i) => {
//   const json = require(`../${f}/${v}`)
//   json.userInfo.forEach((v, i) => {
//     console.log(v, 'JSON');
//     Girl({ ...v }).save(function (err, data) {
//       if (err) { console.log(err) } else {
//         console.log(data)
//       }
//     })
//   })
// })
// setTimeout(() => {
//   const json = require(`../${f}/jsonP_${i}.json`)
//   json.userInfo.forEach(async(v, i) => {
//     console.log(v, 'JSON');
//     await new Girl({ ...v }).save(function (err, data) {
//       if (err) { console.log(err) } else {
//         console.log(data)
//       }
//     })
//   })
// }, 5000)
function pushOne(I = 1) {
  const json = require(`../${f}/jsonP_${I}.json`)
  json.userInfo.forEach(async(v, i) => {
    await new Girl({ ...v }).save(function (err, data) {
      if (err) { console.log(err) } else {
        console.log(data)
        console.log(`page ${I} finished`);
      }
    })
  })
}
let i = 565
let t = setInterval(() => {
  pushOne(i)
  i++
  if (i === 3522) {
    console.log('all finished');
    clearInterval(t)
  }
}, 500)
// console.log('finished');
// 先生成最后的JSON  再写入数据库
// const arr = []

// function joinArr() {
//   return new Promise((resolve, reject) => {
//     jsonArr.forEach((v, i) => {
//       const json = require(`../${f}/${v}`)
//       json.userInfo.forEach((v, i) => {
//         console.log(v, 'JSON');
//         arr.push(v)
//       })
//     })
//     resolve(arr)
//   })
// }

// joinArr().then(rs => {
//   fs.writeFileSync('./arr.json', JSON.stringify(rs))
//   Girl.insertMany(rs.slice(2000))
// })
// let i = 1000
// joinArr().then(rs => {
//   let len = rs.length
//   setTimeout(() => {
//     Girl.insertMany(rs.slice(i - 1000, i), function (err, data) {
//       console.log(data)
//       i++
//       if (i > len) {
//         i = len - 1
//       }
//     })
//   }, 10000 * (i / 5000))
// })
// console.log(arr, 'final')

// for (let key in arr) {
//   setTimeout(() => {
//     new Girl({ ...arr[key] }).save(function (err, data) {
//       if (err) { console.log(err) } else {
//         console.log(data)
//       }
//     })
//   }, 20 * (key + 1))
// }