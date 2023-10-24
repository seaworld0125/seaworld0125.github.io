import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from "axios";
import router from "./router/index.js";

createApp(App)
  .provide('$axios', axios)
  .use(router)
  .mount('#app')
