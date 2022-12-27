import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const userAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id;
        } else {
             decodedData = jwt.decode(token);
            req.agentId = decodedData?.sub;
            const googleId = decodedData?.sub.toString();
      const user = await User.findOne({ googleId });
      req.userId = user?._id;
        }
        next();

    } catch (error) {
        console.log(error);
    }
}

export default userAuth;