const bcrypt = require('bcrypt');
const generateAuthToken = require('./generateAuthToken');
class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(email, password) {
    const user = await this.userRepository.findByUsername(email);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.Password);
    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }
    const token = generateAuthToken(user);
    return { message: 'Login exitoso', token };
  }
}

module.exports = LoginUser;
