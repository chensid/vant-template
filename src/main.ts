import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores'
import router from './router'

import './style.css'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'

createApp(App).use(pinia).use(router).mount('#app')
