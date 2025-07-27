import { createRouter, createWebHistory } from 'vue-router';
import { requireAuth, requireGuest } from '../guards/auth';
import { TRANSACTION_TYPE } from '@/constants/transaction';

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
    path: '/transaction/inflow/:id?',
    name: 'Inflow',
    component: () => import('../views/TransactionView.vue'),
    meta: { requiresAuth: true, type: TRANSACTION_TYPE.INFLOW },
    beforeEnter: requireAuth,
  },
  {
    path: '/transaction/outflow/:id?',
    name: 'Outflow',
    component: () => import('../views/TransactionView.vue'),
    meta: { requiresAuth: true, type: TRANSACTION_TYPE.OUTFLOW },
    beforeEnter: requireAuth,
  },
  {
    path: '/transactions',
    name: 'List',
    component: () => import('../views/TransactionHistoryView.vue'),
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