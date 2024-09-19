const jwt = require('jsonwebtoken');
const { decryptToken } = require('../tools/jwe');
const JWT_SECRET = process.env.JWT_SECRET;
const SIGNATURE = process.env.SIGNATURE_KEY;
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && decryptToken(authHeader.split(' ')[1]);

    if (!token) {
        return res.status(401).json({ message: "Token no existe", status: false });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: err.message, status: false });
        }
        if (user.signature !== SIGNATURE) {
            return res.status(403).json({ message: 'Firma no válida', status: false });
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
