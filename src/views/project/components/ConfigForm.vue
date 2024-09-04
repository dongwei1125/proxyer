<template>
  <div class="config-form">
    <el-form :form="form" :rules="rules" label-position="top">
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="端口号" prop="port">
        <input-plus v-model="form.port" placeholder="请申请端口号">
          <el-button slot="append" type="primary">申请</el-button>
        </input-plus>
      </el-form-item>
      <el-form-item label="配置文件" prop="configs">
        <div class="config-group">
          <el-button type="primary" icon="el-icon-plus" circle @click="handleCreate" />

          <el-row :gutter="12">
            <el-col v-for="config in form.configs" :key="config.id" :span="12">
              <input-plus v-model="config.name" :disabled="!config.editing">
                <template slot="append">
                  <el-button
                    icon="el-icon-delete"
                    :disabled="form.configs.length === 1"
                    plain
                    @click="handleDelete(config)"
                  />
                  <el-button icon="el-icon-setting" plain />
                </template>
              </input-plus>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" type="textarea" :rows="3" placeholder="请输入描述" />
      </el-form-item>
    </el-form>

    <monaco-editor />
  </div>
</template>

<script>
import { nanoid } from 'nanoid'

import InputPlus from '@/components/InputPlus.vue'
import MonacoEditor from '@/components/MonacoEditor.vue'

const form = {
  name: '',
  port: '',
  configs: [
    {
      id: nanoid(),
      name: '',
      select: false,
      editing: false,
    },
  ],
  description: '',
}

export default {
  name: 'ConfigForm',
  components: { InputPlus, MonacoEditor },
  data() {
    return {
      form: { ...form },
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
  methods: {
    handleCreate() {
      const config = {
        id: nanoid(),
        name: '',
        select: false,
        editing: false,
      }

      this.form.configs.push(config)
    },

    handleDelete(config) {
      const configs = this.form.configs
      const index = configs.findIndex(e => e.id === config.id)

      configs.splice(index, 1)
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

.input-plus {
  width: 100%;
  margin-top: 12px;
}

.monaco-editor {
  flex: 1;
}
</style>
