var utils = require('./_utils'),
    eslint = require('./eslint'),
    minify = require('./minify'),
    build = require('./build'),
    assets = require('./assets'),
    chokidar = require('chokidar');

module.exports = function(options) {

  options = utils.extend({
    // chokidar events we are going to watch
    // generally you should not touch them
    watchEvents: [
      'change',
      'add',
      'unlink',
      'unlinkDir',
      'addDir'
    ]
  }, options);

  // return a promise based on a certain task triggered
  var runOnlyOn = function(event) {
    if (~options.watchEvents.indexOf(event)) {
      // go to the next task
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  };

  // run eslint when a source file gets updated
  utils.print('Watching the files in the src/**/**/*.js path', 'cool');
  chokidar.watch('src/**/**/*.js', {
    ignoreInitial: true
  }).on('all', function(event) {
    // this tasks will run only if the current event matches the ones in the watchEvents array
    runOnlyOn(event)
      .then(eslint)
      .then(build)
      .then(minify)
      .then(assets)
      .catch(e => utils.print(e, 'error'));
  });

};
