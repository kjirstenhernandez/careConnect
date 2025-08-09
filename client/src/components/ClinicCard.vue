<template>
  <div>
    <div
      class="clinic-card max-w-sm w-full bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
    >
      <div class="relative">
        <img
          src="../assets/building-placeholder.webp"
          alt="generic image of building"
          class="w-full h-52 object-cover"
        />
      </div>

      <div class="max-w-lg mx-auto space-y-6 px-7 text-center">
        <h2 class="mt-2 text-2xl font-bold">{{ name }}</h2>

        <div class="text-md leading-snug">
          <p class="font-normal text-gray-700">
            {{ streetAddress }}, {{ city }}, UT {{ zip }}
          </p>
        </div>

        <div class="text-base leading-3">
          <p class="font-normal text-gray-700">
            <i class="bi bi-telephone-fill"></i> {{ phone }}
          </p>
        </div>

        <div
          v-if="fax"
          class="text-base leading-3"
        >
          <p class="font-normal text-gray-700">
            <i class="bi bi-printer-fill"></i> {{ fax }}
          </p>
        </div>

        <div class="text-base leading-7">
          <p
            class="font-normal text-stone-400 hover:underline"
            @click="goToProfile"
          >
            More Info
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import stethoscope from '../assets/stethoscope.png';

const router = useRouter();
const props = defineProps<{
  id: string;
  name: string;
  streetAddress: string;
  city: string;
  zip: string;
  phone: string;
  fax: string;
}>();

function goToProfile() {
  router.push({ name: 'ClinicPage', params: { id: props.id } });
}
</script>
