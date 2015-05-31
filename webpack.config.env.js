var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var RewirePlugin = require('rewire-webpack');

var sourceReg = /node_modules\/lens|src\//i;
function matchSources(sourcePath) {
  return sourceReg.test(path.relative(__dirname, sourcePath));
}

// Add environment-specific overrides to the webpack config here
module.exports = {
  dev: function(conf) {
    conf.entry = conf.polyfills.concat(conf.entry).concat([
      'webpack-dev-server/client?http://localhost:8000',
      'webpack/hot/only-dev-server'
    ]);
    conf.output.path = __dirname;
    // http://webpack.github.io/docs/configuration.html#devtool
    conf.devtool = 'cheap-module-source-map';
    conf.debug = true;
    conf.plugins = conf.plugins.concat(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    );
    conf.module.loaders = conf.module.loaders.concat([
      { test: /\.js$/, loaders: ['react-hot', 'babel'], include: matchSources },
    ]);
    return conf;
  },
  prod: function(conf) {
    conf.entry = conf.polyfills.concat(conf.entry || []);
    conf.output.path = 'dist';
    conf.plugins = conf.plugins.concat([
      new webpack.DefinePlugin({
        'process.env': {
          // This has effect on the react lib size
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin()
    ]);
    conf.module.loaders = conf.module.loaders.concat([
      { test: /\.js$/, loaders: ['babel'], include: matchSources },
    ]);
    return conf;
  }
};
