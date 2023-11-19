const { catchAsync } = require("../helpers/catchAsync");
const { success, error } = require("../helpers/responses");
const UserServices = require("../services/user.services");


const getAllUsers = catchAsync(async (req, res) => {
    const users = await UserServices.getAllUsers();
    success({
        res,
        message: 'Users retrieved successfully',
        data: users
    });
});

const getUserById = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const user = await UserServices.getUserById(userId);
    success({
        res,
        message: 'User retrieved successfully',
        data: user
    });
});

const updateUser = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;
    const updatedUser = await UserServices.updateUser(userId, updateData);
    success({
        res,
        message: 'User updated successfully',
        data: updatedUser
    });
});

const deleteUser = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const deletedUser = await UserServices.deleteUser(userId);
    success({
        res,
        message: 'User deleted successfully',
        data: deletedUser
    });
});

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};