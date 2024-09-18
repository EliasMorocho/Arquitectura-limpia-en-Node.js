
const MongoUserRepository = require('../../../infrastructure/repositories/users/userDataLayer');
const LoginUser = require('../../../application/usecases/users/loginUser');


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRepository = new MongoUserRepository();
    const loginUser = new LoginUser(userRepository);
    const result = await loginUser.execute(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  login,
};
