// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
// const path = require('path');

module.exports = withNx({
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.css$/,
  //     use: [
  //       {
  //         loader: 'postcss-loader',
  //         options: {
  //           ident: 'postcss',
  //           plugins: [
  //             require('tailwindcss')(
  //               path.resolve(__dirname, './tailwind.config.js') // the absolute path of your tailwind.config.js
  //             ),
  //             require('autoprefixer'),
  //           ],
  //         },
  //       },
  //     ],
  //     // the absolute path of the folder contains tailwind.css
  //     // I reuse tailwind.css across projects and libs so I put it in the workspace root
  //     // Maybe I should create a lib for it.
  //     include: path.resolve('./global'),
  //   });
  //   return config;
  // },
});

// how works this function
//   * Modify the Next.js webpack config to allow workspace libs to use css modules.
//   * Note: This would be easier if Next.js exposes css-loader and sass-loader on `defaultLoaders`.
// function withNx(nextConfig = {}) {
//
//     if (process.env.NOW_BUILDER) {
//         console.log('withNx() plugin: Detected Vercel build environment, applying "experimental-serverless-trace" target');
//         nextConfig.target = 'experimental-serverless-trace';
//     }
//
//     const userWebpack = nextConfig.webpack || ((x) => x);
//
//     return Object.assign(Object.assign({}, nextConfig), {
//         webpack: (config, options) => {
//
//  * Include workspace libs in css/sass loaders
//             const includes = [join(appRootPath, workspaceLayout().libsDir)];
//             const nextCssLoaders = config.module.rules.find((rule) => typeof rule.oneOf === 'object');
//
//   * webpack config is not as expected
//             if (!nextCssLoaders)
//                 return config;
//   *  1. Modify css loader to enable module support for workspace libs
//             const nextCssLoader = nextCssLoaders.oneOf.find((rule) => rule.sideEffects === false && regexEqual(rule.test, /\.module\.css$/));
//
//   * Might not be found if Next.js webpack config changes in the future
//             if (nextCssLoader) {
//                 nextCssLoader.issuer.or = nextCssLoader.issuer.and
//                     ? nextCssLoader.issuer.and.concat(includes)
//                     : includes;
//                 delete nextCssLoader.issuer.and;
//             }
//    * 2. Modify sass loader to enable module support for workspace libs
//             const nextSassLoader = nextCssLoaders.oneOf.find((rule) => rule.sideEffects === false &&
//                 regexEqual(rule.test, /\.module\.(scss|sass)$/));
//
//    * Might not be found if Next.js webpack config changes in the future
//             if (nextSassLoader) {
//                 nextSassLoader.issuer.or = nextSassLoader.issuer.and
//                     ? nextSassLoader.issuer.and.concat(includes)
//                     : includes;
//                 delete nextSassLoader.issuer.and;
//             }
//
//   * 3. Modify error loader to ignore css modules used by workspace libs
//             const nextErrorCssModuleLoader = nextCssLoaders.oneOf.find((rule) => rule.use &&
//                 rule.use.loader === 'error-loader' &&
//                 rule.use.options &&
//                 (rule.use.options.reason ===
//                     'CSS Modules \u001b[1mcannot\u001b[22m be imported from within \u001b[1mnode_modules\u001b[22m.\n' +
//                         'Read more: https://err.sh/next.js/css-modules-npm' ||
//                     rule.use.options.reason ===
//                         'CSS Modules cannot be imported from within node_modules.\nRead more: https://err.sh/next.js/css-modules-npm'));
//
//    * Might not be found if Next.js webpack config changes in the future
//             if (nextErrorCssModuleLoader) {
//                 nextErrorCssModuleLoader.exclude = includes;
//             }
//             return userWebpack(config, options);
//         } });
