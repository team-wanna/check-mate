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
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '@/components/pages/Login.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/components/pages/Profile.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
