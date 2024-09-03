<template>
  <div class="create">
    <action sub-title="添加">
      <template slot="right">
        <el-button type="primary">保存</el-button>
      </template>
    </action>

    <div class="create-content">
      <config-form />
    </div>
  </div>
</template>

<script>
import Action from '@/components/Action.vue'
import ConfigForm from './ConfigForm'

export default {
  name: 'Create',
  components: { Action, ConfigForm },
}
</script>

<style scoped>
.create {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.create-content {
  flex: 1;
}
</style>
