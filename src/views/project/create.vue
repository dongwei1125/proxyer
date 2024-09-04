<template>
  <div class="project-create">
    <action sub-title="添加">
      <template slot="right">
        <el-button type="primary">保存</el-button>
      </template>
    </action>

    <div class="project-create-content">
      <config-form />
    </div>
  </div>
</template>

<script>
import Action from '@/components/Action.vue'
import ConfigForm from './components/ConfigForm.vue'

export default {
  name: 'ProjectCreate',
  components: { Action, ConfigForm },
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
}
</style>
