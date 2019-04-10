<template>
  <div class="app-container">
    <div class="search-container">
      <div class="fl">
        <span class="fl" style="margin-right:10px;">
          <el-input v-model="pageRange" placeholder="爬取页数eg:1-20"></el-input>
        </span>
        <el-button type="primary" @click="spiIp">爬取</el-button>
      </div>
      <div class="fr">
        <el-button type="primary" @click="distinctIp">IP池去重</el-button>
        <el-button type="primary" @click="spiIpPool">IP池</el-button>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      style="width: 100%"
      @selection-change="selectionChange"
    >
      <el-table-column type="selection" width="38"></el-table-column>
      <el-table-column prop="createTime" align="center" label="生成时间"></el-table-column>
      <el-table-column prop="ip" align="center" label="IP"></el-table-column>
      <el-table-column prop="ori" label="来源" align="center"></el-table-column>
      <el-table-column prop="speed" label="速度" align="center"></el-table-column>
      <el-table-column prop="address" label="地址" align="center"></el-table-column>
      <el-table-column prop="type" label="类型" align="center"></el-table-column>
      <el-table-column align="center" prop="realUid" label="操作">
        <template slot-scope="scope">
          <el-button :loading="false" @click="testIp(scope.row.ip, this)">测试</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        :total="total"
        :current-page="currentPage"
        :page-sizes="[10,20,30,40,50,60,70,80,90,100]"
        :page-size="pageSize"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { startSpiIp, getIpList, checkIp, distinct, startSpiIpPool } from '@/api/ip'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        未婚: 'success',
        // draft: 'gray',
        离异: 'danger',
        false: 'gray',
        true: 'success'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      currentPage: 1,
      total: 10000,
      pageSize: 10,
      pageRange: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleSizeChange() { },
    selectionChange(rows) {

    },
    handleCurrentChange(changePage) {
      // 重新请求本路由页 回到顶部
      this.$router.push({
        query: {
          pageNum: changePage
        }
      })
      this.currentPage = changePage
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true

      getIpList({
        page: this.currentPage,
        pageSize: this.pageSize,
        ...this.search
      }).then(response => {
        this.list = response.data.items
        this.list.map(v => { v.createTime = new Date(v.createTime).toLocaleString() })
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleSearch() {
      console.log(this.search)
      this.currentPage = 1
      this.fetchData()
    },
    testIp(ip, t) {
      console.log(t)
      // TODO: 发起请求
      console.log(ip)
      this.listLoading = true
      checkIp({
        ip
      }).then(rs => {
        this.listLoading = false
        this.fetchData()
        console.log(rs)
      })
    },
    spiIp() {
      startSpiIp({
        start: Number(this.pageRange.split('-')[0]) || 1,
        end: Number(this.pageRange.split('-')[1]) || 20
      })
    },
    spiIpPool() {
      startSpiIpPool()
    },
    distinctIp() {
      this.listLoading = true
      distinct().then(rs => {
        this.fetchData()
      })
    }
  }
}
</script>
<style>
.el-table .success-row {
  background: #f0f9eb;
}
.span span {
  height: 18px;
  line-height: 18px;
  border: 1px solid #f4d6b3;
  background-color: #fff8f0;
  color: #ad6623;
  margin-left: 3px;
  font-family: 宋体;
  overflow: hidden;
  padding: 2px 3px;
}
.i i {
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-bottom: -3px;
  margin-left: 1px;
}
</style>
