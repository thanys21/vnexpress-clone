import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    user_id: number;
    name: string;
    account: string;
    password?: string;
}

const UserSchema = new Schema<IUser>({
    _id: { type: mongoose.Types.ObjectId, select: false },
    user_id: { type: Number, required: false, unique: true },
    name: { type: String, required: true },
    account: { type: String, required: true, unique: true },
    password: { type: String, required: false, select: false },
}, {
    collection: 'users',
    timestamps: false,
    strict: false,
});

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;