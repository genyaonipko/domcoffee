const Packs = require("../models/packs");
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
      req.item = await Packs.create({
        key: randomString(),
        packs: req.body
      });
      next();
    } catch (err) {
      next(err);
    }
  },
  async update(req, res, next) {
    try {
      req.item = await Packs.findOneAndUpdate(
        {
          key: req.params.key
        },
        {
          ...req.item,
          packs: req.body
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
      req.item = await Packs.findOneAndRemove({
        key: req.params.key
      });
      next();
    } catch (err) {
      next(err);
    }
  },
  getAll: async (req, res, next) => {
    try {
      req.item = await Packs.find();
      next();
    } catch (err) {
      next(err);
    }
  },
  getOne: (req, res, next) => {
    try {
      req.item = Packs.findOne({
        key: req.params.key
      });
      next();
    } catch (err) {
      next(err);
    }
  }
};
