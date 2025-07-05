import { createRouter, createWebHistory } from 'vue-router';
import { requireAuth, requireGuest } from '../guards/auth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true },
    beforeEnter: requireAuth,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresGuest: true },
    beforeEnter: requireGuest,
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue'),
    meta: { requiresGuest: true },
    beforeEnter: requireGuest,
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/ListView.vue'),
    meta: { requiresAuth: true },
    beforeEnter: requireAuth,
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: () => import('../views/EditView.vue'),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: requireAuth,
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import('../views/ReportView.vue'),
    meta: { requiresAuth: true },
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 