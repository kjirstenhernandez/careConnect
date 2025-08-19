<!--
  ProviderPage View

  Displays detailed information for a single healthcare provider, including profile image, contact info, credentials, and a list of associated clinic locations.
  Loads provider and clinic data from the API based on the route parameter.
-->

<template>
  <!--
  Renders provider details and associated clinic cards.
  Shows an error message if the provider is unavailable.
  Responsive layout for desktop and mobile.
-->
  <section class="w-full overflow-hidden">
    <div v-if="!provider">
      <h1 class="text-xl">Sorry</h1>
      <h2 class="text-lg">This provider's page is currently unavailable</h2>
    </div>
    <div v-else>
      <!-- User Cover IMAGE -->
      <img
        src="../assets/hero-background.webp"
        alt="User Cover"
        class="w-full h-[25rem] -mt-[10rem] place-self-start opacity-80 mask-gradient absolute z-0"
      />
      <div
        v-if="provider"
        class="profile-container mt-30 p-10 min-w-fit sm:p-16 md:p-20 lg:p-24 xl:p-20 w-auto flex flex-col items-center lg:flex-row px-4 sm:px-8 md:px-24 lg:px-24 xl:px-24 relative mx-30 bg-white rounded-xl shadow-lg p-6 justify-evenly space-x-8"
      >
        <!-- User Profile Image -->
        <div
          class="image-container flex-shrink-0"
          v-if="provider"
        >
          <img
            v-if="provider && provider.imageUrl"
            :src="provider.imageUrl"
            class="rounded-lg min-w-[100px] max-w-lg h-auto md:h-auto"
          /><img
            v-else
            src="../assets/provider-placeholder.webp"
            class="rounded-lg min-w-[100px] w-full h-auto md:w-auto md:h-auto"
          />
        </div>

        <div
          v-if="provider"
          class="w-1/2"
        >
          <!-- FullName -->
          <h1
            class="text-center text-gray-800 text-lg md:text-4xl font-bold mt-2 p-5"
          >
            {{ provider.firstName }} {{ provider.lastName }}
            <span v-if="provider.credentials.length"
              >, {{ provider.credentials.join(', ') }}</span
            >
          </h1>
          <!-- About -->
          <div class="content-center">
            <table class="text-lg my-3 mx-auto">
              <tbody>
                <tr>
                  <td
                    class="text-sm md:text-md px-2 py-2 text-gray-500 font-semibold"
                  >
                    <i class="bi bi-telephone-fill"></i>
                  </td>
                  <td class="px-2 py-2">{{ provider.phone }}</td>
                </tr>
                <tr v-if="provider.fax">
                  <td
                    class="text-sm md:text-md px-2 py-2 text-gray-500 font-semibold"
                  >
                    <i class="bi bi-printer-fill"></i>
                  </td>
                  <td class="px-2 py-2">{{ provider.fax }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Social Links -->
          <div
            class="justify-center flex rounded-sm bg-gray-200 text-gray-500 hover:text-gray-600 hover:dark:text-gray-400"
          >
            <h3 class="text-gray-800 font-semibold">Locations</h3>
          </div>

          <!-- Cards -->
          <div class="w-full flex gap-4 justify-center items-center mt-10">
            <!-- 1 -->

            <div class="w-full flex gap-4 justify-center items-center mt-10">
              <LocationCard
                v-for="clinic in clinicInfos"
                :key="String(clinic.id)"
                :id="String(clinic.id)"
                :name="clinic.name"
                :city="clinic.city"
                :phone="clinic.phone"
                :fax="clinic.fax"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
// Imports and setup for route, API calls, and data refs
// - loadPage: Fetches provider info from the API
// - fetchClinics: Fetches clinics associated with the provider
// Watches provider ref to reload clinics when provider changes
// Loads data on mount

console.log('Provider page mounted!');
import { useRoute } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import LocationCard from '@/components/LocationCard.vue';
import type { Clinic, Provider } from '@/interfaces';
const serverHost = import.meta.env.VITE_API_URL;

const route = useRoute();
const provider = ref<Provider | null>(window.history.state?.provider ?? null);
const clinicInfos = ref<Clinic[]>([]);

async function loadPage() {
  if (!provider.value) {
    const providerId = route.params.id as string;
    const res = await fetch(`${serverHost}/providers/find/${providerId}`);
    const data = await res.json();
    provider.value = data.providerInfo;
    console.log(data);
  }
}

async function fetchClinics() {
  if (!provider.value) return;
  const ids = provider.value.locations.map((loc) => loc.id);
  const res = await fetch(`${serverHost}/clinics/find/many`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clinicIds: ids }),
  });
  const data = await res.json();
  console.log({ ...data });
  clinicInfos.value = data.clinics;
}
watch(provider, () => {
  console.log('Provider changed: ', provider.value);
  fetchClinics();
});
onMounted(() => {
  if (!provider.value) {
    loadPage();
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
