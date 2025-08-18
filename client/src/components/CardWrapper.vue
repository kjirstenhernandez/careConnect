<!-- Card Wrapper Component
 A reusable container that displays a grid of card components (ProviderCard or ClinicCard) based on the provided type and items array. Iterates over the items to render each card, applies standardized CSS for layout, and shows error messages if needed.  -->
<template>
  <div class="container">
    <!-- Error message is displayed if applicable -->
    <p
      class="error"
      v-if="error"
    >
      {{ error }}
    </p>
    <!-- Container for cards -->
    <div class="card-container">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- The component space, dynamically renders either a provider card or clinic card depending on the value of "type" from the props.  Binds each card to its item's values-->
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

// Sets the properties as read-only and specifies their types.
const cardMap = {
  providers: ProviderCard,
  clinics: ClinicCard,
} as const;

// Establishes which card type should be used to build the component, given the "type" prop
let cardType;
if (props.type === 'providers') {
  cardType = cardMap.providers;
} else {
  cardType = cardMap.clinics;
}

// Watches for if teh value of props.items changed.  If it does, checks that teh new value is  an array

watch(
  () => props.items,
  ((newItems) => {
    if (!Array.isArray(newItems)) {
      error.value = "Items prop must be an array.";
    } else {
      error.value = null; // Clear error if resolved
    }
  }
));

</script>
