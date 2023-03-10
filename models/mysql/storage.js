const { DataTypes, DATE } = require("sequelize");
const { sequelize } = require("../../config/mysql");

const Storage = sequelize.define(
    "storages",
    {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        filename: {
            type: DataTypes.STRING
        },
    },
    {
        tymestamps: true,
    }
);

module.exports = Storage;