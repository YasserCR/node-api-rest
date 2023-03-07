const { check } = require("express-validator");
const validateResults = require('../utils/validator.handler');

const registerValidator = [
    check("name")
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 99 }),
    check("age")
        .exists()
        .notEmpty()
        .isNumeric(),
    check("email")
        .exists()
        .notEmpty()
        .isEmail(),
    check("password")
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 15 }),
    (req, res, next) => validateResults(req, res, next),
];

const loginValidator = [
    check("email")
        .exists()
        .notEmpty()
        .isEmail(),
    check("password")
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 15 }),
    (req, res, next) => validateResults(req, res, next),
];

module.exports = { registerValidator, loginValidator }