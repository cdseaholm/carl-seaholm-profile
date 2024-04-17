
import mongoose from 'mongoose';
import { ActualUser } from '@/lib/types/user';
import { ObjectId } from 'mongodb';

const UserSchema = new mongoose.Schema<ActualUser>({
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    blogsub: {
        type: Boolean,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
});
 
export default mongoose.models.ActualUser || mongoose.model<ActualUser>('ActualUser', UserSchema);