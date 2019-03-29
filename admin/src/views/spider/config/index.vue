<template>
  <div class="config-container">
    <el-card>
      <el-row style="margin-bottom: 20px;">
        <el-tag type="error" hit="true">爬取详细页配置</el-tag>
      </el-row>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="Cookie" prop="cookie">
          <el-input type="textarea" placeholder="用于模拟登陆状态爬取详细页的隐私数据" v-model="ruleForm.cookie"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm('ruleForm')">保存配置</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 爬取列表页配置 -->
    <el-card style="margin-top: 20px;">
      <el-row style="margin-bottom: 20px;">
        <el-tag type="error" hit="true">爬取列表页配置</el-tag>
      </el-row>
      <el-form
        :model="ruleForm"
        :rules="rules1"
        ref="ruleForm1"
        label-width="100px"
      >
        <el-form-item label="realUid" prop="name">
          <div style="width:180px;">
            <el-input placeholder="模拟登陆" v-model="ruleForm.name"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="开始页码" prop="name" style="width:180px">
            <el-input v-model="ruleForm.pageRange"></el-input>
        </el-form-item>
        <el-form-item label="结束页码" prop="name" style="width:180px">
            <el-input v-model="ruleForm.pageRange"></el-input>
        </el-form-item>
        <el-form-item label="区域" prop="region">
          <el-select style="width: 180px;" v-model="ruleForm.region" placeholder="请选择爬取区域">
            <el-option v-for="(item, key) in area" :key="key" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="region">
          <el-select v-model="search.age" clearable style="width: 180px;" placeholder="请选择年龄">
            <el-option v-for="(item, key) in age" :key="key" :label="item + '岁'" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学历" prop="region">
          <el-select v-model="search.education" clearable style="width: 180px;" placeholder="请选择学历">
            <el-option v-for="(item, key) in education" :key="key" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="region">
          <el-select v-model="search.marriage" clearable style="width: 180px;" placeholder="请选择状态">
            <el-option v-for="(item, key) in marriage" :key="key" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="年龄" prop="region">
          <el-select v-model="search.age" clearable style="width: 180px;" placeholder="请选择年龄">
            <el-option v-for="(item, key) in age" :key="key" :label="item + '岁'" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="性别" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="妹子"></el-radio>
            <el-radio label="汉子" disabled="true"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm('ruleForm')">保存配置</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getSipderConfig } from '@/api/common'
export default {
  data() {
    return {
      age: [],
      height: [],
      education: [],
      marriage: [],
      search: {
        area: '',
        age: '',
        height: '',
        realUid: '',
        status: ''
      },
      ruleForm: {
        cookie: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        cookie: [
          { required: true, message: '请输入Cookie', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        pageRange: [
          { required: true, message: '请输入Cookie', trigger: 'blur' }
        ]
      }
    };
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
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

