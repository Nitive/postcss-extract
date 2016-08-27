/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */

const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'index.js'),
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css', 'postcss'],
    }],
  },
  postcss: [
    require('postcss-extract')({
      extract: {
        important: path.join(__dirname, 'dist/important.css'),
      },
    }),
  ],
}
