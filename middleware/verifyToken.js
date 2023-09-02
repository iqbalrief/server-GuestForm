const jwt = require('jsonwebtoken')

const verifyToken = async(req, res, next) => {
    try {
        let token = req.headers['authorization'];
        if (!token) {
          return res.status(404).send({ message: 'Tidak ada token yang disediakan.' });
        }
     const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
      req.userId = decoded.id;
      req.userRole = decoded.role;
      next();
    } catch (err) {
      res.status(500).send({ auth: false, message: 'Gagal melakukan verifikasi token.' });
    }
  }

  module.exports = verifyToken