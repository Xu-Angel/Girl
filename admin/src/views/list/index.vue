<template>
  <div class="app-container">
    <div class="search-container">
      <div class="fr">
        <el-select v-model="search.area" clearable style="width: 180px;" placeholder="请选择地区">
          <el-option v-for="(item, key) in area" :key="key" :label="item" :value="item"></el-option>
        </el-select>
        <el-select v-model="search.age" clearable style="width: 180px;" placeholder="请选择年龄">
          <el-option v-for="(item, key) in age" :key="key" :label="item + '岁'" :value="item"></el-option>
        </el-select>
        <el-select v-model="search.height" clearable style="width: 180px;" placeholder="请选择身高">
          <el-option v-for="(item, key) in height" :key="key" :label="item + 'cm'" :value="item"></el-option>
        </el-select>
        <el-select v-model="search.education" clearable style="width: 180px;" placeholder="请选择学历">
          <el-option v-for="(item, key) in education" :key="key" :label="item" :value="item"></el-option>
        </el-select>
        <el-select v-model="search.marriage" clearable style="width: 180px;" placeholder="请选择婚史">
          <el-option v-for="(item, key) in marriage" :key="key" :label="item" :value="item"></el-option>
        </el-select>
        <el-select v-model="search.status" clearable style="width: 180px;" placeholder="请选择状态">
          <el-option
            v-for="(item, key) in status"
            :key="key"
            :label="item ? '完成' : '待爬'"
            :value="item"
          ></el-option>
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
    >
      <el-table-column prop="realUid" align="center" label="realUid" sortable width="95">
        <template slot-scope="scope">
          <span @click="toDetailById(scope.row.realUid)">{{ scope.row.realUid }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" align="center" label="昵称"></el-table-column>
      <el-table-column prop="createTime" align="center" label="生成时间"></el-table-column>
      <el-table-column prop="finishTime" align="center" label="完成时间"></el-table-column>
      <el-table-column prop="randListTag" align="center" label="标签">
        <template slot-scope="scope">
          <div class="span" v-html="scope.row.randListTag"></div>
        </template>
      </el-table-column>
      <el-table-column prop="education" label="学历" align="center"></el-table-column>
      <el-table-column prop="image" label="头像" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.image" style="width: 50px; height: 50px;">
        </template>
      </el-table-column>
      <el-table-column prop="area" label="地区" align="center" sortable></el-table-column>
      <el-table-column prop="work_location" label="工作地" align="center" sortable></el-table-column>
      <el-table-column prop="userIcon" label="认证标志" align="center">
        <template slot-scope="scope">
          <div class="i" v-html="scope.row.userIcon"></div>
        </template>
      </el-table-column>
      <el-table-column prop="height" label="身高" sortable align="center"></el-table-column>
      <el-table-column prop="marriage" class-name="status-col" label="婚史" align="center" width="80">
        <template slot-scope="scope">
          <el-tag :type="scope.row.marriage | statusFilter">{{ scope.row.marriage }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="age" label="年龄" sortable></el-table-column>
      <el-table-column align="center" prop="status" label="状态" sortable>
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status ? '完成' : '待爬' }}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="shortnote"  label="短语" align="center">
      </el-table-column>-->
      <!-- <el-table-column align="center" prop="matchCondition" label="择偶要求"></el-table-column> -->
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
        this.list.map(v => { v.createTime = new Date(v.createTime).toLocaleString() })
        this.list.map(v => { v.finishTime = v.finishTime ? new Date(v.finishTime).toLocaleString() : '------' })
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
.gjhy {
  background: url(../../assets/icons/icon_services_16_6.jpg) no-repeat scroll
    top;
}
.kxby {
  background: url(../../assets/icons/icon_kxby.jpg) no-repeat scroll top;
}
.phb {
  background: url(../../assets/icons/icon_phb.jpg) no-repeat scroll top;
}
.fxby {
  background: url(../../assets/icons/icon_fxby.jpg) no-repeat scroll top;
}
.zshy {
  background: url(../../assets/icons/icon_zshy.jpg) no-repeat scroll top;
}
.ltby {
  background: url(../../assets/icons/icon_ltby.jpg) no-repeat scroll top;
}
.pmtq {
  background: url(../../assets/icons/icon_pmtq.jpg) no-repeat scroll top;
}
.sjld {
  background: url(../../assets/icons/icon_sjld.jpg) no-repeat scroll top;
}
.tel {
  background: url(../../assets/icons/tel.jpg) no-repeat scroll top;
}
.level {
  background: url(../../assets/icons/icon_level.jpg?v=1) no-repeat scroll top;
  width: 18px !important;
  height: 15px !important;
}
.online {
  background: url(../../assets/icons/icon_online.png) no-repeat scroll center;
}
</style>
