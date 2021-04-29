import * as express from 'express';
import * as session from 'express-session';
import * as http from 'http';
import cors from 'cors';

import { ApolloServer } from 'apollo-server-express';
import * as connectRedis from 'connect-redis';

import { COOKIE_NAME, isProd } from '@kurakichi/node-util';

import { GraphqlSchema as schema } from '../graphql/makeSchema';
import { sentryTest } from '../util/sentry';
import { googleRouter } from '../route/googleRouter';
import { yahooRouter } from '../route/yahooRouter';
import { redis, pubsub } from '../util/redisClient';
import { uploadRouter } from '../route/uploadRouter';

export const startApolloServer = async () => {
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      req,
      res,
      pubsub,
      redis,
    }),
    uploads: false,
  });

  await server.start();

  const app = express();

  app.set('trust proxy', 1);

  app.use(
    cors({
      origin: [process.env.NX_CORS_NEXT as string, 'https://studio.apollographql.com'],
      credentials: true,
    }),
  );

  const RedisStore = connectRedis(session);

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
        secure: isProd, // cookie only works in https
        domain: isProd ? 'www.kurakichi.org' : undefined,
      },
      saveUninitialized: false,
      secret: process.env.NX_SESSION_SECRET as string,
      resave: false,
    }),
  );

  server.applyMiddleware({
    app,
    cors: {
      origin: [process.env.NX_CORS_NEXT as string, 'https://studio.apollographql.com'],
      credentials: true,
    },
  });
  app.use('/google', googleRouter);
  app.use('/yahoo', yahooRouter);
  app.use('/upload', uploadRouter);

  app.get('/', (req, res) => {
    console.log('got access');
    console.log('sessionId:', req.session.id);
    sentryTest();
    res.json({ hi: 'congrats!' });
  });

  const httpServer = http.createServer(app);

  server.installSubscriptionHandlers(httpServer);

  const PORT = process.env.NX_PORT || 4000;

  await new Promise(() => httpServer.listen(PORT));

  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);

  return { server, app, httpServer };
};
