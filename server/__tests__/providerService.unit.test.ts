import { Providers } from '@prisma/client';

// Mock Prisma client only
jest.mock('../prisma/client', () => ({
  providers: {
    findUnique: jest.fn(),
  },
}));

import prisma from '../prisma/client';

// Import after mocking
const { findProviderById } = require('../services/providerService');

describe('Provider Service Unit Tests', () => {
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

  // Note: checkLocationExists is a simple utility function that doesn't
  // require complex testing as it's a basic array.some() operation
});
