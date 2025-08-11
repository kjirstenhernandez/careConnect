// Service for fetching search data from the backend API.
// Supports searching for providers, clinics, and specialties.

import type { Provider, Clinic } from '@/interfaces';

// Base URL for API requests, loaded from environment variable.
const serverHost = import.meta.env.VITE_API_URL;

// Maps search types to their corresponding API endpoints.
export const endpointsMap: Record<string, string> = {
  clinics: `${serverHost}/clinics/find`,
  providers: `${serverHost}/providers/find`,
  specialties: `${serverHost}/providers/find`, // Specialties use the providers endpoint
};

/**
 * Fetches search data from the API for the given type.
 * 
 * @param type - The type of data to fetch ("providers", "clinics", or "specialties")
 * @returns Promise resolving to an array of Provider or Clinic objects
 */
export async function fetchSearchData(
  type: string
): Promise<(Provider | Clinic)[]> {
  const endpoint = endpointsMap[type];
  if (!endpoint) return [];

  try {
    const res = await fetch(endpoint);
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return [];
  }
}
