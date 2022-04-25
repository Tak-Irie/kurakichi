const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config) => {
    config.resolve.alias['@kurakichi/domain'] = path.resolve(
      __dirname,
      '../../modules/domain',
    );
    return config;
  },
  reactStrictMode: true,
  experimental: {
    externalDir: true,
  },
};
