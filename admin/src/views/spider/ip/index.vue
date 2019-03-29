<template>
  <div class="app-container">
    <div class="search-container">
      <div class="fr">
        <el-select v-model="search.education" clearable style="width: 180px;" placeholder="请选择学历">
          <el-option v-for="(item, key) in education" :key="key" :label="item" :value="item"></el-option>
        </el-select>
        <el-select v-model="search.marriage" clearable style="width: 180px;" placeholder="请选择状态">
          <el-option v-for="(item, key) in marriage" :key="key" :label="item" :value="item"></el-option>
        </el-select>
        <el-input v-model="search.realUid" placeholder="请输入realUid" style="width: 180px;"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      :row-class-name="tableRowClassName"
      element-loading-text="Loading"
      border
      fit
      style="width: 100%"
      @selection-change="selectionChange"
    >
    <el-table-column type="selection" width="38"></el-table-column>
      <el-table-column prop="realUid" align="center" label="realUid" sortable width="95">
        <template slot-scope="scope">
          <span @click="toDetailById(scope.row.realUid)">{{ scope.row.realUid }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" align="center" label="昵称"></el-table-column>
      <el-table-column prop="randListTag" align="center" label="标签" width="200">
        <template slot-scope="scope">
          <div class="span" v-html="scope.row.randListTag"></div>
        </template>
      </el-table-column>
      <el-table-column prop="education" label="学历" align="center"></el-table-column>
      <el-table-column align="center" prop="status" label="爬取状态" sortable>
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status ? '完成' : '待爬' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="realUid" label="操作">
        <template slot-scope="scope">
          <el-button @click="toDetailById(scope.row.realUid,currentPage)">查看</el-button>
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
import { getList } from '@/api/table'
import { getSipderConfig } from '@/api/common'

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
      area: [],
      search: {
        area: '',
        age: '',
        height: '',
        realUid: '',
        status: ''
      },
      age: [],
      height: [],
      education: [],
      marriage: [],
      status: [true, false],
      uid: 0
    }
  },
  created() {
    const { uid, pageNum, ...params } = this.$route.query
    this.currentPage = Number(pageNum) || 1
    this.search = params || this.search
    this.uid = uid
    this.fetchData()
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
      // 常规请求分页 不回到顶部
      // this.$route.query.pageNum = changePage
      // this.currentPage = changePage
      // this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getList({
        page: this.currentPage,
        pageSize: this.pageSize,
        ...this.search
      }).then(response => {
        console.log(response)
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleSearch() {
      console.log(this.search)
      this.currentPage = 1
      this.fetchData()
    },
    toDetailById(uid, pageNum) {
      this.$router.push({
        path: '/girls/detail',
        query: {
          uid,
          pageNum,
          ...this.search
        }
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.realUid === Number(this.uid)) {
        return 'success-row'
      }
      return ''
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
