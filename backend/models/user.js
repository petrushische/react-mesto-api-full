const mongoose = require('mongoose');

// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');

// eslint-disable-next-line import/no-extraneous-dependencies
const validator = require('validator');

const AuthError = require('../errors/AuthError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*/gm.test(v);
      },
      message: 'Ошибка в поле avatar',
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Ошибка в поле email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
