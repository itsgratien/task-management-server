import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import router from './modules/routes';
import { errors } from 'celebrate';
import { httpCode } from './constants';
import responseWrapper from './helpers/responseWrapper';
import swaggerSetup from './api-docs/v1/swaggerSetup';
import errorHandler from './helpers/errorHandler';
import expressSession from 'express-session';
import connectRedis from 'connect-redis';
import redisHelper from './helpers/redisHelper';
import config from 'config';

const app = express();

const redisStore = connectRedis(expressSession);

const redisClient = new redisHelper().getRedis();

app.use(morgan('dev'));

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  expressSession({
    secret: config.get('app.secretKey'),
    resave: false,
    saveUninitialized: false,
    store: new redisStore({ client: redisClient }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 1 * 365, // 1 year
      httpOnly: true,
      secure: false,
      sameSite: 'lax'
    },
    name: config.get('app.session.name')
  })
);

app.use('/api', router);

app.use('/api-docs/v1', swaggerUI.serve, swaggerSetup);

app.use((_req, res) =>
  responseWrapper({
    status: httpCode.NOT_FOUND,
    message: 'Page / API Not Found',
    res
  })
);

app.use(errors());

app.use(errorHandler);

export default app;
