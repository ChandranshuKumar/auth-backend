import { model, Schema } from 'mongoose';

interface IUser {
    email: string,
    password: string,
    createdAt: Date
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = model<IUser>("User", userSchema);

export default User;