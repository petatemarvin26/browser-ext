const HtmlWebpackPlugin = require('html-webpack-plugin');
const {DefinePlugin} = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const {merge} = require('webpack-merge');

const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');
const {SRC_EXT, getEnv, resolve} = require('../common');

/**
 *
 * @param {any} webpack_env
 * @returns {import('webpack').Configuration}
 */
module.exports = (webpack_env) => {
  const env = getEnv();
  const isdev = webpack_env.WEBPACK_SERVE;

  /**
   * @type {import('webpack').Configuration['entry']}
   */
  const entry = {
    popup: {
      filename: 'static/js/popup.[contenthash:10].js',
      import: resolve('src/popup/index.ts')
    },
    web: {
      filename: 'static/js/web.[contenthash:10].js',
      import: resolve('src/web/index.ts')
    },
    background: {
      filename: 'background.js',
      import: resolve('src/background.ts')
    },
    content: {
      filename: 'content.js',
      import: resolve('src/content.ts')
    }
  };

  /**
   * @type {import('webpack').Configuration['plugins']}
   */
  const plugins = [
    new HtmlWebpackPlugin({
      publicPath: isdev ? '.' : env.PUBLIC_URL,
      template: resolve('src/web/index.html'),
      filename: 'web.html',
      chunks: ['web'],
      excludeChunks: ['content', 'background']
    }),
    new HtmlWebpackPlugin({
      publicPath: isdev ? '.' : env.PUBLIC_URL,
      template: resolve('src/popup/index.html'),
      filename: 'popup.html',
      chunks: ['popup'],
      excludeChunks: ['content', 'background']
    }),
    new DefinePlugin({'process.env': JSON.stringify(env)}),
    new ForkTsCheckerWebpackPlugin()
  ];

  /**
   * @type {import('webpack').Configuration}
   */
  const config = {
    target: 'web',
    mode: 'development',
    entry,
    plugins,
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
      extensions: SRC_EXT
    }
  };

  if (!isdev) {
    config.mode = 'production';
    return merge(config, prodConfig(env));
  }
  return merge(config, devConfig(env));
};
