const path = require('path');
const resolve = require('../config/webpack.config').resolve;

module.exports = {
  resolve,
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, '../')
      },
      {
        test: /\.less$/,
        loaders: ['style-loader', 'css-loader', 'less-loader'],
        include: path.resolve(__dirname, '../')
      },
      {
        test: /\.(?:svg|jpg|png|bmp|gif)$/,
        loaders: ['file-loader'],
        include: path.resolve(__dirname, '../')
      }
    ]
  }
};
