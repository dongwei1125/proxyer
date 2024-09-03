<template>
  <div class="config-form">
    <el-form :form="form" :rules="rules" label-position="top">
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="端口号" prop="port">
        <input-button v-model="form.port" placeholder="请申请端口号">
          <el-button slot="append" type="primary">申请</el-button>
        </input-button>
      </el-form-item>
      <el-form-item label="配置文件" prop="configs">
        <config-list v-model="form.configs" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" type="textarea" :rows="3" placeholder="请输入描述" />
      </el-form-item>
    </el-form>

    <monaco-editor v-model="xxx" />
  </div>
</template>

<script>
import InputButton from '@/components/InputButton.vue'
import MonacoEditor from '@/components/MonacoEditor.vue'
import ConfigList from './ConfigList.vue'

const form = {
  name: '',
  port: '',
  configs: [],
  description: '',
}

export default {
  name: 'ConfigForm',
  components: { InputButton, MonacoEditor, ConfigList },
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
      xxx: `{
        "target": "http://localhost:8080",
        // 请求头
        "headers": {
          "Referer": "http://localhost:8080",
          "Host": "localhost:8080",
          "Cookie": "SESSION=123456"
        }
      }`,
    }
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
