const Joi = require('joi');
const UserMongoDataLayer = require('../../../infrastructure/repositories/users/userMongoDataLayer');
const UpdateUser = require('../../../application/usecases/users/updateUser');

const schema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            'string.base': 'El campo "name" debe ser una cadena de texto',
            'any.required': 'El campo "name" es obligatorio',
        }),
    role: Joi.string()
        .required()
        .messages({
            'string.base': 'El campo "role" debe ser una cadena de texto',
            'any.required': 'El campo "role" es obligatorio',
        })
});

const updateController = async (req, res) => {
    const { userId } = req.params;
    const { name, role } = req.body;

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message, status: false });
    }

    try {
        const userMongoDataLayer = new UserMongoDataLayer();
        const updateUser = new UpdateUser(userMongoDataLayer);
        const result = await updateUser.execute(userId, { Name: name, Role: role });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message, status: false });
    }
};

module.exports = {
    updateController,
};
