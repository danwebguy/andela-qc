import jwt from 'jsonwebtoken';
import db from '../models/db';

const auth = {
  async verifyToken(req, res, next) {
    const token = req.headers['x-auth-token'];
    if (!token) {
      return res.status(400).send({ message: 'Your token is missing' });
    }
    try {
      const decoded = await jwt.verify(token, process.env.jwtPrivateKey);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.userid]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'Your token is invalid' });
      }
      req.user = {
        id: decoded.userid,
        isadmin: decoded.admin,
      };
      return next();
    } catch (error) {
      return res.status(400).send({ message: 'Your token is invalid' });
    }
  },
};

export default auth;
