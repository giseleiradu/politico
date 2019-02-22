import joi from 'joi';
import { offices } from '../database';
import db from '../database/db';

const createOffice = async (req, res) => {

  if (req.userType !== 'admin') {
  return res.status(401).json({
    error: 'unauthorized access',
  });
}
  console.log(req.body);
  const schema = {
    type: joi.string()
      .min(1)
      .required(),
    name: joi.string()
      .min(1)
      .required(),
  };
  const result = joi.validate(req.body, schema);

  if (result.error) {
    return res.status(400).json({
      status: 400,
      message: result.error.details[0].message,
    });
  }
  try {
    const text = `INSERT INTO
            offices(type, name)
            VALUES($1, $2)
            returning *`;

    const values = [
      req.body.name,
      req.body.type,
    ];

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
    message: 'Office not created',
  });
};

const getAllOffices = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM offices');

    if (rows.length > 0) {
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    }
  } catch (error) {
    console.log(error);
  }
  return res.status(200).json({
    status: 200,
    office: 'No office found',
  });
};

const getOffice = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM offices WHERE id=$1', [req.params.id]);

    if (rows.length > 0) {
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    }
  } catch (error) {
    console.log(error);
  }
  return res.status(200).json({
    status: 200,
    message: 'Office not found',
  });
};

const deleteOffice = async (req, res) => {
  if (req.userType !== 'admin') {
  return res.status(401).json({
    error: 'unauthorized access',
  });
}
  try{
    const { rows } = await db.query(`SELECT * FROM offices WHERE id=$1`, [req.params.id]);
    if (!rows) {
      return res.status(404).json({
        status: 404,
        message: 'invalid id',
      });
    }
    const rows1 = await db.query('DELETE FROM offices WHERE id=$1 returning *', [req.params.id]);
    return res.status(200).json(
      {
        status: 200,
        data: [rows1.rows[0]],
      });
  }catch(error){
      return res.status(500).json({
        status: 500,
        message: error,
      });
  }
};

export {
  createOffice,
  getAllOffices,
  getOffice,
  deleteOffice,
};
