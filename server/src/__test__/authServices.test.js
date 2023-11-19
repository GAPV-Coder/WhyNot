const AuthServices = require('../services/auth.services');
const User = require('../models/user.model');
const { encryptPassword, comparePassword } = require('../helpers/encrypt');
const { generateAndSignToken } = require('../helpers/jwt');
const { AppError } = require('../helpers/appError');

jest.mock('../models/user.model', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
}));

jest.mock('../helpers/encrypt', () => ({
    encryptPassword: jest.fn(),
    comparePassword: jest.fn(),
}));

jest.mock('../helpers/jwt', () => ({
    generateAndSignToken: jest.fn(),
}));

describe('AuthServices', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('registerUser', () => {
        it('should register a new user successfully', async () => {
            User.findOne.mockResolvedValue(null);
            encryptPassword.mockResolvedValue('hashedPassword');
            User.create.mockResolvedValue({
                _id: 'mockUserId',
                document_id: '12345',
                first_name: 'John',
                last_name: 'Doe',
                email: 'john.doe@example.com',
                role: 'user',
            });
            generateAndSignToken.mockReturnValue('mockToken');

            const result = await AuthServices.registerUser(
                '12345',
                'John',
                'Doe',
                '1990-01-01',
                'male',
                'USA',
                'john.doe@example.com',
                'password123',
                'user',
            );

            expect(result).toEqual({
                user: {
                    _id: 'mockUserId',
                    document_id: '12345',
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'john.doe@example.com',
                    role: 'user',
                },
                token: 'mockToken',
            });
        });

        it('should throw an error if email is already in use', async () => {
            User.findOne.mockResolvedValue({
                email: 'john.doe@example.com',
            });

            await expect(
                AuthServices.registerUser(
                    '12345',
                    'John',
                    'Doe',
                    '1990-01-01',
                    'male',
                    'USA',
                    'john.doe@example.com',
                    'password123',
                    'user',
                ),
            ).rejects.toThrowError('Email already in use');
        });
    });

    describe('loginUser', () => {
        it('should login a user successfully', async () => {
            User.findOne.mockResolvedValue({
                _id: 'mockUserId',
                document_id: '12345',
                first_name: 'John',
                last_name: 'Doe',
                email: 'john.doe@example.com',
                password: 'hashedPassword',
                role: 'user',
            });
            comparePassword.mockResolvedValue(true);
            generateAndSignToken.mockReturnValue('mockToken');

            const result = await AuthServices.loginUser(
                'john.doe@example.com',
                'password123',
            );

            expect(result).toEqual({
                user: {
                    _id: 'mockUserId',
                    document_id: '12345',
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'john.doe@example.com',
                    role: 'user',
                },
                token: 'mockToken',
            });
        });

        it('should throw an error if email is not found', async () => {
            User.findOne.mockResolvedValue(null);

            await expect(
                AuthServices.loginUser('john.doe@example.com', 'password123'),
            ).rejects.toThrowError('Email not found');
        });
    });
});
