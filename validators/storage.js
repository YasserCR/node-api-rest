const { check } = require("express-validator");
const validateResults = require('../utils/validator.handler');

const getItemValidator = [
    check("id")
    .exists()
    .notEmpty(),
    (req, res, next) =>  validateResults(req, res, next)
];

module.exports = { getItemValidator }