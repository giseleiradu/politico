import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../database/db';
import bcrypt from 'bcrypt';


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
      bcrypt.hashSync(req.body.password, 8),
      req.body.isAdmin,
    ];

    try {
      const checkUser = await db.query('SELECT * FROM users WHERE email=$1', [req.body.email]);

      if (checkUser.rows.length > 0) {
        return res.status(422).json({
          status: 422,
          error: 'Sorry, this account already exists',
        });
      }

      const { rows } = await db.query(text, values);

      if (rows.length > 0) {
        const userType = rows[0].isAdmin ? 'admin' : 'normal';
        const token = jwt.sign({
          userId: rows[0].id,
          userType,
        }, process.env.SECRET_KEY, {
          expiresIn: 86400, // expires in 24 hours
        });
        return res.status(201).json({
          status: 201,
          data: rows,
          token,
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
    const { rows } = await db.query('SELECT * FROM users WHERE email=$1', [req.body.email]);

    if (rows.length > 0) {
      for (let i = 0; i < rows.length; i += 1) {
        if (bcrypt.compareSync(req.body.password, rows[i].password)) {
          const userType = rows[i].isAdmin ? 'admin' : 'normal';
          const token = jwt.sign({
            userId: rows[i].id,
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
      }
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
