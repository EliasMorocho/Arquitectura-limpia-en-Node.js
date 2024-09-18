const Joi = require('joi');
const UserMongoDataLayer = require('../../../infrastructure/repositories/users/userMongoDataLayer');
const DeletedUser = require('../../../application/usecases/users/deletedUser');

const schema = Joi.object({
    userId: Joi.string().required().messages({
        'string.empty': 'El ID de usuario no puede estar vacío',
        'any.required': 'Se requiere el ID de usuario',
    }),
});

const deletedController = async (req, res) => {
    const { userId } = req.params;
    const { error } = schema.validate({ userId });
    if (error) {
        return res.status(400).json({ message: error.details[0].message, status: false });
    }

    try {
        const userMongoDataLayer = new UserMongoDataLayer();
        const deletedUser = new DeletedUser(userMongoDataLayer);
        const result = await deletedUser.execute(userId);
        res.status(200).json({ message: 'Usuario eliminado correctamente', data: result, status: true });
    } catch (error) {
        res.status(400).json({ message: error.message, status: false });
    }
};

module.exports = {
    deletedController,
};
