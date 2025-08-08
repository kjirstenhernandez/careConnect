import { ref, watch } from 'vue';
import Fuse from 'fuse.js';
import type { IFuseOptions } from 'fuse.js';

export function useFuseSearch<T>(items: T[], keys: string[]) {
  const query = ref('');
  const results = ref<{ item: T }[]>([]);
  const options: IFuseOptions<T> = {
    keys,
    threshold: 0.3,
    includeScore: true, // we want the scores to be able to sort by relevance later
  };

  let fuse = new Fuse(items, options);

  watch(
    query,
    (newQuery) => {
      results.value = newQuery
        ? fuse.search(newQuery).map((r) => ({ item: r.item }))
        : items.map((item) => ({ item }));
    },
    { immediate: true }
  );

  watch(
    () => items,
    (newItems) => {
      fuse = new Fuse(newItems, options);
      results.value = query.value
        ? fuse.search(query.value).map((r) => ({ item: r.item }))
        : newItems.map((item) => ({ item }));
    },
    { immediate: true, deep: true }
  );

  return { query, results };
}
