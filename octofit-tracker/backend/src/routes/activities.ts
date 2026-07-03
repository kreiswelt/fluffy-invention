import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    activities: [
      { id: 'activity-1', type: 'run', duration: 35, calories: 280 },
      { id: 'activity-2', type: 'yoga', duration: 45, calories: 190 }
    ]
  });
});

router.post('/', (req, res) => {
  const newActivity = req.body;
  res.status(201).json({ message: 'Activity logged', activity: newActivity });
});

export default router;
