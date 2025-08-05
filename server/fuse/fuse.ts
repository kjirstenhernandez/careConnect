import Fuse from 'fuse.js';
import prisma from '../prisma/client';

let fuse: Fuse<any>;

export const initializeFuse = async () => {
  try {
    const [providers, clinics] = await Promise.all([
      prisma.providers.findMany(),
      prisma.clinics.findMany(),
    ]);

    const providerOptions = {
      keys: [
        'id',
        'firstName',
        'lastName',
        'specialty',
        'locations',
        'phone',
        'fax',
        'credentials',
      ],
      threshold: 0.3, //fuzziness level
    };

    const clinicOptions = {
      keys: [
        'id',
        'name',
        'city',
        'streetAddress',
        'city',
        'zip',
        'phone',
        'fax',
      ],
      threshold: 0.3,
    };

    const providerFuse = new Fuse(providers, providerOptions);
    const clinicFuse = new Fuse(clinics, clinicOptions);

    return { providerFuse, clinicFuse };
  } catch (error) {
    console.error('Failed to initialize search indexes');
    throw error;
  }
};
