import connectRedis from 'connect-redis';
import express from 'express';
import session from 'express-session';

import type { Redis } from 'ioredis';
import {
  geocodeRouter,
  googleRouter,
  uploadRouter,
  yahooRouter,
} from '../route';
import { COOKIE_MAX_AGE, COOKIE_NAME, IS_PROD } from './Constants';

type ExpressArgs = {
  redis: Redis;
};

const createExpress = async ({ redis }: ExpressArgs) => {
  const app = express();
  const RedisSessionStore = connectRedis(session);

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisSessionStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: COOKIE_MAX_AGE,
        httpOnly: true,
        sameSite: 'lax',
        secure: IS_PROD,
        domain: IS_PROD ? 'www.kurakichi.org' : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET as string,
      resave: false,
    }),
  );

  app.use('/google', googleRouter);
  app.use('/yahoo', yahooRouter);
  app.use('/upload', uploadRouter);
  app.use('/geocode', geocodeRouter);

  app.get('/', (req, res) => {
    res.send('hello world');
  });

  return app;
};

export { createExpress };
