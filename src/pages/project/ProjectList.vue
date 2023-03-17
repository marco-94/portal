<template>
  <div>
    <div>
      <el-main>
        <el-form :model="project_info" ref="searchForm" :inline="true">
          <div class="left">
            <el-form-item prop="project_id" label-position="left">
              <el-input
                v-model="project_info.project_id"
                placeholder="请输入项目ID"
                @input="project_info.project_id = project_info.project_id.replace(/[^\d]/g,'')"
                clearable></el-input>
            </el-form-item>
            <el-form-item prop="project_name">
              <el-input v-model="project_info.project_name" placeholder="请输入项目名称" clearable></el-input>
            </el-form-item>
            <el-form-item prop="project_desc">
              <el-input v-model="project_info.project_desc" placeholder="请输入项目描述" clearable></el-input>
            </el-form-item>
            <el-form-item prop="editor">
              <el-input v-model="project_info.editor" placeholder="请输入操作人" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <div class="block">
                <el-date-picker
                  v-model="params.date"
                  type="datetimerange"
                  range-separator="-"
                  start-placeholder="新增开始时间"
                  end-placeholder="新增结束时间"
                  @change="dateFormat"
                  :default-time="['00:00:00', '23:59:59']"
                  clearable>
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item prop="product_name">
              <el-button @click="search" style="background: #18a65e;color: white"><span>查询</span></el-button>
              <el-button type="button" @click="resetForm"><span>重置</span></el-button>
            </el-form-item>
            <div>
              <el-button @click="project_create" style="background: #18a65e;color: white">新增项目</el-button>
            </div>
          </div>
        </el-form>
        <el-table :data="tableData" stripe height="645">
          <el-table-column prop="project_id" label="项目ID">
          </el-table-column>
          <el-table-column prop="project_name" label="项目名称">
          </el-table-column>
          <el-table-column prop="project_version" label="项目版本">
          </el-table-column>
          <el-table-column prop="project_desc" label="项目描述" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="editor" label="操作人">
          </el-table-column>
          <el-table-column prop="is_disable" label="状态">
            <template slot-scope="scope">
              <div>
                <el-tag :type="scope.row.is_disable === false ? 'success' : 'danger'">
                  {{scope.row.is_disable === false ? '启用' : '禁用'}}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="create_tm_format" label="新增时间">
          </el-table-column>
          <el-table-column prop="update_tm_format" label="更新时间">
          </el-table-column>
          <el-table-column prop="operation" label="操作" width="300px">
            <template slot-scope="scope">
              <el-row>
                <el-button @click="project_detail(scope.row)">项目详情</el-button>
                <el-button @click="project_edit(scope.row)">编辑项目</el-button>
                <el-button @click="open">{{scope.row.is_disable === false ? '禁用' : '启用'}}</el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </div>
    <div>
      <el-footer>
        <Pages @handleSizeChange="handleSizeChange"
               @handleCurrentChange="handleCurrentChange"
               :current-page="pages.page"
               :totalPage="pages.total"
               :pageSize="pages.size"/>
      </el-footer>
    </div>
  </div>
</template>

<script>
  import Pages from "../../components/bottom-pages/pages.vue";
  import {post} from "../../utils/index.js"

  export default {
    name: "ProjectList",
    components: {Pages},
    data() {
      return {
        tableData: [],
        project_info: {
          project_id: '',
          project_name: '',
          project_version: '',
          project_desc: '',
          editor: '',
          is_superuser: false,
          is_disable: false,
        },
        pages: {
          page: 1,
          size: 10,
          total: 0,
        },
        params: {
          startTime: '',
          endTime: '',
          date: []
        },
      }
    },
    methods: {
      get_project_data: function () {
        let that = this;
        if (null != this.params.date && '' !== this.params.date) {
          this.params.startTime = this.params.date[0];
          this.params.endTime = this.params.date[1];
        }
        let data = {
          "project_id": this.project_info.project_id,
          "project_name": this.project_info.project_name,
          "project_version": this.project_info.project_version,
          "project_desc": this.project_info.project_desc,
          "editor": this.project_info.editor,
          "page": this.pages.page,
          "size": this.pages.size,
          "created_start_tm": Date.parse(this.params.startTime),
          "created_end_tm": Date.parse(this.params.endTime)
        };
        post('project/project_list', data)
          .then(response => (
            this.tableData = response.data.data.list,
              this.pages.total = response.data.data.total,
              this.pages.total_page = response.data.data.total_page
          ))
          .catch(function (error) {
            if (error.status) {
              that.$message({
                message: error.data.message,
                type: 'error'
              });
            }
          });
      },
      //时间选择
      dateFormat(picker) {
        this.params.startTime = picker[0];
        this.params.endTime = picker[1];
      },
      // 跳转详新增页面
      project_create() {
        this.$router.push({name: 'ProjectCreate'})
      },
      // 跳转详情页面
      project_detail(row) {
        this.$router.push({
          name: 'ProjectDetail',
          query: {project_id: row.project_id}
        })
      },
      // 跳转编辑页面
      project_edit(row) {
        this.$router.push({
          name: 'ProjectEdit',
          query: {project_id: row.project_id}
        })
      },
      //禁用启用
      open() {
        if (this.project_info.is_disable === false) {
          this.$confirm('是否确认禁用?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '禁用成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消禁用'
            });
          });
        }
      },
      //搜索
      search() {
        this.pages = this.$options.data().pages;
        this.get_project_data();
      },
      // 重置查询
      resetForm() {
        this.project_info = this.$options.data().project_info;
        this.pages = this.$options.data().pages;
        this.params = this.$options.data().params;
        this.get_project_data();
      },
      // 设置每页显示条数
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pages.size = val;
        this.handleCurrentChange(1);
        this.get_project_data();
      },
      // 翻页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pages.page = val;
        this.get_project_data();
      },
    },
    // 进入页面默认加载列表数据
    created() {
      this.get_project_data();
    },
  }
</script>

<style scoped>
  .left {
    text-align: left
  }
</style>
