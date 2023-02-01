import mongoose from 'mongoose';

const { Schema } = mongoose;
//Schema.Types.ObjectId
const propertySchema = new Schema({
    id: String,
    category:  String,
    title: String,
    address1: String,     
    address2: String,
    bedroom: Number,
    // agent:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agent' }],
    bathroom: Number,
    buildingYear: Number,
    location: String,
    description: String,
    electricity: Number,
    house: Number,
    images: [],
    kitchen: Number,
    lotSize: Number,
    lga: String,
    livingRoom: Number,
    serviceCharge: Number,
    paymentType: String,
    postCode: Number,
    price:  Number,
    propertyGroup: String,
    propertyTax: Number,
    propertyTitle: String,
    propertyType: String,
    showerRoom: Number,
    size: Number,
    state: String,
    street: String,
    taxes: String,
    tour: String,
    uniqNo: Number,
    ultilities:[],
    video: String,
    water: Number,
    yearRenovated: Number,
    comfort: [],
    condition: String,
    hvac: [],
    parking: [],
    pets: [],
    security: [],
    creator: String,
    createdAt: String,
    companyName: String,
    logo: String,
    companyId: String,
    companyAddress: String,
    name: String,
    profilePicture: String,
    slideImages: [],
    phone: String,
    email: String,
    longitude: Number,
    latitude: Number 

//     category: string
//     title: string
//     address1: string
//     address2: string
//     bedroom: number
//     creator:  string
//     bathroom: number
//     city: string
//     description: string
//     electricity: number
//     images: []
//     kitchen: number
//     living_room: number
//     other_ultilities: number
//     price: number
//     size: number
//     state: string
//     street: string
//     tax: string
//     tour: string
//     ultilities:[]
//     video: string
//     comfort: []
//     condition: string
//     hvac: []
//     parking: []
//     pets: []
//     security: []
//     createdAt: string
//     propertyTitle: string
//      uniqNo: string  
//      livingRoom: string
//     showerRoom: string
//      bathRoom: string 
//      buildingYear: string 
//      yearRenovated: string 
//      lotSize: string
//      house: string 
//    postCode: string 
//    lga: string
//    propertyTax: string
//    water: string
//    otherUtilities: string
//    utilities: string
//    taxes: string
//    propertyType: string
//    propertyGroup: string
//    paymentType: string

})

const Property = mongoose.model('Property', propertySchema);

export default Property;