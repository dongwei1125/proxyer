export default {
  mounted() {
    this.resizeListener()
    this.addResizeListener()
  },
  beforeDestroy() {
    this.removeResizeListener()
  },
  methods: {
    addResizeListener() {
      window.addEventListener('resize', this.resizeListener)
    },

    removeResizeListener() {
      window.removeEventListener('resize', this.resizeListener)
    },

    resizeListener() {
      this.editor?.layout()
    },
  },
}
