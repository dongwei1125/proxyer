<template>
  <div class="project-create">
    <action sub-title="添加">
      <template slot="right">
        <el-button type="primary" :loading="loading" @click="handleSave">保存</el-button>
      </template>
    </action>

    <div class="project-create-content">
      <config-form ref="form" />
    </div>
  </div>
</template>

<script>
import { createProject } from '@/api/project'

import Action from '@/components/Action.vue'
import ConfigForm from './components/ConfigForm'

export default {
  name: 'ProjectCreate',
  components: { Action, ConfigForm },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async handleSave() {
      try {
        this.loading = true

        const form = this.$refs.form
        const valid = await form?.validate()

        if (!valid) return

        const params = form?.getValue()

        await createProject(params)

        this.$message.success('新增成功')
        this.$router.back()
      } catch {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.project-create {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.project-create-content {
  flex: 1;
  overflow: hidden;
}
</style>
