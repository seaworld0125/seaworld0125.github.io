import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Markdown from 'vue3-markdown-it'
import Highlighter from '@highlightjs/vue-plugin'
import axios from "axios";

createApp(App)
  .provide('$axios', axios)
  .use(Markdown)
  .use(Highlighter)
  .mount('#app')
