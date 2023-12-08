import { createApp } from 'vue';
import store from './store/store.js';
import router from './router'

import './style.css';
import App from './App.vue';

const app = createApp(App)
app.use(store);
app.use(router);
app.mount('#app');