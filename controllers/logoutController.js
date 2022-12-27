import Agent from "../models/agentModel.js";


const handleLogout = async (req, res, ) => {
const cookies = req.cookies;
if (!cookies?.jwt) return res.sendStatus(204);
const refreshToken = cookies.jwt;

const foundAgent = await Agent.findOne({refreshToken: refreshToken}).exec();
if(!foundAgent) {
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
return res.sendStatus(204);
}
foundAgent.refreshToken = foundAgent.refreshToken.filter(rt => rt !== refreshToken);
const result = await foundAgent.save();
console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports = { handleLogout }