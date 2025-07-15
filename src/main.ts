import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'primeicons/primeicons.css'
import 'vue-sonner/style.css'



const app = createApp(App)

app.use(router)
app.mount('#app')
