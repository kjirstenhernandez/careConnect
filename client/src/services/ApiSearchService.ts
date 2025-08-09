import type { Provider, Clinic } from '@/interfaces';

export const endpointsMap: Record<string, string> = {
  clinics: 'http://localhost:2000/api/clinics/find',
  providers: 'http://localhost:2000/api/providers/find',
  specialties: 'http://localhost:2000/api/providers/find',
};

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
