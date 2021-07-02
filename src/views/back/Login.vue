<template>
  <div class="login-container">
    <el-form ref="form" status-icon :model="form" :rules="loginFormRules" class="login-page">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="form.username" auto-complete="off" placeholder="用户名"
          prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码"
          prefix-icon="el-icon-unlock" @keyup.enter.native="onSubmit"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="loading">登录</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        form: {
          username: '',
          password: ''
        },
        loginFormRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onSubmit() {
        this.loading = true
        this.$refs.form.validate(async valid => {
          if (!valid) return (this.loading = false)
          const { data: res } = await this.$axios.post('/backlogin', this.form)
          if (res.code !== 200) {
            this.loading = false
            return this.$message.error('用户或密码输入错误!!!')
          }
          // 服务端使用localStorage模拟存放token
          localStorage.setItem(res.result.token, res.result.id)
          // 客户端使用cookie储存token
          const exp = new Date()
          exp.setTime(exp.getTime() + 30 * 60 * 1000)
          document.cookie = res.result.token + '=' + res.result.id +
            '; expires=' + exp
          this.$router.push('/back/home')
        })
      },
      reset() {
        this.$refs.form.resetFields()
      }
    }
  }
</script>

<style scoped="scoped">
  .login-container {
    width: 360px;
    margin: auto;
  }

  .login-page {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    margin: 120px auto;
    width: 330px;
    padding: 0 15px;
    background: #d3e5f1;
    border: 1px solid #3377bb;
    box-shadow: 0 0 25px #cac6c6;
  }
</style>
