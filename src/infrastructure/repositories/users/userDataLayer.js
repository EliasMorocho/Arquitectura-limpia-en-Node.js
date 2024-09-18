const UserRepository = require('../../../domain/repositories/Users/userRepository');
const UserModel = require('../../database/users/dbuserRepository');
const User = require('../../../domain/entities/User');

class userDataLayer extends UserRepository {
  async findByUsername(email) {
    const userDocument = await UserModel.findOne({ Email: email });
    if (userDocument) {
      return new User(userDocument);
    }
    return null;
  }
  async createUser(userData) {
    const user = new UserModel(userData);
    return await user.save();
  }
}

module.exports = userDataLayer;
