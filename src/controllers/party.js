import joi from 'joi';
import { parties } from '../database';
import db from '../database/db';

const createParty = async (req, res) => {
  const schema = {
    name: joi.string()
      .min(1)
      .required(),
    hqAddress: joi.string()
      .min(1)
      .required(),
    logoUrl: joi
      .string()
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

    const text = `INSERT INTO
            parties("name", "hdAddress", "logoUrl")
            VALUES($1, $2, $3)
            returning *`;

    const values = [
      req.body.name,
      req.body.hqAddress,
      req.body.logoUrl,
    ];
    const { rows } = await db.query(text, values);
    console.log(rows);
    if (rows.length > 0) {
      return res.status(201).json(
        {
          status: 201,
          data: rows,
        });
        }

  return res.status(400).json({
    status: 400,
    message: rows.error.details[0].message,
  });
};

const getAllParties = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM parties');

    if (rows.length > 0) {
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
  return res.status(200).json({
    status: 200,
    message: 'No party found',
  });
};

const getParty = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM parties WHERE id=$1', [req.params.id]);

    if (rows.length > 0) {
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
  return res.status(200).json({
    status: 200,
    message: 'Party not found',
  });
};
const updateParty = async (req, res) => {
  const schema = {
    name: joi.string()
      .min(1)
      .required(),
  };
  try{
    const { rows } = await db.query(`SELECT * FROM parties WHERE id=$1`, [req.params.id]);
    if (!rows) {
      return res.status(404).json({
        status: 404,
        message: 'invalid id',
      });
    }
    const rslt = joi.validate(({ name: req.body.name }), schema);
    if (rslt.error) {
      return res.status(400).json({
        status: 400,
        message: rslt.error.details[0].message,
      });
    }

    const rows1 = await db.query('UPDATE parties SET name=$1 WHERE id=$2 returning *', [req.body.name, req.params.id]);
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

const deleteParty = async(req, res) => {
  try{
    const { rows } = await db.query(`SELECT * FROM parties WHERE id=$1`, [req.params.id]);
    if (!rows) {
      return res.status(404).json({
        status: 404,
        message: 'invalid id',
      });
    }
    const rows1 = await db.query('DELETE FROM parties WHERE id=$1 returning *', [req.params.id]);
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
  createParty,
  getAllParties,
  getParty,
  deleteParty,
  updateParty,
};
