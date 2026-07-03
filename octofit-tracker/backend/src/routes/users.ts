import { Router } from 'express';
import { UserModel } from '../models/user.model';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const users = await UserModel.find().lean();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load users' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.status(201).json({ message: 'User created', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Unable to create user' });
  }
});

export default router;
