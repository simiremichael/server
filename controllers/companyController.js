import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Company from '../models/companyModel.js';


export const signin = async (req, res) => {
const {email, password} = req.body;
try{
    const existingCompany = await Company.findOne({email});
    if(!existingCompany) return res.status(404).json({ message: "Agent doesn't exist"})
   
    const isPasswordCorrect = await bcrypt.compare(password, existingCompany.password);
    if(!isPasswordCorrect ) return res.status(404).json({ message: "Invalid credentials."});
    
    const companyToken = jwt.sign({logo: existingCompany.logo, address: existingCompany.address, companyName: existingCompany.companyName, email: existingCompany.email, id: existingCompany._id}, 'test', { expiresIn: '5h' });
    const companyRefreshToken = jwt.sign({email: existingCompany.email, id: existingCompany.id}, 'test', { expiresIn: '5d' });

    res.cookie('jwt', companyRefreshToken, 
    { httpOnly: true, secure: true, sameSite: 'None', 
    maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.status(200).json({ result: existingCompany, companyToken , companyRefreshToken });
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
        'test',
        async (err, decoded) => {
            if (err) return res.status(403).json({message: 'forbidden'});
            const foundCompany = Company.findOne({email: decoded.email});
            if (!foundCompany) return res.status(401).json({message: 'unauthorized'});
            
            const token = jwt.sign(
                {
                    "CompanyInfo": {
                        "email": decoded.email,
                        "role": role
                    }
                },
                'test',
                { expiresIn: '1h' }
            );
            res.json({companyToken})
        })

        }

       export const logout = (req, res) => {
        const cookies = req.cookies;
        if (!cookies.jwt) return res.status(204)
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
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