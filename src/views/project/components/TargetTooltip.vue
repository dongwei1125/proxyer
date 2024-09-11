<template>
  <el-tooltip placement="top" effect="light">
    <div slot="content">
      <div v-if="target">{{ target }} (default)</div>
      <div v-for="(value, key, index) in rules" :key="index">{{ value }} ({{ key }})</div>
    </div>

    <span class="target-tooltip">{{ text }}</span>
  </el-tooltip>
</template>

<script>
import stripJsonComments from 'strip-json-comments'
import { unique } from '@/utils'

export default {
  name: 'TargetTooltip',
  props: {
    row: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    json() {
      const config = this.row.configs.find(config => config.select)
      const json = JSON.parse(stripJsonComments(config.jsonString))

      return json || {}
    },
    target() {
      return this.json.target
    },
    rules() {
      return this.json.rules || {}
    },
    text() {
      const target = this.target ? [this.target] : []
      const rules = Object.keys(this.rules).map(key => this.rules[key])
      const uniqued = unique([...target, ...rules])

      return uniqued.join(' / ')
    },
  },
}
</script>

<style scoped>
.target-tooltip {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
</style>
