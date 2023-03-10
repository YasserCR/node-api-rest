const { DataTypes, DATE } = require("sequelize");
const { sequelize } = require("../../config/mysql");

const User = sequelize.define(
    "users",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.NUMBER,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.ENUM(["user", "admin"]),
        },
    },
    {
        tymestamps: true,
    }
);

module.exports = User;