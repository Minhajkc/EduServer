const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
};
const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id, username:user.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};



module.exports = {
    generateAccessToken,
    generateRefreshToken,
};
