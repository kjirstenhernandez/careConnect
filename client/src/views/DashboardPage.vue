<template>
  <h1>This is your dashboard</h1>
  <buttonTemplate
    v-if="isAuthenticated"
    type="button"
    backgroundColor="bg-[#48A3D0]"
    backgroundHover="bg-[#6DB5D9]"
    textColorHex="text-[#02213B]"
    @click="handleLogout"
  ></buttonTemplate>
</template>
<script setup lang="ts">
import buttonTemplate from '@/components/basic/buttonTemplate.vue';
import { useAuth0 } from '@auth0/auth0-vue';

const { logout } = useAuth0();
const { isAuthenticated } = useAuth0();
function handleLogout() {
  logout({
    logoutParams: {
      returnTo: window.location.origin,
    },
  });
}
</script>
