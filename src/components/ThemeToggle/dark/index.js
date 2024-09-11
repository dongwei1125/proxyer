import { addClass, removeClass } from '@/utils/dom'
import media from './media'
import storage from './storage'

const ClassName = 'dark'
const el = document.documentElement

export default {
  mixins: [media, storage],
  computed: {
    mode() {
      return this.store === 'auto' ? this.system : this.store
    },
    isDark: {
      get() {
        return this.mode === 'dark'
      },
      set(value) {
        const storeValue = value ? 'dark' : 'light'

        if (this.system === storeValue) {
          this.store = 'auto'
        } else {
          this.store = storeValue
        }
      },
    },
  },
  watch: {
    mode(value) {
      if (value.includes('dark')) {
        addClass(el, ClassName)
      } else {
        removeClass(el, ClassName)
      }
    },
  },
}
