import joi from 'joi';
import { parties } from '../database';

const createParty = (req, res) => {
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
  const party = { id: parties.length + 1, ...req.body, createdOn: new Date() };
  parties.push(party);
  return res.status(201).json({
    status: 201,
    data: [party],
  });
};

const getAllParties = (req, res) => res.status(200).json({
  status: 200,
  data: parties,
});

const getParty = (req, res) => {
  const { id } = req.params;
  const party = parties.find(p => p.id === parseInt(id, 10));
  if (!party) {
    return res.status(404).json({
      status: 404,
      message: 'the party with a given id does not exist',
    });
  }
  return res.status(200).json({
    status: 200,
    data: [party],
  });
};

const updateParty = (req, res) => {
  const { id } = req.params;
  const party = parties.find(p => p.id === parseInt(id, 10));
  if (!party) {
    return res.status(404).json({
      status: 404,
      message: 'invalid id',
    });
  }
  parties.push(party);
  return res.status(200).json({ id: party.id, ...req.body, createdOn: new Date() });
};

const deleteParty = (req, res) => {
  const { id } = req.params;
  const party = parties.find(p => p.id === parseInt(id, 10));
  if (!party) {
    return res.status(404).json({
      status: 404,
      message: 'invalid id',
    });
  }
  const index = parties.indexOf(party);
  parties.splice(index, 1);
  return res.status(200).json({
    status: 200,
    data: [party],
  });
};

export {
  createParty,
  getAllParties,
  getParty,
  deleteParty,
  updateParty,
};
