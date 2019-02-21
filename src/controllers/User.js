import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../database/db';

dotenv.config();

class User {
  /* signup */
  static async signup(req, res) {
    const text = `INSERT INTO
            users("firstName", "lastName", "otherName", email, "phoneNumber", "passportUrl", password, "isAdmin")
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            returning id, "firstName", "lastName", "otherName", email, "phoneNumber", "passportUrl", "isAdmin"`;

    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.otherName,
      req.body.email,
      req.body.phoneNumber,
      req.body.passportUrl,
      req.body.password,
      req.body.isAdmin,
    ];

    try {
      const checkUser = await db.query('SELECT * FROM users WHERE email=$1 AND password=$2', [req.body.email, req.body.password]);

      if (checkUser.rows.length > 0) {
        return res.status(200).json({
          status: 200,
          error: 'Sorry, this account already exists',
        });
      }

      const { rows } = await db.query(text, values);

      if (rows.length > 0) {
        return res.status(201).json({
          status: 201,
          data: rows,
        });
      }
    } catch (error) {
      console.log(error);
    }
    return res.status(200).json({
      status: 200,
      error: 'Account not created',
    });
  }

  /* login */
  static async login(req, res) {
    try {
      const { rows } = await db.query('SELECT * FROM users WHERE email=$1 AND password=$2', [req.body.email, req.body.password]);

      if (rows.length > 0) {
        const userType = rows[0].isAdmin ? 'admin' : 'normal';
        const token = jwt.sign({
          userId: rows[0].id,
          userType,
        }, process.env.SECRET_KEY, {
          expiresIn: 86400, // expires in 24 hours
        });
        return res.status(200).json({
          status: 200,
          data: {
            id: rows[0].id,
            firstName: rows[0].firstName,
            lastName: rows[0].lastName,
            otherName: rows[0].otherName,
            email: rows[0].email,
            phoneNumber: rows[0].phoneNumber,
            passportUrl: rows[0].passportUrl,
            isAdmin: rows[0].isAdmin,
          },
          token,
        });
      }
    } catch (error) {
      console.log(error);
    }
    return res.status(400).json({
      status: 400,
      error: 'Wrong email or password',
    });
  }
}

export default User;
