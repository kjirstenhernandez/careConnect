import express, { Router } from 'express';
import { addClinic, getClinicInfoByID } from '../controllers/clinics';
import { validateObjectId } from '../middleware/validateObjectId';

export const clinics: Router = express.Router();

clinics.get('/find/:clinicId', validateObjectId, getClinicInfoByID);
clinics.post('/new', addClinic);
