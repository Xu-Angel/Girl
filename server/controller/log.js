import Base from './basePrototype'
import formidable from 'formidable'
import reqLogsScheam from '../model/reqlogs'
import fs from 'fs'
import path from 'path'
class Log extends Base {
  constructor() {
    super()
  }

  async getVisit(req, res, next) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      try {
        const { page, pageSize, ...params } = fields
        for (let key in params) {
          const v = params[key]
          if (v === '' || v === undefined || v === 'undefind') {
            delete params[key]
          }
        }
        try {
          if (!page) {
            throw new Error('页码参数错误')
          } else if (!pageSize) {
            throw new Error('分页大小参数错误')
          }
        } catch (err) {
          res.send({
            status: 400,
            message: err.message,
          })
          return
        }
        const total = await reqLogsScheam.estimatedDocumentCount({ ...params })
        let items = null
        if (total < 10) {
          items = await reqLogsScheam.find({ ...params }).sort({ "_id": -1 })
        } else {
          items = await reqLogsScheam.find({ ...params }).skip((page - 1) * pageSize).limit(pageSize).sort({ "_id": -1 })
        }
        res.send({
          status: 200,
          data: {
            items: items,
            total
          }
        })
      } catch (error) {
        res.send({
          status: 400,
          message: `获取失败,失败原因:${err}`
        })
      }
    })
  }

  async delReq(req, res, next) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      const { _id } = fields
      reqLogsScheam.findOneAndDelete({ _id }).exec()
      res.send({
        status: 200,
        message: `删除成功~`
      })
    })
  }

  async delFile(req, res, next) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
    try {
      if (req.session.role !== 2) {
        res.send({
          status: 100,
          message: '对不起，你没有权限操作~'
        })
        return
      }
      const { file, type } = fields
      fs.unlinkSync(path.resolve(__dirname, `../logs/${type}/${file}`))
      res.send({
        status: 200,
        message: `删除成功~`
      })
    } catch (error) {
      res.send({
        status: 400,
        message: error
      })
    }
    })
  }

  async getFile(req, res, next) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
     try {
        // 查询log4的文件名返回
      // type: error,response,pm2,req,
      const { page, pageSize, type } = fields
      try {
        if (!page) {
          throw new Error('页码参数错误')
        } else if (!pageSize) {
          throw new Error('分页大小参数错误')
        }
      } catch (err) {
        res.send({
          status: 400,
          message: err.message,
        })
        return
      }
      const dir = fs.readdirSync(path.resolve(__dirname, `../logs/${type}`))
      const arr = []
      dir.forEach((v) => {
        if (fs.statSync(path.resolve(__dirname, `../logs/${type}/${v}`)).size > 0) {
          arr.push({
            file: v,
            type
          })
        }
      })
       let send = null
       const total = arr.length
       if (page === 1) {
        send = arr.slice(0, pageSize)
       } else {
        send = arr.slice((page - 1) * pageSize, page * pageSize)
       }
      res.send({
        status: 200,
        data: {
          items: send,
          total
        },
        message: `获取成功~`
      })
     } catch (error) {
      res.send({
        status: 400,
        message: error
      })
     }
    })
  }
}

export default new Log()