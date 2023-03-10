const { handleHttpError } = require("../utils/error.handler");
const { verifyToken } = require("../utils/jwt.handler");
const { userModel } = require("../models");
const getProperties = require("../utils/propertiesEngine.handler")
const propertiesKey = getProperties();

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            handleHttpError(res, "YOU MUST BE LOGGED TO SEE THIS", 401);
            return;
        }

        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        if (!dataToken) {
            handleHttpError(res, "NO PAYLOAD DATA", 401);
            return;
        }

        const query = {
            [propertiesKey.id]: dataToken[propertiesKey.id]
        }

        const user = await userModel.findOne(query);
        req.user = user;

        next();

    } catch (e) {
        handleHttpError(res, "NOT ACTIVE SESSION FIND", 401);
    }
}

module.exports = authMiddleware;