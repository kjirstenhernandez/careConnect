<template>
  <section>
    <nav class="mt-8 sm:px-6 md:overflow-x-hidden">
      <ul
        class="scroll-wrapper flex space-x-6 overflow-x-scroll text-sm text-black-base md:overflow-x-hidden"
      >
        <button
          class="border-b-2 font-semibold uppercase tracking-widest border-plum-bright"
          :class="{ 'border-[#105894]': currentType === 'providers' }"
          @click="changeType('providers')"
        >
          Providers
        </button>
        <button
          class="border-b-2 font-semibold uppercase tracking-widest border-plum-bright"
          :class="{ 'border-[#105894]': currentType === 'clinics' }"
          @click="changeType('clinics')"
        >
          Clinics
        </button>
        <button
          class="border-b-2 font-semibold uppercase tracking-widest border-plum-bright"
          :class="{ 'border-[#105894]': currentType === 'specialties' }"
          @click="changeType('specialties')"
        >
          Specialties
        </button>
      </ul>
    </nav>
  </section>
</template>

<script setup lang="ts">
import router from '@/router';
import { useRoute } from 'vue-router';
const route = useRoute();
const currentType = (route.params.type as string) || 'providers';

function changeType(newType: string) {
  router.push({
    name: route.name,
    params: {
      ...route.params,
      type: newType,
    },
  });
}
</script>
