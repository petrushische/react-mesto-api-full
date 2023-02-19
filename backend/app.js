const dotenv = require('dotenv');

dotenv.config();

const { errors, celebrate, Joi } = require('celebrate');

const express = require('express');

const mongoose = require('mongoose');

const NotFoundError = require('./errors/NotFoundError');

const auth = require('./middlewares/auth');

const userRouter = require('./routes/userRoutes');

const cardRouter = require('./routes/cardRoutes');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { login, createUser } = require('./controllers/user');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

const allowedCors = [
  'https://petrosellinum.nomoredomains.work',
  'http://petrosellinum.nomoredomains.work',
  'http://localhost:3000',
];

app.use((req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
});

app.use(requestLogger); //  логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', express.json(), celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login); // авторизация

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

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

app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('page not found'));
});

app.use(errorLogger); //  логгер ошибок

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
});

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URL, {});
app.listen(PORT, () => {
  console.log(`Успешное подключение по ${PORT} порту`);
});
