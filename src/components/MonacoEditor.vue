<template>
  <div ref="editor" class="monaco-editor" />
</template>

<script>
import * as monaco from 'monaco-editor'
import loader from '@monaco-editor/loader'

export default {
  name: 'MonacoEditor',
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
        automaticLayout: true, // 自动布局
        scrollBeyondLastLine: false, // 是否可以滚动到最后一行之后
        minimap: { enabled: false }, // 是否启用预览
      },
    }
  },
  watch: {
    value(string) {
      if (!this.editor) return
      if (string === this.editor.getValue()) return

      this.editor?.setValue(string)
    },
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.editor?.dispose()
  },
  methods: {
    async init() {
      loader.config({ monaco })
      loader.config({ 'vs/nls': { availableLanguages: { '*': 'zh-cn' } } })

      const monacoInstance = await loader.init()

      this.editor = monacoInstance.editor.create(this.$refs.editor, this.options)
      this.editor.getModel().onDidChangeContent(() => {
        this.$emit('input', this.editor.getValue())
      })
    },
  },
}
</script>

<style scoped>
.monaco-editor {
  width: 100%;
  height: 100%;
  outline-color: transparent;
  background-color: #1e1e1e;
}
</style>
