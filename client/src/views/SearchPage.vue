<template>
  <div class="relative py-12 flex flex-col items-center lg:py-20">
    <div class="container flex flex-col items-center">
      <SearchTabs
        :active="type"
        @change="handleNavClick"
      />
      <SearchBar
        :type="type"
        v-model:query="queryValue"
        v-model:location="location"
        @search="handleSearchClick"
      />
    </div>
    <div class="search-results">
      <!-- Future: render results -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';

import SearchBar from '@/components/search/SearchBar.vue';
import SearchTabs from '@/components/search/SearchTabs.vue';

import { useFuseSearch } from '@/services/fuseSearchService';
import { useFilteredResults } from '@/services/FilteredResultsService';
import { fetchSearchData } from '@/services/ApiSearchService';
import type { Provider, Clinic } from '../interfaces';

type SearchItem = Provider | Clinic;

const route = useRoute();
const type = ref(route.params.type as string);
const keyword = ref('');
const queryValue = ref('');
const location = ref('');
const data = ref<SearchItem[]>([]);

const { results: fuseResults } = useFuseSearch(data, [], keyword);
const filteredResults = useFilteredResults(type, location, fuseResults);

async function loadData() {
  data.value = await fetchSearchData(type.value);
}

function handleSearchClick() {
  keyword.value = queryValue.value.trim();
}

function handleNavClick(newType: string) {
  router.push({ name: 'SearchPage', params: { type: newType } });
}

watch(
  () => route.params.type,
  async (newType) => {
    type.value = newType as string;
    await loadData();
  }
);

onMounted(loadData);
</script>
