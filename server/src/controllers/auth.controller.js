const AuthServices = require('../services/auth.services');
const { catchAsync } = require('../helpers/catchAsync');
const { success } = require('../helpers/responses');

const registerUser = catchAsync(async (req, res) => {
    const {
        document_id,
        first_name,
        last_name,
        dateOfBirth,
        gender,
        country,
        email,
        password,
        role
    } = req.body;

    const result = await AuthServices.registerUser(
        document_id,
        first_name,
        last_name,
        dateOfBirth,
        gender,
        country,
        email,
        password,
        role
    );

    success({
        res,
        message: 'User registered successfully',
        data: result,
        status: 201
    });
});

const loginUser = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    const result = await AuthServices.loginUser(email, password);

    success({
        res,
        message: 'User logged in successfully',
        data: result,
        status: 200
    });
});

module.exports = {
    registerUser,
    loginUser
}