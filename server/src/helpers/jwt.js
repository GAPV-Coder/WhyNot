const jwt = require('jsonwebtoken');

const generateAndSignToken = (user) => {
    const secretKey = process.env.JWT_SECRET;
    const { password, ...restData } = user._doc;
    const payload = { ...restData };
    const options = { expiresIn: process.env.JWT_EXPIRES_IN }
    

    try {
        const token = jwt.sign({ user: payload }, secretKey, options);
        return token;
    } catch (error) {
        throw new Error('Error generating token')
    }
};

const verifyToken = (data) => {
    const secretKey = process.env.JWT_SECRET;
    const token = data.split(' ')[1];

    if (!token) {
        throw new Error('Token not provided in Authorization header')
    }

    return jwt.verify(token, secretKey);
};

module.exports = { generateAndSignToken, verifyToken };