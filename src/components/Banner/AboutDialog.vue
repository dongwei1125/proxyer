<template>
  <el-dialog title="关于 Proxyer" :visible.sync="show" width="520px" top="100px">
    <template slot="footer">
      <el-button>取消</el-button>
      <el-button type="primary">确认</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'AboutDialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    show: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit('update:visible', value)
      },
    },
  },
}
</script>
