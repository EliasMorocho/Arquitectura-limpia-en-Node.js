const UserMongoDataLayer = require('../../../infrastructure/repositories/users/userMongoDataLayer');
const RegisterUser = require('../../../application/usecases/users/registerUser');


const registerController = async (req, res) => {
  const { email, name, password, role } = req.body;

  try {
    const userMongoDataLayer = new UserMongoDataLayer();
    const registerUser = new RegisterUser(userMongoDataLayer);
    const result = await registerUser.execute({ Email: email, Name: name, Password: password, Role: role });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerController,
};
