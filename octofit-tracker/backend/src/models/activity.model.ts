import mongoose, { Schema, Document, model } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  distanceKm?: number;
  notes?: string;
  completedAt: Date;
}

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  distanceKm: { type: Number },
  notes: { type: String },
  completedAt: { type: Date, default: () => new Date() }
});

export const ActivityModel = model<IActivity>('Activity', activitySchema);
