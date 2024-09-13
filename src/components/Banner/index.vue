<template>
  <div class="banner">
    <img src="@/assets/logo.png" alt="" />

    <h1>Proxyer 0.1.0</h1>

    <theme-toggle />

    <el-button type="text" icon="el-icon-document-copy">文档</el-button>

    <el-button type="text" icon="el-icon-info" @click="visible = true">关于</el-button>

    <about-dialog :visible.sync="visible" />

    <span @click="handleSetTop">置顶</span>

    <span @click="handleMin">最小化</span>

    <span @click="handleMax">最大化</span>

    <span @click="handleClose">关闭</span>
  </div>
</template>

<script>
import ThemeToggle from '../ThemeToggle'
import AboutDialog from './AboutDialog.vue'

export default {
  name: 'Banner',
  components: { ThemeToggle, AboutDialog },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    handleSetTop() {
      window.ipcRenderer?.send('set-always-on-top')
    },

    handleMin() {
      window.ipcRenderer?.send('window-min')
    },

    handleMax() {
      window.ipcRenderer?.send('window-max')
    },

    handleClose() {
      window.ipcRenderer?.send('window-close')
    },
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
}

img {
  height: 40px;
}

h1 {
  flex: 1;
  font-size: 20px;
  margin: 0 0 0 20px;
}

.el-button {
  margin-left: 10px;
}
</style>
