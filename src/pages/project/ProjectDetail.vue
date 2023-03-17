<template>
  <div>
    <div>
      <el-descriptions title="项目信息">
        <el-descriptions-item label="项目ID">{{tableData.project_id}}</el-descriptions-item>
        <el-descriptions-item label="项目名称">{{tableData.project_name}}</el-descriptions-item>
        <el-descriptions-item label="项目描述">{{tableData.project_desc}}</el-descriptions-item>
        <el-descriptions-item label="项目图片">{{tableData.project_img}}</el-descriptions-item>
        <el-descriptions-item label="项目地址">{{tableData.project_url}}</el-descriptions-item>
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
    import {post} from "../../utils/index.js"
    export default {
        name: "ProjectDetail",
    data() {
      return {
        tableData: {
          project_id: '',
          project_name: '',
          project_desc: '',
          project_img: '',
          project_url: '',
        },
      }
    },
    methods: {
      get_detail() {
        this.tableData.project_id = this.$route.query.project_id;
        let data = {
          project_id: this.$route.query.project_id
        };
        post('/project/project_detail', data)
          .then(response => {
            this.tableData = response.data.data;
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
      this.get_detail();
    }
    }
</script>

<style scoped>

</style>
