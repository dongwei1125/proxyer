<template>
  <div class="banner">
    <div class="banner-left">
      <img src="@/assets/logo.png" alt="" />

      <h1>Proxyer 0.1.0</h1>

      <el-button type="text" icon="el-icon-document-copy">文档</el-button>

      <el-button type="text" icon="el-icon-info" @click="visible = true">关于</el-button>
    </div>

    <div v-if="isElectron" class="banner-right">
      <div class="button" title="置顶" @click="handleSetTop">
        <i class="el-icon-s-check" />
      </div>

      <div class="button" title="最小化" @click="handleMin">
        <i class="el-icon-minus" />
      </div>

      <div class="button" title="还原" @click="handleMax">
        <i class="el-icon-copy-document" />
      </div>

      <div class="button close" title="关闭" @click="handleClose">
        <i class="el-icon-close" />
      </div>
    </div>

    <about-dialog :visible.sync="visible" />
  </div>
</template>

<script>
import message from '@/utils/message'

import AboutDialog from './AboutDialog.vue'

export default {
  name: 'Banner',
  components: { AboutDialog },
  data() {
    return {
      visible: false,
    }
  },
  computed: {
    isElectron() {
      return window.ipcRenderer
    },
  },
  methods: {
    async handleSetTop() {
      const data = await message.send('set-always-on-top')

      console.log(data)
    },

    async handleMin() {
      const data = await message.send('window-min')

      console.log(data)
    },

    async handleMax() {
      const data = await message.send('window-max')

      console.log(data)
    },

    async handleClose() {
      const data = await message.send('window-close')

      console.log(data)
    },
  },
}
</script>

<style lang="scss" scoped>
.banner {
  height: 60px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
}

.banner-left {
  display: flex;
  align-items: center;

  img {
    height: 40px;
  }

  h1 {
    font-size: 20px;
    margin: 0 0 0 20px;
  }

  .el-button {
    margin-left: 10px;
  }
}

.banner-right {
  display: flex;
  align-items: center;

  .button {
    width: 36px;
    height: 36px;
    line-height: 36px;
    color: #ccc;
    text-align: center;
    cursor: pointer;

    &:hover {
      background-color: #363737;
    }

    &:active {
      background-color: #393a3a;
    }

    &.close {
      &:hover {
        background-color: #eb1123;
      }

      &:active {
        background-color: #a2222c;
      }
    }
  }
}
</style>
