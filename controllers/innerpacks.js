const Innerpacks = require("../models/innerpacks");
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
      req.item = await Innerpacks.create({
        key: randomString(),
        innerpacks: req.body.data,
        createdDate: req.body.dateTransaction
      });
      next();
    } catch (err) {
      next(err);
    }
  },
  async update(req, res, next) {
    try {
      req.item = await Innerpacks.findOneAndUpdate(
        {
          key: req.params.key
        },
        {
          ...req.item,
          innerpacks: req.body
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
      req.item = await Innerpacks.findOneAndRemove({
        key: req.params.key
      });
      next();
    } catch (err) {
      next(err);
    }
  },
  getAll: async (req, res, next) => {
    try {
      req.item = await Innerpacks.find();
      next();
    } catch (err) {
      next(err);
    }
  },
  getOne: (req, res, next) => {
    try {
      req.item = Innerpacks.findOne({
        key: req.params.key
      });
      next();
    } catch (err) {
      next(err);
    }
  }
};
