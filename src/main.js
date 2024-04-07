import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 驾驶舱dataV
import DataVVue3 from '@kjgl77/datav-vue3'
// 时间
import moment from 'moment'


const app = createApp(App)

app.use(ElementPlus)
app.use(DataVVue3)
app.use(moment)

app.mount('#app')
