<template>
  <div class="list">
    <action>
      <template slot="left">
        <el-button type="primary" @click="handleCreate">添加</el-button>
        <el-button>删除</el-button>
      </template>
    </action>

    <div class="list-table">
      <el-table :data="tableData">
        <el-table-column type="selection" width="60px" />

        <el-table-column prop="name" label="名称" width="160px" />

        <el-table-column label="配置文件">
          <template slot-scope="{ row }">
            <el-select :value="getConfig(row)" size="small">
              <el-option
                v-for="content in row.configs"
                :key="content.id"
                :label="content.name"
                :value="content.id"
              />
            </el-select>
          </template>
        </el-table-column>

        <el-table-column label="地址">
          <template slot-scope="{ row }">
            <clipboard-link :text="row.port | resolveURL" />
          </template>
        </el-table-column>

        <el-table-column label="目的地">
          <template slot-scope="{ row }">{{ getTarget(row) }}</template>
        </el-table-column>

        <el-table-column prop="status" label="状态" width="100px">
          <template slot-scope="{ row }">
            <status :status="row.status" />
          </template>
        </el-table-column>

        <el-table-column label="功能" width="160px">
          <template slot-scope="{ row }">
            <el-tooltip content="启动" placement="top" effect="light">
              <el-button icon="el-icon-video-play" circle size="mini" />
            </el-tooltip>

            <el-tooltip content="重载" placement="top" effect="light">
              <el-button icon="el-icon-refresh" circle size="mini" />
            </el-tooltip>

            <el-tooltip content="停止" placement="top" effect="light">
              <el-button icon="el-icon-switch-button" circle size="mini" />
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="120px">
          <template slot-scope="{ row }">
            <el-button type="text" @click="handleUpdate(row)">编辑</el-button>

            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination background layout="prev, pager, next" :total="1000"> </el-pagination>
    </div>
  </div>
</template>

<script>
import stripJsonComments from 'strip-json-comments'
import { resolveURL } from '@/utils'

import Action from '@/components/Action.vue'
import ClipboardLink from '@/components/ClipboardLink'
import Status from '@/components/Status.vue'

export default {
  name: 'List',
  components: { Action, ClipboardLink, Status },
  filters: { resolveURL },
  data() {
    return {
      tableData: [],
    }
  },
  methods: {
    handleCreate() {
      this.$router.push({
        path: '/list/create',
      })
    },

    handleUpdate() {
      this.$router.push({
        path: '/list/update',
      })
    },

    getConfig(row) {
      const config = row.configs.find(config => config.select)

      return config.id
    },

    getTarget(row) {
      const config = row.configs.find(config => config.select)
      const content = JSON.parse(stripJsonComments(config.content))

      return content.target
    },
  },
}
</script>

<style scoped>
.list-table {
  padding: 24px;
  background-color: #141414;
}

.el-pagination {
  text-align: right;
  margin-top: 24px;
}
</style>
