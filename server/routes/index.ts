import express from 'express';
import { providers } from './providers';
const router = express.Router();

router.use('/providers', providers);

export default router;
