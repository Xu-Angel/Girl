<template>
  <div class="config-container">
    <el-row style="margin-bottom: 20px;">
      <el-button type="danger" @click="detailConfigDialog=true">详细页配置</el-button>
    </el-row>
            <el-dialog
  :visible.sync="detailConfigDialog"
  title="请谨慎操作"
  width="50%"
  :before-close="handleClose">
    <el-form :model="detailConfig" :rules="rules" ref="detailConfig" label-width="100px">
      <el-form-item label="Cookie" prop="cookie">
        <el-input type="textarea" placeholder="用于模拟登陆状态爬取详细页的隐私数据" v-model="detailConfig.cookie"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm('detailConfig')">保存并开始</el-button>
      </el-form-item>
    </el-form>
    </el-dialog>
    <!-- 爬取列表页配置 -->
    <el-row style="margin-bottom: 20px;">
      <el-button type="danger" @click="listConfigDialog=true">列表页配置</el-button>
      <el-button type="danger" @click="distinct">去重列表页数据</el-button>
    </el-row>
        <el-dialog
  :visible.sync="listConfigDialog"
  title="请谨慎操作"
  width="50%"
  :before-close="handleClose">
   <el-form :model="listConfig" ref="listConfig" :rules="rules" label-width="100px">
      <el-form-item label="区域" prop="area">
        <el-select style="width: 180px;" v-model="listConfig.area" placeholder="请选择爬取区域">
          <el-option v-for="(item, key) in area" :key="key" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学历">
        <el-select
          v-model="listConfig.education"
          clearable
          style="width: 180px;"
          placeholder="请选择学历"
        >
          <el-option
            v-for="(item, key) in education"
            :key="key"
            :label="item"
            :value="(key + 1) * 10"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model="listConfig.marriage"
          clearable
          style="width: 180px;"
          placeholder="请选择状态"
        >
          <el-option v-for="(item, key) in marriage" :key="key" :label="item" :value="key + 1"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="标签">
          <el-radio-group v-model="listConfig.type" size="medium">
            <el-radio border label="高级白领"></el-radio>
            <el-radio border label="空姐"></el-radio>
        </el-radio-group>
      </el-form-item>-->
      <!-- <el-form-item label="性别">
          <el-radio-group>
            <el-radio label="妹子"></el-radio>
            <el-radio label="汉子" disabled="true"></el-radio>
          </el-radio-group>
      </el-form-item>-->
      <el-form-item>
        <el-button @click="updateListConfig">保存并开始</el-button>
      </el-form-item>
    </el-form>
</el-dialog>
  </div>
</template>

<script>
import { getSipderConfig } from '@/api/common'
import { updateTaskConfig, distinctGirl } from '@/api/spider'

export default {
  data() {
    return {
      age: [],
      height: [],
      education: [],
      marriage: [],
      listConfigDialog: false,
      detailConfigDialog: false,
      listConfig: {
        area: '',
        education: '',
        marriage: ''
      },
      detailConfig: {
        cookie: ''
      },
      rules: {
        cookie: [
          { required: true, message: '请输入Cookie', trigger: 'blur' },
          { min: 100, max: 500, message: '长度在 100 到 500 个字符', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '  请选择区域', trigger: 'blur' },
        ]
      }
    }
  },
  created() {
    getSipderConfig().then(rs => {
      console.log(rs)
      this.area = rs.data.area
      this.height = rs.data.height
      this.age = rs.data.age
      this.education = rs.data.education
      this.marriage = rs.data.marriage
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false;
        }
      });
    },
    updateListConfig() {
      this.$refs['listConfig'].validate((valid) => {
        if (valid) {
          this.$confirm('此任务开始后不可停止, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateTaskConfig({ ...this.listConfig })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '任务已取消'
          })
        })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    distinct() {
      this.$confirm('此任务开始后不可停止, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
          distinctGirl()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '任务已取消'
          })
        })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

