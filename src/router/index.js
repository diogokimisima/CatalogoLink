import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import Carrinho from '../pages/Carrinho.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/carrinho', component: Carrinho },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
