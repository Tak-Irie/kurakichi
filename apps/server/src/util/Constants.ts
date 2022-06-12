const APOLLO_SERVER_URI = 'https://kurakichi.org';
const APOLLO_STUDIO = 'https://studio.apollographql.com';
const COOKIE_NAME = process.env.COOKIE_NAME || 'sid';
const IS_PROD = process.env.NODE_ENV === 'production';
const CRYPT_PASS =
  process.env.CRYPT_PASS ||
  'b4dc51c04da8a7eee8ac275ad34ee4e41a8176f611ae171dee2d44809595db24';
const CRYPT_SALT =
  process.env.CRYPT_SALT ||
  'e68e6611ddbdac8dcad4bbe4d9a3456a627b8acd05839eb45fa240e9c8dcb9a8';
const SSO_REDIRECT_SUCCESS =
  process.env.SSO_REDIRECT_SUCCESS || 'http://localhost:3000';
const SSO_REDIRECT_FAIL =
  process.env.SSO_REDIRECT_FAIL || 'http://localhost:3000/auth/fail';

export {
  APOLLO_SERVER_URI,
  APOLLO_STUDIO,
  COOKIE_NAME,
  IS_PROD,
  CRYPT_PASS,
  CRYPT_SALT,
  SSO_REDIRECT_SUCCESS,
  SSO_REDIRECT_FAIL,
};
