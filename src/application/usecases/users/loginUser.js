const bcrypt = require('bcrypt');

class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(username, password) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }

    return { message: 'Login exitoso' };
  }
}

module.exports = LoginUser;
