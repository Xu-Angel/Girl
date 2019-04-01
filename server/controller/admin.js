import AdminModel from "../model/admins"
import formidable from 'formidable'
import crypto from 'crypto'
import Base from './basePrototype'
import config from 'config-lite'
class Admin extends Base {
  constructor() {
    super()
    this.login = this.login.bind(this)
    this.encryption = this.encryption.bind(this)
  }
  /**
   * 登录/注册接口
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async login(req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      console.log(fields);
      if (err) {
        res.send({
          status: 100,
          message: '表单信息错误'
        })
        return
      }
      const { username, password, status = 1 } = fields
      try {
        if (!username) {
          throw new Error('用户名参数错误')
        } else if (!password) {
          throw new Error('密码参数错误')
        }
      } catch (err) {
        console.log(err.message, err)
        res.send({
          status: 400,
          message: err.message
        })
        return
      }
      const newpassword = this.encryption(password)
      try {
        const admin = await AdminModel.findOne({ username })
        if (!admin) {
          const role = status == 1 ? 1 : 2
          const admin_id = await this.getId('admin_id')
          const newAdmin = {
            username,
            password: newpassword,
            id: admin_id,
            role,
            createTime: new Date()
          }
          let admin = await AdminModel.create(newAdmin)
          res.send({
            status: 200,
            message: '注册管理员成功',
            token: config.token,
            data: {
              role: admin.role,
              avatar: admin.avatar,
              name: admin.username,
              createTime: admin.createTime
            }
          })
        } else if (newpassword.toString() != admin.password.toString()) {
          console.log('管理员登录密码错误')
          res.send({
            status: 400,
            message: '该用户已存在，密码输入错误'
          })
        } else {
          req.session.admin_id = admin.id
          req.session.role = admin.role
          res.send({
            status: 200,
            message: '登录成功',
            token: config.token,
            data: {
              role: admin.role,
              avatar: admin.avatar,
              name: admin.username
            }
          })
        }
      } catch (err) {
        res.send({
          status: 400,
          message: '登录管理员失败'
        })
      }
    })
  }
  /**
   * 退出登录
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async logout(req, res, next) {
    try {
      delete req.session.admin_id
      res.send({
        status: 200,
        message: '退出成功'
      })
    } catch (err) {
      console.log('退出失败', err)
      res.send({
        status: 400,
        message: '退出失败'
      })
    }
  }
  // async updateAvatar(req, res, next) {
  //   const admin_id = req.params.admin_id;
  //   if (!admin_id || !Number(admin_id)) {
  //     console.log('admin_id参数错误', admin_id)
  //     res.send({
  //       status: 0,
  //       type: 'ERROR_ADMINID',
  //       message: 'admin_id参数错误',
  //     })
  //     return
  //   }

  //   try {
  //     const image_path = await this.getPath(req);
  //     await AdminModel.findOneAndUpdate({ id: admin_id }, { $set: { avatar: image_path } });
  //     res.send({
  //       status: 1,
  //       image_path,
  //     })
  //     return
  //   } catch (err) {
  //     console.log('上传图片失败', err);
  //     res.send({
  //       status: 0,
  //       type: 'ERROR_UPLOAD_IMG',
  //       message: '上传图片失败'
  //     })
  //     return
  //   }
  // }
  /**
   * 获取管理员列表数据
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async getList(req, res, next) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send({
          status: 100,
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
          message: err.message,
        })
        return
      }
      try {
        const total = await AdminModel.count({ ...params })
        let admin = null
        if (total < 10) {
          admin = await AdminModel.find({ ...params }).sort({ 'id': -1 })
        } else {
          admin = await AdminModel.find({ ...params }).skip((page - 1) * pageSize).limit(pageSize).sort({ 'id': -1 })
        }
        let items = []
        admin.forEach(v => {
          items.push({
            role: v.role === 1 ? '普通管理员' : '超级管理员',
            username: v.username,
            avatar: v.avatar,
            id: v.id,
            createTime: v.createTime
          })
        })
        res.send({
          status: 200,
          message: `获取数据成功`,
          data: {
            items,
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


  /**
   * 获取管理员信息
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async getAdminInfo(req, res, next) {
    console.log('getinfo api')
    const admin_id = req.session.admin_id;
    console.log(admin_id, 'id')
    if (!admin_id || !Number(admin_id)) {
      console.log('获取管理员信息的session失效')
      res.send({
        status: 400,
        type: 'ERROR_SESSION',
        message: '获取管理员信息失败'
      })
      return
    }
    try {
      const info = await AdminModel.findOne({ id: admin_id }, '-_id -__v -password')
      if (!info) {
        throw new Error('未找到当前管理员')
      } else {
        res.send({
          status: 200,
          data: info
        })
      }
    } catch (err) {
      console.log('获取管理员信息失败');
      res.send({
        status: 0,
        type: 'GET_ADMIN_INFO_FAILED',
        message: '获取管理员信息失败'
      })
    }
  }

  async delAdmin(req, res, next) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      if (req.session.role !== 2) {
        res.send({
          status: 100,
          message: '对不起，你没有权限操作~'
        })
        return
      }
      try {
        const { username } = fields
        const user = await AdminModel.find({ username })
        if (user[0].role === 2) {
          res.send({
            status: 100,
            message: '对不起，超级管理员不能删除~'
          })
          return
        }

        await AdminModel.findOneAndDelete({ username })
        res.send({
          status: 200,
          message: '删除成功~'
        })
      } catch (error) {
        res.send({
          status: 400,
          message: `操作失败：${error}~`
        })
      }

    })
  }

  encryption(password) {
    const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password))
    return newpassword
  }
  Md5(password) {
    const md5 = crypto.createHash('md5')
    return md5.update(password).digest('base64')
  }
}

export default new Admin()