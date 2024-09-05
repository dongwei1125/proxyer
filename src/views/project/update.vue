<template>
  <div v-loading="pageLoading" class="project-update">
    <action sub-title="编辑">
      <template slot="right">
        <el-button type="primary" :loading="loading" @click="handleSave">保存</el-button>
      </template>
    </action>

    <div class="project-update-content">
      <config-form ref="form" />
    </div>
  </div>
</template>

<script>
import { getProject, updateProject } from '@/api/project'

import Action from '@/components/Action.vue'
import ConfigForm from './components/ConfigForm'

export default {
  name: 'ProjectUpdate',
  components: { Action, ConfigForm },
  data() {
    return {
      loading: false,
      pageLoading: false,
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    },
  },
  created() {
    this.getProject()
  },
  methods: {
    async getProject() {
      try {
        this.pageLoading = true

        const { data } = await getProject({ id: this.id })

        this.$refs.form?.setValue(data)
      } catch {
      } finally {
        this.pageLoading = false
      }
    },

    async handleSave() {
      try {
        this.loading = true

        const form = this.$refs.form
        const valid = await form?.validate()

        if (!valid) return

        const params = form?.getValue()

        await updateProject(params)

        this.$message.success('编辑成功')
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
.project-update {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.project-update-content {
  flex: 1;
}
</style>
