<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      style="width: 100%"
    >
      <el-table-column prop="time" align="center" label="访问时间"></el-table-column>
      <el-table-column prop="host" align="center" label="主机"></el-table-column>
      <el-table-column prop="ip" align="center" label="IP"></el-table-column>
      <el-table-column prop="origin" align="center" label="origin"></el-table-column>
      <el-table-column prop="referer" label="referer" align="center"></el-table-column>
      <el-table-column prop="ua" label="ua" align="center"></el-table-column>
      <el-table-column prop="url" label="url" align="center"></el-table-column>
      <el-table-column align="center" prop="realUid" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" @click="del(scope.row)">删除</el-button>
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
import { getVisit, delReq } from '@/api/log'

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
      getVisit({
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(response => {
        this.list = response.data.items
        this.list.map(v => { v.createTime = new Date(v.createTime).toLocaleString() })
        this.total = response.data.total
        this.listLoading = false
      })
    },
    del(row) {
      delReq({ _id: row._id }).then(rs => {
        setTimeout(() => {
          this.fetchData()
        }, 1500)
      })
    }
  }
}
</script>
<style>
</style>
