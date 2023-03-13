const { matchedData } = require("express-validator");
const { signToken } = require("../utils/jwt.handler");
const { encrypt, compare } = require("../utils/password.handler");
const { userModel } = require("../models");
const { handleHttpError } = require("../utils/error.handler");

const registerController = async (req, res) => {
    try {
        req = matchedData(req)
        const password = await encrypt(req.password);
        const body = { ...req, password }
        const userData = await userModel.create(body);
        userData.set('password', undefined, { strict: false })

        const data = {
            token: await signToken(userData),
            user: userData
        }
        res.status(201);
        res.send({ data }) 
    } catch (e) {
        handleHttpError(res, "ERROR REGISTERING USER");
    }

};

const loginController = async (req, res) => {
    try {
        req = matchedData(req);
        const user = await userModel.findOne({ email: req.email })
           .select('password  name role email');
         /**
          * Comment this if you are using MySql
          */
        if (!user) {
            handleHttpError(res, "USER DOES NOT EXISTS", 404);
            return;
        }

        const hashPassword = user.get('password');
        const check = await compare(req.password, hashPassword);

        if (!check) {
            handleHttpError(res, "INCORRECT PASSWORD", 401);
            res.status(401);
            return;
        }

        user.set('password', undefined, { strict: false })
        const data = {
            token: await signToken(user),
            user,
        }

        res.send(data);

    } catch (error) {
        handleHttpError(res, "ERROR LOGIN USER");
    }
}

module.exports = { registerController, loginController }