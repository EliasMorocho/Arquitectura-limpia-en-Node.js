
const UpdateUserDTO = require('../../../interfaces/dtos/user/updateUserDTO');

class UpdateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId, updatedData) {
    const dto = new UpdateUserDTO(updatedData);
    const existingUser = await this.userRepository.findById(userId);
    if (!existingUser) {
      throw new Error('User not found');
    }
    const result = await this.userRepository.updateUser(userId, dto);
    return result;
  }
}

module.exports = UpdateUser;
