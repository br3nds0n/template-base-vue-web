import { dashboardRotas } from './dashboard/router';

export const homeRota = {
    path: '',
    name: 'Home',
    component: () => import('./Home.vue'),
    children: [dashboardRotas]
};
