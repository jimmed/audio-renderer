var fs = require('fs');

var NODE_MODULES = './node_modules';
var CIRCUIT_MODULE = /^lens-/gi;

module.exports = fs.readdirSync(NODE_MODULES)
  .filter(function(dir) {
    if(!dir.match(CIRCUIT_MODULE)) {
      return false;
    }
    var stats = fs.statSync(NODE_MODULES + '/' + dir);
    return stats.isDirectory();
  });
