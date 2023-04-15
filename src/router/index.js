import { createRouter, createWebHashHistory } from 'vue-router';
import { appRotas } from '../app/router.js';

import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [...appRotas]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/page/Landing.vue')
        },
        {
            path: '/:catchAll(.*)',
            name: 'notfound',
            component: () => import('@/views/NotFound.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/Error.vue')
        }
    ]
});

export default router;
