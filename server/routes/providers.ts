import express, { Router } from 'express';
import { addProvider, getProviderById } from '../controllers/providers';
import { validateObjectId } from '../middleware/validateObjectId';

export const providers: Router = express.Router();

providers.get('/:providerId', validateObjectId, getProviderById);
providers.post('/', addProvider);
