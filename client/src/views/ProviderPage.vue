<template>
  <section class="relative bg-accent-[#AEDFE5] bg-opacity-05 py-16">
    <div
      class="absolute left-0 top-0 h-full w-full bg-hero-pattern-doctor bg-cover bg-right-top bg-no-repeat md:bg-contain"
    >
      <h1>Hello {{ providerId }}</h1>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();

const providerId = route.params.id;
</script>
