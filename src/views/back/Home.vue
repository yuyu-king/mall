<template>
  <el-container class="container">
    <el-header>
      <router-link :to="{name: 'bHome'}" class="brand">电商后台管理系统</router-link>
      <el-button icon="el-icon-s-release" circle @click="logout"></el-button>
    </el-header>
    <el-container class="sec">
      <el-aside width="150px">
        <el-menu :default-active="defaultActive"
        :unique-opened="true"
        router>
          <el-menu-item index="/back/user">
            <i class="el-icon-s-custom"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/back/goods">
            <i class="el-icon-s-goods"></i>
            <span slot="title">商品列表</span>
          </el-menu-item>
          <el-menu-item index="/back/order">
            <i class="el-icon-s-order"></i>
            <span slot="title">订单列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        defaultActive: ''
      }
    },
    created() {
      this.changeDefaultActive(this.$route.path)
    },
    methods: {
      logout() {
        sessionStorage.removeItem('adminId')
        this.$router.push({ name: 'bLogin' })
      },
      changeDefaultActive(val) {
        this.defaultActive = val
      }
    }
  }
</script>

<style scoped="scoped">
  .container {
    height: 600px;
  }
  .el-header {
    border: 1px solid #3377bb;
    box-shadow: 0 0 25px #cac6c6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
    color: #fff;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    border-right: solid 1px #e6e6e6;
  }
  .el-menu {
    border-right: none;
  }
  .brand{
    color: #fff;
    text-decoration: none;
  }
  .brand:hover {
    cursor: pointer;
    color: #e2e2e2;
  }
  .sec {
    margin: 10px;
    border-radius: 4px;
    border: 1px solid #3A8EE6 ;
  }
</style>
