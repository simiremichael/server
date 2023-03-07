import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Company from '../models/companyModel.js';
import dotenv from 'dotenv';

dotenv.config();

export const signin = async (req, res) => {
const {email, password} = req.body;
try{
    const existingCompany = await Company.findOne({email});
    if(!existingCompany) return res.status(404).json({ message: "Company doesn't exist"})
   
    const isPasswordCorrect = await bcrypt.compare(password, existingCompany.password);
    if(!isPasswordCorrect ) return res.status(404).json({ message: "Invalid credentials."});
    
    const companyToken = jwt.sign({logo: existingCompany.logo, address: existingCompany.address, companyName: existingCompany.companyName, email: existingCompany.email, id: existingCompany._id}, process.env.TOKEN_KEY, { expiresIn: '1m' });
    const refreshToken = jwt.sign({logo: existingCompany.logo, address: existingCompany.address, companyName: existingCompany.companyName, email: existingCompany.email, id: existingCompany._id}, process.env.TOKEN_KEY, { expiresIn: '7d' });

    res.cookie(process.env.COOKIE_KEY, refreshToken, 
    { httpOnly: true, secure: true, sameSite: 'None', 
    maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.status(200).json({ result: existingCompany, companyToken  });
} catch(error) {
res.status(500).json({ message: "Something went wrong."});
console.log(error);



//     const existingCompany = await Company.findOne({email});
//     if(!existingCompany) return res.status(404).json({ message: "Company doesn't exist"})
   
//     const isPasswordCorrect = await bcrypt.compare(password, existingCompany.password);
//     if(!isPasswordCorrect ) return res.status(404).json({ message: "Invalid credentials."});
    
//     const token = jwt.sign({email: existingCompany.email, id: existingCompany._id}, 'test', { expiresIn: '1h' });

//     res.status(200).json({ result: existingCompany, token });
// } catch(error) {
// res.status(500).json({ message: "Something went wrong."});
}
}

export const refresh = async (req, res) => {
   
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
   
    //                                  
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.TOKEN_KEY,
        async (err, decoded) => {
            if (err) return res.status(403).json({message: 'forbidden'});
            const foundCompany = Company.findOne({email: decoded.email});
            if (!foundCompany) return res.status(401).json({message: 'unauthorized'});
            
            const companyToken = jwt.sign({logo: foundCompany.logo, address: foundCompany.address, companyName: foundCompany.companyName, email: foundCompany.email, id: foundCompany._id}, process.env.TOKEN_KEY,{ expiresIn: '7d' });
            res.json({companyToken});
        })

        }

       export const logout = (req, res) => {
        const cookies = req.cookies;
        if (!cookies.jwt) return res.status(204)
        res.clearCookie(process.env.COOKIE_KEY, { httpOnly: true, sameSite: 'None', secure: true });
       res.json({message: 'cookie cleared'});
    }
                     

export const signup = async (req, res) => {
    const {logo, address, companyName, email, password, confirmPassword, area, state, L_G_A, agent,role, } = req.body;

    try {
        const existingCompany = await Company.findOne({email});
    if(existingCompany) return res.status(400).json({ message: "Company already exists"})

    if(password !== confirmPassword) return res.status(400).json({ message: "Password does not match"})

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await Company.create({logo, address, companyName, email, password: hashedPassword, agent, area, state, L_G_A,  role, createdAt: new Date().toLocaleString()})

    // const token = jwt.sign({email: result.email, id: result._id}, 'test', { expiresIn: '1h' });

    res.status(200).json({ result });
    
    } catch (error) {
    res.status(500).json({ message: "Something went wrong."});
    }
}

export const getCompanies = async (req, res) => {
    const {page} = req.query;
 try {
    //  const LIMIT = 8;
    //  const startIndex =(Number(page) - 1) * LIMIT;
    //  const total = await Agent.countDocuments({});

     const companies = await Company.find()
     //.sort({_id: -1}).limit(LIMIT).skip(startIndex);
    
     res.status(200).json({data: companies });
     //, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)
 } catch (error) {
     res.status(404).json({message: error.message});
 }
}

export const getCompany = async (req, res) => { 
    const { id } = req.params;

    try {
        const agent = await Company.findById(id);
        
        res.status(200).json(agent);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}