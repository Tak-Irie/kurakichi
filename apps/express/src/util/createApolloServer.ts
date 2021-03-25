// import * as http from 'http';
// import { ApolloServer } from 'apollo-server-express';
// import express from 'express';
// import { GraphqlSchema as schema } from '../graphql/makeSchema';

// export const startApolloServer = async () => {
//   const PORT = 4000;
//   const app = express();
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: ({ req, res }) => {
//       req, res;
//     },
//   });
//   await server.start();
//   server.applyMiddleware({ app });

//   const httpServer = http.createServer(app);
//   server.installSubscriptionHandlers(httpServer);

//   // Make sure to call listen on httpServer, NOT on app.
//   await new Promise((resolve) => httpServer.listen(PORT, resolve));
//   console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
//   console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
//   return { server, app, httpServer };
// };

// const { ApolloServer } = require('apollo-server');
// const { resolvers, typeDefs } = require('./schema');

// const validateToken = (authToken) => {
//   // ... validate token and return a Promise, rejects in case of an error
// };

// const findUser = (authToken) => {
//   return (tokenValidationResult) => {
//     // ... finds user by auth token and return a Promise, rejects in case of an error
//   };
// };

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   subscriptions: {
//     onConnect: (connectionParams, webSocket) => {
//       if (connectionParams.authToken) {
//         return validateToken(connectionParams.authToken)
//           .then(findUser(connectionParams.authToken))
//           .then((user) => {
//             return {
//               currentUser: user,
//             };
//           });
//       }

//       throw new Error('Missing auth token!');
//     },
//   },
// });

// server.listen().then(({ url, subscriptionsUrl }) => {
//   console.log(`🚀 Server ready at ${url}`);
//   console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
// });
