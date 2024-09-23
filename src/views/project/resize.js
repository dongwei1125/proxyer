export default {
  data() {
    return {
      maxHeight: undefined,
      bottomOffset: 150,
    }
  },
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
      const $el = this.$refs.table?.$el
      const bottomOffset = this.bottomOffset
      const maxHeight = window.innerHeight - $el.getBoundingClientRect().top - bottomOffset

      this.maxHeight = maxHeight
    },
  },
}
