import { computed, type Ref } from 'vue';
import type { Provider, Clinic } from '@/interfaces';

export function useFilteredResults(
  type: Ref<string>,
  location: Ref<string>,
  fuseResults: Ref<{ item: Provider | Clinic }[]>
) {
  function isProvider(item: any): item is Provider {
    return 'locations' in item;
  }

  function isClinic(item: any): item is Clinic {
    return 'city' in item && 'name' in item;
  }

  return computed(() => {
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
}
