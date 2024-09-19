<template>
  <div class="banner">
    <div class="banner-left">
      <img src="@/assets/logo.png" alt="" />

      <h1>Proxyer 0.1.0</h1>

      <el-button type="text" icon="el-icon-document-copy">文档</el-button>

      <el-button type="text" icon="el-icon-info" @click="visible = true">关于</el-button>
    </div>

    <div v-if="isElectron" class="banner-right">
      <div class="top-button" :class="{ active: isAlwaysOnTop }" title="置顶" @click="handleSetTop">
        <i class="el-icon-s-check" />
      </div>

      <div class="min-button" title="最小化" @click="handleMin">
        <i class="el-icon-minus" />
      </div>

      <div v-if="isMaximized" class="restore-button" title="还原" @click="handleMax">
        <i class="el-icon-copy-document" />
      </div>

      <div v-else class="max-button" title="最大化" @click="handleMax">
        <i class="el-icon-full-screen" />
      </div>

      <div class="close-button" title="关闭" @click="handleClose">
        <i class="el-icon-close" />
      </div>
    </div>

    <about-dialog :visible.sync="visible" />
  </div>
</template>

<script>
import { isElectron } from '@/utils'
import message from '@/utils/message'

import AboutDialog from './AboutDialog.vue'

export default {
  name: 'Banner',
  components: { AboutDialog },
  data() {
    return {
      isElectron,
      visible: false,
      isAlwaysOnTop: false,
      isMaximized: false,
    }
  },
  created() {
    this.addEventListener()
  },
  methods: {
    addEventListener() {
      message.on('always-on-top-changed', (event, isAlwaysOnTop) => {
        this.isAlwaysOnTop = isAlwaysOnTop
      })

      message.on('maximize', () => {
        this.isMaximized = true
      })

      message.on('unmaximize', () => {
        this.isMaximized = false
      })
    },

    handleSetTop() {
      message.send('set-always-on-top')
    },

    handleMin() {
      message.send('window-min')
    },

    handleMax() {
      message.send('window-max')
    },

    handleClose() {
      message.send('window-close')
    },
  },
}
</script>

<style lang="scss" scoped>
@mixin button {
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
}

.banner {
  height: 60px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  background-color: #252526;
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

  .top-button {
    @include button;

    &.active {
      color: #409eff;
    }
  }

  .min-button,
  .max-button,
  .restore-button {
    @include button;
  }

  .close-button {
    @include button;

    &:hover {
      background-color: #eb1123;
    }

    &:active {
      background-color: #a2222c;
    }
  }
}
</style>
