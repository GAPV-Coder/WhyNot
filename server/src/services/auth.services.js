const User = require('../models/user.model');
const { AppError } = require('../helpers/appError');
const { generateAndSignToken } = require('../helpers/jwt');
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

            if (!newUser._id) {
                throw new AppError('Failed to create user', 500);
            }

            const token = generateAndSignToken(newUser);

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
                throw new AppError('Invalid email or password', 401);
            }

            const token = generateAndSignToken(user);

            return { user: { ...user._doc, password: undefined }, token };
        } catch (error) {
            throw new AppError('Login failed', 403);
        }
    };
};

module.exports = AuthServices;