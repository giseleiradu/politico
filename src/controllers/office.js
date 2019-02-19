import joi from 'joi';
import { offices } from '../database';

const createOffice = (req, res) => {
  console.log(req.body);
  const schema = {
    type: joi.string()
      .min(1)
      .required(),
    name: joi.string()
      .min(1)
      .required(),
  };
  const result1 = joi.validate(req.body, schema);

  if (result1.error) {
    return res.status(400).json({
      status: 400,
      message: result1.error.details[0].message,
    });
  }
  const office = { id: offices.length + 1, ...req.body, createdOn: new Date() };
  offices.push(office);
  return res.status(201).json({
    status: 201,
    data: [office],
  });
};

const getAllOffices = (req, res) => res.status(200).json({
  status: 200,
  data: offices,
});

const getOffice = (req, res) => {
  const { id } = req.params;
  const office = offices.find(f => f.id === parseInt(id, 10));
  if (!office) {
    res.status(404).json({
      status: 404,
      message: 'the office with a given id does not exist',
    });
  }
  return res.status(200).json({
    status: 200,
    data: [office],
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
