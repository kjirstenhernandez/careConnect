import request from 'supertest';
import express from 'express';
import { getAllProviders, getProviderById } from '../controllers/providers';

// Mock Prisma client
jest.mock('../prisma/client', () => ({
  providers: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
}));

import prisma from '../prisma/client';

const app = express();
app.use(express.json());

// Setup routes for testing
app.get('/providers', getAllProviders);
app.get('/providers/:providerId', getProviderById);

describe('Providers Controller', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('GET /providers', () => {
    it('should return all providers successfully', async () => {
      const mockProviders = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          credentials: 'MD',
          specialty: 'Cardiology',
          locations: [],
          phone: '123-456-7890',
          fax: '123-456-7891',
        },
      ];

      (prisma.providers.findMany as jest.Mock).mockResolvedValue(mockProviders);

      const response = await request(app).get('/providers');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ providers: mockProviders });
      expect(prisma.providers.findMany).toHaveBeenCalledTimes(1);
    });

    it('should handle when no providers exist', async () => {
      (prisma.providers.findMany as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/providers');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'No Providers' });
    });

    it('should handle database errors', async () => {
      (prisma.providers.findMany as jest.Mock).mockRejectedValue(
        new Error('Database error')
      );

      const response = await request(app).get('/providers');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Unable to get providers' });
    });
  });

  describe('GET /providers/:providerId', () => {
    it('should return a specific provider by ID', async () => {
      const mockProvider = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        credentials: 'MD',
        specialty: 'Cardiology',
        locations: [],
        phone: '123-456-7890',
        fax: '123-456-7891',
      };

      (prisma.providers.findUnique as jest.Mock).mockResolvedValue(mockProvider);

      const response = await request(app).get('/providers/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ providerInfo: mockProvider });
      expect(prisma.providers.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should return 400 when provider does not exist', async () => {
      (prisma.providers.findUnique as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/providers/nonexistent');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Provider doesn't exist" });
    });

    it('should handle database errors', async () => {
      (prisma.providers.findUnique as jest.Mock).mockRejectedValue(
        new Error('Database error')
      );

      const response = await request(app).get('/providers/1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Unable to get provider details' });
    });
  });
});
