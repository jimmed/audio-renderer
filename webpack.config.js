var webpack = require('webpack');

if(!process.env.LENS_API_URL) {
  throw new Error('You must set your LENS_API_URL environment variable.');
}

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
  plugins: [
    new webpack.EnvironmentPlugin([
      'LENS_API_URL',
      'GITHUB_CLIENT_ID',
      'DRIBBBLE_CLIENT_ID',
      'ANGELLIST_CLIENT_ID',
    ])
  ],
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
