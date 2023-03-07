const { check } = require("express-validator");
const validateResults = require('../utils/validator.handler');

const createItemValidator = [
    check("name")
        .exists()
        .notEmpty(),
    check("album")
        .exists()
        .notEmpty(),
    check("cover")
        .exists()
        .notEmpty(),
    check("artist")
        .exists()
        .notEmpty(),
    check("artist.name")
        .exists()
        .notEmpty(),
    check("artist.nickname")
        .exists()
        .notEmpty(),
    check("artist.nationality")
        .exists()
        .notEmpty(),
    check("duration.start")
        .exists()
        .notEmpty(),
    check("duration.end")
        .exists()
        .notEmpty(),
    check("mediaId")
        .exists()
        .notEmpty()
        .isMongoId(),
    (req, res, next) =>  validateResults(req, res, next)
    
];

const getItemValidator = [
    check("id")
    .exists()
    .notEmpty()
    .isMongoId(),
    (req, res, next) =>  validateResults(req, res, next)
];

module.exports = { createItemValidator, getItemValidator }