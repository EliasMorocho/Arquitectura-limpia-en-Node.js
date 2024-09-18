const { loginController } = require('../users/loginController');
const { registerController } = require('../users/registerController');
const { updateController } = require('../users/updateController');
const { deletedController } = require('../users/deletedController');
const UserContainer = () => {
    return {
        login: loginController,
        register: registerController,
        update: updateController,
        deleted: deletedController
    };
};
module.exports = {
    UserContainer,
};