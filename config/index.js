const NODE_ENV = "production";
// const NODE_ENV = "development";
module.exports = require(`./${NODE_ENV}`);
module.exports.NODE_ENV = NODE_ENV;
