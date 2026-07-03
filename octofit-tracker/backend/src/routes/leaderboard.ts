import { Router } from 'express';
import { LeaderboardModel } from '../models/leaderboard.model';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const leaderboard = await LeaderboardModel.find().sort({ rank: 1 }).populate('userId').lean();
    res.json({ leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load leaderboard' });
  }
});

export default router;
