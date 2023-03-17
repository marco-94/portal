<template>
  <div id="app">
    <div v-if="$route.meta.headerShow">
      <Headers/>
    </div>
    <el-container style="height: 93%">
      <div v-if="$route.meta.headerShow">
        <Tabs/>
      </div>

      <el-main>
        <Tag/>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import Home from './pages/Home.vue'
  import Tab from './components/left-tab/tab'
  import Tag from "./components/main-tag/tag";

  export default {
    components: {Tab, Home, Tag},
    name: 'App',
    data() {
      return {}
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 30px;
  }

  html, body, #app {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    border: 0
  }
</style>
