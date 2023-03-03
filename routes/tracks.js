const express = require("express");
const router = express.Router();
const customHeader = require("../middleware/customheader.middleware")
const { getItems, getItem, createItem } = require("../controllers/tracks");
const { createItemValidator } = require("../validators/tracks");

router.get("/", getItems);

router.get('/:id', getItem);

router.post('/', createItemValidator, customHeader, createItem);


module.exports = router;