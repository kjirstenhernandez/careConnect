import { Request, Response, NextFunction } from 'express';
import { validateObjectId } from '../middleware/validateObjectId';

describe('validateObjectId Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {
      params: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Valid ObjectId scenarios', () => {
    it('should call next() for valid providerId', async () => {
      mockRequest.params = { providerId: '507f1f77bcf86cd799439011' };

      await validateObjectId(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it('should call next() for valid clinicId', async () => {
      mockRequest.params = { clinicId: '507f1f77bcf86cd799439011' };

      await validateObjectId(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it('should call next() for valid userId', async () => {
      mockRequest.params = { userId: '507f1f77bcf86cd799439011' };

      await validateObjectId(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  });

  describe('Invalid ObjectId scenarios', () => {
    it('should return 400 for invalid providerId', async () => {
      mockRequest.params = { providerId: 'invalid-id' };

      await validateObjectId(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid ID' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 400 for short invalid ID', async () => {
      mockRequest.params = { clinicId: '123' };

      await validateObjectId(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid ID' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 400 for empty string ID', async () => {
      mockRequest.params = { providerId: '' };

      await validateObjectId(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid ID' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 400 when no ID parameter exists', async () => {
      mockRequest.params = { name: 'test' };

      await validateObjectId(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid ID' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 400 when params is empty', async () => {
      mockRequest.params = {};

      await validateObjectId(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid ID' });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    it('should handle multiple ID parameters and validate the first one found ending with Id', async () => {
      mockRequest.params = {
        providerId: '507f1f77bcf86cd799439011',
        otherId: 'invalid-id',
      };

      await validateObjectId(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should return 400 when ID parameter exists but is null', async () => {
      mockRequest.params = { providerId: null as any };

      await validateObjectId(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid ID' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 400 when ID parameter exists but is undefined', async () => {
      mockRequest.params = { providerId: undefined as any };

      await validateObjectId(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid ID' });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});
