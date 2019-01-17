import dotenv from 'dotenv';
import validateUserInput from '../helpers/users';
import db from '../models/db';
import validateLogin from '../helpers/signin';
import authtok from '../helpers/authtok';

dotenv.config();

class userController {
  static async currentUser(req, res) {
    const findAllUsers = 'SELECT * FROM user';
    try {
      const { rows, rowCount } = await db.query(findAllUsers);
      return res.status(200).json({ rows, rowCount });
    } catch (error) {
      return res.status(400).json({ message: 'No user found' });
    }
  }

  static async userSignup(req, res) {
    const { errors, isValid } = validateUserInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const hash = authtok.hashPassword(req.body.password);

    const User = `INSERT INTO
    users(firstname, lastname, othername, email, phonenumber, username, password)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    returning *`;
    const values = [
      req.body.firstname,
      req.body.lastname,
      req.body.othername,
      req.body.email,
      req.body.phonenumber,
      req.body.username,
      hash,
    ];

    try {
      const { rows } = await db.query(User, values);
      const token = authtok.generateToken(rows[0].id, rows[0].isadmin);
      return res.status(201).json({
        status: 201,
        data: [
          token,
          rows[0], delete rows[0].password,
        ],
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({ message: 'The user with this email has already registered' });
      }
      return res.status(400).json(errors);
    }
  }

  static async userSignin(req, res) {
    const { errors, isValid } = validateLogin(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).json({ message: 'Your email or password is incorrect' });
      }
      if (!authtok.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).json({ message: 'Your email or password is incorrect' });
      }
      const token = authtok.generateToken(rows[0].id, rows[0].isadmin);
      return res.status(200).json({
        status: 200,
        data: [
          token,
          rows[0], delete rows[0].password,
        ],
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
export default userController;
