<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="10">
        <el-col :span="10">
          <el-input v-model="search" placeholder="请输入搜索内容" suffix-icon="el-icon-search"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="addFormVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="searchData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="showEdit(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="handleDelete(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
     <div class="block">
       <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentpage"
        :page-sizes="[2, 4]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </el-card>
    <!--添加用户-->
    <el-dialog title="添加用户" :visible.sync="addFormVisible" width="360px" center>
      <el-form ref="addFormRef" :model="userForm" :rules="userFormRules">
        <el-form-item prop="username">
          <el-input v-model="userForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="address">
          <el-input v-model="userForm.address" placeholder="地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAdd">确 定</el-button>
        <el-button @click="addFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!--修改用户-->
    <el-dialog title="添加用户" :visible.sync="editFormVisible" width="360px" center>
      <el-form ref="editFormRef" :model="userForm" :rules="userFormRules">
        <el-form-item prop="username">
          <el-input v-model="userForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="address">
          <el-input v-model="userForm.address" placeholder="地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleEdit()">确 定</el-button>
        <el-button @click="editFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        search: '',
        currentpage: 1,
        pagesize: 2,
        tableData: [],
        addFormVisible: false,
        editFormVisible: false,
        userForm: {
          id: 0,
          username: '',
          address: ''
        },
        userFormRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      searchData: function() {
        const offset = (this.currentpage - 1) * this.pagesize
        const userlist = this.tableData.filter(data => !this.search || data.username.toLowerCase().includes(this.search.toLowerCase()))
        return userlist.slice(offset, offset + this.pagesize)
      },
      total: function() {
        return this.tableData.length
      }
    },
    async created() {
      await this.getUserList()
    },
    methods: {
      async getUserList() {
        const {
          data: res
        } = await this.$axios.post('/getUserList')
        this.tableData = res
      },
      handleSizeChange(size) {
        this.pagesize = size
      },
      handleCurrentChange(page) {
        this.currentpage = page
      },
      handleAdd() {
        this.$refs.addFormRef.validate(async valid => {
          if (!valid) return
          const {
            data: res
          } = await this.$axios.post('/addUser', this.userForm)
          this.tableData = res
          this.addFormVisible = false
          this.$message.success('添加用户成功')
        })
      },
      showEdit(row) {
        this.editFormVisible = true
        this.userForm = {
          id: row.id,
          username: row.username,
          address: row.address
        }
      },
      handleEdit(row) {
        this.$refs.editFormRef.validate(async valid => {
          if (!valid) return
          const {
            data: res
          } = await this.$axios.post('/editUserById', this.userForm)
          this.tableData = res
          this.editFormVisible = false
          this.$message.success('修改用户成功')
        })
      },
      handleDelete(id) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const {
            data: res
          } = await this.$axios.post('/deleteUserById', {
            id: id
          })
          this.tableData = res
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getUserList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
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
