import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import 'element-theme-darkplus/lib/index.color.css'
import '@/styles/index.scss'

Vue.use(ElementUI, { size: 'medium' })

Vue.config.productionTip = false

new Vue({ router, render: h => h(App) }).$mount('#app')
