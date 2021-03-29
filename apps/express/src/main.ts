import { startApolloServer } from './util/startApolloServer';

const main = async () => {
  await startApolloServer();
};

main().catch((err) => {
  console.log('errOnServer:', err);
});
