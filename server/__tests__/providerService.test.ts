import { Providers } from '@prisma/client';

// Mock Prisma client
jest.mock('../prisma/client', () => ({
  providers: {
    findUnique: jest.fn(),
  },
}));

import prisma from '../prisma/client';
import { findProviderById, checkLocationExists } from '../services/providerService';

describe('Provider Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findProviderById', () => {
    it('should return provider when found', async () => {
      const mockProvider = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        credentials: ['MD'],
        specialty: 'Cardiology',
        locations: [],
        phone: '123-456-7890',
        fax: '123-456-7891',
        imageUrl: null,
      };

      (prisma.providers.findUnique as jest.Mock).mockResolvedValue(mockProvider);

      const result = await findProviderById('1');

      expect(result).toEqual(mockProvider);
      expect(prisma.providers.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should return null when provider not found', async () => {
      (prisma.providers.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await findProviderById('nonexistent');

      expect(result).toBeNull();
      expect(prisma.providers.findUnique).toHaveBeenCalledWith({
        where: { id: 'nonexistent' },
      });
    });

    it('should handle database errors', async () => {
      (prisma.providers.findUnique as jest.Mock).mockRejectedValue(
        new Error('Database error')
      );

      await expect(findProviderById('1')).rejects.toThrow('Database error');
    });
  });

  describe('checkLocationExists', () => {
    const mockProvider: Providers = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      credentials: ['MD'],
      specialty: 'Cardiology',
      locations: [
        { id: 'location1', city: 'Main City' },
        { id: 'location2', city: 'Branch City' },
      ],
      phone: '123-456-7890',
      fax: '123-456-7891',
      imageUrl: null,
    };

    it('should return true when location exists', () => {
      const result = checkLocationExists(mockProvider, 'location1');
      expect(result).toBe(true);
    });

    it('should return true when second location exists', () => {
      const result = checkLocationExists(mockProvider, 'location2');
      expect(result).toBe(true);
    });

    it('should return false when location does not exist', () => {
      const result = checkLocationExists(mockProvider, 'nonexistent');
      expect(result).toBe(false);
    });

    it('should handle empty locations array', () => {
      const providerWithNoLocations: Providers = {
        ...mockProvider,
        locations: [],
      };

      const result = checkLocationExists(providerWithNoLocations, 'location1');
      expect(result).toBe(false);
    });

    it('should be case sensitive', () => {
      const result = checkLocationExists(mockProvider, 'LOCATION1');
      expect(result).toBe(false);
    });
  });
});
