<template>
  <div id="app">
    <el-container>
      <el-header>
        <banner />
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Banner from '@/components/Banner'

export default {
  name: 'App',
  components: { Banner },
}
</script>
