import { Router } from 'express';
import { createChargeRouter } from './new';

const router = Router();

router.use('/api/payments', [createChargeRouter]);

export { router as PaymentsRouter };
