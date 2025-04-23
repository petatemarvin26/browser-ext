const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {SRC, STYLE} = require('./constants');
const {resolve} = require('./utils');

/**
 * @param {boolean} isdev
 * @returns {object} rules set for babel-loader
 */
const babelLoader = (isdev) => {
  return {
    test: SRC,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      configFile: resolve('config/.babelrc'),
      plugins: isdev ? [require.resolve('react-refresh/babel')] : []
    }
  };
};

/**
 * @param {boolean} isdev
 * @return {object} rule set for stylesheets
 */
const styleLoader = (isdev) => {
  return {
    test: STYLE,
    use: [isdev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader']
  };
};

module.exports = {
  babelLoader,
  styleLoader
};
