import request from 'supertest';
import express from 'express';
import {
  getAllProviders,
  getProviderById,
  addProvider,
  getProviderLocations,
  addProviderLocation,
  getMultipleProvidersByIDs,
} from '../controllers/providers';

// Mock Prisma client
jest.mock('../prisma/client', () => ({
  providers: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
}));

// Mock provider service
jest.mock('../services/providerService', () => ({
  findProviderById: jest.fn(),
  checkLocationExists: jest.fn(),
}));

import prisma from '../prisma/client';
import { findProviderById, checkLocationExists } from '../services/providerService';

const app = express();
app.use(express.json());

// Setup routes for testing
app.get('/providers', getAllProviders);
app.get('/providers/:providerId', getProviderById);
app.post('/providers', addProvider);
app.get('/providers/:id/locations', getProviderLocations);
app.post('/providers/location', addProviderLocation);
app.post('/providers/many', getMultipleProvidersByIDs);

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
          credentials: ['MD'],
          specialty: 'Cardiology',
          locations: [],
          phone: '123-456-7890',
          fax: '123-456-7891',
          imageUrl: null,
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
        credentials: ['MD'],
        specialty: 'Cardiology',
        locations: [],
        phone: '123-456-7890',
        fax: '123-456-7891',
        imageUrl: null,
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

  describe('POST /providers', () => {
    const validProviderData = {
      firstName: 'Jane',
      lastName: 'Smith',
      credentials: ['MD', 'PhD'],
      specialty: 'Neurology',
      locations: [{ id: 'loc1', city: 'New York' }],
      phone: '555-0123',
      fax: '555-0124',
    };

    it('should create a new provider successfully', async () => {
      const createdProvider = { id: '2', ...validProviderData };

      (prisma.providers.create as jest.Mock).mockResolvedValue(createdProvider);

      const response = await request(app)
        .post('/providers')
        .send(validProviderData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Provider succesfully created' });
      expect(prisma.providers.create).toHaveBeenCalledWith({
        data: validProviderData,
      });
    });

    it('should return 400 for missing required fields', async () => {
      const incompleteData = {
        firstName: 'Jane',
        // Missing lastName, credentials, specialty, locations, phone
      };

      const response = await request(app)
        .post('/providers')
        .send(incompleteData);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Missing required fields.' });
      expect(prisma.providers.create).not.toHaveBeenCalled();
    });

    it('should handle database errors during creation', async () => {
      (prisma.providers.create as jest.Mock).mockRejectedValue(
        new Error('Database error')
      );

      const response = await request(app)
        .post('/providers')
        .send(validProviderData);

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Server error while creating provider' });
    });
  });

  describe('GET /providers/:id/locations', () => {
    it('should return provider locations successfully', async () => {
      const mockProvider = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        locations: [
          { id: 'loc1', city: 'New York' },
          { id: 'loc2', city: 'Boston' },
        ],
      };

      const mockLocations = { locations: mockProvider.locations };

      (findProviderById as jest.Mock).mockResolvedValue(mockProvider);
      (prisma.providers.findUnique as jest.Mock).mockResolvedValue(mockLocations);

      const response = await request(app).get('/providers/1/locations');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ locations: mockLocations });
      expect(findProviderById).toHaveBeenCalledWith('1');
    });

    it('should return 404 when provider not found', async () => {
      (findProviderById as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/providers/nonexistent/locations');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Provider Not Found' });
      expect(prisma.providers.findUnique).not.toHaveBeenCalled();
    });

    it('should handle database errors', async () => {
      (findProviderById as jest.Mock).mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/providers/1/locations');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: 'Server error',
        error: 'Database error',
      });
    });
  });

  describe('POST /providers/location', () => {
    const validLocationData = {
      providerId: '1',
      location: { id: 'loc3', city: 'Chicago' },
    };

    it('should add location to provider successfully', async () => {
      const mockProvider = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        locations: [{ id: 'loc1', city: 'New York' }],
      };

      const updatedProvider = {
        ...mockProvider,
        locations: [...mockProvider.locations, validLocationData.location],
      };

      (findProviderById as jest.Mock).mockResolvedValue(mockProvider);
      (checkLocationExists as jest.Mock).mockReturnValue(true); // Location doesn't exist
      (prisma.providers.update as jest.Mock).mockResolvedValue(updatedProvider);

      const response = await request(app)
        .post('/providers/location')
        .send(validLocationData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Location added succesfully',
        provider: updatedProvider,
      });
      expect(prisma.providers.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: {
          locations: {
            push: validLocationData.location,
          },
        },
      });
    });

    it('should return 404 when provider not found', async () => {
      (findProviderById as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .post('/providers/location')
        .send(validLocationData);

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Provider Not Found' });
      expect(prisma.providers.update).not.toHaveBeenCalled();
    });

    it('should return 200 when location already exists', async () => {
      const mockProvider = {
        id: '1',
        locations: [{ id: 'loc3', city: 'Chicago' }],
      };

      (findProviderById as jest.Mock).mockResolvedValue(mockProvider);
      (checkLocationExists as jest.Mock).mockReturnValue(false); // Location exists

      const response = await request(app)
        .post('/providers/location')
        .send(validLocationData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Location already exists' });
      expect(prisma.providers.update).not.toHaveBeenCalled();
    });

    it('should handle database errors', async () => {
      const mockProvider = { id: '1', locations: [] };

      (findProviderById as jest.Mock).mockResolvedValue(mockProvider);
      (checkLocationExists as jest.Mock).mockReturnValue(true);
      (prisma.providers.update as jest.Mock).mockRejectedValue(
        new Error('Database error')
      );

      const response = await request(app)
        .post('/providers/location')
        .send(validLocationData);

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: 'Server error',
        error: 'Database error',
      });
    });
  });

  describe('POST /providers/many', () => {
    it('should return providers by clinic ID', async () => {
      const clinicId = 'clinic123';
      const mockProviders = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          locations: [{ id: clinicId, city: 'New York' }],
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Smith',
          locations: [{ id: clinicId, city: 'New York' }],
        },
      ];

      (prisma.providers.findMany as jest.Mock).mockResolvedValue(mockProviders);

      const response = await request(app)
        .post('/providers/many')
        .send({ clinicId });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ providers: mockProviders });
      expect(prisma.providers.findMany).toHaveBeenCalledWith({
        where: {
          locations: {
            some: {
              id: clinicId,
            },
          },
        },
      });
    });

    it('should handle database errors', async () => {
      (prisma.providers.findMany as jest.Mock).mockRejectedValue(
        new Error('Database error')
      );

      const response = await request(app)
        .post('/providers/many')
        .send({ clinicId: 'clinic123' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: 'Server error',
        error: 'Database error',
      });
    });
  });
});
