import { Providers } from '@prisma/client';
import prisma from '../prisma/client';

/** Finds a provider by their unique ID.
 *
 * Queries the `providers` table using Prisma to retrieve a single provider record
 * that matches the given `providerId`.
 */
export async function findProviderById(providerId: string) {
  const provider = await prisma.providers.findUnique({
    where: { id: providerId },
  });

  return provider;
}

/**
 * Checks whether a provider has a specific location.
 *
 * Iterates through the provider's `locations` array to determine if any location
 * matches the given `locationId`.
 *
 * @param {Providers} provider - The provider object containing the locations array.
 * @param {string} locationId - The unique identifier of the location to check.
 * @returns {boolean} `true` if the location exists for the provider, otherwise `false`.
 */
export async function checkLocationExists(
  provider: Providers,
  locationId: string
) {
  return provider.locations.some((location) => location.id === locationId);
}
