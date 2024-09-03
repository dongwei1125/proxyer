<template>
  <div class="update">
    <action sub-title="编辑">
      <template slot="right">
        <el-button type="primary">保存</el-button>
      </template>
    </action>

    <div class="update-content">
      <config-form />
    </div>
  </div>
</template>

<script>
import Action from '@/components/Action.vue'
import ConfigForm from './ConfigForm'

export default {
  name: 'Update',
  components: { Action, ConfigForm },
}
</script>

<style scoped>
.update {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.update-content {
  flex: 1;
}
</style>
