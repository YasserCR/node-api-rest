const { matchedData } = require('express-validator');
const { trackModel } = require('../models');
const { handleHttpError } = require('../utils/error.handler');

const getItems = async (req, res) => {

    try {
        const user = req.user;
        const data = await trackModel.findAllData({});
        res.send({ data, user });
    } catch (e) {
        console.log(e);
        handleHttpError(res, 'ERROR GETTING ITEMS');
    }
}

const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await trackModel.findOneData(id);
        res.send({ data });
    } catch (e) {
        console.log(e);
        handleHttpError(res, "ERROR GETTING ITEM");
    }

}

const createItem = async (req, res) => {

    try {
        const body = matchedData(req);
        const data = await trackModel.create(body);
        res.send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR CREATING ITEMS');
    }
}

const updateItem = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req);
        const data = await trackModel.findByIdAndUpdate(
            id, body, { new: true }
        );
        res.send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR UPDATING ITEMS');
    }

}

const deleteItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await trackModel.delete({ _id: id });
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERROR DELETING ITEM");
    }

}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }; 