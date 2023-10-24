import {createRouter, createWebHistory} from "vue-router";
import Board from "../components/Board.vue";

const routes = [
  {path: '/', name: 'Main', component: Board},
  {path: '/page/:path*', name: 'Article', component: () => import('../components/Board.vue'), props: true}
]

const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes
})

export default router