import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { key, store } from './store'

// 加载全局样式
import './style/index.scss'

createApp(App)
  .use(router)
  .use(store, key)
  .mount('#app')
