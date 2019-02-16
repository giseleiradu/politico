import joi from 'joi'
import { parties, offices } from '../database';

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
        .required()
     };
    const result = joi.validate(req.body, schema);

     if (result.error) {
      res.status(400).send(
        {
          status: 400,
          message: result.error.details[0].message
        });
      return;
   }
  const party = { id: parties.length + 1, ...req.body, createdOn: new Date() };
  parties.push(party);
  return res.send(
    {
      "status": 201,
      "data": [party]
    }
    );
};


const createOffice = (req, res) => {
    console.log(req.body);
     const schema = {
     type: joi.string()
        .min(1)
        .required(),
       name: joi.string()
        .min(1)
        .required()
     };
    const result1 = joi.validate(req.body, schema);

     if (result1.error) {
      res.status(400).send(
        {
          status: 400,
          message: result1.error.details[0].message
        });
      return;
   }
  const office = { id:offices.length + 1, ...req.body, createdOn: new Date() };
  offices.push(office);
  return res.send(
    {
      "status": 201,
      "data": [ofice]
    }
    );
};



const getAllParties = (req, res) => {
  res.send(
    {
      status: 200,
      data:parties
    });
};
const getParty = (req, res) => {
  const { id } = req.params;
  const party = parties.find(p => p.id === parseInt(id));
  if (!party) res.status(404).send({
    status: 404,
    message:'the party with a given id does not exist'
  });
  res.send(
    {
      status: 200,
      'data': [party]
    }
    );
};
const updateParty = (req, res) => {
  const { id } = req.params;
  const party = parties.find(p => p.id === parseInt(id));
  if (!party) return res.status(404).send({
    status: 404,
    message: 'invalid id'
  });
  parties.push(party);
  res.status(200).send({id:party.id, ...req.body,createdOn: new Date()
  });
};

const deleteParty = (req, res) => {
  const { id } = req.params;
  const party = parties.find(p => p.id === parseInt(id));
  if (!party) return res.status(404).send(
    {
    status: 404,
    message: 'invalid id'
  });
  const index = parties.indexOf(party);
  parties.splice(index, 1);
  return res.status(200).send(
    {
      "status": 200,
      "data": [party]
    }
    );
};
const getAllOffices = (req, res) => {
  res.send(
    {
      "status": 200,
      "data": offices
    }
    );
};
const getOffice = (req, res) => {
  const { id } = req.params;
  const office = offices.find(f => f.id === parseInt(id));
  if (!office) res.status(404).send({
    status:404,
    message:'the office with a given id does not exist'
  });
  res.send(office);
};
export {
  createParty,
  getAllParties,
  getParty,
  deleteParty,
  updateParty,
  createOffice,
  getAllOffices,
  getOffice,

};
