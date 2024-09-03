<template>
  <div class="banner">
    <img src="@/assets/logo.png" alt="" />

    <h1>Proxyer 0.1.0</h1>

    <el-button type="text" icon="el-icon-document-copy">文档</el-button>

    <el-button type="text" icon="el-icon-info" @click="visible = true">关于</el-button>

    <about-dialog :visible.sync="visible" />
  </div>
</template>

<script>
import AboutDialog from './AboutDialog.vue'

export default {
  name: 'Banner',
  components: { AboutDialog },
  data() {
    return {
      visible: false,
    }
  },
}
</script>

<style scoped>
.banner {
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  background-color: #1f1f1f;
}

img {
  height: 40px;
}

h1 {
  flex: 1;
  font-size: 20px;
  color: #adadad;
  margin: 0 0 0 20px;
}
</style>
