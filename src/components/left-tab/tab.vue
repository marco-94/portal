<template>
  <div>
    <div>
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu :unique-opened=true style="height: 100%;">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>用户管理</template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="$router.push({path:'/user_list'})">用户列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
      </el-container>
    </div>
    <div>
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu :unique-opened=true style="height: 100%;">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-s-goods"></i>项目管理</template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="$router.push({name:'ProjectList'})">项目列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
      </el-container>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tab",
    data() {
      return {
        data1: []
      }
    }
  }
</script>

<style scoped>
  @import "tab.css";
</style>
