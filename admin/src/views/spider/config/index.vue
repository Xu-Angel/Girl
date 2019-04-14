<template>
  <div class="config-container">
    <el-row style="margin-bottom: 20px;">
      <el-button type="danger" @click="detailConfigDialog=true">详细页配置</el-button>
      <!-- <el-button type="danger" @click="spiDetail">爬取详细页数据</el-button> -->
      <el-button type="danger" @click="genRealUid">生成Uid表</el-button>
      <el-button type="danger" @click="listConfigDialog=true">列表页配置</el-button>
      <el-button type="danger" @click="distinct">去重列表页数据</el-button>
    </el-row>
    <el-dialog :visible.sync="detailConfigDialog" title="请谨慎操作" width="50%">
      <el-form ref="detailConfig" :model="detailConfig" :rules="rules" label-width="100px">
        <el-form-item label="Cookie" prop="cookie">
          <el-input
            v-model="detailConfig.cookie"
            :rows="8"
            type="textarea"
            placeholder="用于模拟登陆状态爬取详细页的隐私数据"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="spiDetail">保存并开始</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 爬取列表页配置 -->
    <el-dialog :visible.sync="listConfigDialog" title="请谨慎操作" width="50%">
      <el-form ref="listConfig" :model="listConfig" :rules="rules" label-width="100px">
        <el-form-item label="区域" prop="area">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAllArea"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <el-checkbox-group v-model="listConfig.area" @change="handleCheckedAreaChange">
            <el-checkbox v-for="(city,key) in area" :label="city" :key="key">{{ city }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="页码" prop="page">
          <el-input v-model="listConfig.page" style="width: 180px;" placeholder="eg:1-500"></el-input>
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
          <el-button type="warning" @click="updateListConfig">保存并开始</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getSipderConfig } from '@/api/common'
import { updateTaskConfig, distinctGirl, spiDetailByRealUid, exportRealUid } from '@/api/spider'
export default {
  data() {
    return {
      age: [],
      height: [],
      education: [],
      marriage: [],
      checkAllArea: false,
      area: [],
      isIndeterminate: true,
      listConfigDialog: false,
      detailConfigDialog: false,
      listConfig: {
        area: ['广东'],
        education: '',
        marriage: ''
      },
      detailConfig: {
        cookie: ''
      },
      rules: {
        cookie: [
          { required: true, message: '请输入Cookie', trigger: 'blur' },
          { min: 100, max: 1000, message: '长度在 100 到 1000 个字符', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '  请选择区域', trigger: 'blur' }
        ],
        page: [
          { required: true, message: '  请选择输入页码', trigger: 'blur' }
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
      this.detailConfig.cookie = rs.data.cookie
    })
  },
  methods: {
    updateListConfig() {
      this.$refs['listConfig'].validate((valid) => {
        if (valid) {
          getSipderConfig().then(rs => {
            if (rs.data.listStatus === 1) {
              this.$message({
                type: 'error',
                message: '当前脚本有任务在跑哦，请耐心等待完成~'
              })
              return
            }
            this.$confirm('此任务开始后不可停止, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              // console.log(this.listConfig)
              // return
              this.listConfig.startPage = Number(this.listConfig.page.split('-')[0])
              this.listConfig.endPage = Number(this.listConfig.page.split('-')[1])
              updateTaskConfig({ ...this.listConfig })
              this.listConfigDialog = false
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '任务已取消'
              })
            })
          })
        }
      })
    },
    spiDetail() {
      this.$refs['detailConfig'].validate((valid) => {
        if (valid) {
          getSipderConfig().then(rs => {
            if (rs.data.detailStatus === 1) {
              this.$message({
                type: 'error',
                message: '当前脚本有任务在跑哦，请耐心等待完成~'
              })
              return
            }
            this.$confirm('此任务开始后不可停止, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              spiDetailByRealUid({ ...this.detailConfig }).then(rs => {
                setTimeout(() => {
                  this.$message({
                    type: 'success',
                    message: rs.data
                  })
                }, 2000)
              })
              this.detailConfigDialog = false
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '任务已取消'
              })
            })
          })
        }
      })
    },
    genRealUid() {
      this.$message({
        message: 'v1.1.0版本，此脚本已废除',
        type: 'warning'
      })
      /* eslint-disable */
      return
      exportRealUid()
    },
    distinct() {
      this.$message({
        message: 'v0.1版本，此脚本已废除',
        type: 'warning'
      })
      /* eslint-disable */
      return
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
    },
    handleCheckAllChange(val) {
      this.listConfig.area = val ? this.area : []
      this.isIndeterminate = false
    },
    handleCheckedAreaChange(value) {
      const checkedCount = value.length
      this.checkAllArea = checkedCount === this.area.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.area.length
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
.el-checkbox {
  margin-right: 15px;
  line-height: 15px;
}
</style>

