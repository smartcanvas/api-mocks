var fs = require('fs');

var readFiles = {};
module.exports = readFiles;

/**
 * Reads the content of the JSON file that is in the directory /model
 * @param resource
 */
readFiles.readJSON = function( resource ) {
    var filename = __dirname + '/model/' + resource + '.json';
    //console.log( 'Reading filename = ' + filename );
    var content = fs.readFileSync( filename );
    //console.log( 'Content = ' + content );
    return content;
}