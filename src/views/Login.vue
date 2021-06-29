<template>
  <div class="login-container">
    <el-form :model="form" ref="form" class="login-page">
      <h3 class="title">系统登录1</h3>
      <el-form-item>
        <el-input type="text" v-model="form.name" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style>
  body{
    background-color: #66B1FF;
  }
  .login-container {
    width: 420px;
    margin: auto;
  }

  .login-page {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    margin: 120px auto;
    width: 420px;
    padding: 35px 20px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
  }
</style>
