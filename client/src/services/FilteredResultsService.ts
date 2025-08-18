// Service for filtering fuzzy search results by type and location.
// Used to refine Fuse.js search results for providers and clinics.

import { computed, type Ref } from 'vue';
import type { Provider, Clinic } from '@/interfaces';

/**
 * Filters Fuse.js search results based on entity type and location.
 *
 * @param type - Ref for the current search type ("providers", "clinics", "specialties")
 * @param location - Ref for the location filter string
 * @param fuseResults - Ref for Fuse.js search results (array of Provider or Clinic items)
 * @returns Computed array of filtered results matching the location
 */
export function useFilteredResults(
  type: Ref<string>,
  location: Ref<string>,
  fuseResults: Ref<{ item: Provider | Clinic }[]>
) {
  // Type guard to check if item is a Provider
  function isProvider(item: any): item is Provider {
    console.log('is Provider');
    return 'locations' in item;
  }

  // Type guard to check if item is a Clinic
  function isClinic(item: any): item is Clinic {
    console.log('is Clinic');
    return 'city' in item && 'name' in item;
  }

  // Returns a computed array of results filtered by location and type
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
