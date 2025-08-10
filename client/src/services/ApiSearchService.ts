import type { Provider, Clinic } from '@/interfaces';
const serverHost = import.meta.env.VITE_API_URL;

export const endpointsMap: Record<string, string> = {
  clinics: `${serverHost}/clinics/find`,
  providers: `${serverHost}/providers/find`,
  specialties: `${serverHost}/providers/find`,
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
