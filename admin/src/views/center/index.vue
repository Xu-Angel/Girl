<template>
  <div class="app-container">
    <div style="margin-bottom: 20px">
      管理员
      <span style="color:#1890ff;font-size:22px">{{ name }}</span>你好
    </div>
    <el-card>
      <!-- 图片上传 -->
      <el-upload
        :action="url"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :data="obj"
        class="avatar-uploader"
      >
        <img v-if="avatar" :src="avatar" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-card>
    <el-card>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        status-icon
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" prop="oldPass">
          <el-input v-model="form.oldPass" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input v-model="form.pass" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="newPass">
          <el-input v-model="form.newPass" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import store from '../../store'
import { updateInfo } from '@/api/admin'

export default {
  data() {
    const checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
      setTimeout(() => {
        if (value.legth < 18 && value.legth > 5) {
          callback(new Error('用户名长度为5-18个字符'))
        } else {
          callback()
        }
      }, 1000)
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      url: `${process.env.BASE_API}/admin/updateAvatar`,
      dialogImageUrl: '',
      dialogVisible: false,
      obj: {},
      form: {
        pass: '',
        checkPass: '',
        name: ''
      },
      rules: {
        oldPass: [
          { min: 5, max: 15, message: '密码长度在 5 到 15 个字符', trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        newPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        name: [
          { validator: checkName, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'id',
      'avatar'
    ])
  },
  created() {
    this.obj = {
      id: this.id
    }
    this.form.name = this.name
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if (res.status === 200) {
        this.$message({
          message: res.message,
          type: 'success',
          duration: 2 * 1000
        })
        store.dispatch('GetInfo')
      } else {
        this.$message({
          message: res.message,
          type: 'error',
          duration: 3 * 1000
        })
      }
    },
    beforeAvatarUpload(file) {
      const isImg = ['image/jpeg', 'image/png'].includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isImg) {
        this.$message.error('上传头像只能是图片!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isImg && isLt2M
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateInfo({ ...this.form, id: this.id })
          store.dispatch('GetInfo')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.el-card {
  display: inline-block;
}
</style>

