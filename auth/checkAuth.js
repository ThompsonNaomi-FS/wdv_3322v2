const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
   // header - Authorization: Bearer sawefnoi3j49328572398urrjeinf98234
    const [bearer, token] = req.headers.authorization.split(' ');
    const decoded = jwt.verify(token, process.env.jwt_key);
    req.userData = decoded;
    next();
    } catch (error) {
        res.status(401).json({ message: 'Authorization Failed' });
    }
};