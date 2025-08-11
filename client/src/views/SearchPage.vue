<!--
  SearchPage View

  Provides a unified interface for searching providers or clinics.
  Includes tabs for switching search type, a search bar for queries and location, and displays filtered results.
-->


<template>
  <!--
  Renders search tabs, search bar, and search results.
  Displays results using CardWrapper based on current search type and filters.
  Responsive layout for desktop and mobile.
-->
  <div class="relative py-12 items-center lg:py-20">
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
    <div class="search-results">
      <h1 class="text 2xl font-bold mb-4">
        {{ type === 'providers' ? 'Providers' : 'Clinics' }} Search Results
      </h1>
      <CardWrapper
        :items="filteredResults"
        :type="type"
      />
      <!-- the :type errors when specifying the providers/clinics in the prop -->
    </div>
  </div>
</template>

<script setup lang="ts">
// Imports and setup for route, search logic, and data refs
// - useFuseSearch: Fuzzy search composable for query matching
// - useFilteredResults: Filters results by location and type
// - fetchSearchData: Loads raw data from API based on search type
// Watches and updates search type, query, and location
// Handles navigation and search actions


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
