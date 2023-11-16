const User = require('../models/user.model');
const { AppError } = require('../helpers/appError');
const { generateToken } = require('../helpers/jwt');
const {
    encryptPassword,
    comparePassword,
} = require('../helpers/encrypt');

class AuthServices {
    static async registerUser(
        document_id,
        first_name,
        last_name,
        dateOfBirth,
        gender,
        country,
        email,
        password,
        role
    ) {
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new AppError('Email already in use', 400);
            }

            const hashedPassword = await encryptPassword(password);

            const newUser = await User.create({
                document_id,
                first_name,
                last_name,
                dateOfBirth,
                gender,
                country,
                email,
                password: hashedPassword,
                role
            });

            const token = generateToken({
                id_user: newUser._id,
                email: newUser.email
            });

            return {
                user: { ...newUser._doc, password: undefined },
                token,
            };
        } catch (error) {
            console.log(error);
            throw new AppError('Register failed', 400);
        }
    };

    static async loginUser(email, password) {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AppError('Email not found', 404);
            }

            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) {
                throw new AppError('Invalid email or password', 400);
            }

            const token = generateToken({
                id_user: user._id,
                email: user.email,
            });

            return { user: { ...user._doc, password: undefined }, token };
        } catch (error) {
            throw new AppError('Login failed', 400);
        }
    };
};

module.exports = AuthServices;