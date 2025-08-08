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
          v-model="queryValue"
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
import { onMounted, ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useFuseSearch } from '@/services/fuseSearchService';
import textInput from '@/components/basic/textInput.vue';
import ButtonTemplate from '../components/basic/buttonTemplate.vue';
import router from '@/router';
import type { Provider, Clinic } from '../interfaces';
type SearchItem = Provider | Clinic;

//// Route Globals
const route = useRoute();
const type = ref(route.params.type as string);

//// Search Globals

// Endpoints map for the API call
const endpointsMap: Record<string, string> = {
  clinics: 'http://localhost:8080/api/clinics',
  providers: 'http://localhost:8080/api/providers',
  specialties: `http://localhost:8080/api/providers`,
};

// Search key map for Fuse search
const searchKeysMap: Record<string, string[]> = {
  clinics: ['name', 'address', 'city', 'phone', 'fax'],
  providers: [
    'firstName',
    'lastName',
    'credentials',
    'specialties',
    'clinic.location',
  ],
  specialties: ['specialties'],
};
const keyword = ref('');
const queryValue = ref('');
const location = ref('');
const data = ref<SearchItem[]>([]); // holds the raw API data
const { results: fuseResults } = useFuseSearch<SearchItem>(
  data,
  searchKeysMap[type.value] || [],
  keyword
);

// Guards to set types.
function isProvider(item: any): item is Provider {
  return 'locations' in item;
}

function isClinic(item: any): item is Clinic {
  return 'city' in item && 'name' in item;
}

const filteredResults = computed(() => {
  if (!location.value) return fuseResults.value;

  return fuseResults.value.filter(({ item }) => {
    if (
      (type.value === 'providers' || type.value === 'specialties') &&
      isProvider(item)
    ) {
      return item.locations?.some(
        (loc) => loc.city.toLowerCase() === location.value.toLowerCase()
      );
    } else if (type.value === 'clinics' && isClinic(item)) {
      return item.city?.toLowerCase() === location.value.toLowerCase();
    }

    return false;
  });
});

onMounted(() => {
  loadData();
});

/*---- Search Logic ----*/

// Load initial API Information from the search and return it to the data variable's value
async function loadData() {
  const endpoint = endpointsMap[type.value];

  if (!endpoint) return;

  try {
    const res = await fetch(endpoint);
    const data = await res.json();
    data.value = data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

// Search Button Handler
function handleSearchClick() {
  keyword.value = queryValue.value.trim();
}

/*---- Navigation Logic ----*/

// Mini-Nav Click Handler
function handleNavClick(type: string) {
  router.push({ name: 'SearchPage', params: { type } });
}

// watch for route parameter changes to reload the information
watch(
  () => route.params.type,
  (newType) => {
    type.value = newType as string;
    loadData();
  }
);
</script>
