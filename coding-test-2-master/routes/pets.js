const express = require('express');
const Joi = require('@hapi/joi');

const Pets = require('../models/pets');
const { validateBody } = require('../middlewares/route');

const router = express.Router();

router.post(
  '/add',
  validateBody(Joi.object().keys({
    name: Joi.string().required().description('Pet name'),
    age: Joi.number().integer().required().description('Pet age'),
    colour: Joi.string().required().description('Colour'),
  }),
  {
    stripUnknown: true,
  }),
  async (req, res, next) => {
    try {
      const pet = new Pets(req.body);
      await pet.save();
      res.status(201).json(pet);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  '/:id',
  async (req, res, next) => {
    try {
      // deleting a record
      Pets.findOneAndRemove({_id: req.params.id}, {useFindAndModify: false}).then((deletedPet) => {
        // some code
        if(!deletedPet) {
          res.status(404).json({
            "message": "Record not found!"
          });
        } else {
          res.status(200).send(deletedPet);
        }
      });
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/',
  async (req, res, next) => {
    try {
      // var pet = Pets.find().select('name age colour');
      Pets.find().select('name age colour').exec(function(err, listPets) {
        if(err) res.status(400).json({'message': 'Error! Something went wrong.'});
        res.status(200).json(listPets);
      });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;