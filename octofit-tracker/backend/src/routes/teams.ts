import { Router } from 'express';
import { TeamModel } from '../models/team.model';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const teams = await TeamModel.find().populate('captainId memberIds').lean();
    res.json({ teams });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load teams' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newTeam = await TeamModel.create(req.body);
    res.status(201).json({ message: 'Team created', team: newTeam });
  } catch (error) {
    res.status(500).json({ error: 'Unable to create team' });
  }
});

export default router;
