const { handleHttpError } = require('../utils/error.handler');

const checkRolMiddleware = (roles) => (req, res, next) => {
    try {
        const { user } = req;
        const rolesByUser = user.role;
        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle));
        if(!checkValueRol){
            handleHttpError(res, "USER HAS NOT THE CORRECT PERMISSIONS", 403);
            return 
        }
        next();
    } catch (e) {
        handleHttpError(res, "ROL NOT ALLOWED", 403);
    }

}

module.exports = checkRolMiddleware;