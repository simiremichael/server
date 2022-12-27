import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    role:  String,
    name: {type: String, required: true},
    phone: Number,
    email: {type: String, required: true},
    password: String,
    id: { type: String }, 
    name1: {type: String},
    picture: String,
    role: String,
    refreshToken: [String],
    googleId: String
})

const User = mongoose.model('User', userSchema);

export default User;