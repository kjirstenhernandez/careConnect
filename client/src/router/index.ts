// Vue Router configuration.
// Defines all main application routes and their corresponding components.
import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import SearchPage from '../views/SearchPage.vue';
import ProviderPage from '@/views/ProviderPage.vue';
import ClinicPage from '@/views/ClinicPage.vue';

// Create router instance with history mode and route definitions.
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    // Home/Landing page route
    {
      path: '/',
      name: 'home',
      component: LandingPage,
    },

    // Search page route, supports dynamic type (providers, clinics, etc.)
    {
      path: '/search/:type',
      name: 'SearchPage',
      component: SearchPage,
      props: true,
    },

    // Search page route, supports dynamic type (providers, clinics, etc.)
    {
      path: '/provider/:id',
      name: 'ProviderPage',
      component: ProviderPage,
      props: true,
    },

    // Clinic profile page route, dynamic clinic ID
    {
      path: '/clinic/:id',
      name: 'ClinicPage',
      component: ClinicPage,
      props: true,
    },
  ],
});

export default router;
