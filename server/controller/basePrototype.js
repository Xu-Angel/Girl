import IDsModel from '../model/ids'
import formidable from 'formidable'
const path = require('path')
const fs = require('fs')
export default class BaseComponent {
  constructor() {
    this.idList = ['admin_id', 'girl_id', 'img_id']
  }

  /**
   * 获取id列表
   * @param {*} type 
   */
  async getId(type) {
    // console.log('11', this.idList, type)
    if (!this.idList.includes(type)) {
      // console.log('id类型错误')
      throw new Error('id类型错误')
      return
    }
    try {
      const idData = await IDsModel.findOne()
      idData[type]++
      await idData.save()
      return idData[type]
    } catch (err) {
      // console.log('获取ID数据失败')
      throw new Error(err)
    }
  }
  /**
   * 获取上传的图片的路径
   * @param {*} req 
   * @param {*} res 
   */
  async getPath(req, res) {
    return new Promise((resolve, reject) => {
      const form = formidable.IncomingForm()
      form.uploadDir = './public/img'
      form.parse(req, async (err, fields, files) => {
        let img_id
        try {
          img_id = await this.getId('img_id')
        } catch (err) {
          // console.log('获取图片id失败')
          fs.unlinkSync(files.file.path)
          reject('获取图片id失败')
        }
        const hashName = (new Date().getTime() + Math.ceil(Math.random() * 10000)).toString(16) + img_id
        const extname = path.extname(files.file.name)
        if (!['.jpg', '.jpeg', '.png'].includes(extname)) {
          fs.unlinkSync(files.file.path)
          res.send({
            status: 0,
            type: 'ERROR_EXTNAME',
            message: '文件格式错误'
          })
          reject('上传失败')
          return
        }
        const fullName = '/img/' + hashName + extname
        const repath = './public/img/' + hashName + extname
        try {
          fs.renameSync(files.file.path, repath)
          resolve({ fullName, fields })
        } catch (err) {
          // console.log('保存图片失败', err)
          if (fs.existsSync(repath)) {
            fs.unlinkSync(repath)
          } else {
            fs.unlinkSync(files.file.path)
          }
          reject('保存图片失败')
        }
      })
    })
  }
  /**
   * 取数组不同值
   * @param {*} l 长数组
   * @param {*} s 短数组
   */
  difference(l, s) {
    const S = new Set(s)
    return l.filter(v => !S.has(v))
  }
}