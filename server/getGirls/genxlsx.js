var xlsx = require('node-xlsx')
var fs = require('fs')
const jsonArr = fs.readdirSync('./jsonGirl')
let dataArr = [{
  name: 'Sheet1',
  data: [
    ['realUid', 'toalUid', 'nickname', 'sex', 'sexValue', 'randAttr', 'marriage', 'height', 'education', 'income', 'work_location', 'work_sublocation', 'age', 'image', 'count', 'online', 'randTag', 'randListTag', 'userIcon', 'helloUrl', 'sendMsgUrl', 'shortnote', 'matchCondition']
  ]
}];
// let json = require(`./jsonGirl/${v}`)
// 分页生成
// for (let i = 0; i < 3521; i++) {
//   setTimeout(() => {
//     let json = require(`./jsonGirl/jsonP_${i+1}.json`)
//     genXsls(json, i + 1, 1)
//   }, 1000 * (i + 1))
// }
// console.log(require(`./json/${jsonArr[0]}`).userInfo);
jsonArr.forEach((v, i) => {
  console.log(v);
  let json = require(`./jsonGirl/${v}`)
  genXsls(json, i, jsonArr.length)
})
// jsonArr.forEach((v, i) => {
//   console.log(v);
//   // let json = require(`./jsonGirl/${v}`)
//   fs.readFileSync(`./jsonGirl/${v}`, (err, data) => {
//     genXsls(data.toString(), i, jsonArr.length)
//   })
// })
// let json = require(`./jsonGirl/jsonP_1.json`)
//   genXsls(json, 1)
// const deepFlatten = arr => [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v) : v))

// console.log(dataArr[0].data);
function genXsls(json, I, L) {

  const strsArr = JSON.stringify(json.userInfo).replace(/{/g, '[').replace(/}/g, ']').replace(/"uid":/g, '').replace(/"realUid":/g, '').replace(/"nickname":/g, '').replace(/"nickname":/g, '').replace(/"sex":/g, '').replace(/"sexValue":/g, '').replace(/randAttr":/g, '').replace(/"marriage":/g, '').replace(/height":/g, '').replace(/"education":/g, '').replace(/"income":/g, '').replace(/"work_location":/g, '').replace(/"work_sublocation":/g, '').replace(/"age":/g, '').replace(/"image":/g, '').replace(/"count":/g, '').replace(/"online":/g, '').replace(/"randTag":/g, '').replace(/"randListTag":/g, '').replace(/"userIcon":/g, '').replace(/"helloUrl":/g, '').replace(/"sendMsgUrl":/g, '').replace(/"shortnote":/g, '').replace(/"matchCondition":/g, '').replace(/^\[/, '').replace(/]$/, '').replace(/^\[/, '').replace(/]$/, '').split('],[')
  for (let i = 0; i < strsArr.length; i++) {
    dataArr[0].data.push(strsArr[i].split(',')) // 塞入本次JSON 解析出的数组
  }
  console.log(dataArr[0].data);
  // 每100个JSON 生成一份Excel
  // fs.writeFile(`./xsls/girl_2019_03_20_${I}.xlsx`, xlsx.build(dataArr), 'utf-8', function (err) {
  //   if (err) {
  //     console.log('write file error!');
  //   } else {
  //     console.log('write file success!');
  //   }
    // if (I + 1 % 100 === 0) { // 判断是第100 倍数的文件 输出Excel
    //   fs.writeFile(`./xsls/girl_2019_03_20_${I}.xlsx`, xlsx.build(dataArr), 'utf-8', function (err) {
    //     if (err) {
    //       console.log('write file error!');
    //     } else {
    //       console.log('write file success!');
    //     }
    //     dataArr[0].data = [] // 置空缓存的数据流
    //   });
    // } else if (I === L - 1) { // 最后剩余的文件数据
    //   fs.writeFile(`./xsls/girl_2019_03_20_${L - 1}.xlsx`, xlsx.build(dataArr), 'utf-8', function (err) {
    //     if (err) {
    //       console.log('write file error!');
    //     } else {
    //       console.log('write file success!');
    //     }
  }

// }

  fs.writeFile(`./xsls/girl_2019_03_20_all.xlsx`, xlsx.build(dataArr), 'utf-8', function (err) {
    if (err) {
      console.log('write file error!');
    } else {
      console.log('write file success!');
    }
  });