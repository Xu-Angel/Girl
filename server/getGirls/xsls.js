var xlsx = require('node-xlsx')
var fs = require('fs')
const json = require('./jsonP_1.json')
// console.log(json.userInfo);
// console.log(JSON.stringify(json.userInfo).replace(/{/g, '[').replace(/}/g, ']').replace(/^\[/, '').replace(/\]$/, ''));
// console.log(typeof Array.from(JSON.stringify(json.userInfo).replace(/{/g, '[').replace(/}/g, ']')));
// fs.writeFile('arr.js', JSON.stringify(json.userInfo).replace(/{/g, '[').replace(/}/g, ']').replace(/^\[/, '').replace(/\]$/, ''))
// console.log(JSON.stringify(json.userInfo).replace(/{/g, '[').replace(/}/g, ']').replace(/"uid":/g, '').replace(/"realUid":/g, '').replace(/"nickname":/g, '').replace(/"sex":/g, '').replace(/"sexValue":/g, '').replace(/randAttr":/g, '').replace(/"marriage":/g, '').replace(/height":/g, '').replace(/"education":/g, '').replace(/"income":/g, '').replace(/"work_location":/g, '').replace(/"work_sublocation":/g, '').replace(/"age":/g, '').replace(/"image":/g, '').replace(/"count":/g, '').replace(/"online":/g, '').replace(/"randTag":/g, '').replace(/"randListTag":/g, '').replace(/"userIcon":/g, '').replace(/"helloUrl":/g, '').replace(/"sendMsgUrl":/g, '').replace(/"shortnote":/g, '').replace(/"matchCondition":/g, ''));
var dataArr = [{
  name: 'Sheet1',
  data: [
    ['realUid', 'toalUid','nickname','sex','sexValue','randAttr', 'marriage', 'height', 'education', 'income', 'work_location', 'work_sublocation', 'age', 'image', 'count', 'online', 'randTag', 'randListTag', 'userIcon', 'helloUrl', 'sendMsgUrl', 'shortnote', 'matchCondition']
  ]
}];
// JSON.stringify(json.userInfo).replace(/{/g, '[').replace(/}/g, ']').replace(/"uid":/g, '').replace(/"realUid":/g, '').replace(/"nickname":/g, '').replace(/"nickname":/g, '').replace(/"sexValue":/g, '').replace(/randAttr":/g, '').replace(/"marriage":/g, '').replace(/height":/g, '').replace(/"education":/g, '').replace(/"income":/g, '').replace(/"work_location":/g, '').replace(/"work_sublocation":/g, '').replace(/"age":/g, '').replace(/"image":/g, '').replace(/"count":/g, '').replace(/"online":/g, '').replace(/"randTag":/g, '').replace(/"randListTag":/g, '').replace(/"userIcon":/g, '').replace(/"helloUrl":/g, '').replace(/"sendMsgUrl":/g, '').replace(/"shortnote":/g, '').replace(/"matchCondition":/g, '').split('].[')

// console.log(JSON.stringify(json.userInfo).replace(/{/g, '[').replace(/}/g, ']').replace(/"uid":/g, '').replace(/"realUid":/g, '').replace(/"nickname":/g, '').replace(/"nickname":/g, '').replace(/"sexValue":/g, '').replace(/randAttr":/g, '').replace(/"marriage":/g, '').replace(/height":/g, '').replace(/"education":/g, '').replace(/"income":/g, '').replace(/"work_location":/g, '').replace(/"work_sublocation":/g, '').replace(/"age":/g, '').replace(/"image":/g, '').replace(/"count":/g, '').replace(/"online":/g, '').replace(/"randTag":/g, '').replace(/"randListTag":/g, '').replace(/"userIcon":/g, '').replace(/"helloUrl":/g, '').replace(/"sendMsgUrl":/g, '').replace(/"shortnote":/g, '').replace(/"matchCondition":/g, '').replace(/^\[/, '').replace(/]$/, '').replace(/^\[/, '').replace(/]$/, '').split('],[')[0]);
// fs.writeFile('jsonP_1.xlsx', xlsx.build(JSON.stringify(json.userInfo).replace(/{/g, '[').replace(/}/g, ']').replace(/"uid":/g, '').replace(/"realUid":/g, '').replace(/"nickname":/g, '').replace(/"nickname":/g, '').replace(/"sexValue":/g, '').replace(/randAttr":/g, '').replace(/"marriage":/g, '').replace(/height":/g, '').replace(/"education":/g, '').replace(/"income":/g, '').replace(/"work_location":/g, '').replace(/"work_sublocation":/g, '').replace(/"age":/g, '').replace(/"image":/g, '').replace(/"count":/g, '').replace(/"online":/g, '').replace(/"randTag":/g, '').replace(/"randListTag":/g, '').replace(/"userIcon":/g, '').replace(/"helloUrl":/g, '').replace(/"sendMsgUrl":/g, '').replace(/"shortnote":/g, '').replace(/"matchCondition":/g, '')), 'utf-8', function (err) {
//   if (err) {
//     console.log('write file error!');
//   } else {
//     console.log('write file success!');
//   }
// });
const strsArr = JSON.stringify(json.userInfo).replace(/{/g, '[').replace(/}/g, ']').replace(/"uid":/g, '').replace(/"realUid":/g, '').replace(/"nickname":/g, '').replace(/"nickname":/g, '').replace(/"sex":/g, '').replace(/"sexValue":/g, '').replace(/randAttr":/g, '').replace(/"marriage":/g, '').replace(/height":/g, '').replace(/"education":/g, '').replace(/"income":/g, '').replace(/"work_location":/g, '').replace(/"work_sublocation":/g, '').replace(/"age":/g, '').replace(/"image":/g, '').replace(/"count":/g, '').replace(/"online":/g, '').replace(/"randTag":/g, '').replace(/"randListTag":/g, '').replace(/"userIcon":/g, '').replace(/"helloUrl":/g, '').replace(/"sendMsgUrl":/g, '').replace(/"shortnote":/g, '').replace(/"matchCondition":/g, '').replace(/^\[/, '').replace(/]$/, '').replace(/^\[/, '').replace(/]$/, '').split('],[')
for (let i = 0; i < strsArr.length; i++) {
  dataArr[0].data.push(strsArr[i].split(','))
}
console.log(dataArr[0].data);
fs.writeFile('girl.xlsx', xlsx.build(dataArr), 'utf-8', function (err) {
  if (err) {
    console.log('write file error!');
  } else {
    console.log('write file success!');
  }
});
// const str = `199715080,200715080,"觅双风趣的在法国","sex":"女","f",""priority","离异",""167","本科",null,"河东","河东",35,"http://images1.jyimg.com/w4/global/i/zwzp_f.jpg","325",0,"<span>属猪</span><span>处女座</span>","<span>属猪</span><span>167cm</span><span>本科</span><span>处女座</span>","<i title=手机认证 class=tel></i>","http://www.jiayuan.com/msg/hello.php?type=20&randomfrom=4&uhash=be92fd9bf02f0b7ba1b55dcd871f2146","http://www.jiayuan.com/msg/send.php?uhash=be92fd9bf02f0b7ba1b55dcd871f2146","爱一个人意味着什么呢？这意味着为他的幸福而高兴，为使他能够幸福而去做需要做的一切，并从这当中得到快乐。一般的宿命，就是我们总会遇见一些人遭遇一些事。然后，看着命中注定的事发生，却无…","33-42岁,173-184cm,本科以上,有照片,天津,河东"`
// console.log(str.split(','));