import mongoose from "mongoose";
import express from 'express';
import Property from "../models/propertyModel.js";

const router = express.Router();

export const getProperties = async (req, res) => {
       const {page} = req.query;
    try {
        const LIMIT = 8;
        const startIndex =(Number(page) - 1) * LIMIT;
        const total = await Property.countDocuments({});

        const properties = await Property.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
       
        res.status(200).json({data: properties, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}


// export const getPropertyBySearch = async (req, res) => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
//   const search = new RegExp(req.query.search, 'i');
//   //const search  = req.params;
//    console.log(search);

//   //if(req.params.location) {
//    if(search !== '') {
//     try {
//         // const data = await Property.find({location: { $regex: req.params.location, $options: 'i'}});
//         const data = await Property.find({location: search, });
//         res.status(200).json({data});
//     } catch (error) {
//         res.status(404).json({ message: 'Property not found'})
//     } 
// }else {
//     res.status(404).json({ message: 'queryLocation not found'})
//    }
// }


export const getPropertyBySearch = async (req, res) => {
   const { search, toggle, type, minPrice, maxPrice, duration, selectBath, selectBed, page} = req.query;
   const datas = await Property.find();
  const priceData = datas.map((i) => i.price )
  const priceDatas = priceData.filter(i => i >= minPrice && i <=maxPrice);
  const searchResult = new RegExp(search, 'i');
//    console.log(searchResult, priceDatas, priceData);
    try {
        const LIMIT = 4;
        const startIndex =(Number(page) -1) * LIMIT;
        const total = await Property.countDocuments({});
        const data = await Property.find({location: searchResult, price: priceDatas, category: toggle, bathroom: selectBath, bedroom: selectBed, propertyType: type, paymentType: duration }).sort({_id: -1}).limit(LIMIT).skip(startIndex);
        res.json({ data, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT),total });
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const getPropertyBySearchByBuy = async (req, res) => {
    const { searchParams, search, category, sort, bed, bath, minPrice, maxPrice, type, page} = req.query;
    // const search = searchParams.search
    const datas = await Property.find();
   const priceData = datas.map((i) => i.price )
   const priceDatas = priceData.filter(i => i >= minPrice && i <=maxPrice);
   const searchResult = new RegExp(search, 'i');
    
     try {
         const LIMIT = 2;
         const startIndex =(Number(page) - 1) * LIMIT;
         const total = await Property.countDocuments({category});
         const data = await Property.find({category: category, location: searchResult, price: priceDatas, bathroom: bath, bedroom: bed, propertyType: type}).sort({_id: -1}).limit(LIMIT).skip(startIndex);
         res.json({ data, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT), total });
        
     } catch (error) {
         res.status(404).json({ message: error.message})
     }
 }
 export const getPropertyBySearchByRent = async (req, res) => {
    const { searchParams, search, category, sort, bed, bath, minPrice, maxPrice, type, page} = req.query;
    // const search = searchParams.search
    const datas = await Property.find();
   const priceData = datas.map((i) => i.price )
   const priceDatas = priceData.filter(i => i >= minPrice && i <=maxPrice);
   const searchResult = new RegExp(search, 'i');
    //console.log(searchResult, priceDatas, priceData, bed, bath);
     try {
         const LIMIT = 4;
         const startIndex =(Number(page) -1) * LIMIT;
         const total = await Property.countDocuments({category});
         const data = await Property.find({category: category, location: searchResult, price: priceDatas, bathroom: bath, bedroom: bed, propertyType: type}).sort({_id: -1}).limit(LIMIT).skip(startIndex);
         res.json({ data, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT),total });
     } catch (error) {
         res.status(404).json({ message: error.message})
     }
 }

export const getProperty = async (req, res) => { 
    const { id } = req.params;

    try {
        const property = await Property.findById(id);
        
        res.status(200).json(property);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
             
export const getPropertyByAgent = async (req, res) => {
   const {page} = req.query;
     const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Agent doesn't exist" });
    }

    const LIMIT = 5;
    const startIndex = (Number(page) -1) * LIMIT;
    const total = await Property.countDocuments({creator: id});
    const agentProperties = await Property.find({ creator: id }).sort({_id: - 1}).limit(LIMIT).skip(startIndex);
    res.status(200).json({agentProperties, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
  };

  export const companyPropertySearch = async (req, res) => {
    //const {searchQuery,  page} = req.query;
    const searchQuery = req.query.searchQuery === null ? '' : req.query.searchQuery 
    const page = req.query.page || ''
    const { id, search } = req.params;
    console.log(search, page, searchQuery)
    const searchResult =  searchQuery ?{ location: new RegExp(searchQuery, 'i')} : {};
    const filterId = id ? {companyId: id} : {};
    const LIMIT = 5;
    const startIndex = (Number(page) -1) * LIMIT;
    const total = await Property.countDocuments({companyId: id});
   
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Agent doesn't exist" });
    }
    const companyProperties = await Property.find({ ...filterId, ...searchResult}).sort({_id: - 1}).limit(LIMIT).skip(startIndex);
    res.status(200).json({companyProperties, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
}

export const createProperty = async (req, res) => {

    const { category, title, address1, address2, creator, bathroom, bedroom, buildingYear, companyAddress, 
        companyName, logo, location, description, electricity, images, kitchen, lotSize, lga, livingRoom, serviceCharge,
        paymentType, postCode,  price, propertyGroup, propertyTax, propertyTitle, propertyType, showerRoom,
        size, state, street, taxes, tour, uniqNo, ultilities, video, id, water, yearRenovated, comfort,
        condition, hvac, parking, pets, security, slideImages, phone, email} = req.body;
    //  const property = req.body;

    const newProperty = new Property({  category, title, address1, address2, bedroom,  bathroom, buildingYear,
        name: req.name, profilePicture: req.profilePicture, phone: req.phone, email: req.email,
        logo: req.companyLogo, companyAddress: req.companyAddress, companyName: req.companyName,
        location, description, electricity, images, kitchen, lotSize, lga, livingRoom, serviceCharge,
        paymentType, postCode,  price, propertyGroup, propertyTax, propertyTitle, propertyType, showerRoom,
        size, state, street, taxes, tour, uniqNo, ultilities, video, water, yearRenovated, comfort,
        condition, hvac, parking, pets, companyId: req.companyId, security, creator: req.agentId, id,slideImages, createdAt: new Date().toLocaleString()})
  
    // const property = req.body;

    // const newProperty = new newProperty({ ...property, creator: req.agentId, createdAt: new Date().toISOString()})
    try {
        await newProperty.save();

        res.status(201).json(newProperty);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateProperty = async (req, res) => {
    const { id } = req.params;

    const {  title, address1, address2, bathroom, buildingYear,logo, companyAddress, companyName,
        category,location, description, electricity, images, kitchen, lotSize, lga, livingRoom, serviceCharge,
        paymentType, postCode,  price, propertyGroup, propertyTax, propertyTitle, propertyType, showerRoom,
        size, state, street, tax, tour, uniqNo, ultilities, video, water, yearRenovated, comfort,
        condition, hvac, parking, pets, security, slideImages, phone, email } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const updatedProperty = { category, title, address1, address2, bathroom, bathroom, buildingYear, phone: req.phone, email: req.email,
        category,location, description, electricity, images, kitchen, lotSize, lga, livingRoom, serviceCharge,
        paymentType, postCode,  price, propertyGroup, propertyTax, propertyTitle, propertyType, showerRoom,
        size, state, street, tax, tour, uniqNo, ultilities, video, water, yearRenovated, comfort, slideImages,
        condition, hvac, parking, pets, security, createdAt: new Date().toLocaleString(), companyId: req.companyId,
        logo: req.companyLogo, companyAddress: req.companyAddress, companyName: req.companyName, name: req.name, profilePicture: req.profilePicture,
    };

    await Property.findByIdAndUpdate(id, updatedProperty, { new: true });                    

    res.json(updatedProperty);

 }

 export const deleteProperty = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with that id');

    await Property.findByIdAndRemove(id);

    res.json({message: 'Post deleted successfully'});

  }

//   export const likePost = async (req, res) => {
//     const { id } = req.params;

//     if(!req.userId) return res.json({ message: 'Unauthenticated' });

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
//     const post = await PostMessage.findById(id);

//     const index = post.likes.findIndex((id) => id === String(req.userId));

//     if(index === -1) {
//         post.likes.push(req.userId);
//     } else {
//         post.likes = post.likes.filter((id) => id !== String(req.userId));
//     }
    
//     const updatedPost = await PostMessage.findByIdAndUpdate( id, post, { new: true });
    
//     res.json(updatedPost);
   
// }

export  default router;
