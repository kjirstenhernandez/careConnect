import { Providers } from '@prisma/client';
import prisma from '../prisma/client';

export async function findProviderById(providerId: string) {
  const provider = await prisma.providers.findUnique({
    where: { id: providerId },
  });

  return provider;
}

export async function checkLocationExists(
  provider: Providers,
  locationId: string
) {
  if (!provider.locations.includes(locationId)) {
    return false;
  }
  return true;
}
