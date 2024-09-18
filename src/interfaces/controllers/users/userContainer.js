const authController = require('../users/authController');
const registerController = require('../users/registerController');
const updateController = require('../users/updateController');
const UserContainer = () => {
    return {
        login: authController.login,
        register: registerController.register,
        update: updateController.update,
    };
};
module.exports = {
    UserContainer,
};