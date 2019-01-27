const Owncups = require("../models/owncups");
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
      req.item = await Owncups.create({
        key: randomString(),
        owncups: req.body.data,
        createdDate: req.body.dateTransaction
      });
      next();
    } catch (err) {
      next(err);
    }
  },
  async update(req, res, next) {
    try {
      req.item = await Owncups.findOneAndUpdate(
        {
          key: req.params.key
        },
        {
          ...req.item,
          owncups: req.body
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
      req.item = await Owncups.findOneAndRemove({
        key: req.params.key
      });
      next();
    } catch (err) {
      next(err);
    }
  },
  getAll: async (req, res, next) => {
    try {
      req.item = await Owncups.find();
      next();
    } catch (err) {
      next(err);
    }
  },
  getOne: (req, res, next) => {
    try {
      req.item = Owncups.findOne({
        key: req.params.key
      });
      next();
    } catch (err) {
      next(err);
    }
  }
};
