
const UserMongoDataLayer = require('../../../infrastructure/repositories/users/userMongoDataLayer');
const LoginUser = require('../../../application/usecases/users/loginUser');


const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userMongoDataLayer = new UserMongoDataLayer();
    const loginUser = new LoginUser(userMongoDataLayer);
    const result = await loginUser.execute(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginController,
};
