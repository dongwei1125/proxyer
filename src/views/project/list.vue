<template>
  <div class="project-list">
    <action>
      <template slot="left">
        <el-button type="primary" @click="handleCreate">添加</el-button>
        <el-button :disabled="!selection.length" @click="handleBatchDelete">删除</el-button>
      </template>
    </action>

    <div class="project-list-table">
      <el-table v-loading="loading" :data="tableData" @selection-change="selectionChange">
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

            <el-button type="text" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        :page-size="pagination.pageSize"
        :current-page="pagination.pageNo"
        :total="total"
        layout="total, prev, pager, next"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import stripJsonComments from 'strip-json-comments'
import { resolveURL } from '@/utils'
import { getProjectList, deleteProject } from '@/api/project'

import Action from '@/components/Action.vue'
import ClipboardLink from '@/components/ClipboardLink'
import Status from './components/Status.vue'

export default {
  name: 'ProjectList',
  components: { Action, ClipboardLink, Status },
  filters: { resolveURL },
  data() {
    return {
      tableData: [],
      selection: [],
      pagination: {
        pageNo: 1,
        pageSize: 10,
      },
      total: 0,
      loading: false,
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    async getTableData() {
      try {
        this.loading = true

        const { data } = await getProjectList(this.pagination)

        this.tableData = data.rows || []
        this.total = data.total || []
      } catch {
      } finally {
        this.loading = false
      }
    },

    handleCurrentChange(pageNo) {
      this.pagination.pageNo = pageNo

      this.getTableData()
    },

    selectionChange(selection) {
      this.selection = selection
    },

    handleCreate() {
      this.$router.push({ path: '/project/list/create' })
    },

    handleUpdate(row) {
      this.$router.push({
        path: '/project/list/update',
        query: { id: row.id },
      })
    },

    async handleDelete(row) {
      try {
        await this.$confirm(`确认删除 <b>${row.name}</b> 吗？`, '提示', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        await deleteProject({ ids: [row.id] })

        this.$message.success('删除成功')
        this.getTableData()
      } catch {}
    },

    async handleBatchDelete() {
      try {
        const ids = this.selection.map(e => e.id)

        await this.$confirm(`确认删除选中的 <b>${ids.length}</b> 项吗？`, '提示', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        await deleteProject({ ids })

        this.$message.success('删除成功')
        this.getTableData()
      } catch {}
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
.project-list-table {
  padding: 24px;
  background-color: #141414;
}

.el-pagination {
  text-align: right;
  margin-top: 24px;
}
</style>
