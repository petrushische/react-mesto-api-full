const dotenv = require('dotenv');

dotenv.config();

// eslint-disable-next-line import/no-extraneous-dependencies
const { errors, celebrate, Joi } = require('celebrate');

const express = require('express');

const mongoose = require('mongoose');

const NotFoundError = require('./errors/NotFoundError');

const auth = require('./middlewares/auth');

const userRouter = require('./routes/userRoutes');

const cardRouter = require('./routes/cardRoutes');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { login, createUser } = require('./controllers/user');

const { PORT = 3000, MONGO_URL = ' mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

const allowedCors = [
  'https://petrosellinum.nomoredomains.work',
  'http://petrosellinum.nomoredomains.work',
  'localhost:3000',
];

app.use(requestLogger); //  логгер запросов

// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
});

app.post('/signin', express.json(), celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login); // авторизация

app.post('/signup', express.json(), celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*/),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser); // создание пользователя

app.use(auth, userRouter);

app.use(auth, cardRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', auth, (req, res) => {
  throw new NotFoundError('page not found');
});

app.use(errorLogger); //  логгер ошибок

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
});

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URL, {});
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Успешное подключение по ${PORT} порту`);
});
