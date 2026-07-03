import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    teams: [
      { id: 'team-1', name: 'Cardio Crew' },
      { id: 'team-2', name: 'Strength Squad' }
    ]
  });
});

router.post('/', (req, res) => {
  const newTeam = req.body;
  res.status(201).json({ message: 'Team created', team: newTeam });
});

export default router;
