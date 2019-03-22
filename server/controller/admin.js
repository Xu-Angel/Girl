// 处理admin 表
// import { Admin as AdminModel } from '../model/admin'
import AdminModel from "../model/admins"
import formidable from 'formidable'
import crypto from 'crypto'
import Base from './basePrototype'
import config from 'config-lite'
class Admin extends Base {
  constructor() {
    super()
    this.login = this.login.bind(this)
    // this.register = this.register.bind(this)
    this.encryption = this.encryption.bind(this)
    // this.updateAvatar = this.updateAvatar.bind(this)
  }
  async login(req, res, next) {
    const form = new formidable.IncomingForm();
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
      const { username, password, status = 1 } = fields;
      try {
        if (!username) {
          throw new Error('用户名参数错误')
        } else if (!password) {
          throw new Error('密码参数错误')
        }
      } catch (err) {
        console.log(err.message, err);
        res.send({
          status: 400,
          type: 'GET_ERROR_PARAM',
          message: err.message,
        })
        return
      }
      const newpassword = this.encryption(password)
      try {
        const admin = await AdminModel.findOne({ username })
        if (!admin) {
          console.log(admin, 'admin')
          const role = status == 1 ? 1 : 2
          const admin_id = await this.getId('admin_id');
          const newAdmin = {
            username,
            password: newpassword,
            id: admin_id,
            role
          }
          await AdminModel.create(newAdmin)
          res.send({
            status: 200,
            success: '注册管理员成功',
            token: config.token,
            data: {
              role: admin.role,
              avatar: admin.avatar,
              name: admin.username
            }
          })
        } else if (newpassword.toString() != admin.password.toString()) {
          console.log('管理员登录密码错误');
          res.send({
            status: 400,
            type: 'ERROR_PASSWORD',
            message: '该用户已存在，密码输入错误',
          })
        } else {
          req.session.admin_id = admin.id;
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
        console.log('登录管理员失败', err);
        res.send({
          status: 400,
          type: 'LOGIN_ADMIN_FAILED',
          message: '登录管理员失败',
        })
      }
    })
  }

  async logout(req, res, next) {
    try {
      delete req.session.admin_id;
      res.send({
        status: 200,
        success: '退出成功'
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
  async getAdminInfo(req, res, next) {
    console.log('getinfo api')
    const admin_id = req.session.admin_id;
    console.log(admin_id, 'id');
    if (!admin_id || !Number(admin_id)) {
      console.log('获取管理员信息的session失效');
      res.send({
        status: 400,
        type: 'ERROR_SESSION',
        message: '获取管理员信息失败'
      })
      return
    }
    try {
      const info = await AdminModel.findOne({ id: admin_id }, '-_id -__v -password');
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
  encryption(password) {
    const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
    return newpassword
  }
  Md5(password) {
    const md5 = crypto.createHash('md5');
    return md5.update(password).digest('base64');
  }
}

export default new Admin()