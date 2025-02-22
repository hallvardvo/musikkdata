import { createApp } from 'vue'
import { createPinia } from 'pinia'  // Add this
import App from './App.vue'
import router from './router'

const pinia = createPinia()  // Create Pinia instance
const app = createApp(App)

app.use(pinia)  // Install Pinia before router
app.use(router)

app.mount('#app')
