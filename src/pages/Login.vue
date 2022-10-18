<template>
  <div id="building">
    <div>
    <el-form ref="form" :model="form" :rules="rules" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="username">
        <el-input type="text" placeholder="请输入用户名" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      login() {
        let that = this;
        if (!(this.form.username && this.form.password)) {
          return false;
        }
        let data = new FormData();
        data.append('username', this.form.username);
        data.append('password', this.form.password);

        this.$axios.post('/user/log_in', data)
        .then(res=> {
          const code = res.data.code;
          if (code !== 200){
              that.$message({
                message: res.data.message,
                type: 'error'
              });
          }
          else {
            that.$message({
                message: res.data.message,
                type: 'success'
              });
            this.$router.push('/');
          }
          sessionStorage.setItem('token', res.data.data.token);
          sessionStorage.setItem('username', res.data.data.username);
          sessionStorage.setItem('user_id', res.data.data.user_id);
          // this.$session.setItem('username', res.data.data.username);
          // this.$session.setItem('token', res.data.data.token);
        })
        .catch(function (error) {
          console.log(error.data);
          });
      }
    },
  }
</script>

<style lang="scss" scoped>
  .login-box {
    width: 350px;
    margin: 120px auto;
    border: 1px solid #DCDFE6;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 30px #DCDFE6;
  }

  .login-title {
    text-align: center;
  }
  #building{
  /*background:url("../assets/bg0.jpg");*/
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
</style>

