var utils = require('./_utils');
var fs = require('fs-extra');

module.exports = function(options) {

  options = utils.extend({
    // folder where the library output is located
    assets: [
      {
        sourcePath: 'node_modules/jquery/dist/jquery.min.js',
        destPath: 'dist/lib/jquery.min.js'
      },
      {
        sourcePath: 'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
        destPath: 'dist/lib/bootstrap.min.js'
      }
    ]
  }, options);

  /**
   * Create a promise based on the result
   */
  return new Promise(function(resolve, reject) {

    options.assets.forEach((asset) => {
      fs.copy(asset.sourcePath, asset.destPath, function (err) {
        if (err) {
          console.error(err);
          return reject();
        }
        console.log('asset ' + JSON.stringify(asset) + 'bundled successfully!');
        resolve();
      });
    });

  });
};

