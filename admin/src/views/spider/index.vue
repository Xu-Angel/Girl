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
        开启查看
        <i class="el-icon-success el-icon--right"></i>
      </el-button>
      <el-button type="danger" @click="stop('Detail')">
        停止查看
        <i class="el-icon-warning el-icon--right"></i>
      </el-button>
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
      </div>
      <ul v-if="errorPage">
        <li v-for="(item, key) in errorPage" :key="key">
          <span>错 误：</span>
          <span style="margin-left: 20px;color: crimson;">{{ item.text }}</span>
        </li>
      </ul>
      <el-button type="primary" @click="startList">
        开启查看
        <i class="el-icon-success el-icon--right"></i>
      </el-button>
      <el-button type="danger" @click="stop('List')">
        停止查看
        <i class="el-icon-warning el-icon--right"></i>
      </el-button>
    </el-card>
    <!-- IP池状态 -->
    <el-card>
      <span>IP池爬取状态:</span>
      <div v-if="ipItems[ipItems.length-1]">
        进度--
        <el-progress
          :text-inside="true"
          :stroke-width="18"
          :percentage="ipItems[ipItems.length-1].percent"
          status="success"
        ></el-progress>
        <ul>
          <li v-for="(item, key) in ipItems" :key="key">
            <span>已完成：{{ item.percent }}%</span>
            <span style="margin-left: 20px;color: darkgreen;">{{ item.text }}</span>
          </li>
        </ul>
      </div>
      <ul v-if="errorIp">
        <li v-for="(item, key) in errorIp" :key="key">
          <span>错 误：</span>
          <span style="margin-left: 20px;color: crimson;">{{ item.text }}</span>
        </li>
      </ul>
      <el-button type="primary" @click="startIp">
        开启查看
        <i class="el-icon-success el-icon--right"></i>
      </el-button>
      <el-button type="danger" @click="stop('Ip')">
        停止查看
        <i class="el-icon-warning el-icon--right"></i>
      </el-button>
    </el-card>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  name: 'SpiderStatus',
  data() {
    return {
      detailItems: [],
      listItems: [],
      ipItems: [],
      socketDetail: null,
      socketList: null,
      socketIp: null,
      errorUid: [],
      errorPage: [],
      errorIp: [],
      cookieErr: []
    }
  },
  created() {
    // 页面进来直接请求进行进度展示
    setTimeout(() => {
      this.startDetail()
    }, 10)
    setTimeout(() => {
      this.startList()
    }, 1500)
    setTimeout(() => {
      this.startIp()
    }, 3000)
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
      this.socketDetail = io(`${process.env.BASE_API}/socket/start/getDetail`)
      this.socketDetail.on('connect', () => {
        this.socketDetail.emit('start', { text: '赶紧给我开始爬详细页' })
        // 进度事件
        this.socketDetail.on('rate', data => {
          this.detailItems.push(data)
          if (this.detailItems.length === 10) {
            this.detailItems.splice(0, 1)
          }
        })
        // 无任务事件
        this.socketDetail.on('noTask', data => {
          this.$message({
            type: 'error',
            message: data.text
          })
        })
        // 异常UID事件
        this.socketDetail.on('uidErr', data => {
          this.errorUid.push(data)
          console.log(this.errorUid, data)
          if (this.errorUid.length === 10) {
            this.errorUid.splice(0, 1)
          }
        })
        // cookie错误事件
        this.socketDetail.on('cookieErr', data => {
          // console.log(data, 'ccoke')
          this.cookieErr.push(data)
          if (this.cookieErr.length === 10) {
            this.cookieErr.splice(0, 1)
          }
        })
      })
    },
    startList() {
      this.socketList = io(`${process.env.BASE_API}/socket/start/getList`)
      this.socketList.on('connect', () => {
        this.socketList.emit('start', { text: '赶紧给我开始爬列表页' })
        // 进度事件
        this.socketList.on('rate', data => {
          this.listItems.push(data)
          if (this.listItems.length === 10) {
            this.listItems.splice(0, 1)
          }
        })
        // 异常页事件
        this.socketList.on('pageErr', data => {
          this.errorPage.push(data)
          if (this.errorPage.length === 10) {
            this.errorPage.splice(0, 1)
          }
        })
        // 无任务事件
        this.socketList.on('noTask', data => {
          this.$message({
            type: 'error',
            message: data.text
          })
        })
      })
    },
    startIp() {
      this.socketIp = io(`${process.env.BASE_API}/socket/start/getIp`)
      this.socketIp.on('connect', () => {
        this.socketIp.emit('start', { text: '赶紧给我查看Ip池状态' })
        // 进度事件
        this.socketIp.on('rate', data => {
          this.ipItems.push(data)
          if (this.ipItems.length === 10) {
            this.ipItems.splice(0, 1)
          }
        })
        // 异常事件
        this.socketIp.on('ipErr', data => {
          this.errorIp.push(data)
          if (this.errorIp.length === 10) {
            this.errorIp.splice(0, 1)
          }
        })
        // 无任务事件
        this.socketIp.on('noTask', data => {
          this.$message({
            type: 'error',
            message: data.text
          })
        })
      })
    },
    stop(type) {
      this.$data[`socket${type}`].emit('stop', { text: '赶紧给我停止' })
      this.$data[`socket${type}`].close()
      this.$message({
        message: `已断开socket连接`
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

