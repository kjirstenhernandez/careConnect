<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import Bottom from './components/Footer.vue';
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <NavBar />
    <main class="flex-grow pt-8 w-full"></main>
    <Bottom />
  </div>
</template>
<style></style>
