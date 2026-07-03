import mongoose, { Schema, Document, model } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  durationMinutes: number;
  difficulty: 'easy' | 'medium' | 'hard';
  exercises: string[];
  createdAt: Date;
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  exercises: [{ type: String, required: true }],
  createdAt: { type: Date, default: () => new Date() }
});

export const WorkoutModel = model<IWorkout>('Workout', workoutSchema);
