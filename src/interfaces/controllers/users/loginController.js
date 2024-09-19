const UserMongoDataLayer = require('../../../infrastructure/repositories/users/userMongoDataLayer');
const LoginUser = require('../../../application/usecases/users/loginUser');
const logger = require('../../../config/logger');

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    logger.info(`Intento de inicio de sesión para el usuario: ${email}`);

    const userMongoDataLayer = new UserMongoDataLayer();
    const loginUser = new LoginUser(userMongoDataLayer);
    const result = await loginUser.execute(email, password);

    logger.info(`Inicio de sesión exitoso para el usuario: ${email}`);
    res.status(200).json(result);
  } catch (error) {
    logger.error(`Error en el inicio de sesión para el usuario: ${email}. Detalle: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginController,
};
