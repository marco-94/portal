<template>
  <div class="left">
    <el-tag
      v-for="tag in tags"
      :key="tag.name"
      :type="tag.type">
      <span @click="handleClick()">
        {{tag.name}}
      </span>
    </el-tag>
  </div>
</template>

<script>
  export default {
    name: "tag",
    data() {
      return {
        tags: [{name: '首页', type: ''}]
      }
    },
    methods: {
      handleClick() {
        this.$router.push("/");
      }
    }
  }
</script>

<style scoped>
  .left {
    text-align: left
  }
</style>
