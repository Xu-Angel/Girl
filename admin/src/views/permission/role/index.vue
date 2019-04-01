<template>
  <div class="app-container">
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
      <el-table-column prop="id" align="center" label="ID"></el-table-column>
      <el-table-column prop="createTime" label="注册时间" align="center"></el-table-column>
      <el-table-column prop="role" align="center" label="角色">
        <template slot-scope="scope">
          <el-tag :type="scope.row.role | statusFilter">{{ scope.row.role }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="名字" align="center"></el-table-column>
      <el-table-column prop="avatar" label="头像" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="width: 50px; height: 50px;">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="realUid" label="操作">
        <template slot-scope="scope">
          <el-button :loading="false" type="danger" @click="del(scope.row.username)">删除</el-button>
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
import { getList, delAdmin } from '@/api/admin'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        管理员: 'success',
        // draft: 'gray',
        超级管理员: 'danger'
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
      pageSize: 10
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
    del(username) {
      delAdmin({ username }).then(rs => {
        if (rs.status === 200) {
          setTimeout(() => {
            this.fetchData()
          }, 1500)
        }
      })
    },
    fetchData() {
      this.listLoading = true
      getList({
        page: this.currentPage,
        pageSize: this.pageSize,
        ...this.search
      }).then(response => {
        this.list = response.data.items
        /* eslint-disable */
        this.list.map(v => v.createTime = new Date(v.createTime).toLocaleString())
        this.list.map(v => v.avatar = /^[a-z][a-z0-9+.-]*:/.test(v.avatar) ? v.avatar : process.env.BASE_API + v.avatar)
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
<style>
.el-table .success-row {
  background: #f0f9eb;
}
</style>
