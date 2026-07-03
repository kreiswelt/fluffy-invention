import { Router } from 'express';
import { WorkoutModel } from '../models/workout.model';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const workouts = await WorkoutModel.find().lean();
    res.json({ workouts });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load workouts' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newWorkout = await WorkoutModel.create(req.body);
    res.status(201).json({ message: 'Workout created', workout: newWorkout });
  } catch (error) {
    res.status(500).json({ error: 'Unable to create workout' });
  }
});

export default router;
