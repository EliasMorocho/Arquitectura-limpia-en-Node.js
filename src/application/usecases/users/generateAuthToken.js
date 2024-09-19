const jwt = require('jsonwebtoken');
const { encryptToken } = require('../../../tools/jwe');

const JWT_SECRET = process.env.JWT_SECRET;
const SIGNATURE = process.env.SIGNATURE_KEY;
function generateAuthToken(user) {
    const payload = {
        id: user.Id,
        email: user.Email,
        role: user.Role,
        signature: SIGNATURE
    };
    var token = jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256', expiresIn: '1h' });
    return encryptToken(token)
}

module.exports = generateAuthToken;
