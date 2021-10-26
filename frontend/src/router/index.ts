import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/components/pages/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auth',
    name: 'GoogleLogin',
    component: () =>
      import(/* webpackChunkName: "Login" */ '@/components/pages/Login.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
