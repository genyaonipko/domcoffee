const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const randomString = require("../utils/random-string");

const User = require("../models/user");

module.exports = {
  send: (req, res, next) => {
    const { item } = req;
    res.json({
      data: item
    });
  },
  login: (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
      if (!user) {
        errors.email = "Пользователь не существует";
        return res.status(404).json(errors);
      }
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            role: user.role
          };
          jwt.sign(
            payload,
            "secret",
            {
              expiresIn: 3600
            },
            (err, token) => {
              if (err) console.error("There is some error in token", err);
              else {
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                });
              }
            }
          );
        } else {
          errors.password = "Не правильный пароль";
          return res.status(400).json(errors);
        }
      });
    });
  },
  register: function(req, res) {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    User.findOne({
      email: req.body.email
    }).then(user => {
      if (user) {
        return res.status(400).json({
          email: "Email already exists"
        });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm"
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar,
          role: req.body.role,
          key: randomString()
        });

        bcrypt.genSalt(10, (err, salt) => {
          if (err) console.error("There was an error", err);
          else {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) console.error("There was an error", err);
              else {
                newUser.password = hash;
                newUser.save().then(user => {
                  res.json(user);
                });
              }
            });
          }
        });
      }
    });
  },
  me: (req, res) => {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  },
  getAll: async (req, res, next) => {
    try {
      const allUsers = await User.find();
      const usersToSend = allUsers.map(item => ({
        email: item.email,
        avatar: item.avatar,
        name: item.name,
        role: item.role,
        date: item.date,
        key: item.key
      }));
      req.item = usersToSend;
      next();
    } catch (err) {
      next(err);
    }
  },
  deleteOne: async (req, res, next) => {
    try {
      req.item = await User.findOneAndRemove({
        key: req.params.key
      });
      next();
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      req.item = await User.findOneAndUpdate(
        {
          key: req.params.key
        },
        {
          ...req.item,
          ...req.body
        },
        {
          new: true
        }
      );
      next();
    } catch (err) {
      next(err);
    }
  }
};
