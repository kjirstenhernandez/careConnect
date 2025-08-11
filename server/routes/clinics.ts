import express, { Router } from 'express';
import {
  addClinic,
  getAllClinics,
  getClinicInfoByID,
  getMultipleClinicsByIDs,
} from '../controllers/clinics';
import { validateObjectId } from '../middleware/validateObjectId';


/**
 * Router for clinic-related endpoints.
 *
 * Provides API routes to:
 * - Retrieve clinic info by ID
 * - Retrieve multiple clinics by IDs
 * - Add a new clinic
 * - Retrieve all clinics
 */
export const clinics: Router = express.Router();

// GET -- information for a single clinic by ID
// uses validateObjectId middleware to verify the validity of the route param 'clinicId'
clinics.get('/find/:clinicId', validateObjectId, getClinicInfoByID);

//GET -- information for all clinics in the database
clinics.get('/find', getAllClinics);

//POST -- retrieve multiple clinic Objects matching the IDs given in teh req.body
clinics.post('/find/many', getMultipleClinicsByIDs);

//POST -- adds a new clinic to the database using the info in the req.body
clinics.post('/new', addClinic);

