import mongoose from 'mongoose';

const { Schema } = mongoose;

const companySchema = new Schema({
    id: { type: String }, 
    role:  String,
    companyName: String,
    email: {type: String, required: true},
    password: {type: String, required: true},
    confirmPassword: String,
    logo: String,
    phone: String,
    address: String,
    state: String,
    area: String,
    L_G_A: String,
    agent:  String,
    companyToken: String,
    token:  String,
    token1: String,
    refreshToken: [String],
    // agent:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agent' }],
    createdAt: String
})

const Company = mongoose.model('Company', companySchema);

export default Company;