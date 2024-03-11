const jwt = require('jsonwebtoken');
const secretKey = 'Aman@1234'; 

class AuthController {
  static verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1];
      jwt.verify(bearerToken, secretKey, (err, authData) => {
        if (err) {
          res.status(403).json({ error: 'Forbidden' });
        } else {
          req.authData = authData;
          next();
        }
      });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  }
}

module.exports = AuthController;