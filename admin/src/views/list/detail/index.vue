<template>
  <div class="app-container">
    <!-- start -->
    <div style="text-align: right;padding-bottom: 20px;">
      <el-button type="success" @click="like(1)">心动♡ʚ♡ɞ(ू• ̮ •ू❁)</el-button>
      <el-button type="info" @click="like(0)">不心动💔</el-button>
      <el-button type="danger" @click="findme">联系我</el-button>
      <el-button class="return-list" icon="el-icon-back" @click="returnList">返回列表</el-button>
    </div>
    <div v-loading="isloading">
      <el-row>
        <div>
          <span>自我介绍:</span>
          <span v-html="自我介绍"></span>
          <div>
            我
            <span class="margin-top l-height">{{ about }}</span>
            <span v-for="(item, key, index ) in selfMsg" :key="index" class="l-height">
              ,
              <span style="padding:5px;">{{ key }}</span>:
              <span>{{ item }}</span>
            </span>。
          </div>
          <div v-if="情感故事" style="margin-bottom: 10px">
            <span>情感故事：</span>
            <span v-html="情感故事"></span>
          </div>
        </div>
      </el-row>
      <div>
        <el-card>
          <Viewer ref="viewer" :images="bigImg" class="img-container" >
            <img
              v-for="(item, key, index) in bigImg"
              :key="index"
              :src="item"
              style="width: 80px; height: 80px;margin: 0 auto;"
            >
          </Viewer>
        </el-card>
        <!-- 图片end -->
        <!-- </el-col> -->
        <el-card v-if="爱情DNA">
          <h3>爱情DNA</h3>
          <ul class="DNA_xq" v-html="爱情DNA"></ul>
        </el-card>
        <!-- 择偶要求 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>我的择偶要求</span>
          </div>
          <div v-for="(item, key , index) in 择偶要求" :key="index" class="text item">
            <span>{{ key }}</span>:
            <span>{{ item }}</span>
          </div>
        </el-card>
        <!-- 生活方式 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>生活方式</span>
          </div>
          <div v-for="(itemList, key, index) in 生活方式" :key="index">
            <div>{{ key }}:</div>
            <div class>
              <div v-for="(item, key, index) in itemList" :key="index" class="text item">
                <span>{{ key }}</span>:
                <span>{{ item }}</span>
              </div>
            </div>
          </div>
        </el-card>
        <!-- 经济实力 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>经济实力</span>
          </div>
          <div v-for="(item, key, index) in 经济实力" :key="index" class="text item">
            <span>{{ key }}</span>:
            <span>{{ item }}</span>
          </div>
        </el-card>
        <!-- 工作学习 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>工作学习</span>
          </div>
          <span>工作</span>
          <div v-for="(item, key, index) in 工作学习['工作']" :key="index" class="text item">
            <span>{{ key }}</span>:
            <span>{{ item }}</span>
          </div>
          <span>学习</span>
          <div v-html="工作学习['学习']"></div>
        </el-card>
        <!-- 婚姻观念 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>婚姻观念</span>
          </div>
          <div v-for="(item, key, index) in 婚姻观念" :key="index">
            <div>{{ key }}:</div>
            <div v-for="(detail, key, index) in item" :key="index" class="text item">
              <span>{{ key }}</span>:
              <span>{{ detail }}</span>
            </div>
          </div>
        </el-card>
        <el-dialog :visible.sync="imgDialogVisible" :title="title">
          <img :src="dialogImgUrl" style="max-width: 90%; margin: 0 auto; display: block;" alt>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { getDetail, updateTop } from '@/api/girl'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer/src/component.vue'

export default {
  name: 'GirlDetail',
  components: {
    Viewer
  },
  data() {
    return {
      isloading: true,
      detail: {},
      about: '',
      uid: '',
      title: '',
      selfMsg: {},
      择偶要求: {},
      生活方式: {},
      经济实力: {},
      工作学习: {},
      婚姻观念: {},
      自我介绍: '',
      爱情DNA: '',
      情感故事: '',
      carousel: {},
      dialogImgUrl: '',
      imgDialogVisible: false,
      bigImg: null,
      pageNum: 1,
      query: null
    }
  },
  created() {
    this.uid = this.$route.query.uid
    this.query = this.$route.query
    this.title = `第${this.uid}号佳丽的大图`
    this._getDetail({ uid: this.uid })
  },
  mounted() {

  },
  methods: {
    like(type) {
      updateTop({ realUid: this.uid, type })
    },
    returnList() {
      this.$router.push({
        path: '/girls/list',
        query: {
          ...this.query
        }
      })
    },
    findme() {
      window.open(`http://www.shijijiayuan.com/${this.uid}`)
    },
    showAdvImage(row) {
      this.imgDialogVisible = true
      console.log(this.bigImg, row)
      this.dialogImgUrl = this.bigImg[row]
    },
    _getDetail(uid) {
      getDetail(uid).then(rs => {
        console.log(rs)
        const { detail } = rs.data
        const { 学历, 身高, 购车, 月薪, 住房, 体重, 星座, 民族, 属相, 血型, 概要, 择偶要求, 生活方式, 经济实力, 工作学习, 婚姻观念, 爱情DNA, 自我介绍, 情感故事 } = detail

        this.carousel = detail.照片.small
        this.bigImg = detail.照片.big
        this['about'] = 概要
        this.selfMsg['学历'] = 学历
        this.selfMsg['身高'] = 身高
        this.selfMsg['购车'] = 购车
        this.selfMsg['月薪'] = 月薪
        this.selfMsg['住房'] = 住房
        this.selfMsg['体重'] = 体重
        this.selfMsg['星座'] = 星座
        this.selfMsg['民族'] = 民族
        this.selfMsg['属相'] = 属相
        this.selfMsg['血型'] = 血型
        this.爱情DNA = unescape((爱情DNA).replace(/&#x/g, '%u').replace(/;/g, ''))
        this.自我介绍 = 自我介绍
        this['择偶要求'] = 择偶要求
        this['生活方式'] = 生活方式
        this['经济实力'] = 经济实力
        this['工作学习'] = 工作学习
        this['婚姻观念'] = 婚姻观念
        this['情感故事'] = 情感故事

        // this['嗜好习惯'] = 生活方式.嗜好习惯;
        // this['宠物'] = 生活方式.宠物;
        // this['家务'] = 生活方式.家务;
        this.isloading = false
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import './dna.scss';
.img-container {
  width: 100px;
  // height: 100px;
  margin: 10px 0;
}
.el-card {
  display: inline-block;
}
.app-container {
  width: 100%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} /* carousel end */

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 100%;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
/* card end */
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

// .box-card {
//   margin-top: 20px;
//   width: 100%;
// }
/* adcard end */
.l-height {
  height: 30px;
  line-height: 30px;
}
</style>
