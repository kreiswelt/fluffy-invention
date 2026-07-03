import mongoose, { Schema, Document, model } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  captainId: mongoose.Types.ObjectId;
  memberIds: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  captainId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: () => new Date() }
});

export const TeamModel = model<ITeam>('Team', teamSchema);
