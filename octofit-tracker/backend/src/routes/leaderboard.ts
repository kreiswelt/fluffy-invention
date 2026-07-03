import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    leaderboard: [
      { rank: 1, name: 'Avery Athlete', score: 980 },
      { rank: 2, name: 'Jordan Jogger', score: 860 }
    ]
  });
});

export default router;
