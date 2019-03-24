<template>
  <div class="app-container">
    <!-- start -->
    <el-row :gutter="20">
      <!-- <el-col v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 2 : 0"> -->
        <el-card :body-style="{ padding: '0px' }" class="flex-card">
          <el-col :span="8">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="item in carousel" :key="item">
                <!-- <h3>{{ item }}</h3> -->
                <img :src="item" alt="" style="width:100%; height:100%">
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <el-col :span='16'>
            <div style="padding: 14px;" class="">
              <div class="l-height">
                <span>{{uid}}</span>
              </div>
              <div class="margin-top l-height">
              {{ about }}
              </div>
              <el-row class="" style="display:flex;">
                <el-col :span='8'>
                  <div v-for="(item, key ) in selfMsg" :key="item" class="l-height">
                    <span>{{key}}</span>:<span>{{item}}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-card>
      <!-- </el-col> -->
    </el-row>

    <!-- 择偶要求 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>她的择偶要求</span>
      </div>
      <div v-for="(item, key) in 择偶要求" :key="item" class="text item">
        <span>{{key}}</span>: <span>{{item}}</span>
      </div>
    </el-card>
    <!-- 生活方式 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>生活方式</span>
      </div>
      <div v-for="(itemList, key) in 生活方式" :key="itemList" class="text item">
        <div>{{key}}:</div>
        <div class="">
          <div v-for="(item, key) in itemList" :key="item" class="">
            <span>{{key}}</span>: <span>{{item}}</span>
          </div>
        </div>
      </div>
    </el-card>
    <!-- 经济实力 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>经济实力</span>
      </div>
      <div v-for="(item, key) in 经济实力" :key="item" class="text item ">
        <span>{{key}}</span>: <span>{{item}}</span>
      </div>
    </el-card>
    <!-- 工作学习 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>工作学习</span>
      </div>
      <div v-for="(item, key) in 工作学习" :key="item" class="text item">
        <div>{{key}}:</div>
        <div v-for="(detail, key) in item" :key="detail">
          <!-- <span>{{key}}</span>: <div v-html="detail"></div> -->
        </div>
      </div>
    </el-card>
    <!-- 婚姻观念 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>婚姻观念</span>
      </div>
      <div v-for="(item, key) in 婚姻观念" :key="item" class="text item">
        <div>{{key}}:</div>
        <div v-for="(detail, key) in item" :key="detail">
          <span>{{key}}</span>: <span>{{detail}}</span>
        </div>
      </div>
    </el-card>
  </div>

</template>

<script>
import { getDetail } from '@/api/table'

export default {

  data() {
    return {
      detail: {},
      about: '',
      uid: '',
      selfMsg: {},
      择偶要求: {},
      生活方式: {},
      经济实力: {},
      工作学习: {
        学习: ''
      },
      婚姻观念: {},
      carousel
    }
  },
  created() {
    // console.log();
    this._getDetail({uid: this.$route.query.uid})
  },
  mounted() {

  },
  methods: {
    _getDetail(uid) {
    getDetail(uid).then(rs => {
      console.log(rs);
      var { detail } = rs.data;
      let { uid, 学历, 身高, 购车, 月薪, 住房, 体重, 星座, 民族, 属相, 血型, 概要, 择偶要求, 生活方式, 经济实力, 工作学习,婚姻观念  } = detail;

      this.carousel = detail.照片.big;
      // this.uid = uid;
      // this["about"] = 概要;
      // this.selfMsg['学历'] = 学历;
      // this.selfMsg['身高'] = 身高;
      // this.selfMsg['购车'] = 购车;
      // this.selfMsg['月薪'] = 月薪;
      // this.selfMsg['住房'] = 住房;
      // this.selfMsg['体重'] = 体重;
      // this.selfMsg['星座'] = 星座;
      // this.selfMsg['民族'] = 民族;
      // this.selfMsg['属相'] = 属相;
      // this.selfMsg['血型'] = 血型;

      // this['择偶要求'] = 择偶要求;
      // this['生活方式'] = 生活方式;
      // this['经济实力'] = 经济实力;
      // this['工作学习'] = 工作学习;
      // this['婚姻观念'] = 婚姻观念;

      // this['嗜好习惯'] = 生活方式.嗜好习惯;
      // this['宠物'] = 生活方式.宠物;
      // this['家务'] = 生活方式.家务;
    })
    }
  }
}
</script>
<style scoped>
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

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }/* carousel end */

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
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
  /* card end */
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    margin-top: 20px;
    width: 100%;
  }
  /* adcard end */
  .l-height {
    height: 30px;
    line-height: 30px;
  }
</style>
