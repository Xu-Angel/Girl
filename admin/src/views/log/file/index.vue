<template>
  <div class="app-container">
    <div class="search-container">
      <div class="fr">
        <span>日志类型:</span>
        <el-select
          v-model="selectVal"
          clearable
          placeholder="请选择日志类型"
          style="width: 180px;"
          @change="handleSelect"
        >
          <el-option v-for="(item, key) in type" :key="key" :label="item" :value="item"></el-option>
        </el-select>
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
      <el-table-column prop="type" align="center" label="类型" width="100px"></el-table-column>
      <el-table-column prop="file" align="center" label="文件名">
        <template slot-scope="scope">
          <a
            :href="scope.row.path"
            target="_blank"
            style="text-decoration: underline; color: blue"
          >{{ scope.row.file }}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="realUid" label="操作" width="90px">
        <template slot-scope="scope">
          <el-button type="danger" @click="del(scope.row.file)">删除</el-button>
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
import { getFile, delFile } from '@/api/log'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      currentPage: 1,
      total: 10000,
      pageSize: 10,
      pageRange: '',
      type: ['error', 'response', 'pm2', 'req'],
      selectVal: 'response'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleSizeChange() { },
    selectionChange(rows) {

    },
    handleSelect(sel) {
      this.fetchData()
    },
    handleCurrentChange(changePage) {
      this.currentPage = changePage
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getFile({
        type: this.selectVal,
        pageSize: this.pageSize,
        page: this.currentPage
      }).then(res => {
        console.log(res)
        this.list = res.data.items
        this.total = res.data.total
        this.list.map(v => {
          v.path = process.env.BASE_API + '/logs/' + this.selectVal + '/' + v.file
        })
        this.listLoading = false
      })
    },
    del(file) {
      delFile({ file, type: this.selectVal }).then(rs => {
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
