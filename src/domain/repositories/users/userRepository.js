class UserRepository {
    async findByUsername(email) {
      throw new Error('Método no implementado');
    }
    async createUser(userData) {
      const user = new UserModel(userData);
      return await user.save();
    }
  }
  
  module.exports = UserRepository;
  