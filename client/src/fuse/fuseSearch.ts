import { ref, computed, watch } from 'vue';
import Fuse from 'fuse.js';
import type { IFuseOptions } from 'fuse.js';

export function useFuseSearch<T>(items: T[], keys: string[]) {
  const query = ref('');
  const results = ref<{ item: T }[]>([]);
  let fuse: Fuse<T> | null = null;

  const options: IFuseOptions<T> = {
    keys,
    threshold: 0.3,
    includeScore: true,
  };

  fuse = new Fuse(items, options);

  watch(
    query,
    (newQuery) => {
      results.value = newQuery
        ? fuse!.search(newQuery).map((result) => ({ item: result.item }))
        : items.map((item) => ({ item }));
    },
    { immediate: true }
  );
  return { query, results };
}
