import { createAuth0 } from '@auth0/auth0-vue';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import router from './router';

const app = createApp(App);

app.use(router).use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_url: import.meta.env.VITE_AUTH0_CALLBACK_URL,
    },
  })
);

app.mount('#app');
