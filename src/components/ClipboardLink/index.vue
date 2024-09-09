<template>
  <span @click="handleCopy">{{ text }}</span>
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

<style lang="scss" scoped>
span {
  width: 100%;
  color: #409eff;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: middle;
  cursor: pointer;

  &:hover {
    color: #3375b9;
  }
}
</style>
