<template>
  <div
    class="bg-gray-100 rounded-lg shadow p-4 flex flex-col items-center text-center"
  >
    <h4 class="font-bold text-xl">{{ props.name }}</h4>
    <div
      @click="goToPage"
      class="mt-2 mx-auto"
    >
      <p class="italic">Visit Clinic Page</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps<{
  id: string;
  name: string;
  city: string;
  phone: string;
  fax: string;
}>();

function goToPage() {
  console.log('goToPage fired!');
  router.push({
    name: 'ClinicPage',
    params: { id: props.id as string },
  });
}
</script>
