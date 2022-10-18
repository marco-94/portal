<template>
  <div>
    <div>
      <el-descriptions title="用户信息">
        <el-descriptions-item label="用户ID">{{tableData.user_id}}</el-descriptions-item>
        <el-descriptions-item label="用户名">{{tableData.user_name}}</el-descriptions-item>
        <el-descriptions-item label="用户昵称">{{tableData.nickname}}</el-descriptions-item>
        <el-descriptions-item label="用户邮箱">{{tableData.user_email}}</el-descriptions-item>
        <el-descriptions-item label="用户介绍">{{tableData.user_introduction}}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div>
      <el-row>
        <el-button @click="goOff">返回</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'UserDetail',
    data() {
      return {
        tableData: {
          user_id: '',
          user_name: '',
          nickname: '',
          user_email: '',
          user_introduction: '',
        },
      }
    },
    methods: {
      get_detail() {
        this.tableData.user_id = this.$route.query.user_id;
        axios.get('/user/detail/', {
          params: {
            user_info: this.$route.query.user_id
          }
        })
          .then(response => {
            if (response.data.list.length > 0) {
              this.tableData = response.data.list[0];
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      get_detail_v2() {
        this.tableData.user_id = this.$route.query.user_id;
        let data = {
          user_id: this.$route.query.user_id
        }
        axios.post('/user/user_detail', data)
          .then(response => {
            if (response.data.list.length > 0) {
              this.tableData = response.data.list[0];
            }
          })
          .catch(function (error) {
            console.log(error.data);
          })
      },
      goOff() {
        this.$router.go(-1);
      },
    },
    created() {
      // this.get_detail();
      this.get_detail_v2();
    }
  }
</script>

<style scoped>

</style>
