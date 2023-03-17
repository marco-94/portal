<template>
  <div>
    <el-footer style="height: 32px">
      <div>
        <div class="block" style="text-align: right">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalPage">
          </el-pagination>
        </div>
      </div>
    </el-footer>
  </div>
</template>

<script>
  export default {
    name: "pages",
    props: {
      'pageSize': {
        type: Number,
        default: 10
      },
      'totalPage': Number,
      'currentPage': Number,
    },
    data() {
      return {}
    },
    methods: {
      handleSizeChange(e) {
        this.$emit('handleSizeChange', e)
      },
      handleCurrentChange(e) {
        this.$emit('handleCurrentChange', e)
      }
    },
  }
</script>

<style scoped>
  @import "pages.css";
</style>
