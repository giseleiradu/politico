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
     };
    const result = joi.validate(req.body, schema);

     if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
   }
  const party = { id: parties.length + 1, ...req.body, createdOn: new Date() };
  parties.push(party);
  return res.send(party);
};
const getAllParties = (req, res) => {
  res.send(parties);
};
const getParty = (req, res) => {
  const { id } = req.params;
  const party = parties.find(p => p.id === parseInt(id));
  if (!party) res.status(404).send('the party with a given id does not exist');
  res.send(party);
};
export {

  createParty,
  getAllParties,
  getParty

};
