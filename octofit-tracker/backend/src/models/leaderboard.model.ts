import mongoose, { Schema, Document, model } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: mongoose.Types.ObjectId;
  score: number;
  rank: number;
  category: string;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
  category: { type: String, default: 'overall' },
  updatedAt: { type: Date, default: () => new Date() }
});

export const LeaderboardModel = model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
