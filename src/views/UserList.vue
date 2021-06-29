<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/userlist' }">用户管理</el-breadcrumb-item>
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
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: {
          userList: []
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
        } = await this.$axios.post('/getUserList', {})
        console.log(res)
        this.tableData.userList = res
      }
    }
  }
</script>

<style>
  .box-card {
    margin-top: 15px;
  }
</style>
