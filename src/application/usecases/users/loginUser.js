const bcrypt = require('bcrypt');
const generateAuthToken = require('./generateAuthToken');
const logger = require('../../../config/logger');

class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(email, password) {
    const user = await this.userRepository.findByUsername(email);
    if (!user) {
      logger.warn(`Intento de login fallido para email: ${email} - Usuario no encontrado`);
      throw new Error('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.Password);
    if (!isPasswordValid) {
      logger.warn(`Intento de login fallido para email: ${email} - Contraseña incorrecta`);
      throw new Error('Contraseña incorrecta');
    }

    const token = generateAuthToken(user);
    logger.info(`Usuario ${email} ha iniciado sesión exitosamente`);

    return { message: 'Login exitoso', token };
  }
}

module.exports = LoginUser;
