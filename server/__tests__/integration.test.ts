import request from 'supertest';
import express from 'express';
import cors from 'cors';
import router from '../routes';

// Mock Prisma client
jest.mock('../prisma/client', () => ({
  providers: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  clinics: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
  },
}));

// Mock MongoDB ObjectId validation
jest.mock('mongodb', () => ({
  ObjectId: {
    isValid: jest.fn(),
  },
}));

import prisma from '../prisma/client';
import { ObjectId } from 'mongodb';

// Setup test app with the same middleware as main app
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

describe('API Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock ObjectId validation to return true for valid-looking IDs
    (ObjectId.isValid as jest.Mock).mockImplementation((id: string) => {
      return id && id.length === 24 && /^[a-fA-F0-9]{24}$/.test(id);
    });
  });

  describe('Provider API Endpoints', () => {
    const validObjectId = '507f1f77bcf86cd799439011';
    const invalidObjectId = 'invalid-id';

    describe('GET /api/providers/find', () => {
      it('should return all providers', async () => {
        const mockProviders = [
          {
            id: validObjectId,
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

        const response = await request(app).get('/api/providers/find');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ providers: mockProviders });
      });
    });

    describe('GET /api/providers/find/:providerId', () => {
      it('should return a specific provider with valid ObjectId', async () => {
        const mockProvider = {
          id: validObjectId,
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

        const response = await request(app).get(`/api/providers/find/${validObjectId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ providerInfo: mockProvider });
      });

      it('should return 400 for invalid ObjectId', async () => {
        const response = await request(app).get(`/api/providers/find/${invalidObjectId}`);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Invalid ID' });
        expect(prisma.providers.findUnique).not.toHaveBeenCalled();
      });
    });

    describe('POST /api/providers/new', () => {
      it('should create a new provider successfully', async () => {
        const newProviderData = {
          firstName: 'Jane',
          lastName: 'Smith',
          credentials: ['MD', 'PhD'],
          specialty: 'Neurology',
          locations: [{ id: 'loc1', city: 'New York' }],
          phone: '555-0123',
          fax: '555-0124',
        };

        const createdProvider = { id: validObjectId, ...newProviderData };

        (prisma.providers.create as jest.Mock).mockResolvedValue(createdProvider);

        const response = await request(app)
          .post('/api/providers/new')
          .send(newProviderData);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Provider succesfully created' });
        expect(prisma.providers.create).toHaveBeenCalledWith({
          data: newProviderData,
        });
      });

      it('should return 400 for missing required fields', async () => {
        const incompleteData = {
          firstName: 'Jane',
          // Missing required fields
        };

        const response = await request(app)
          .post('/api/providers/new')
          .send(incompleteData);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Missing required fields.' });
        expect(prisma.providers.create).not.toHaveBeenCalled();
      });
    });

    describe('POST /api/providers/find/many', () => {
      it('should find providers by clinic ID', async () => {
        const clinicId = validObjectId;
        const mockProviders = [
          {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            credentials: ['MD'],
            specialty: 'Cardiology',
            locations: [{ id: clinicId, city: 'New York' }],
          },
        ];

        (prisma.providers.findMany as jest.Mock).mockResolvedValue(mockProviders);

        const response = await request(app)
          .post('/api/providers/find/many')
          .send({ clinicId });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ providers: mockProviders });
      });
    });
  });

  describe('Clinic API Endpoints', () => {
    const validObjectId = '507f1f77bcf86cd799439012';

    describe('GET /api/clinics/find', () => {
      it('should return all clinics', async () => {
        const mockClinics = [
          {
            id: validObjectId,
            name: 'Test Clinic',
            streetAddress: '123 Main St',
            city: 'Test City',
            zip: '12345',
            phone: '123-456-7890',
            fax: '123-456-7891',
          },
        ];

        (prisma.clinics.findMany as jest.Mock).mockResolvedValue(mockClinics);

        const response = await request(app).get('/api/clinics/find');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          message: 'success',
          clinicInfo: mockClinics,
        });
      });
    });

    describe('GET /api/clinics/find/:clinicId', () => {
      it('should return a specific clinic with valid ObjectId', async () => {
        const mockClinic = {
          id: validObjectId,
          name: 'Test Clinic',
          streetAddress: '123 Main St',
          city: 'Test City',
          zip: '12345',
          phone: '123-456-7890',
          fax: '123-456-7891',
        };

        (prisma.clinics.findUnique as jest.Mock).mockResolvedValue(mockClinic);

        const response = await request(app).get(`/api/clinics/find/${validObjectId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ clinicInfo: mockClinic });
      });

      it('should return 400 for invalid ObjectId', async () => {
        const response = await request(app).get('/api/clinics/find/invalid-id');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Invalid ID' });
      });
    });

    describe('POST /api/clinics/new', () => {
      it('should create a new clinic successfully', async () => {
        const newClinicData = {
          name: 'New Health Clinic',
          streetAddress: '456 Oak Ave',
          city: 'Health City',
          zip: '54321',
          phone: '987-654-3210',
          fax: '987-654-3211',
        };

        const createdClinic = { id: validObjectId, ...newClinicData };

        (prisma.clinics.findFirst as jest.Mock).mockResolvedValue(null);
        (prisma.clinics.create as jest.Mock).mockResolvedValue(createdClinic);

        const response = await request(app)
          .post('/api/clinics/new')
          .send(newClinicData);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          message: 'New clinic Added: ',
          newClinic: createdClinic,
        });
      });
    });

    describe('POST /api/clinics/find/many', () => {
      it('should return multiple clinics by IDs', async () => {
        const clinicIds = [validObjectId, '507f1f77bcf86cd799439013'];
        const mockClinics = [
          { id: clinicIds[0], name: 'Clinic 1' },
          { id: clinicIds[1], name: 'Clinic 2' },
        ];

        (prisma.clinics.findMany as jest.Mock).mockResolvedValue(mockClinics);

        const response = await request(app)
          .post('/api/clinics/find/many')
          .send({ clinicIds });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ clinics: mockClinics });
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle 404 for non-existent endpoints', async () => {
      const response = await request(app).get('/api/nonexistent');
      expect(response.status).toBe(404);
    });

    it('should handle malformed JSON in request body', async () => {
      const response = await request(app)
        .post('/api/providers/new')
        .send('invalid json')
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
    });
  });

  describe('CORS Headers', () => {
    it('should include CORS headers in responses', async () => {
      (prisma.providers.findMany as jest.Mock).mockResolvedValue([]);

      const response = await request(app).get('/api/providers/find');

      expect(response.headers['access-control-allow-origin']).toBeDefined();
    });
  });
});
