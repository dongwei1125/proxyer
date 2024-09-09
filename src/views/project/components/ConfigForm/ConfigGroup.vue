<template>
  <div class="config-group">
    <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="handleCreate" />

    <el-row :gutter="12">
      <el-col v-for="config in value" :key="config.id" :span="12">
        <input-plus
          :value="config.name"
          :disabled="!config.editing"
          @input="name => onEditConfigName(name, config)"
        >
          <template slot="append">
            <el-button
              icon="el-icon-delete"
              :disabled="value.length === 1"
              plain
              @click="handleDelete(config)"
            />
            <el-button icon="el-icon-setting" plain @click="handleEdit(config)" />
          </template>
        </input-plus>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { generateId, randomChars } from '@/utils'

import InputPlus from '@/components/InputPlus.vue'

const template = `{
	"target": "http://192.0.0.1:9000",
	"headers": {
		"Referer": "http://192.0.0.1:9000",
		"Host": "192.0.0.1:9000",
		"Cookie": "JSESSIONID=123456789"
	}
}`

export default {
  name: 'ConfigGroup',
  components: { InputPlus },
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
  watch: {
    value: {
      handler() {
        this.init()
      },
      immediate: true,
    },
  },
  methods: {
    init() {
      this.createConfigOnEmpty()
      this.editFirstOnunedit()
    },

    createConfigOnEmpty() {
      if (this.value.length) return

      const config = this.generateConfig()
      const configs = [{ ...config, select: true, editing: true }]

      this.$emit('change', configs)
    },

    editFirstOnunedit() {
      if (!this.value.length) return
      if (this.value.find(el => el.editing)) return

      var configs

      if (this.value.find(el => el.select)) {
        configs = this.value.map(el => (el.select ? { ...el, editing: true } : el))
      } else {
        const [firstConfig, ...rest] = this.value

        configs = [{ ...firstConfig, select: true, editing: true }, ...rest]
      }

      this.$emit('change', configs)
    },

    handleCreate() {
      const configs = [...this.value]
      const config = this.generateConfig()

      this.$emit('change', [...configs, config])
    },

    onEditConfigName(name, config) {
      const configs = this.value.map(el => ({
        ...el,
        name: el === config ? name : el.name,
      }))

      this.$emit('change', configs)
    },

    handleDelete(config) {
      const configs = [...this.value]
      const index = configs.findIndex(el => el === config)

      configs.splice(index, 1)
      this.$emit('change', configs)
    },

    handleEdit(config) {
      const configs = this.value.map(el => ({
        ...el,
        editing: el === config,
      }))

      this.$emit('change', configs)
    },

    generateConfig() {
      const key = randomChars(4)
      const config = {
        id: generateId(),
        name: `config_${key}`,
        jsonString: template,
        select: false,
        editing: false,
      }

      return config
    },
  },
}
</script>

<style scoped>
.input-plus {
  width: 100%;
  margin-top: 12px;
}
</style>
