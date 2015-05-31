var gulp = require('gulp');
var gutil = require('gulp-util');
var merge = require('lodash/object/merge');
var nodeOpen = require('open');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('../../webpack.config');
var webpackEnv = require('../../webpack.config.env');
var listModules = require('../utils/listModules');

var getConfig = function(type, params) {
  return webpackEnv[type](merge({}, webpackConfig), params);
};

function runWebpack(config, showLog, done) {
  webpack(config, function(err, stats) {
    if(err) {
      throw new gutil.PluginError('webpack', err);
    }
    if(showLog) {
      gutil.log('[webpack]', stats.toString({
        colors: true
      }));
    }
    done();
  });
}

gulp.task('webpack:build', function(done) {
  runWebpack(getConfig('prod'), false, done);
});

listModules.concat(['app','']).forEach(function(dir) {
  var name = 'webpack:test' + (dir ? ':' + dir : '');
  gulp.task(name, ['clean'], function(done) {
    runWebpack(getConfig('test', true, dir), done);
  });
});

gulp.task('serve', function() {
  var port = 8000;
  var host = 'localhost';
  var server = new WebpackDevServer(webpack(getConfig('dev')), {
    contentBase: 'src',
    hot: true,
    noInfo: false,
    publicPath: '',
    stats: {
      colors: true
    }
  });

  server.listen(port, host, function(err) {
    if(err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    console.log('Listening on', host);
    nodeOpen('http://' + host + ':' + port);
  });
});
