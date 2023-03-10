import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const companyAuth = async (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const companyToken  = authHeader.split(' ')[1]
    
    jwt.verify(
        companyToken ,
        process.env.REACT_APP_TOKEN_KEY,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            req.email = decoded.email;
            req.companyId = decoded?.id;
            req.companyAddress = decoded?.address;
            req.companyName = decoded?.companyName; 
            req.companyLogo = decoded?.logo;
            next()
            console.log(decoded);                      
        }
    )


//     try {
//         const companyToken  = req.headers.authorization.split(" ")[1];
//         const isCustomAuth = token.length < 500;
//      console.log(companyToken )
        
//      let decodedData;
// //
//         if(token && isCustomAuth) {
//             decodedData = jwt.verify(companyToken , 'test');
//             req.companyId = decodedData?.id;
//             req.companyName = decodedData?.companyName
//             req.companyLogo = decodedData?.logo
//             req.companyAddress = decodedData?.address
//         } else {
//         }
//         next();
//         console.log(decodedData);

//     } catch (error) {
//         console.log(error);
//     }

}

export default companyAuth;