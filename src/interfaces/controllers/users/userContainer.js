const authController = require('../users/authController');
const registerController = require('../users/registerController');
const updateController = require('../users/updateController');
const deletedController = require('../users/deletedController');
const UserContainer = () => {
    return {
        login: authController.login,
        register: registerController.register,
        update: updateController.update,
        deleted: deletedController.deleted
    };
};
module.exports = {
    UserContainer,
};