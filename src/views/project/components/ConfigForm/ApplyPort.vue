<template>
  <div class="apply-port">
    <input-plus :value="value" placeholder="请申请端口号" readonly @input="onInput">
      <el-button slot="append" type="primary" :loading="loading" @click="handleApply">申请</el-button>
    </input-plus>
  </div>
</template>

<script>
import { getProjectPort } from '@/api/project'

import InputPlus from '@/components/InputPlus.vue'

export default {
  name: 'ApplyPort',
  components: { InputPlus },
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    onInput(value) {
      this.$emit('input', value)
    },

    async handleApply() {
      try {
        this.loading = true

        const { data } = await getProjectPort()

        this.$emit('input', data)
      } catch {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
