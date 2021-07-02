<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="10">
        <el-col :span="10">
          <el-input v-model="query.search" placeholder="请输入搜索内容" suffix-icon="el-icon-search"></el-input>
        </el-col>
      </el-row>
      <el-table :data="tableData" v-loading="loading" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180">
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column label="禁用">
          <el-switch></el-switch>
        </el-table-column>
      </el-table>
     <div class="block">
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
          search: '',
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
        this.total = this.tableData.length
      },
      handleSizeChange(size) {
        this.pagesize = size
      },
      handleCurrentChange(page) {
        this.currentpage = page
      }
    }
  }
</script>

<style>
  .box-card {
    margin-top: 15px;
  }
  .block {
    margin-top: 10px;
  }
</style>
