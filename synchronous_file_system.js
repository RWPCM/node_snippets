// Synchronous File system snippets

const fs = require('fs');

const file = '/Users/regismartin/dev/Node_snippets/toto.md'

console.log('Ce fichier existe-t-il ? ' + fs.existsSync(file));

fs.chmodSync(file, '600');

try {
    fs.accessSync(file, fs.constants.R_OK, fs.constants.W_OK);
    console.log('can read/write');
} catch (err) {
    console.error('No access! ' + err.message)
};