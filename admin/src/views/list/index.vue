<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 100%"
      >
      <el-table-column prop="realUid" align="center" label="realUid" sortable width="95">
        <template slot-scope="scope" >
          <span @click="toDetailById(scope.row.realUid)">{{scope.row.realUid}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" align="center" label="昵称" >
      </el-table-column>
      <el-table-column prop="randListTag" align="center" label="标签"  >
        <template slot-scope="scope" >
          <div class="span" v-html="scope.row.randListTag"></div>
        </template>
      </el-table-column>
      <el-table-column prop="education" label="学历"  align="center">
      </el-table-column>
      <el-table-column prop="image" label="头像" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.image" style="width: 50px; height: 50px;">
        </template>
      </el-table-column>
      <el-table-column prop="income" label="收入" align="center" sortable >
      </el-table-column>
      <el-table-column prop="userIcon" label="认证标志"  align="center">
        <template slot-scope="scope">
          <div class="i" v-html="scope.row.userIcon" ></div>
        </template>
      </el-table-column>
      <el-table-column prop="height" label="身高"  sortable align="center" width="50">
      </el-table-column>
      <el-table-column prop="marriage" class-name="status-col" label="状态"  align="center" width="80">
        <template slot-scope="scope">
          <el-tag :type="scope.row.marriage | statusFilter">{{ scope.row.marriage }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="age" label="年龄" sortable width="50">
      </el-table-column>
      <el-table-column align="center" prop="matchCondition" label="择偶要求" >
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10,20,30, 50]" :page-size="pageSize" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getList, distinctGirls,getDetail } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        '未婚': 'success',
        // draft: 'gray',
        '离异': 'danger'
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
     handleSizeChange() {
    },
    handleCurrentChange(changePage) {
      this.currentPage = changePage
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getList({
      page: this.currentPage,
      pageSize: this.pageSize
    }).then(response => {
      console.log(response)
        response.data.items.filter(v => {
          v.income = parseInt(Math.random() * 20000) + '￥'
        })
        this.list = response.data.items
        let test = [...response.data.items]
        this.total = response.data.total
        this.listLoading = false
        // console.log(this.list)
        test.forEach((v, i, arr) => {
          const real = v.realUid
          const _id = v._id
            arr.forEach((v, i, arr) => {
              if (v.realUid === real && _id !== v._id) {
                test.splice(i,1)
                // console.log(test.splice(i,1), 'splice')
              }
            })
        })
        // console.log(test)
        getDetail({uid: 200720396}).then(rs => {
          console.log('details:', rs)
        })
      })
    },
    toDetailById(row) {
      console.log(row, 'id');
      this.$router.push({
        path: '/girls/detail',
        query: {
          uid: row
        }
      })
    }
  }
}
</script>
<style>
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
.i i{
  width: 16px;
    height: 16px;
    display: inline-block;
    margin-bottom: -3px;
    margin-left: 1px;
}
.tel {

    background: url("../../assets/icons/tel.jpg") no-repeat scroll top;
}
.zshy {

    background: url("../../assets/icons/icon_zshy.jpg") no-repeat scroll top;
}
.ltby {

    background: url("../../assets/icons/icon_ltby.jpg") no-repeat scroll top;
}
.level {
    background: url("../../assets/icons/icon_level.jpg?v=1") no-repeat scroll top;
    width: 18px !important;
    height: 15px !important;
}
.gjhy{background:url("../../assets/icons/icon_services_16_6.jpg") no-repeat scroll top;}
</style>
