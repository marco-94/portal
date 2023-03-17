<template>
  <div>
    <div>
      <h1>新增项目</h1>
      <el-main>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="项目名称" prop="project_name">
            <el-input v-model="ruleForm.project_name"></el-input>
          </el-form-item>
          <el-form-item label="项目描述" prop="project_desc">
            <el-input type="textarea" v-model="ruleForm.project_desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            <el-button @click="goOff">取消</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </div>
  </div>
</template>

<script>
  import ProjectList from "./ProjectList";
  import {post} from "../../utils/index.js"

  export default {
    name: "ProjectCreate",
    data() {
      return {
        ruleForm: {
          project_name: '',
          project_desc: ''
        },
        rules: {
          project_name: [
            {required: true, message: '请输入项目名称', trigger: 'blur'},
            {min: 1, max: 20, message: '项目名称长度在 1 到 20 个字符', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      project_create: function () {
        let that = this;
        let data = {
          "project_name": this.ruleForm.project_name,
          "project_desc": this.ruleForm.project_desc
        };
        post("/project/project_create/", data)
          .then(response => (
            this.$message({
              message: response.data.message,
              type: "success"
            }),
              setTimeout(() => {
                if (response.data.code === 200) {
                  this.$router.push({
                    name: 'ProjectList',
                  });
                }
              }, 1000)
          ))
          .catch(function (error) {
            if (error.response) {
              that.$message({
                message: error.response.data.message,
                type: 'error'
              });
            } else if (error.request) {
              that.$message({
                message: error.request,
                type: 'error'
              });
            } else {
              that.$message({
                message: error.message,
                type: 'error'
              });
            }
          });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.project_create()
          } else {
            return false;
          }
        });
      },
      goOff() {
        this.$router.go(-1);
      },
    }
  }
</script>

<style scoped>

</style>
