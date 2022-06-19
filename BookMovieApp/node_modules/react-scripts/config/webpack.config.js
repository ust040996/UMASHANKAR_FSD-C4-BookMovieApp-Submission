var path = require('path');
var webpack = require("webpack");

module.exports = {
  entry: './src/js/app.js',
  devtool: 'source-map',
    mode: 'development',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ["babel-loader"]
    },{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  output: {
    path: path.resolve(__dirname, './src/vendor'),
    filename: 'bundle.min.js'
  }
};