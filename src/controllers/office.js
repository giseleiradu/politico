import joi from 'joi';
import { offices } from '../database';
import db from '../database/db';

const createOffice = async (req, res) => {
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

const deleteOffice = (req, res) => {
  const { id } = req.params;
  const office = offices.find(p => p.id === parseInt(id, 10));
  if (!office) {
    return res.status(404).json({
      status: 404,
      message: 'invalid id',
    });
  }
  const index = offices.indexOf(office);
  offices.splice(index, 1);
  return res.status(200).json({
    status: 200,
    data: [office],
  });
};

export {
  createOffice,
  getAllOffices,
  getOffice,
  deleteOffice,
};
