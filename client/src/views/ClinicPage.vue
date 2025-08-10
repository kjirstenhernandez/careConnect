<template>
  <section class="w-full overflow-hidden">
    <div v-if="!clinic">
      <h1>Sorry</h1>
      <h2>This clinic's page is currently unavailable</h2>
    </div>
    <div v-else>
      <!-- Clinic Cover Image -->
      <img
        src="../assets/hero-background.webp"
        alt="Clinic Cover"
        class="w-full h-[25rem] -mt-15 opacity-80 mask-gradient absolute z-0"
      />
      <div
        class="profile-container mt-30 p-20 w-auto flex flex-col items-center lg:flex-row relative mx-30 bg-white rounded-xl shadow-lg"
      >
        <!-- Clinic Info -->
        <div class="w-full justify-center">
          <h1 class="text-center text-gray-800 text-4xl font-bold">
            {{ clinic.name }}
          </h1>
          <table class="text-lg my-3 mx-auto">
            <tbody>
              <tr>
                <td class="px-2 py-2 text-gray-500 font-semibold">Address</td>
                <td class="px-2 py-2">{{ clinic.streetAddress }}</td>
              </tr>
              <tr>
                <td class="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                <td class="px-2 py-2">{{ clinic.phone }}</td>
              </tr>
              <tr v-if="clinic.fax">
                <td class="px-2 py-2 text-gray-500 font-semibold">Fax</td>
                <td class="px-2 py-2">{{ clinic.fax }}</td>
              </tr>
            </tbody>
          </table>
          <div class="px-2 flex rounded-sm bg-gray-200 text-gray-500">
            <h3 class="mx-auto text-gray-800 font-semibold">Providers</h3>
          </div>
          <!-- Provider Cards -->
          <div class="w-full flex gap-4 justify-center items-center mt-10">
            <MiniCard
              v-for="provider in providers"
              :key="provider.id"
              :id="provider.id"
              :firstName="provider.firstName"
              :lastName="provider.lastName"
              :credentials="provider.credentials"
              :imageUrl="provider.imageUrl"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted, watch } from 'vue';

import type { Clinic, Provider } from '@/interfaces';
import MiniCard from '@/components/MiniCard.vue';
const serverHost = import.meta.env.VITE_API_URL;

const route = useRoute();
const clinic = ref<Clinic | null>(window.history.state?.clinic ?? null);
const providers = ref<Provider[]>([]);
const clinicId = ref('');

async function loadClinic() {
  if (!clinic.value) {
    clinicId.value = route.params.id as string;
    const res = await fetch(`${serverHost}/clinics/find/${clinicId.value}`);
    const data = await res.json();
    clinic.value = data.clinicInfo;
  } else {
    clinicId.value = String(clinic.value.id);
  }
}
async function fetchProviders() {
  if (!clinic.value) return;
  const res = await fetch(`${serverHost}/providers/find/many`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clinicId: clinicId.value }),
  });
  const data = await res.json();
  providers.value = data.providers;
}

watch(clinic, () => {
  fetchProviders();
});

onMounted(() => {
  if (!clinic.value) {
    loadClinic();
  } else {
    fetchProviders();
  }
});
</script>

<style>
.mask-gradient {
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent,
    black 20%,
    black 80%,
    transparent
  );
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: cover;
  mask-image: linear-gradient(
    to bottom,
    transparent,
    black 20%,
    black 80%,
    transparent
  );
  mask-repeat: no-repeat;
  mask-size: cover;
}
</style>
