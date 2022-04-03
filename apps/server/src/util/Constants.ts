const APOLLO_SERVER_URI = "https://kurakichi.org";
const APOLLO_SERVER_PORT = 4000;
const GRAPHQL_PATH = "/graphql";
const CORS_WEB = undefined;
const LOCAL_WEB = "http://localhost:3000";
const APOLLO_STUDIO = "https://studio.apollographql.com";
const COOKIE_NAME = "sid";
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 365 * 10;
const IS_PROD = process.env.NODE_ENV === "production";
const CRYPT_PASS =
  process.env.CRYPT_PASS ||
  "b4dc51c04da8a7eee8ac275ad34ee4e41a8176f611ae171dee2d44809595db24";
const CRYPT_SALT =
  process.env.CRYPT_SALT ||
  "e68e6611ddbdac8dcad4bbe4d9a3456a627b8acd05839eb45fa240e9c8dcb9a8";

export {
  APOLLO_SERVER_URI,
  GRAPHQL_PATH,
  APOLLO_SERVER_PORT,
  CORS_WEB,
  LOCAL_WEB,
  APOLLO_STUDIO,
  COOKIE_NAME,
  COOKIE_MAX_AGE,
  IS_PROD,
  CRYPT_PASS,
  CRYPT_SALT,
};
