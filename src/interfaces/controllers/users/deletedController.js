const Joi = require('joi');
const MongoUserRepository = require('../../../infrastructure/repositories/users/userDataLayer');
const DeletedUser = require('../../../application/usecases/users/deletedUser');

const schema = Joi.object({
    userId: Joi.string().required().messages({
        'string.empty': 'El ID de usuario no puede estar vacío',
        'any.required': 'Se requiere el ID de usuario',
    }),
});

const deleted = async (req, res) => {
    const { userId } = req.params;
    const { error } = schema.validate({ userId });
    if (error) {
        return res.status(400).json({ message: error.details[0].message, status: false });
    }

    try {
        const userRepository = new MongoUserRepository();
        const deletedUser = new DeletedUser(userRepository);
        const result = await deletedUser.execute(userId);
        res.status(200).json({ message: 'Usuario eliminado correctamente', data: result, status: true });
    } catch (error) {
        res.status(400).json({ message: error.message, status: false });
    }
};

module.exports = {
    deleted,
};
