import express, { Router } from 'express';
import {
  addProvider,
  addProviderLocation,
  getProviderById,
} from '../controllers/providers';
import { validateObjectId } from '../middleware/validateObjectId';

export const providers: Router = express.Router();

providers.get('/:providerId', validateObjectId, getProviderById);
providers.post('/new', addProvider);
providers.post('/addlocation', addProviderLocation);
