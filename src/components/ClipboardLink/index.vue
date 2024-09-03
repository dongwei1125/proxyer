<template>
  <el-tooltip content="点击复制到剪切板" placement="top" effect="light">
    <el-link type="primary" :underline="false" @click="handleCopy">{{ text }}</el-link>
  </el-tooltip>
</template>

<script>
import { copyText } from './clipboard'

export default {
  name: 'ClipboardLink',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleCopy() {
      copyText(this.text)
        .then(() => {
          this.$message.success('复制成功')
        })
        .catch(() => {
          this.$message.error('复制失败')
        })
    },
  },
}
</script>
