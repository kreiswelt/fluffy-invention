import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    users: [
      { id: 'user-1', name: 'Avery Athlete', role: 'member' },
      { id: 'user-2', name: 'Jordan Jogger', role: 'trainer' }
    ]
  });
});

router.post('/', (req, res) => {
  const newUser = req.body;
  res.status(201).json({ message: 'User created', user: newUser });
});

export default router;
