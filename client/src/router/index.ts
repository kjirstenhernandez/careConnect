import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import SearchPage from '../views/SearchPage.vue';
import ProviderPage from '@/views/ProviderPage.vue';
import ClinicPage from '@/views/ClinicPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage,
    },
    {
      path: '/search/:type',
      name: 'SearchPage',
      component: SearchPage,
      props: true,
    },
    {
      path: '/provider/:id',
      name: 'ProviderPage',
      component: ProviderPage,
      props: true,
    },
    {
      path: '/clinic/:id',
      name: 'ClinicPage',
      component: ClinicPage,
      props: true,
    },
  ],
});

export default router;
