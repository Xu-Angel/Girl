<template>
  <div class="app-container">
    <div class="search-container">
      <div class="fr">
        <el-button type="primary" @click="distinctIp">IP池去重</el-button>
        <el-button :loading="buttonLoading" type="primary" @click="spiIpPool">更新IP池</el-button>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      style="width: 100%"
    >
      <el-table-column prop="createTime" align="center" label="生成时间"></el-table-column>
      <el-table-column prop="host" align="center" label="IP"></el-table-column>
      <el-table-column prop="port" align="center" label="端口"></el-table-column>
      <el-table-column prop="from" label="来源" align="center"></el-table-column>
      <el-table-column prop="response_time" label="响应时间" align="center"></el-table-column>
      <el-table-column prop="country" label="地址" align="center"></el-table-column>
      <el-table-column prop="type" label="类型" align="center"></el-table-column>
      <el-table-column prop="anonymity" label="匿名性" align="center"></el-table-column>
      <el-table-column align="center" prop="realUid" label="操作">
        <template slot-scope="scope">
          <el-button :loading="false" @click="testIp(scope.row, this)">测试</el-button>
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
import { getIpList, checkIp, startSpiIpPool, distinct } from '@/api/ip'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      currentPage: 1,
      total: 10000,
      pageSize: 10,
      pageRange: '',
      buttonLoading: false
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
      this.currentPage = changePage
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getIpList({
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(response => {
        this.list = response.data.items
        this.list.map(v => { v.createTime = new Date(v.createTime).toLocaleString() })
        this.total = response.data.total
        this.listLoading = false
      })
    },
    testIp(row, t) {
      this.listLoading = true
      checkIp({
        ip: `${row.type}://${row.host}:${row.port}/`
      }).then(rs => {
        this.listLoading = false
        setTimeout(() => {
          this.fetchData()
        }, 1500)
      })
    },
    spiIpPool() {
      this.buttonLoading = true
      startSpiIpPool().then(rs => {
        this.buttonLoading = false
      })
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
