import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    user_id: number;
    name: string;
    email?: string;
    account: string;
    password?: string;
}

const UserSchema = new Schema<IUser>({
    user_id: { type: Number, required: false, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: false },
    account: { type: String, required: true, unique: true },
    password: { type: String, required: false, select: false },
}, {
    collection: 'users',
    timestamps: false,
    strict: false,
    versionKey: false,
});

if (mongoose.models.User) {
    delete mongoose.models.User;
}

const User = mongoose.model<IUser>('User', UserSchema);

export default User;