import express from 'express';
import doctorRouter from './doctors';
const router = express.Router();

router.use('/doctors', doctorRouter);

export default router;
