import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();


export const signin = async (req, res) => {
const {email, password} = req.body;
try{
    const existingUser = await User.findOne({email});
    if(!existingUser) return res.status(404).json({ message: "Agent doesn't exist"})
   
    const isPasswordCorrect = bcrypt.compare(password, existingUser.password);
    if(!isPasswordCorrect ) return res.status(404).json({ message: "Invalid credentials."});
    
    const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.TOKEN_KEY, { expiresIn: '30s' });
    const refreshToken = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.TOKEN_KEY, { expiresIn: '7d' });

    res.cookie(process.env.COOKIE_KEY, refreshToken, 
    { httpOnly: true, secure: true, sameSite: 'None', 
    maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.status(200).json({ result: existingUser, token});
} catch(error) {
res.status(500).json({ message: "Something went wrong."});
console.log(error);
}
}

export const refresh = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jws) return res.status(401).json({message: 'Unauthorized'});
    const refreshToken = cookies.jws;
   
    //                                  
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.TOKEN_KEY,
        async (err, decoded) => {
            if (err) return res.status(403).json({message: 'Forbidden'});
            const foundUser = User.findOne({email: decoded.email});
            if (!foundUser) return res.status(401).json({message: 'Unauthorized'});
            
            const token = jwt.sign({ email: foundUser.email, id: foundUser._id}, process.env.TOKEN_KEY, { expiresIn: '7d' });
            res.json({token})
        })
    }

    export const logout = (req, res) => {
        const cookies = req.cookies;
        if (!cookies.jws) return res.status(204)
        res.clearCookie(process.env.COOKIE_KEY, { httpOnly: true, sameSite: 'None', secure: true });
       res.json({message: 'cookie cleared'});
    }

export const signup = async (req, res) => {
    const { email, password, role, confirmPassword, picture, family_name, given_name, firstName, lastName, phone} = req.body;

    try {
        const existingUser = await User.findOne({email});
    if(existingUser) return res.status(400).json({ message: "User already exists"})

     if(password !== confirmPassword) return res.status(400).json({ message: "Password does not match"})

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, role, picture, name1: `${family_name} ${given_name}`, name: `${firstName} ${lastName}`, phone, createdAt: new Date().toISOString()})

    // const token = jwt.sign({email: result.email, id: result._id}, 'test', { expiresIn: '1h' });

    res.status(200).json({ result, token });
    } catch (error) {
    res.status(500).json({ message: "Something went wrong."});
    }
}

export const googleSignIn = async (req, res) => {
    const { picture, email, family_name, given_name, token, googleId } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        // const result = { existingUser };
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.TOKEN_KEY, { expiresIn: '1h' });
        return res.status(200).json({ result: existingUser, token });
      } else {
      const result = await User.create({
        email,
        name:`${family_name} ${given_name}`,
        googleId,
        picture
      });
      const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.TOKEN_KEY, { expiresIn: '1h' });
      res.status(200).json({ result, token });
    }
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  };