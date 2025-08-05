import express, { Router } from 'express';
import { getClinicInfoByID } from '../controllers/clinics';
import { validateObjectId } from '../middleware/validateObjectId';

export const clinics: Router = express.Router();

clinics.get('/find/:clinicId', validateObjectId, getClinicInfoByID);
