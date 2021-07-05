<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="10" class="search">
        <el-col :span="6">
          <el-input v-model="query.username" placeholder="用户名" suffix-icon="el-icon-search" @blur.prevent="getUserList"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="query.name" placeholder="姓名" suffix-icon="el-icon-search" @blur.prevent="getUserList"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="query.address" placeholder="地址" suffix-icon="el-icon-search" @blur.prevent="getUserList"></el-input>
        </el-col>
        <el-col :span="6">
          <el-select v-model="query.state" placeholder="状态" >
              <el-option label="可用" value="true" @click.native="getUserList"></el-option>
              <el-option label="禁用" value="false" @click.native="getUserList"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-table :data="tableData" v-loading="loading" style="width: 100%">
        <el-table-column prop="id" label="ID" width="120px">
        </el-table-column>
        <el-table-column prop="username" label="用户名">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="address" label="地址" width="500px">
        </el-table-column>
        <el-table-column prop="state" label="可使用">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" @change="changeState(scope.row)"></el-switch>
          </template>
        </el-table-column>
      </el-table>
     <div class="page">
       <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.currentpage"
        :page-sizes="[10, 20]"
        :page-size="query.pagesize"
        layout="total, sizes, prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        query: {
          username: '',
          name: '',
          address: '',
          state: '',
          currentpage: 1,
          pagesize: 10
        },
        tableData: [],
        total: 0,
        loading: false
      }
    },
    async created() {
      await this.getUserList()
    },
    methods: {
      async getUserList() {
        this.loading = true
        const {
          data: res
        } = await this.$axios.post('/getUserList', this.query)
        if (res.code !== 200) {
          this.loading = false
          return this.$message.error('查询失败')
        }
        this.loading = false
        this.tableData = res.result
        this.total = res.total
      },
      handleSizeChange(size) {
        this.query.pagesize = size
        this.getUserList()
      },
      handleCurrentChange(page) {
        this.query.currentpage = page
        this.getUserList()
      },
      changeState(row) {
        const {
          data: res
        } = this.$axios.post('/changeUserState', row)
        if (res.code !== 200) {
          return this.$message.error('修改失败')
        }
      }
    }
  }
</script>

<style>
  .box-card {
    margin-top: 15px;
  }
  .search {
    margin-bottom: 10px;
  }
  .page {
    margin-top: 20px;
  }
</style>
