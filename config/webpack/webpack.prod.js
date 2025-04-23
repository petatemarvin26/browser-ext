const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const webpack = require('webpack');

const {
  SRC,
  STYLE_FILE,
  resolve,
  copyFilter,
  babelLoader,
  styleLoader
} = require('../common');

/**
 *
 * @param {any} webpack_env
 * @returns {import('webpack').Configuration}
 */
module.exports = (env) => {
  /**
   * @type {import('webpack').Configuration['output']}
   */
  const output = {
    path: resolve('dist')
  };

  /**
   * @type {import('webpack').Configuration['module']}
   */
  const modules = {
    rules: [babelLoader(false), styleLoader(false)]
  };

  /**
   * @type {import('webpack').Configuration['plugins']}
   */
  const plugins = [
    new CopyPlugin({
      patterns: [
        {
          from: resolve('src'),
          to: resolve('dist'),
          filter: copyFilter
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:10].css'
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ];

  /**
   * @type {import('webpack').Configuration['optimization']}
   */
  const optimization = {
    minimize: true,
    concatenateModules: true,
    mergeDuplicateChunks: true,
    mangleExports: 'deterministic',
    minimizer: [
      new CssMinimizerPlugin({test: STYLE_FILE}),
      new TerserPlugin({
        test: SRC,
        minify: TerserPlugin.terserMinify,
        terserOptions: {
          mangle: true,
          compress: {passes: 2},
          output: {beautify: false}
        }
      })
    ]
  };

  return {
    devtool: 'source-map',
    output,
    module: modules,
    plugins,
    optimization
  };
};
