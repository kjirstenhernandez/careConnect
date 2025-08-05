import express from 'express';
import { providers } from './providers';
const router = express.Router();

console.log('Providers router:', providers);
router.use('/providers', providers);

export default router;
