<template>
  <div class="relative py-12 flex flex-col items-center lg:py-20">
    <div class="container flex flex-col items-center">
      <SearchTabs
        :type="type"
        @change="handleNavClick"
      />
      <SearchBar
        :type="type"
        v-model:query="queryValue"
        v-model:location="location"
        @update:query="queryValue = $event"
        @search="handleSearchClick"
      />
    </div>
    <div class="search-results flex flex-col items-center justify-center">
      <div
        v-if="loading"
        class="my-8"
      >
        <span
          class="animate-spin inline-block w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full"
        ></span>
        <p class="mt-2 text-blue-500 font-semibold">Searching...</p>
      </div>
      <div v-else>
        <h1 class="text-2xl font-bold mb-4">
          {{ type === 'providers' ? 'Providers' : 'Clinics' }} Search Results
        </h1>
        <CardWrapper
          :items="filteredResults"
          :type="type"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';

import SearchBar from '@/components/SearchBar.vue';
import SearchTabs from '@/components/SearchTabs.vue';

import { useFuseSearch } from '@/services/fuseSearchService';
import { useFilteredResults } from '@/services/FilteredResultsService';
import { fetchSearchData } from '@/services/ApiSearchService';
import type { Provider, Clinic } from '../interfaces';
import CardWrapper from '@/components/CardWrapper.vue';
import { computed } from 'vue';

type SearchItem = Provider | Clinic;

const route = useRoute();
const type = ref(route.params.type as string);
// let isInitialLoad = true;
const loading = ref(false);
const keyword = ref('');
const queryValue = ref('');
const location = ref('');
const data = ref<SearchItem[]>([]); //raw API data

const keysMap = {
  providers: ['firstName', 'lastName', 'specialty'],
  clinics: ['name', 'city'],
  specialties: ['specialty', 'firstName', 'lastName'],
};

const keys = computed(
  () => keysMap[type.value as 'providers' | 'clinics' | 'specialties'] || []
);

const { results: fuseResults } = useFuseSearch(data, keys, keyword);

const filteredResults = useFilteredResults(type, location, fuseResults);

async function loadData() {
  loading.value = true;
  const response = (await fetchSearchData(type.value)) as {
    clinicInfo?: Clinic[];
    providers?: Provider[];
    message?: string;
  };
  if (type.value === 'clinics') {
    data.value = response.clinicInfo ?? [];
  } else if (type.value === 'providers') {
    data.value = response.providers ?? [];
  }
  loading.value = false;
}
watch(filteredResults, (newVal) => {
  console.log('filteredResults changed:', newVal);
});

function handleSearchClick() {
  keyword.value = queryValue.value.trim();
  loadData();
}

function handleNavClick(newType: string) {
  router.push({ name: 'SearchPage', params: { type: newType } });
  loadData();
}

watch(
  () => route.params.type,
  (newType) => {
    type.value = newType as string;
  }
);
</script>
