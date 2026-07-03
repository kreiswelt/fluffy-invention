import mongoose, { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'member' | 'trainer' | 'coach';
  joinedAt: Date;
  teamId?: mongoose.Types.ObjectId;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['member', 'trainer', 'coach'], default: 'member' },
  joinedAt: { type: Date, default: () => new Date() },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' }
});

export const UserModel = model<IUser>('User', userSchema);
