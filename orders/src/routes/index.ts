import { Router } from 'express';
import { rootRouter } from './root';
import { newRouter } from './new';
import { showRouter } from './show';
import { deleteRouter } from './delete';

const router = Router();

router.use('/api/orders', [
  rootRouter,
  newRouter,
  showRouter,
  deleteRouter,
]);

export { router as OrdersRouter };
