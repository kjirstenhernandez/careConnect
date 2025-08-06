import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import SearchPage from '../views/SearchPage.vue';

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
  ],
});

export default router;
