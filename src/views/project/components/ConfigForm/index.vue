<template>
  <div class="config-form">
    <el-form ref="form" :model="form" :rules="rules" label-position="top">
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="form.name" :maxlength="32" placeholder="请输入名称" />
      </el-form-item>

      <el-form-item label="端口号" prop="port">
        <apply-port v-model="form.port" />
      </el-form-item>

      <el-form-item label="配置文件" prop="configs">
        <config-group v-model="form.configs" />
      </el-form-item>

      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" type="textarea" :rows="3" placeholder="请输入描述" />
      </el-form-item>
    </el-form>

    <monaco-editor v-model="jsonString" />
  </div>
</template>

<script>
import stripJsonComments from 'strip-json-comments'
import { validateURL } from '@/utils'

import MonacoEditor from '@/components/MonacoEditor.vue'
import ApplyPort from './ApplyPort.vue'
import ConfigGroup from './ConfigGroup.vue'

export default {
  name: 'ConfigForm',
  components: { ApplyPort, MonacoEditor, ConfigGroup },
  data() {
    return {
      form: {
        name: '',
        port: '',
        configs: [],
        description: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入项目名称',
          },
        ],
        port: [
          {
            required: true,
            message: '请申请端口号',
          },
        ],
      },
      jsonRules: [
        {
          validator(config, json, callback) {
            if (json) {
              callback()
            } else {
              callback(new Error(`${config.name} 配置项 JSON 格式错误`))
            }
          },
        },
        {
          validator(config, json, callback) {
            if (json.target) {
              if (validateURL(json.target)) {
                callback()
              } else {
                callback(new Error(`${config.name} 配置项 JSON 对象 target 属性 URL 格式错误`))
              }
            } else {
              callback(new Error(`${config.name} 配置项 JSON 对象缺少 target 属性`))
            }
          },
        },
      ],
    }
  },
  computed: {
    editingConfig() {
      const configs = this.form.configs
      const config = configs.find(el => el.editing)

      return config
    },
    jsonString: {
      get() {
        return this.editingConfig?.jsonString || ''
      },
      set(jsonString) {
        if (!this.editingConfig) return

        this.editingConfig.jsonString = jsonString
      },
    },
  },
  methods: {
    validate() {
      return new Promise(resolve => {
        this.$refs.form?.validate(async valid => {
          if (!valid) {
            resolve(false)

            return
          }

          try {
            await this.validateJsonString()

            resolve(true)
          } catch (error) {
            resolve(false)
            this.$message.warning(error.message)
          }
        })
      })
    },

    validateJsonString() {
      return new Promise(resolve => {
        const configs = this.form.configs
        const rules = this.jsonRules

        for (const rule of rules) {
          for (const config of configs) {
            var json = null

            try {
              json = JSON.parse(stripJsonComments(config.jsonString))
            } catch {}

            rule.validator(config, json, error => {
              if (error instanceof Error) {
                throw error
              }
            })
          }
        }

        resolve()
      })
    },

    getValue() {
      const { configs, ...form } = this.form

      return {
        ...form,
        configs: configs.map(config => {
          const cfg = { ...config }

          delete cfg.editing

          return cfg
        }),
      }
    },

    setValue(form) {
      Object.assign(this.form, form)
    },
  },
}
</script>

<style scoped>
.config-form {
  height: 100%;
  display: flex;
  background-color: #141414;
}

.el-form {
  flex: 1;
  padding: 24px;
}

.monaco-editor {
  flex: 1;
}
</style>
