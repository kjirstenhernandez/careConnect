import express, { Router } from 'express';
import {
  addProvider,
  addProviderLocation,
  getAllProviders,
  getMultipleProvidersByIDs,
  getProviderById,
  getProviderLocations,
} from '../controllers/providers';
import { validateObjectId } from '../middleware/validateObjectId';

/**
 * Router for provider-related endpoints
 * 
 * Provides API routes to:
 *  - Retrieve provider info by ID
 *  - Retrieve info for all providers
 *  - Retrieve all location objects under the locations[] for a given provider by ID
 *  - Retrieve an array of providers matching the given IDs
 *  - Create a new Provider
 *  - Add a location to a Provider
 */
export const providers: Router = express.Router();

// GET -- Get information for a singl provider by their ID
// Middleware validateObjectId verifies the validity of the providerID given via route.params
providers.get('/find/:providerId', validateObjectId, getProviderById);

//GET -- Get the information for all providers in the database
providers.get('/find', getAllProviders);

//GET -- get all locations listed for a provider by their ID
providers.get('locations/:id', getProviderLocations);

//POST -- retrieve multiple providers that match the provided IDs
providers.post('/find/many', getMultipleProvidersByIDs);

//POST -- create a new Provider
providers.post('/new', addProvider);

// POST -- add a location Object to a provider
providers.post('/addlocation', addProviderLocation);
