<template>
  <div class="app-container">
    <el-card>
      <span>详情页爬取任务:</span>
      <div v-if="detailItems[detailItems.length-1]">
        进度--
        <el-progress
          :text-inside="true"
          :stroke-width="18"
          :percentage="detailItems[detailItems.length-1].percent"
          status="success"
        ></el-progress>
        <ul>
          <li v-for="(item, key) in detailItems" :key="key">
            <span>已完成：{{ item.percent }}%</span>
            <span style="margin-left: 20px;color: darkgreen;">{{ item.text }}</span>
          </li>
        </ul>
        <ul v-if="errorUid">
          <li v-for="(item, key) in errorUid" :key="key">
            <span>错误UID：</span>
            <span style="margin-left: 20px;color: crimson;">{{ item.text }}</span>
          </li>
        </ul>
      </div>
      <ul v-if="cookieErr">
        <li v-for="(item, key) in cookieErr" :key="key">
          <span>错误COOKIE：</span>
          <span style="margin-left: 20px;color: crimson;">{{ item.text }}</span>
        </li>
      </ul>
      <el-button type="primary" @click="startDetail">
        开启
        <i class="el-icon-upload el-icon--right"></i>
      </el-button>
      <!-- <el-button type="primary" @click="stopDetail">
        停止连接
      </el-button>-->
    </el-card>
    <el-card>
      <span>列表页爬取任务:</span>
      <div v-if="listItems[listItems.length-1]">
        进度--
        <el-progress
          :text-inside="true"
          :stroke-width="18"
          :percentage="listItems[listItems.length-1].percent"
          status="success"
        ></el-progress>
        <ul>
          <li v-for="(item, key) in listItems" :key="key">
            <span>已完成：{{ item.percent }}%</span>
            <span style="margin-left: 20px;color: darkgreen;">{{ item.text }}</span>
          </li>
        </ul>
        <ul v-if="errorPage">
          <li v-for="(item, key) in errorPage" :key="key">
            <span>错 误：</span>
            <span style="margin-left: 20px;color: crimson;">{{ item.text }}</span>
          </li>
        </ul>
      </div>
      <el-button type="primary" @click="startList">
        开启
        <i class="el-icon-upload el-icon--right"></i>
      </el-button>
    </el-card>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  data() {
    return {
      detailItems: [],
      listItems: [],
      sockteDetail: null,
      sockteList: null,
      errorUid: [],
      errorPage: [],
      cookieErr: []
    }
  },
  created() {
    // 页面进来直接请求进行进度展示
    this.sockteDetail = io(`${process.env.BASE_API}/socket/start/getDetail`)
    this.startDetail()
    this.socketLsit = io(`${process.env.BASE_API}/start/getList`)
    this.startList()
  },
  methods: {
    testSocket(socket) {
      socket.on('error', (err) => {
        this.$message({
          type: 'error',
          message: `发生错误${err}当前任务通道尚未找到，先去参数配置页开点任务吧？`
        })
      })
    },
    startDetail() {
      // this.testSocket(this.sockteDetail)
      this.sockteDetail.on('connect', () => {
        this.sockteDetail.emit('start', { text: '赶紧给我开始爬详细页' })
        // 进度事件
        this.sockteDetail.on('rate', data => {
          this.detailItems.push(data)
          if (this.detailItems.length === 10) {
            this.detailItems.splice(0, 1)
          }
        })
        // 异常UID事件
        this.sockteDetail.on('uidErr', data => {
          this.errorUid.push(data)
          console.log(this.errorUid, data)
          if (this.errorUid.length === 10) {
            this.errorUid.splice(0, 1)
          }
        })
        // cookie错误事件
        this.sockteDetail.on('cookieErr', data => {
          console.log(data, 'ccoke')
          this.cookieErr.push(data)
          if (this.cookieErr.length === 10) {
            this.cookieErr.splice(0, 1)
          }
        })
      })
    },
    startList() {
      // 当可以连接的时候 说明有任务在做 可以命令开始
      // this.testSocket(this.socketLsit)

      this.socketLsit.on('connect', () => {
        console.log(this.socketLsit) // true
        this.socketLsit.emit('start', { text: '赶紧给我开始爬列表页' })
        // 进度事件
        this.socketLsit.on('rate', data => {
          this.listItems.push(data)
          if (this.listItems.length === 10) {
            this.listItems.splice(0, 1)
          }
        })
        // 异常页事件
        this.socketLsit.on('pageErr', data => {
          this.errorPage.push(data)
          console.log(this.errorUid, data)
          if (this.errorPage.length === 10) {
            this.errorPage.splice(0, 1)
          }
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
.el-card {
  display: inline-block;
}
</style>

