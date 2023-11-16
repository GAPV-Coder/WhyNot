const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user) => {
    if (!user.id_user || !user.email) {
        throw new Error(
            'The user object must contain a user id and an email to generate a token.',
        );
    }

    const payload = {
        id: user.id_user,
        email: user.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

    return token;
};

const verifyToken = (token) => {
    if (!token) {
        throw new Error('Token not provided in Authorization header')
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (decoded.id_user && decoded.email) {
            return true;
        } else {
            throw new Error('Invalid token: missing required information.');
        }
    } catch (error) {
        throw new Error('Invalid token.');
    }
};

module.exports = { generateToken, verifyToken };