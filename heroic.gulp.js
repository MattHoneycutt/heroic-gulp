'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const ngAnnotate = require('gulp-ng-annotate');
const bs = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');
const angularTemplatecache = require('gulp-angular-templatecache');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');

const module = module || {};
module.exports = function() {
    var gulpHero = {
        runScssFor,
        runJsFor,
        runBrowserSync,
        runAngularTemplateCacheFor,
        runRev,
        runRevReplace,
        watchFailed,
        copyStaticAssets
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

    function runBrowserSync(config, cssFileToMonitor, jsFileToMonitor, htmlTemplateFileToMonitor, staticAssetsToMonitor) {
        let bsConfig = {
            port: config.port
        };

        if (config.appRoot) config.server = config.appRoot;

        if (config.proxy) config.proxy = config.proxy;

        bs.init(bsConfig);

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

        bs.watch(staticAssetsToMonitor)
            .on('change', () => {
                bs.notify('Static files changed!');
                setTimeout(() => bs.reload(), 1000);
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

    function copyStaticAssets(config) {
        return gulp.src(config.srcGlob, {"base": config.base})
            .pipe(gulp.dest(config.dest));
    }

};
