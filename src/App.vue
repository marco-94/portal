<template>
  <div id="app">
    <div v-if="$route.meta.headerShow">
      <Headers/>
    </div>
      <el-container>
        <div v-if="$route.meta.headerShow">
          <Tabs/>
        </div>
          <el-main>
              <router-view/>
          </el-main>
      </el-container>
  </div>
</template>

<script>
import Home from './pages/Home.vue'
import Tab from './components/left-tab/tab'
export default {
  components: {Tab, Home},
  name: 'App',
  data () {
    return {
    }
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
  body{
	margin:0;
	padding:0;
	border:0
}
</style>
