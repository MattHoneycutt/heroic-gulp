'use strict';
const gulp = require('gulp');
const del = require('del');
const gulpHero = require('./heroic.gulp.js')();
const config = require('./gulp.config.js')();

function clean() {
    return del(config.destinationBaseDir + '**/*');
}
exports.clean = clean;

function cssVendor() {
    return gulpHero.runScssFor(config.vendorScss);
}
exports.cssVendor = cssVendor;

function cssApp() {
    return gulpHero.runScssFor(config.appScss);
}
exports.cssApp = cssApp;

exports.css = gulp.parallel(cssVendor, cssApp);

function jsVendor() {
    return gulpHero.runJsFor(config.vendorJs);
}
exports.jsVendor = jsVendor;

function jsApp() {
    return gulpHero.runJsFor(config.appJs);
}
exports.jsApp = jsApp;

exports.js = gulp.parallel(jsVendor, jsApp);

function htmlTemplates() {
    return gulpHero.runAngularTemplateCacheFor(config.appHtml);
}
exports.htmlTemplates = htmlTemplates;

function staticAssets() {
    return gulpHero.copyStaticAssets(config.staticAssets);
}
exports.staticAssets = staticAssets;

function watch() {
    //TODO: I'd like to encapsulate this, but I'm not sure what the best way to do that would be. 
    gulp.watch(config.appScss.srcGlob, gulp.series(cssApp)).on('error', gulpHero.watchFailed('cssApp'));
    gulp.watch(config.appJs.srcGlob, gulp.series(jsApp)).on('error', gulpHero.watchFailed('jsApp'));
    gulp.watch(config.appHtml.srcGlob, gulp.series(htmlTemplates)).on('error', gulpHero.watchFailed('htmlTemplates'));
    gulp.watch(config.staticAssets.srcGlob, gulp.series(staticAssets)).on('error', gulpHero.watchFailed('staticAssets'));
}
exports.watch = watch;

function revJs() {
    return gulpHero.runRev(config.revJs);
}
exports.revJs = revJs;

function revCss() {
    return gulpHero.runRev(config.revCss);
}
exports.revCss = revCss;

exports.revFiles = gulp.parallel(revJs, revCss);

function revReplace () {
    var target = config.destinationBaseDir + '/index.html';
    return gulpHero.runRevReplace(config.revCss, config.revJs, target);
}
exports.revReplace = revReplace;

exports.cacheBust = gulp.series(exports.revFiles, revReplace);

function browserSync () {
    gulpHero.runBrowserSync(config.browserSync, config.appScss.dest, config.appJs.dest, config.appHtml.dest, config.staticAssets.srcGlob);
}
exports.browserSync = browserSync;

exports.build = gulp.series(clean, gulp.parallel(exports.js, exports.css, htmlTemplates, staticAssets));

exports.buildAndServe = gulp.series(exports.build, gulp.parallel(watch, browserSync));
