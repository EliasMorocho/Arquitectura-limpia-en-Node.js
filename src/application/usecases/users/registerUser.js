const bcrypt = require('bcrypt');

class RegisterUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    const existingUser = await this.userRepository.findByUsername(userData.Email);
    if (existingUser) {
      throw new Error('User already exists');
    }


    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.Password, saltRounds);


    const newUserData = {
      ...userData,
      Password: hashedPassword,
    };

    const newUser = await this.userRepository.createUser(newUserData);
    return newUser;
  }
}

module.exports = RegisterUser;
