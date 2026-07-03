import { Router } from 'express';
import { ActivityModel } from '../models/activity.model';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const activities = await ActivityModel.find().populate('userId').lean();
    res.json({ activities });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load activities' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newActivity = await ActivityModel.create(req.body);
    res.status(201).json({ message: 'Activity logged', activity: newActivity });
  } catch (error) {
    res.status(500).json({ error: 'Unable to log activity' });
  }
});

export default router;
