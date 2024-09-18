const MongoUserRepository = require('../../../infrastructure/repositories/users/mongoUserRepository');
const LoginUser = require('../../../application/usecases/users/loginUser');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userRepository = new MongoUserRepository();
    const loginUser = new LoginUser(userRepository);
    const result = await loginUser.execute(username, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  login,
};
