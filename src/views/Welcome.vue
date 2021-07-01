<template>
  <div>
    <el-button @click="back">前往后端登录</el-button>
    <el-button @click="front">前往前端登录</el-button>
  </div>
</template>

<script>

  export default {
    methods: {
      back () {
        this.$router.push({ name: 'bLogin' })
      },
      front () {
        this.$router.push('/')
      }
    }
  }
</script>

<style>
</style>
