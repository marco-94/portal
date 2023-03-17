<template>
  <div>
    <div>
      <el-main>
        <el-form :model="search_info" ref="searchForm" :inline="true">
          <div class="left">
            <el-form-item prop="user_id" label-position="left">
              <el-input
                v-model="search_info.user_id"
                placeholder="请输入用户ID"
                @input="search_info.user_id = search_info.user_id.replace(/[^\d]/g,'')"
                clearable></el-input>
            </el-form-item>
            <el-form-item prop="username">
              <el-input v-model="search_info.username" placeholder="请输入用户名称" clearable></el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input v-model="search_info.email" placeholder="请输入用户邮箱" clearable></el-input>
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
          </div>
        </el-form>
        <el-table :data="tableData" stripe height="700">
          <el-table-column prop="user_id" label="用户ID">
          </el-table-column>
          <el-table-column prop="username" label="用户名称">
          </el-table-column>
          <el-table-column prop="email" label="用户邮箱">
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
                <el-button @click="user_detail(scope.row)">用户详情</el-button>
                <el-button @click="user_edit(scope.row)">编辑用户</el-button>
                <el-button @click="open(scope.row)">{{scope.row.is_disable === false ? '禁用' : '启用'}}</el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </div>
    <div>
      <el-footer style="height: 32px">
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
  import Pages from "../components/bottom-pages/pages.vue";
  import {post, put} from "../utils/index.js"

  export default {
    name: 'UserList',
    components: {Pages},
    data() {
      return {
        tableData: [],
        search_info: {
          user_id: '',
          username: '',
          email: '',
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
      // 请求列表数据
      get_data: function () {
        let that = this;
        if (null != this.params.date && '' !== this.params.date) {
          this.params.startTime = this.params.date[0];
          this.params.endTime = this.params.date[1];
        }
        let data = {
          "user_id": this.search_info.user_id,
          "username": this.search_info.username,
          "email": this.search_info.email,
          "page": this.pages.page,
          "size": this.pages.size,
          "created_start_tm": Date.parse(this.params.startTime),
          "created_end_tm": Date.parse(this.params.endTime)
        };
        post('user/user_list', data)
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
      // 跳转详情页面
      user_detail(row) {
        this.$router.push({
          name: 'UserDetail',
          query: {user_id: row.user_id}
        })
      },
      // 跳转编辑页面
      user_edit(row) {
        this.$router.push({
          name: 'UserEdit',
          query: {user_id: row.user_id}
        })
      },
      // 禁用启用请求
      user_disable: function (data) {
        let that = this;
        put("/user/user_disable", data)
          .then(res => {
            if (res.data.code === 200) {
              that.$message({
                message: res.data.message,
                type: 'success'
              });
              this.get_data()
            }
            if (res.data.code !== 200) {
              that.$message({
                message: res.data.message,
                type: 'error'
              });
            }
          })
          .catch(function (error) {
            if (error.status) {
              that.$message({
                message: error.data.message,
                type: 'error'
              });
            }
          });
      },
      // 禁用启用判断
      open(row) {
        let data = {
          "user_id": row.user_id,
          "is_disable": 2
        };
        if (row.is_disable === false) {
          this.$confirm('是否确认禁用?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.user_disable(data);
          })
        }
        if (row.is_disable === true) {
          data["is_disable"] = 1;
          this.user_disable(data);
        }
      },
      //搜索
      search() {
        this.pages = this.$options.data().pages;
        this.get_data();
      },
      // 重置查询
      resetForm() {
        this.search_info = this.$options.data().search_info;
        this.pages = this.$options.data().pages;
        this.params = this.$options.data().params;
        this.get_data();
      },
      // 设置每页显示条数
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pages.size = val;
        this.handleCurrentChange(1);
        this.get_data();
      },
      // 翻页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pages.page = val;
        this.get_data();
      },
    }
    ,
    // 进入页面默认加载列表数据
    created() {
      this.get_data();
    }
    ,
    filters: {}
  }
</script>

<style scoped>
  .left {
    text-align: left
  }
</style>
