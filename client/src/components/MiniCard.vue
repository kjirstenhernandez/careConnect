<!--
  MiniCard Component

  Displays a compact card for a healthcare provider, showing their photo, name, credentials, and a link to visit their profile page.
  Used in the "providers" section of a clinic's page.
-->
<template>
  <!--
  Renders a styled card with provider image (or placeholder), name, credentials, and a clickable link to navigate to the provider's detail page.
  Designed for use in lists or profile sections.
-->
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

// Props:
// - id: Provider ID (for navigation)
// - firstName, lastName: Provider's name
// - credentials: Array of credentials (e.g., MD, PA)
// - imageUrl: Profile image URL (uses placeholder if missing)
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
