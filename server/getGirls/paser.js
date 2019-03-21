const xlsx =  require('node-xlsx')
const workSheetsFromFile = xlsx.parse(`./xsls/girl_all.xlsx`);
console.log(workSheetsFromFile[0].data[0], workSheetsFromFile[0].data[2], workSheetsFromFile[0].data[3]);