import Base from './basePrototype'
import { spiIp, check } from '../core/ip/index'
import ipSchema from '../model/ips'
import formidable from 'formidable'
// TODO:WSS

class Ip extends Base {
  constructor() {
    super()
  }

  async getIpList(req, res, next) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      console.log(fields);
      if (err) {
        res.send({
          status: 100,
          type: 'FORM_DATA_ERROR',
          message: '表单信息错误'
        })
        return
      }
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
          type: 'GET_ERROR_PARAM',
          message: err.message,
        })
        return
      }
      try {
        const total = await ipSchema.count({ ...params })
        let ipList = null
        if (total < 10) {
          ipList = await ipSchema.find({ ...params }).sort({ '_id': 1 })
        } else {
          ipList = await ipSchema.find({ ...params }).skip((page - 1) * pageSize).limit(pageSize).sort({ '_id': 1 })
        }
        res.send({
          status: 200,
          message: `获取数据成功`,
          data: {
            items: ipList,
            total
          }
        })
      } catch (err) {
        res.send({
          status: 400,
          message: `查询失败,失败原因:${err}`
        })
      }
    })
  }

  async startSpiIp(req, res, next) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      try {
        spiIp(fields).then(rs => {
          res.send({
            status: 100,
            message: `开启成功`
          })
        }).catch(err => {
          res.send({
            status: 400,
            message: `开启失败:${err}`
          })
        })

      } catch (err) {
        res.send({
          status: 400,
          message: `开启失败:${err}`
        })
      }
    })
  }

  async distinct(req, res, next) {
    try {
      let ips = await ipSchema.distinct('ip') // 判断标志
      console.log(ips.length, 'ips');
      let datas = await ipSchema.find({}) // 所有数据
      datas.forEach((V, i) => {
        datas.forEach((v, i) => {
          if (v['ip'] === V['ip'] && V['_id'] !== v['_id']) {
            datas.splice(i, 1)
            ipSchema.findOneAndDelete({ _id: v['_id'] }).exec()
          }
        })
      })
      let data = await ipSchema.find({})
      res.send({
        status: 100,
        message: `去重成功,现在条数:${data.length}`
      })
    } catch (err) {
      console.log(err)
    }
  }

  async checkIp(req, res, next) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      const { ip } = fields
      console.log(ip)
      try {
        check(ip).then(rs => {
          console.log(rs, 'ee')
          if (rs === 1) {
            res.send({
              status: 200,
              message: `IP请求成功-状态有效`
            })
          } else {
            res.send({
              status: 100,
              message: `IP请求超过五秒-状态已失效`
            })
          }
        }).catch(er => {
          ipSchema.findOneAndDelete({ ip}).exec()
          res.send({
            status: 400,
            message: `IP超时失效-${er}--已删除`
          })
        })
      } catch (err) {
        console.log(err)
      }
    })
  }
}

export default new Ip()