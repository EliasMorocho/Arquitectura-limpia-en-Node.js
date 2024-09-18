class UserRepository {
  async findById(id) {
    throw new Error('Método no implementado');
  }
  async findByUsername(email) {
    throw new Error('Método no implementado');
  }
  async createUser(userData) {
    throw new Error('Método no implementado');
  }
  async update(userId, updatedData) {
    throw new Error('Método no implementado');
  }
}

module.exports = UserRepository;
