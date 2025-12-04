import mongoose, { Schema, Model } from 'mongoose';

export interface IUser {
    _id: mongoose.Types.ObjectId;
    name: string;
    account: string;
    password?: string;
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    account: { type: String, required: true, unique: true },
    password: { type: String, required: false, select: false },
}, {
    collection: 'users',
    timestamps: false,
    strict: false,
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;