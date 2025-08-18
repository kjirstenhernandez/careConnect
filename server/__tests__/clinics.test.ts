import request from 'supertest';
import express from 'express';
import {
  getAllClinics,
  getClinicInfoByID,
  addClinic,
  getMultipleClinicsByIDs,
} from '../controllers/clinics';

// Mock Prisma client
jest.mock('../prisma/client', () => ({
  clinics: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
  },
}));

import prisma from '../prisma/client';

const app = express();
app.use(express.json());

// Setup routes for testing
app.get('/clinics', getAllClinics);
app.get('/clinics/:clinicId', getClinicInfoByID);
app.post('/clinics', addClinic);
app.post('/clinics/many', getMultipleClinicsByIDs);

describe('Clinics Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /clinics', () => {
    it('should return all clinics successfully', async () => {
      const mockClinics = [
        {
          id: '1',
          name: 'Test Clinic',
          streetAddress: '123 Main St',
          city: 'Test City',
          zip: '12345',
          phone: '123-456-7890',
          fax: '123-456-7891',
        },
      ];

      (prisma.clinics.findMany as jest.Mock).mockResolvedValue(mockClinics);

      const response = await request(app).get('/clinics');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'success',
        clinicInfo: mockClinics,
      });
      expect(prisma.clinics.findMany).toHaveBeenCalledTimes(1);
    });

    it('should handle when no clinics exist', async () => {
      (prisma.clinics.findMany as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/clinics');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'No Clinics' });
    });

    it('should handle database errors', async () => {
      (prisma.clinics.findMany as jest.Mock).mockRejectedValue(
        new Error('Database error')
      );

      const response = await request(app).get('/clinics');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: 'Server error',
        error: 'Database error',
      });
    });
  });

  describe('GET /clinics/:clinicId', () => {
    it('should return a specific clinic by ID', async () => {
      const mockClinic = {
        id: '1',
        name: 'Test Clinic',
        streetAddress: '123 Main St',
        city: 'Test City',
        zip: '12345',
        phone: '123-456-7890',
        fax: '123-456-7891',
      };

      (prisma.clinics.findUnique as jest.Mock).mockResolvedValue(mockClinic);

      const response = await request(app).get('/clinics/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ clinicInfo: mockClinic });
      expect(prisma.clinics.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should return 400 when clinic does not exist', async () => {
      (prisma.clinics.findUnique as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/clinics/nonexistent');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Clinic doesn't exist" });
    });

    it('should handle database errors', async () => {
      (prisma.clinics.findUnique as jest.Mock).mockRejectedValue(
        new Error('Database error')
      );

      const response = await request(app).get('/clinics/1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: 'Server error',
        error: 'Database error',
      });
    });
  });

  describe('POST /clinics', () => {
    const validClinicData = {
      name: 'New Clinic',
      streetAddress: '456 Oak Ave',
      city: 'New City',
      zip: '54321',
      phone: '987-654-3210',
      fax: '987-654-3211',
    };

    it('should create a new clinic successfully', async () => {
      const createdClinic = { id: '2', ...validClinicData };

      (prisma.clinics.findFirst as jest.Mock).mockResolvedValue(null);
      (prisma.clinics.create as jest.Mock).mockResolvedValue(createdClinic);

      const response = await request(app)
        .post('/clinics')
        .send(validClinicData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'New clinic Added: ',
        newClinic: createdClinic,
      });
      expect(prisma.clinics.findFirst).toHaveBeenCalledWith({
        where: {
          name: {
            equals: validClinicData.name,
            mode: 'insensitive',
          },
        },
      });
      expect(prisma.clinics.create).toHaveBeenCalledWith({
        data: validClinicData,
      });
    });

    it('should return 400 when clinic already exists', async () => {
      const existingClinic = { id: '1', ...validClinicData };

      (prisma.clinics.findFirst as jest.Mock).mockResolvedValue(existingClinic);

      const response = await request(app)
        .post('/clinics')
        .send(validClinicData);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: `A clinic named ${validClinicData.name} already exists.`,
      });
      expect(prisma.clinics.create).not.toHaveBeenCalled();
    });

    it('should handle database errors during creation', async () => {
      (prisma.clinics.findFirst as jest.Mock).mockResolvedValue(null);
      (prisma.clinics.create as jest.Mock).mockRejectedValue(
        new Error('Database error')
      );

      const response = await request(app)
        .post('/clinics')
        .send(validClinicData);

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: 'Unable to create clinic',
        error: 'Database error',
      });
    });
  });

  describe('POST /clinics/many', () => {
    it('should return multiple clinics by IDs', async () => {
      const clinicIds = ['1', '2'];
      const mockClinics = [
        { id: '1', name: 'Clinic 1' },
        { id: '2', name: 'Clinic 2' },
      ];

      (prisma.clinics.findMany as jest.Mock).mockResolvedValue(mockClinics);

      const response = await request(app)
        .post('/clinics/many')
        .send({ clinicIds });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ clinics: mockClinics });
      expect(prisma.clinics.findMany).toHaveBeenCalledWith({
        where: { id: { in: clinicIds } },
      });
    });

    it('should return 400 when clinicIds is not an array', async () => {
      const response = await request(app)
        .post('/clinics/many')
        .send({ clinicIds: 'not-an-array' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: 'clinicIds must be a non-empty array.',
      });
    });

    it('should return 400 when clinicIds is empty array', async () => {
      const response = await request(app)
        .post('/clinics/many')
        .send({ clinicIds: [] });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: 'clinicIds must be a non-empty array.',
      });
    });

    it('should handle database errors', async () => {
      (prisma.clinics.findMany as jest.Mock).mockRejectedValue(
        new Error('Database error')
      );

      const response = await request(app)
        .post('/clinics/many')
        .send({ clinicIds: ['1', '2'] });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: 'Server error',
        error: 'Database error',
      });
    });
  });
});
