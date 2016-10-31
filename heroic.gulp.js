'use strict';
let gulp = require('gulp');
let sass = require('gulp-sass');
let concat = require('gulp-concat');
let sourcemaps = require('gulp-sourcemaps');
let gulpif = require('gulp-if');
let autoprefixer = require('gulp-autoprefixer');
let babel = require('gulp-babel');
let uglify = require('gulp-uglify');
let ngAnnotate = require('gulp-ng-annotate');
let bs = require('browser-sync').create();
let htmlmin = require('gulp-htmlmin');
let angularTemplatecache = require('gulp-angular-templatecache');
let rev = require('gulp-rev');
let revReplace = require('gulp-rev-replace');

var module = module || {};
module.exports = function() {
    var gulpHero = {
        runScssFor,
        runJsFor,
        runBrowserSync,
        runAngularTemplateCacheFor,
        runRev,
        runRevReplace,
        watchFailed
    };

    return gulpHero;

    function runScssFor(config) {
        return gulp.src(config.srcGlob)
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle:'compressed'}))
            .pipe(gulpif(config.autoprefix, autoprefixer()))
            .pipe(concat(config.dest))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('.'));
    }

    function runJsFor(config) {
        return gulp.src(config.srcGlob)
                .pipe(sourcemaps.init())
                .pipe(gulpif(!config.concatOnly, babel({presets: ['es2015'], compact: false})))
                .pipe(gulpif(!config.concatOnly, ngAnnotate()))
                .pipe(gulpif(!config.concatOnly, uglify()))
                .pipe(concat(config.dest))
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest('.'));
    }

    function runBrowserSync(config, cssFileToMonitor, jsFileToMonitor, htmlTemplateFileToMonitor) {
        bs.init({
            port: config.port,
            server: config.appRoot
        });

        bs.watch(cssFileToMonitor)
            .on('change', () => {
                bs.reload('*.css');
                bs.notify('CSS changed!');
            });

        bs.watch(jsFileToMonitor)
            .on('change', () => {
                bs.reload('*.js');
                bs.notify('JS changed!');
            });

        bs.watch(htmlTemplateFileToMonitor)
            .on('change', () => {
                bs.reload('*.html');
                bs.notify('HTML changed!');
            });
    }

    function watchFailed(watchName) {
        return function() {
            bs.notify(`<strong style="color:red">Watch failed: ${watchName}</strong>`);
        };
    }

    function runAngularTemplateCacheFor(config) {
        return gulp.src(config.srcGlob)
            .pipe(htmlmin({
                removeComments: true,
                collapseWhitespace: true,
                conservativeCollapse: true
            }))
            .pipe(angularTemplatecache(config.dest, {
                    module: config.moduleName,
                    root: config.templateRoot,
                    standalone: true
                }))
            .pipe(gulp.dest('.'));
    }
    
    function runRev(config) {
        return gulp.src(config.srcGlob)
            .pipe(rev())
            .pipe(gulp.dest(config.dest))
            .pipe(rev.manifest())
            .pipe(gulp.dest(config.dest));
    }

    function runRevReplace(cssConfig, jsConfig, target) {
        const cssManifest = gulp.src(cssConfig.dest + '/rev-manifest.json');
        const jsManifest = gulp.src(jsConfig.dest + '/rev-manifest.json');

        return gulp.src(target)
                .pipe(revReplace({manifest:cssManifest}))
                .pipe(revReplace({manifest:jsManifest}))
                .pipe(gulp.dest(target.substring(0, target.lastIndexOf("/"))));
    }

};
