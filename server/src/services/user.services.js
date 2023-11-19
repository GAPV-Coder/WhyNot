const { AppError } = require('../helpers/appError');
const User = require('../models/user.model');

class UserServices {
    static async getAllUsers() {
        try {
            const users = await User.find({ isActive: true });
            return users;
        } catch (error) {
            throw new AppError('Error retrieving users', 500);
        }
    }

    static async getUserById(userId) {
        try {
            const user = await User.findOne({ _id: userId, isActive: true });

            if (!user) {
                throw new AppError(
                    `No user found with the id of ${userId}`,
                    404,
                );
            }

            return user;
        } catch (error) {
            throw new AppError('Error retrieving users', 500);
        }
    }

    static async updateUser(userId, newData) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                {
                    _id: userId,
                    isActive: true,
                },
                newData,
                { new: true },
            );

            if (!updatedUser) {
                throw new AppError('User not found', 404)
            }

            return updatedUser;
        } catch (error) {
            throw new AppError('Error retrieving users', 500);
        }
    };

    static async deleteUser (userId) {
        try {
            const deletedUser = await User.findOneAndUpdate(
                { _id: userId, isActive: true },
                { isActive: false },
                { new: true }
            );
    
            if (!deletedUser) {
                throw new AppError(`Couldn't find a user to delete with ID ${userId}` , 404);
            }
    
            return deletedUser;
        } catch (error) {
            throw new AppError('Error deleting user', 500);
        }
    };
}

module.exports = UserServices;
