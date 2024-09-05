<template>
  <div class="config-form">
    <el-form ref="form" :model="form" :rules="rules" label-position="top">
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入名称" />
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
        this.$refs.form?.validate(resolve)
      })
    },

    getValue() {
      return this.form
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
