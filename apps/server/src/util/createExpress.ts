import connectRedis from 'connect-redis';
import express from 'express';
import session from 'express-session';

import type { Redis } from 'ioredis';
import { geocodeRouter, googleRouter, yahooRouter } from '../route';

type ExpressArgs = {
  redis: Redis;
};

const createExpress = async ({ redis }: ExpressArgs) => {
  const app = express();
  const RedisSessionStore = connectRedis(session);
  const COOKIE_NAME = process.env.COOKIE_NAME || 'sid';
  const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 365 * 10;

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
        // secure: IS_PROD,
        secure: false,
        // TODO: researching BP
        domain: undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET || 'development',
      resave: false,
    }),
  );

  app.use('/google', googleRouter);
  app.use('/yahoo', yahooRouter);
  app.use('/geocode', geocodeRouter);

  app.get('/', (req, res) => {
    res.send('hello world');
  });

  return app;
};

export { createExpress };
