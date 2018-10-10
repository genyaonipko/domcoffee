var _ = require("lodash");
module.exports = () => {
  var randomString = "";
  var alpha = "qwertyuiopasdfghjklzxcvbnm";
  var randomLength = _.random(6, 25);
  for (var i = 0; i < randomLength; i++) {
    var random = _.random(alpha.length - 1);
    var randomLetter = alpha[random];
    randomString += randomLetter;
  }
  return randomString;
};
