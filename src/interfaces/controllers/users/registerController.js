const MongoUserRepository = require('../../../infrastructure/repositories/users/userDataLayer');
const RegisterUser = require('../../../application/usecases/users/registerUser');


const register = async (req, res) => {
  const { Email, Name, Password, Role } = req.body;

  try {
    const userRepository = new MongoUserRepository();
    const registerUser = new RegisterUser(userRepository);
    const result = await registerUser.execute({ Email, Name, Password, Role });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
};
