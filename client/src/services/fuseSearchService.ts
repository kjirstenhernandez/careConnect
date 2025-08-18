import { ref, watch, type Ref } from 'vue';
import Fuse from 'fuse.js';
import type { IFuseOptions } from 'fuse.js';
import { computed } from 'vue';

/**
 * useFuseSearch composable
 * 
 * Sets up Fuse.js fuzzy search for a reactive list of items.
 * Automatically updates Fuse instance when items or keys change.
 * Returns computed search results based on the current query.
 *
 * @param items - Ref to an array of items to search
 * @param keys - Ref to an array of keys to search on (Fuse.js keys)
 * @param query - Ref to the current search query string
 * @returns { results } - Computed array of search results (each result has an 'item' property)
 */
export function useFuseSearch<T>(
  items: Ref<T[]>,
  keys: Ref<string[]>,
  query: Ref<string>
) {
  let fuse: Fuse<T> | null = null;

  const fuseVersion = ref(0); // dummy ref to force computed results to trigger

  // Updates Fuse instance whenever items or keys change
  function updateFuse() {
    if (
      !Array.isArray(items.value) ||
      !Array.isArray(keys.value) ||
      keys.value.length === 0
    ) {
      fuse = null;
      fuseVersion.value++; // forces the trigger
      return;
    }

    fuse = new Fuse(items.value, {
      keys: keys.value,
      threshold: 0.3,
      includeScore: true,
    });
    fuseVersion.value++;
  }
  // Watch for changes in items or keys and update Fuse instance
  watch([items, keys], updateFuse, { immediate: true, deep: true });

  // Computed search results based on query and Fuse instance
  const results = computed(() => {
    fuseVersion.value; // watching for the trigger
    if (!fuse) {
      return [];
    }
    return query.value
      ? fuse.search(query.value).map((r) => ({ item: r.item }))
      : items.value.map((item) => ({ item }));
  });

  // (logger for debugging)
  watch(results, () => {
    console.log(results.value);
  });

  return { results };
}
