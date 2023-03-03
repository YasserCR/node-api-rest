const { trackModel } = require('../models');

const getItems = async (req, res) => {
    const data = await trackModel.find({});
    res.send({ data })
}

const getItem = (req, res) => {

}

const createItem = async (req, res) => {
    const { body } = req;
    console.log(body);
    const data = await trackModel.create(body)
    res.send({ data })
}

const updateItem = (req, res) => {


}

const deleteItem = (req, res) => {

}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }; 