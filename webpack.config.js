var webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.js',

  ],
  polyfills: [
    './node_modules/es5-shim',
  ],
  output: {
    filename: 'bundle.js',
  },
  plugins: [],
  resolve: {
    alias: {
      'when/lib/Promise': 'es6-promise' // swap `when` with 'es6-promise'
    }
  },
  module: {
    loaders: [
      { test: /\.json$/, loaders: ['json'] },
      //{ test: /\.css$/, loaders: ['style', 'css'] },
      //{ test: /\.(png|jpg|eot|svg|ttf|woff)$/, loader: 'file?name=assets/[name].[hash].[ext]' }
    ],
  }
};
