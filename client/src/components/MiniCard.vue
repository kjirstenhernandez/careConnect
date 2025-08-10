<template>
  <div
    class="cursor-pointer bg-gray-100 rounded-lg shadow p-4 flex flex-col items-center hover:bg-blue-50"
    @click="goToPage"
  >
    <div class="image-container">
      <div class="image-container flex flex-col sm:flex-row">
        <img
          v-if="imageUrl && imageUrl != ''"
          class="w-32 aspect-square flex-shrink-0 rounded-full object-cover mx-auto"
          :src="imageUrl"
          alt="{{ firstname}} {{ lastName }} profile picture"
        />
        <img
          v-else
          src="../assets/provider-placeholder.webp"
          class="w-32 aspect-square flex-shrink-0 rounded-full object-cover mx-auto"
          alt="generic illustration of a person"
        />
      </div>
    </div>
    <h4 class="font-bold text-xl">
      {{ props.firstName }} {{ props.lastName }}
      <span v-if="credentials.length">, {{ credentials.join(', ') }}</span>
    </h4>
    <div class="mt-2 mx-auto">
      <p class="italic">Visit Provider Page</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps<{
  id: string;
  firstName: string;
  lastName: string;
  credentials: string[];
  imageUrl: string;
}>();

function goToPage() {
  router.push({
    name: 'ProviderPage',
    params: { id: props.id as string },
  });
}
</script>
