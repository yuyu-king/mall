<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="10">
        <el-col :span="10">
          <el-input placeholder="请输入搜索内容" suffix-icon="el-icon-search"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData.userList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" icon="el-icon-edit" circle size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="queryInfo.currentpage" :page-sizes="[2, 4]" :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next" :total="tableData.total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        queryInfo: {
          currentpage: 1,
          pagesize: 2
        },
        tableData: {
          userList: [],
          total: 0
        }
      }
    },
    created() {
      this.getUserList()
    },
    methods: {
      async getUserList() {
        const {
          data: res
        } = await this.$axios.post('/getUserList', this.queryInfo)
        console.log(res)
        this.tableData.userList = res.result
        this.tableData.total = 8
      },
      handleSizeChange(size) {
        // console.log(size)
        this.queryInfo.pagesize = size
        this.getUserList()
      },
      handleCurrentChange(page) {
        // console.log(page)
        this.queryInfo.currentpage = page
        this.getUserList()
      }
    }
  }
</script>

<style>
  .box-card {
    margin-top: 15px;
  }

  .block {
    margin-top: 5px;
  }
</style>
