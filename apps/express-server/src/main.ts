import express from 'express';
import session from 'express-session';
import cors from 'cors';

import { ApolloServer } from 'apollo-server-express';

import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import { isProduction } from './util/isProduction';
import { COOKIE_NAME } from './util/constants';
import { PrismaClient } from '@prisma/client';

import { GraphqlSchema as schema } from './graphql/makeSchema';
import { UserRepository } from './modules/user/infrastructure/UserRepository';

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

const main = async () => {
  const app = express();

  const prisma = new PrismaClient();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.NX_REDIS_URL);

  app.set('trust proxy', 1);
  app.use(
    cors({
      origin: [
        process.env.NX_CORS_ORIGIN as string,
        'https://studio.apollographql.com',
      ],
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

  app.get('/', (req, res) => {
    console.log('got access');
    res.json({ hi: 'congrats!' });
  });

  app.get('/ex', async (req, res) => {
    const repo = new UserRepository();
    await repo.getUsers();

    res.json({ done: 'congrats!' });
  });

  app.listen(process.env.NX_PORT, () => {
    console.log('server started on localhost:4000');
  });
};

main().catch((err) => {
  console.error(err);
});
