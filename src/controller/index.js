import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

export default class RandomNumberGen {
  /**
   * @description Method generates token
   * @param {Object} user request object
   * @return {string} token
   */
  static token(user) {
    return jwt.sign({ token: { user } },
      process.env.SECRET_TOKEN,
      { expiresIn: '24h' });
  }

  /**
   * @description generates token
   * @param {object}req
   * @param {object}res
   * @return {string} token
   */
  static generateToken(req, res) {
    if (!(req.query.admin) || req.query.admin !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized user contact system administrator',
      });
    }
    const token = RandomNumberGen.token({ name: 'ibrahim' });
    return res.status(200).json({ success: true, token });
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   */
  static generateNumber(req, res) {
    const rawwValue = req.body.numGen;
    const value = Number(rawwValue);

    if (!value || value <= 0) {
      return res.status(400).json({ msg: 'Only numbers are allowed here', success: false });
    }
    if (value > 2000) {
      return res.status(400).json({ msg: 'you can not generate more than 2000 numbers at a go', success: false });
    }
    const dataHold = [];
    for (let i = 0; i < value; i++) {
      const firstRandomNum = Math.random().toString().slice(2, 7);
      const secondRandomNum = Date.now().toString().slice(9, 13);
      const phoneNumber = (firstRandomNum + secondRandomNum).padStart(10, '0');

      const data = {
        phoneNumber,
        dateCreated: new Date(),
      };
      dataHold.push(data);
    }
    try {
      fs.writeFileSync(path.join(__dirname, '../database/dataStore.json'),
        JSON.stringify(dataHold), (err) => {
          if (err) {
            res.status(500).json({ msg: 'something went wrong' });
          }
        });
      return res.status(201).json({ dataHold });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }

  /**
   * @description get all generated number
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   */
  static getAllNumber(req, res) {
    const readfile = fs.readFileSync(path.join(__dirname, '../database/dataStore.json'), 'utf8');
    if (!readfile) return res.status(500).json({ msg: 'somthing went wrong' });
    const data = JSON.parse(readfile);
    const count = data.length;
    return res.status(200).json({ msg: 'success', count, data });
  }
}
