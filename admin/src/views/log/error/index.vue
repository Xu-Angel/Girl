<template>
  <div class="app-container">
    <div>
      <span>:</span>
      <el-progress :text-inside="true" :stroke-width="18" :percentage="60" status="success"></el-progress>
      <el-button type="primary">开启<i class="el-icon-upload el-icon--right"></i></el-button>
      <el-button type="danger" plain disabled>停止</el-button>
    </div>
    <div>
      cookie配置
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

