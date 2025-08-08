import { ref, watch, type Ref } from 'vue';
import Fuse from 'fuse.js';
import type { IFuseOptions } from 'fuse.js';

export function useFuseSearch<T>(
  items: Ref<T[]>,
  keys: string[],
  query: Ref<string>
) {
  const results = ref<{ item: T }[]>([]);
  const options: IFuseOptions<T> = {
    keys,
    threshold: 0.3,
    includeScore: true,
  };

  let fuse = new Fuse(items.value, options);

  watch(
    query,
    (newQuery) => {
      results.value = newQuery
        ? fuse.search(newQuery).map((r) => ({ item: r.item }))
        : items.value.map((item) => ({ item }));
    },
    { immediate: true }
  );

  watch(
    () => items.value,
    (newItems) => {
      fuse = new Fuse(newItems, options);
      results.value = query.value
        ? fuse.search(query.value).map((r) => ({ item: r.item }))
        : newItems.map((item) => ({ item }));
    },
    { immediate: true, deep: true }
  );

  return { results };
}
