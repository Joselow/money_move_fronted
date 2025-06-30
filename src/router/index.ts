import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue'),
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/ListView.vue'),
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: () => import('../views/EditView.vue'),
    props: true,
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import('../views/ReportView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 