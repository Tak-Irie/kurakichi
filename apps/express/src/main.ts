import { startApolloServer } from './util/startApolloServer';

const main = async () => {
  await startApolloServer();
};

main().catch((err) => {
  console.error('errOnServer:', err);
});
