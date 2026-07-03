import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'CORS test route is reachable' });
});

export default router;
