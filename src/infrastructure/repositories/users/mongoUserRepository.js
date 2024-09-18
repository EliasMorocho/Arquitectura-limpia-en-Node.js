const UserRepository = require("../../../domain/repositories/Users/UserRepository");
const UserModel  =require("../..//database/users/dbuserRepository")  
class MongoUserRepository extends UserRepository {
  async findByUsername(username) {
    const userDocument = await UserModel.findOne({ username });
    if (userDocument) {
      return new User(userDocument); 
    }
    return null;
  }
}

module.exports = MongoUserRepository;
