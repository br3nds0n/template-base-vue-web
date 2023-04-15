import { createRouter, createWebHashHistory } from 'vue-router';
import { appRotas } from '../app/router.js';
import { trackRouter } from 'vue-gtag-next';

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
            path: '/access',
            name: 'accessDenied',
            component: () => import('@/views/Access.vue')
        },
        {
            path: '/error',
            name: 'error',
            component: () => import('@/views/Error.vue')
        }
    ]
});

trackRouter(router);

/*
 *                  ⚠️ ATENÇÃO ⚠️
 *  O código abaixo é responsável por verificar se o
 *  usuário está logado e redirecionar para a página
 *  de login caso não esteja.
 *
 *  Caso queira alterar o comportamento padrão, altere
 *  rotasPublicas e authRequired.
 */

router.beforeEach((to, from, next) => {
    const pathPublicos = ['/', '/login', '/cadastrar', '/landing'];
    const authPath = !pathPublicos.includes(to.path);

    const isAuthenticated = localStorage.getItem('token');
    if (!authPath) {
        next();
    } else {
        if (isAuthenticated == null) {
            next('/landing');
        } else {
            next();
        }
    }
});

export default router;
