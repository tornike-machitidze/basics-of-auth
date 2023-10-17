import { Document, Schema, Model, model } from 'mongoose';
export interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
}

export const UserSchema: Schema<IUser> = new Schema<IUser>({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  role: { type: String },
});

const userModel: Model<IUser> = model<IUser>('User', UserSchema);

export default userModel;
