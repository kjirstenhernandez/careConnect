<template>
  <div class="relative py-12 flex flex-col items-center lg:py-20">
    <div class="container flex flex-col items-center">
      <nav class="mt-8 sm:px-6 md:overflow-x-hidden">
        <ul
          class="scroll-wrapper flex space-x-6 overflow-x-scroll text-sm text-black-base md:overflow-x-hidden"
        >
          <li>
            <button
              :class="[
                'border-b-2 font-semibold uppercase tracking-widest border-transparent',
                type === 'providers' ? 'text-[#0E5387]' : 'text-black-base',
              ]"
              @click="handleNavClick('providers')"
            >
              Providers
            </button>
          </li>
          <li>
            <button
              :class="[
                'border-b-2 font-semibold uppercase tracking-widest border-transparent',
                type === 'clinics' ? 'text-[#0E5387]' : 'text-black-base',
              ]"
              @click="handleNavClick('clinics')"
            >
              Clinics
            </button>
          </li>
          <li>
            <button
              :class="[
                'border-b-2 font-semibold uppercase tracking-widest border-transparent',
                type === 'specialties' ? 'text-[#0E5387]' : 'text-black-base',
              ]"
              @click="handleNavClick('specialties')"
            >
              Specialties
            </button>
          </li>
        </ul>
      </nav>
      <div
        class="flex flex-col sm:flex-row items-center gap-4 w-full max-w-3xl mt-4"
      >
        <textInput
          :placeholder="`Find ${type}`"
          textClass="w-full sm:w-2/3"
          v-model="keyword"
        />
        <textInput
          placeholder="Location"
          textClass="w-full sm:w-1/3"
          v-model="location"
        />
        <ButtonTemplate
          type="submit"
          @click="handleSearchClick"
          >Search</ButtonTemplate
        >
      </div>
    </div>
    <div class="search-results"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useFuseSearch } from '@/fuse/fuseSearch';
import textInput from '@/components/basic/textInput.vue';
import ButtonTemplate from '../components/basic/buttonTemplate.vue';
import router from '@/router';
import Fuse from 'fuse.js';

const route = useRoute();
const type = ref(route.params.type as string);

// Search info
const keyword = ref(''); // user input
const location = ref('');
const data = ref([]);

watch(
  () => route.params.type,
  (newType) => {
    type.value = newType as string;
    loadData();
  }
);

async function loadData() {
  const endpoint = endpointsMap[type.value];
  if (!endpoint) return;

  try {
    const res = await fetch(endpoint);
    data.value = await res.json();
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

/* API call structures */

//Uses Record type as an alternate to a long "if-else" chain
const endpointsMap: Record<string, string> = {
  clinics: 'http://localhost:8080/api/clinics',
  providers: 'http://localhost:8080/api/providers',
  specialties: `http://localhost:8080/api/providers`,
};

/* Click Event Functions*/

// Search Button
function handleSearchClick() {}

// route.param nav links
function handleNavClick(type: string) {
  router.push({ name: 'SearchPage', params: { type } });
}

onMounted(() => {
  loadData();
});
</script>
