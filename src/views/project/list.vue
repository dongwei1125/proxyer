<template>
  <div class="project-list">
    <action>
      <template slot="left">
        <el-button type="primary" @click="handleCreate">添加</el-button>
        <el-button :disabled="!selection.length" @click="handleBatchDelete">删除</el-button>
      </template>
    </action>

    <div class="project-list-table">
      <el-table
        v-loading="loading"
        :data="tableData"
        tooltip-effect="light"
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" width="60px" />

        <el-table-column prop="name" label="名称" show-overflow-tooltip min-width="100px" />

        <el-table-column label="配置文件" width="200px">
          <template slot-scope="{ row }">
            <el-select
              :value="getConfig(row)"
              size="small"
              @change="configId => onConfigChange(row.id, configId)"
            >
              <el-option
                v-for="config in row.configs"
                :key="config.id"
                :label="config.name"
                :value="config.id"
              />
            </el-select>
          </template>
        </el-table-column>

        <el-table-column label="地址" show-overflow-tooltip min-width="120px">
          <template slot-scope="{ row }">
            <clipboard-link :text="row.port | resolveURL" />
          </template>
        </el-table-column>

        <el-table-column label="目的地" min-width="100px">
          <template slot-scope="{ row }">
            <target-tooltip :row="row" />
          </template>
        </el-table-column>

        <el-table-column prop="status" label="状态" width="100px">
          <template slot-scope="{ row }">
            <status :status="row.status" />
          </template>
        </el-table-column>

        <el-table-column label="代理" width="160px">
          <template slot-scope="{ row }">
            <el-tooltip content="启动" placement="top" effect="light">
              <el-button
                icon="el-icon-video-play"
                circle
                size="mini"
                :loading="row.startLoading"
                @click="handleStart(row)"
              />
            </el-tooltip>

            <el-tooltip content="重载" placement="top" effect="light">
              <el-button
                icon="el-icon-refresh"
                circle
                size="mini"
                :loading="row.reloadLoading"
                @click="handleReload(row)"
              />
            </el-tooltip>

            <el-tooltip content="停止" placement="top" effect="light">
              <el-button
                icon="el-icon-switch-button"
                circle
                size="mini"
                :loading="row.stopLoading"
                @click="handleStop(row)"
              />
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
        :page-sizes="[5, 10, 15, 20]"
        :total="total"
        layout="total, sizes, prev, pager, next"
        @current-change="onCurrentChange"
        @size-change="onSizeChange"
      />
    </div>
  </div>
</template>

<script>
import { resolveURL } from '@/utils'
import {
  getProjectList,
  deleteProject,
  switchConfig,
  startProject,
  reloadProject,
  stopProject,
} from '@/api/project'

import Action from '@/components/Action.vue'
import ClipboardLink from '@/components/ClipboardLink'
import TargetTooltip from './components/TargetTooltip.vue'
import Status from './components/Status.vue'

export default {
  name: 'ProjectList',
  components: { Action, ClipboardLink, TargetTooltip, Status },
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
  created() {
    this.getTableData()
  },
  methods: {
    async getTableData() {
      try {
        this.loading = true

        const { data } = await getProjectList(this.pagination)
        const rows = data.rows || []
        const tableData = rows.map(row => ({
          ...row,
          startLoading: false,
          reloadLoading: false,
          stopLoading: false,
        }))

        this.tableData = tableData
        this.total = data.total || 0
      } catch {
      } finally {
        this.loading = false
      }
    },

    async onConfigChange(id, configId) {
      try {
        this.loading = true

        const { data } = await switchConfig({ id, configId })

        this.updateRow(data)
      } catch {
      } finally {
        this.loading = false
      }
    },

    updateRow(row) {
      const targetRow = this.tableData.find(el => el.id === row.id)

      Object.assign(targetRow, row)
    },

    async handleStart(row) {
      try {
        row.startLoading = true

        const { data } = await startProject({ id: row.id })

        this.updateRow(data)
        this.$message.success('代理已启动')
      } catch {
      } finally {
        row.startLoading = false
      }
    },

    async handleReload(row) {
      try {
        row.reloadLoading = true

        const { data } = await reloadProject({ id: row.id })

        this.updateRow(data)
        this.$message.success('重载成功')
      } catch {
      } finally {
        row.reloadLoading = false
      }
    },

    async handleStop(row) {
      try {
        row.stopLoading = true

        const { data } = await stopProject({ id: row.id })

        this.updateRow(data)
        this.$message.success('代理已停止')
      } catch {
      } finally {
        row.stopLoading = false
      }
    },

    onCurrentChange(pageNo) {
      this.pagination.pageNo = pageNo

      this.getTableData()
    },

    onSizeChange(pageSize) {
      this.pagination.pageSize = pageSize

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
        const ids = this.selection.map(el => el.id)

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
  },
}
</script>

<style scoped>
.project-list-table {
  padding: 24px;
  background-color: #141414;
}

.el-select {
  width: 100%;
}

.el-pagination {
  text-align: right;
  margin-top: 24px;
}
</style>
