var xlsx = require('node-xlsx')
var fs = require('fs')
const jsonArr = fs.readdirSync('./json')
let dataArr = [{
  name: 'Sheet1',
  data: [
    ['realUid', 'toalUid', 'nickname', 'sex', 'sexValue', 'randAttr', 'marriage', 'height', 'education', 'income', 'work_location', 'work_sublocation', 'age', 'image', 'count', 'online', 'randTag', 'randListTag', 'userIcon', 'helloUrl', 'sendMsgUrl', 'shortnote', 'matchCondition']
  ]
}];
// console.log(require(`./json/${jsonArr[0]}`).userInfo);
jsonArr.forEach((v, i) => {
  console.log(v);
  let json = require(`./json/${v}`)
  genXsls(json, i)
})
const deepFlatten = arr => [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v) : v))

console.log(dataArr[0].data);
function genXsls(json, I) {
  const strsArr = JSON.stringify(json.userInfo).replace(/{/g, '[').replace(/}/g, ']').replace(/"uid":/g, '').replace(/"realUid":/g, '').replace(/"nickname":/g, '').replace(/"nickname":/g, '').replace(/"sex":/g, '').replace(/"sexValue":/g, '').replace(/randAttr":/g, '').replace(/"marriage":/g, '').replace(/height":/g, '').replace(/"education":/g, '').replace(/"income":/g, '').replace(/"work_location":/g, '').replace(/"work_sublocation":/g, '').replace(/"age":/g, '').replace(/"image":/g, '').replace(/"count":/g, '').replace(/"online":/g, '').replace(/"randTag":/g, '').replace(/"randListTag":/g, '').replace(/"userIcon":/g, '').replace(/"helloUrl":/g, '').replace(/"sendMsgUrl":/g, '').replace(/"shortnote":/g, '').replace(/"matchCondition":/g, '').replace(/^\[/, '').replace(/]$/, '').replace(/^\[/, '').replace(/]$/, '').split('],[')
  for (let i = 0; i < strsArr.length; i++) {
    dataArr[0].data.push(strsArr[i].split(','))
  }
}

fs.writeFile(`./xsls/girl_g.xlsx`, xlsx.build(dataArr), 'utf-8', function (err) {
  if (err) {
    console.log('write file error!');
  } else {
    console.log('write file success!');
  }
});