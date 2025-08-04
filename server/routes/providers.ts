import express, { Router } from 'express';
import { addProvider } from '../controllers/doctors';

export const providers: Router = express.Router();

providers.get('', addProvider);
