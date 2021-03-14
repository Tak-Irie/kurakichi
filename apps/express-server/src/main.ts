import express from 'express';
import session from 'express-session';
import cors from 'cors';

import { ApolloServer } from 'apollo-server-express';

import connectRedis from 'connect-redis';
import { isProduction } from './util/isProduction';
import { COOKIE_NAME } from './util/constants';
import { PrismaClient } from '@prisma/client';

import { GraphqlSchema as schema } from './graphql/makeSchema';
import { sentryTest } from './util/sentry';
import { googleRouter } from './route/googleRouter';
import { yahooRouter } from './route/yahooRouter';
import { redis } from './util/redisClient';

const main = async () => {
  const app = express();

  const prisma = new PrismaClient();

  const RedisStore = connectRedis(session);

  app.set('trust proxy', 1);
  app.use(
    cors({
      origin: [process.env.NX_CORS_ORIGIN as string, 'https://studio.apollographql.com'],
      credentials: true,
    }),
  );
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: isProduction, // cookie only works in https
        domain: isProduction ? 'www.kurakichi.org' : undefined,
      },
      saveUninitialized: false,
      secret: process.env.NX_SESSION_SECRET as string,
      resave: false,
    }),
  );

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      req,
      res,
      prisma,
      redis,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.use('/google', googleRouter);
  app.use('/yahoo', yahooRouter);

  app.get('/', (req, res) => {
    console.log('got access');
    sentryTest();

    res.json({ hi: 'congrats!' });
  });

  app.get('/ex', async (req, res) => {
    // req.session.temp1 = 'hoge';
    // req.session.temp2 = req.session.id;

    console.log('sessionId:', req.session.id);
    res.json({ done: "it's experimental page" });
  });

  app.get('/ex1', async (req, res) => {
    res.json({ done: 'check redis' });
  });

  app.listen(process.env.NX_PORT, () => {
    console.log('next connection:', process.env.NX_CORS_ORIGIN);
    console.log('redis connection:', process.env.NX_REDIS_URL);
    console.log('server started on localhost:4000');
  });
};

main().catch((err) => {
  console.error(err);
});
