const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("../utils/propertiesEngine.handler")
const propertiesKey = getProperties();

const signToken = async (user) => {
    const sign = jwt.sign(
        {
            [propertiesKey.id]: user[propertiesKey.id],
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );

    return sign
}

const verifyToken = async (jwtToken) => {
    try {
        return jwt.verify(jwtToken, JWT_SECRET);
    } catch (e) {
        return null;
    }
}

module.exports = { signToken, verifyToken }