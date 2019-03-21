const fs = require('fs')
const jsonArr = fs.readdirSync('./json')
jsonArr.forEach((v, i) => {
  fs.readFile(`./json/${v}`, (err, data) => {
    fs.writeFileSync(`./jsonGirl/${v}`, data.toString().replace(/,"express_searc\S.*}]/g, ''))
    console.log(`success write ./jsonGirl/${v}`);
  })
})

// .replace(/,"express_searc\S.*}]/g, '')
// fs.readFile(`./json/jsonP_1.json`, (err, data) => {
//   // console.log();
//   fs.writeFileSync(`./json/${V}`, data.toString().replace(/,"express_searc\S.*}]/g, ''))
// })