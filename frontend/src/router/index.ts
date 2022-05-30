import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    props: true,
    component: () =>
      import(/* webpackChunkName: "Home" */ '@/components/pages/Home.vue'),
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
    component: () =>
      import(
        /* webpackChunkName: "Profile" */ '@/components/pages/Profile.vue'
      ),
  },
  {
    path: '/projects/:id',
    name: 'Project',
    component: () =>
      import(
        /* webpackChunkName: "Project Detail) */ '@/components/pages/Project.vue'
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
