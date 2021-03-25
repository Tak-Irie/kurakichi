import * as express from 'express';
import * as session from 'express-session';
import * as cors from 'cors';
import * as http from 'http';

import { ApolloServer } from 'apollo-server-express';
import * as connectRedis from 'connect-redis';

import { COOKIE_NAME, isProd } from '@kurakichi/node-util';

import { GraphqlSchema as schema } from './graphql/makeSchema';
import { sentryTest } from './util/sentry';
import { googleRouter } from './route/googleRouter';
import { yahooRouter } from './route/yahooRouter';
import { redis, pubsub } from './util/redisClient';

const main = async () => {
  const app = express();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      req,
      res,
      pubsub,
      redis,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  const RedisStore = connectRedis(session);

  app.set('trust proxy', 1);
  app.use(
    cors({
      origin: [process.env.NX_CORS_NEXT as string, 'https://studio.apollographql.com'],
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
        secure: isProd, // cookie only works in https
        domain: isProd ? 'www.kurakichi.org' : undefined,
      },
      saveUninitialized: false,
      secret: process.env.NX_SESSION_SECRET as string,
      resave: false,
    }),
  );
  console.log('cookie:', COOKIE_NAME);

  app.use('/google', googleRouter);
  app.use('/yahoo', yahooRouter);

  app.get('/', (req, res) => {
    console.log('got access');
    sentryTest();

    res.json({ hi: 'congrats!' });
  });

  app.get('/ex', async (req, res) => {
    console.log('sessionId:', req.session.id);
    res.json({ done: "it's experimental page" });
  });

  app.get('/ex1', async (req, res) => {
    res.json({ done: 'check redis' });
  });

  const httpServer = http.createServer(app);

  apolloServer.installSubscriptionHandlers(httpServer);

  const PORT = process.env.NX_PORT || 4000;

  httpServer.listen(PORT, () => {
    console.log(`server ready at ${PORT}`);
  });

  // await new Promise((resolve) => httpServer.listen(PORT, resolve));
  // console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
  // console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`);
  // return { apolloServer, app, httpServer };
};

main().catch((err) => {
  console.error(err);
});
