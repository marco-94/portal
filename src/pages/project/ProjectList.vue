<template>
  <div>
    <span>项目列表</span>
    <div>
      <el-main>
        <el-form>
          <el-form-item>
            <div class="left">
              <el-input
                style="width: 300px; text-align: left"
                placeholder="请输入内容"
                v-model="input"
                clearable>
              </el-input>
            </div>
          </el-form-item>
        </el-form>

      </el-main>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProjectList",
    data() {
      return {
        input: ''
      }
    }
  }
</script>

<style scoped>
.left{
    text-align: left
}
</style>
