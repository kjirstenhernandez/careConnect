<!--
  SearchTabs Component

  Displays tab buttons for switching between search categories (Providers, Clinics, Specialties).
  Updates the route to reflect the selected category.
-->
<template>
  <section>
    <nav class="mt-8 sm:px-6 md:overflow-x-hidden">
      <ul
        class="scroll-wrapper flex space-x-6 overflow-x-scroll text-sm text-black-base md:overflow-x-hidden"
      >
        <button
          class="border-b-2 font-semibold uppercase tracking-widest border-plum-bright"
          :class="{ 'border-white': currentType === 'providers' }"
          @click="changeType('providers')"
        >
          Providers
        </button>
        <button
          class="border-b-2 font-semibold uppercase tracking-widest border-plum-bright"
          :class="{ 'border-white': currentType === 'clinics' }"
          @click="changeType('clinics')"
        >
          Clinics
        </button>
        <button
          class="border-b-2 font-semibold uppercase tracking-widest border-plum-bright"
          :class="{ 'border-white': currentType === 'specialties' }"
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
import { computed } from 'vue';

// Props:
// - type: Current search category (e.g., "providers", "clinics", "specialties")
const props = defineProps<{ 
  type: string
}>();
const route = useRoute();

// currentType: Computed value for the active tab, defaults to "providers"
const currentType = computed(() => props.type || 'providers');

// changeType: Navigates to the same route with the selected type as a parameter
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
