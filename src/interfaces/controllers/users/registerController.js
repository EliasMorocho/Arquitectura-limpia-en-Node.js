const MongoUserRepository = require('../../../infrastructure/repositories/users/userDataLayer');
const RegisterUser = require('../../../application/usecases/users/registerUser');

/**
 * @openapi
 * /register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     description: Crea un nuevo usuario en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *                 example: "admin@gmail.com"
 *               Name:
 *                 type: string
 *                 example: "MongoDB Elias Morocho Ancalle"
 *               Password:
 *                 type: string
 *                 example: "123"
 *               Role:
 *                 type: string
 *                 example: "Admin"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error al registrar el usuario
 */
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
