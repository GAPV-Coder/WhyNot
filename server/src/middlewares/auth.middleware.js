const { verifyToken } = require("../helpers/jwt");
const { AppError } = require("../helpers/appError");

const isLoggedIn = async (req, res, next) => {
    const token = req.headers.authorization;

    try {
        if (!token) {
            throw new AppError('Authentication failed. Token not provided', 401);
        }

        const decodedToken = verifyToken(token);

        if (!decodedToken) {
            throw new AppError('Invalid token', 401);
        }

        req.user = decodedToken.user;

        next();
    } catch (error) {
        next(error);
    }
};

const isAdmin = (req, res, next) => {
    const { role } = req.user;

    if (role !== 'admin') {
        throw new AppError(`You don't have permission to perform this action`, 403);
    }

    next();
};

module.exports = {
    isLoggedIn,
    isAdmin
};