
const MongoUserRepository = require('../../../infrastructure/repositories/users/userDataLayer');
const LoginUser = require('../../../application/usecases/users/loginUser');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operaciones relacionadas con usuarios
 */

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Users]
 *     summary: Inicia sesión de un usuario
 *     description: Permite a un usuario autenticarse usando nombre de usuario y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Nombre de usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticación
 *       400:
 *         description: Error en la solicitud
 *       401:
 *         description: Credenciales inválidas
 */
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
