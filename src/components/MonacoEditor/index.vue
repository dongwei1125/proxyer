<template>
  <div ref="editor" class="monaco-editor" />
</template>

<script>
import * as monaco from 'monaco-editor'
import loader from '@monaco-editor/loader'

import resize from './resize'

export default {
  name: 'MonacoEditor',
  mixins: [resize],
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      editor: null,
      options: {
        value: this.value,
        theme: 'vs-dark',
        language: 'json',
        tabSize: 2, // Tab 缩进
        scrollBeyondLastLine: false, // 是否可以滚动到最后一行之后
        minimap: { enabled: false }, // 是否启用预览
        wordWrap: 'on', // 自动换行
      },
    }
  },
  watch: {
    value() {
      this.setValue()
    },
  },
  async mounted() {
    await this.initEditor()
    this.setValue()
  },
  beforeDestroy() {
    this.editor?.dispose()
  },
  methods: {
    async initEditor() {
      if (!this.$refs.editor) return

      loader.config({ monaco })
      loader.config({ 'vs/nls': { availableLanguages: { '*': 'zh-cn' } } })

      const monacoInstance = await loader.init()

      this.editor = monacoInstance.editor.create(this.$refs.editor, this.options)

      this.editor.getModel().onDidChangeContent(() => {
        this.$emit('input', this.editor.getValue())
      })
    },

    setValue() {
      if (!this.editor) return
      if (this.value === this.editor.getValue()) return

      this.editor.setValue(this.value)
    },
  },
}
</script>

<style scoped>
.monaco-editor {
  width: 100%;
  height: 100%;
  outline-color: transparent;
}
</style>
