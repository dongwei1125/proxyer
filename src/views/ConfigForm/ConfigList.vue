<template>
  <div class="config-list">
    <el-button type="primary" icon="el-icon-plus" circle @click="handleCreate" />

    <el-row :gutter="24">
      <el-col v-for="config in value" :key="config.id" :span="12">
        <input-button>
          <template slot="append">
            <el-button icon="el-icon-delete" plain></el-button>
            <el-button icon="el-icon-setting" plain></el-button>
          </template>
        </input-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import InputButton from '@/components/InputButton.vue'

export default {
  name: 'ConfigList',
  components: { InputButton },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onInput() {},
  },
  methods: {
    handleCreate() {
      const value = [...this.value]

      value.push({})

      this.$emit('change', value)
    },
  },
}
</script>

<style scoped>
.input-button {
  width: 100%;
  margin-top: 12px;
}
</style>
