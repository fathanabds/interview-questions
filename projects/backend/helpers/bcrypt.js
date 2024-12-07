const bcrypt = require('bcrypt');

function hashPassword(plainText) {
  return bcrypt.hashSync(plainText, 10);
}

function comparePassword(plainText, hash) {
  return bcrypt.compareSync(plainText, hash);
}

module.exports = { hashPassword, comparePassword };
