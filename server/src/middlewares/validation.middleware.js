const { validationResult, body, param } = require('express-validator');

const validateRegistration = [
    body('document_id')
        .isLength({ min: 8 })
        .withMessage('Document ID is required'),
    body('first_name')
        .isLength({ min: 3 })
        .withMessage('First name is required'),
    body('last_name').isLength({ min: 3 }).withMessage('Last name is required'),
    body('dateOfBirth').isISO8601().withMessage('Invalid date format'),
    body('gender').isIn(['male', 'female']).withMessage('Invalid gender'),
    body('country').isLength({ min: 5 }).withMessage('Country is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters'),
    body('role').isIn(['admin', 'user']).withMessage('Invalid role'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const validateLogin = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const validateCreateTournament = [
    body('name')
        .isLength({ min: 5 })
        .withMessage('Tournament name is required'),
    body('category')
        .isIn(['professional', 'amateur'])
        .withMessage('Invalid tournament category'),
    body('location')
        .isLength({ min: 5 })
        .withMessage('Tournament location is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = {
    validateRegistration,
    validateLogin,
    validateCreateTournament,
};
