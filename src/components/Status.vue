<template>
  <div class="status">
    <span v-if="status === SERVER_STATUS.RUNNING" class="running">已启动</span>
    <span v-else-if="status === SERVER_STATUS.STOP" class="stop">已停止</span>
  </div>
</template>

<script>
const SERVER_STATUS = {
  RUNNING: 1,
  STOP: 0,
}

export default {
  name: 'Status',
  props: {
    status: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      SERVER_STATUS,
    }
  },
}
</script>

<style scoped>
.running {
  color: #67c23a;
}

.stop {
  color: #f56c6c;
}
</style>
