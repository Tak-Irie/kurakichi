import 'reflect-metadata';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { join } from 'path';

import { ApolloServer } from 'apollo-server-express';
import { createConnection, useContainer } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';

import { COOKIE_NAME, IS_PRODUCTION } from './util/constants';
import { DbTest } from './graphql/entities/DbTest';
import { TestResolver } from './graphql/resolvers/TestResolver';

const main = async () => {
  const app = express();

  // useContainer(Container);

  await createConnection({
    type: 'postgres',
    username: 'test',
    password: 'test',
    logging: true,
    synchronize: true,
    migrations: [join(__dirname, './migrations/*')],
    entities: [DbTest],
  });

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.NX_REDIS_URL);

  app.set('trust proxy', 1);
  app.use(
    cors({
      origin: [process.env.NX_CORS_ORIGIN, 'https://studio.apollographql.com'],
      credentials: true,
    })
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
        secure: IS_PRODUCTION, // cookie only works in https
        domain: IS_PRODUCTION ? 'www.kurakichi.org' : undefined,
      },
      saveUninitialized: false,
      secret: process.env.NX_SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TestResolver],
      validate: false,
      // container: Container,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.get('/', (req, res) => {
    res.send('hello');
  });

  app.listen(process.env.NX_PORT, () => {
    console.log('server started on localhost:4000');
  });
};

main().catch((err) => {
  console.error(err);
});
