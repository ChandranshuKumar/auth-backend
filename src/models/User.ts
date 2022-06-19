import { model, Schema } from 'mongoose';

interface User {
    email: string,
    password: string,
    createdAt: Date
}

const userSchema = new Schema<User>({
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

const User = model<User>("User", userSchema);

export default User;