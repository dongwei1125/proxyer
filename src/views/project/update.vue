<template>
  <div class="project-update">
    <action sub-title="编辑">
      <template slot="right">
        <el-button type="primary">保存</el-button>
      </template>
    </action>

    <div class="project-update-content">
      <config-form />
    </div>
  </div>
</template>

<script>
import Action from '@/components/Action.vue'
import ConfigForm from './components/ConfigForm.vue'

export default {
  name: 'ProjectUpdate',
  components: { Action, ConfigForm },
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
