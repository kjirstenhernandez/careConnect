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
          v-for="itemObj in items"
          :key="itemObj.item.id"
          v-bind="itemObj.item"
          :is="cardType"
        ></component>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProviderCard from '@/components/ProviderCard.vue';
import ClinicCard from '@/components/ClinicCard.vue';
import { ref, watch } from 'vue';
const error = ref<string | null>(null);

const props = defineProps<{
  type: string; // I recognize the potential for a union error, but specifying 'providers' | 'clinics' was causing a ripple effect of other issues.  This is a bandaid solution until I can refactor code.
  items: any[];
}>();

let cardMap = {
  providers: ProviderCard,
  clinics: ClinicCard,
} as const;

let cardType;
if (props.type === 'providers') {
  cardType = cardMap.providers;
} else {
  cardType = cardMap.clinics;
}
watch(
  () => props.items,
  () => {
    console.log('CardWrapper Prop.items: ' + { ...props.items });
  }
);
</script>
