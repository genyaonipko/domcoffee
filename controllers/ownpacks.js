const Ownpacks = require("../models/ownpacks");
const randomString = require("../utils/random-string");

module.exports = {
  send: (req, res, next) => {
    const { item } = req;
    res.json({
      data: item
    });
  },
  create: async (req, res, next) => {
    try {
      req.item = await Ownpacks.create({
        key: randomString(),
        ownpacks: req.body.data,
        createdDate: req.body.dateTransaction
      });
      next();
    } catch (err) {
      next(err);
    }
  },
  async update(req, res, next) {
    try {
      req.item = await Ownpacks.findOneAndUpdate(
        {
          key: req.params.key
        },
        {
          ...req.item,
          ownpacks: req.body
        },
        {
          new: true
        }
      );
      next();
    } catch (err) {
      next(err);
    }
  },
  deleteOne: async (req, res, next) => {
    try {
      req.item = await Ownpacks.findOneAndRemove({
        key: req.params.key
      });
      next();
    } catch (err) {
      next(err);
    }
  },
  getAll: async (req, res, next) => {
    try {
      req.item = await Ownpacks.find();
      next();
    } catch (err) {
      next(err);
    }
  },
  getOne: (req, res, next) => {
    try {
      req.item = Ownpacks.findOne({
        key: req.params.key
      });
      next();
    } catch (err) {
      next(err);
    }
  }
};
