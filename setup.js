'use strict';
const path = require('path');
const fs = require('fs');

const sourceDir = path.resolve('.');
const targetDir = path.resolve('../..');

let gulpfileExists = false;
let gulpConfigExists = false;

try {
    fs.accessSync(`${targetDir}/gulpfile.js`, fs.F_OK);
    gulpfileExists = true;
    console.warn('heroic-gulp: Target gulpfile.js exists and will not be overwritten!');
    console.warn('heroic-gulp: You can manually use heroic.gulp.js if you want, ');
    console.warn('heroic-gulp: or remove your gulpfile and install heroic-gulp again.');
} catch (e) {
    //Ok
}

try {
    fs.accessSync(`${targetDir}/gulp.config.js`, fs.F_OK);
    gulpConfigExists = true;
    console.warn('heroic-gulp: Target gulp.config.js exists and will not be overwritten!');
    console.warn('heroic-gulp: You can manually use heroic.gulp.js if you want, ');
    console.warn('heroic-gulp: or remove your gulpfile and install heroic-gulp again.');
} catch (e) {
    //Ok
}

if (!gulpfileExists && !gulpConfigExists) {
    fs.createReadStream(`${sourceDir}/gulpfile.js`).pipe(fs.createWriteStream(`${targetDir}/gulpfile.js`));
    fs.createReadStream(`${sourceDir}/gulp.config.js`).pipe(fs.createWriteStream(`${targetDir}/gulp.config.js`));

    console.log('heroic-gulp: Added gulpfile.js and gulp.config.js to your project.');
    console.log('heroic-gulp: Customize gulp.config js to suit your needs, then run ');
    console.log('heroic-gulp: \'gulp buildAndServe\' to build and run your app.');
}