import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const jwtSecret = process.env.KEY;

/**
 * @description: verifies user`s token
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {Object}  validates token
 */
export default (req, res, next) => {
  const token = req.headers.authorization || req.headers['x-access-token'];
  if (!token) {
    return res.status(403).json({ error: 'No valid token' });
  }
  jwt.verify(token, jwtSecret, (error, decoded) => {
    if (error) {
      if (error.message === 'jwt expired') {
        return res.status(401).json({ error: 'expired token' });
      }
      return res.status(401).json(error);
    }
    req.decoded = decoded;
    next();
  });
};
