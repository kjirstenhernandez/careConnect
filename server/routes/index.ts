import express from 'express';
import { providers } from './providers';
import { clinics } from './clinics';

/**
 * Router for all endpoints following '/api'
 * 
 * Provides API Routes to 
 * - Provider API routes
 * - Clinic API routes
 */
const router = express.Router();

// Direct all calls with "/provider" to the providers router
router.use('/providers', providers);

// Direct all calls with "/clinics" to the clinics router
router.use('/clinics', clinics);

export default router;
