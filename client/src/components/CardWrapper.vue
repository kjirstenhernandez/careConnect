<template>
  <div class="container">
    <p
      class="error"
      v-if="error"
    >
      {{ error }}
    </p>
    <div class="card-container">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <component
          v-for="item in items"
          :key="item.id"
          v-bind="item"
          :is="cardMap[type]"
        ></component>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProviderCard from '@/components/ProviderCard.vue';
import ClinicCard from '@/components/ClinicCard.vue';
import { ref } from 'vue';
const error = ref<string | null>(null);

const props = defineProps<{
  type: 'providers' | 'clinics';
  items: any[];
}>();

const cardMap = {
  providers: ProviderCard,
  clinics: ClinicCard,
} as const;
</script>
