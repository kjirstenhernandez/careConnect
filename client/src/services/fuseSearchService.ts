import { ref, watch, type Ref } from 'vue';
import Fuse from 'fuse.js';
import type { IFuseOptions } from 'fuse.js';
import { computed } from 'vue';

export function useFuseSearch<T>(
  items: Ref<T[]>,
  keys: Ref<string[]>,
  query: Ref<string>
) {
  let fuse: Fuse<T> | null = null;

  const fuseVersion = ref(0); // dummy ref to force computed results to trigger

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

  watch([items, keys], updateFuse, { immediate: true, deep: true });

  const results = computed(() => {
    fuseVersion.value; // watching for the trigger
    if (!fuse) {
      return [];
    }
    return query.value
      ? fuse.search(query.value).map((r) => ({ item: r.item }))
      : items.value.map((item) => ({ item }));
  });

  watch(results, () => {
    console.log(results.value);
  });

  return { results };
}
