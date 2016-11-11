'use strict';
var module = module || {};
module.exports = function() {
    const destinationBaseDir = 'www';
    const modulesRoot = 'node_modules';
    const appRoot = 'app';

    const cssDestination = `${destinationBaseDir}/css`;
    const jsDestination = `${destinationBaseDir}/js`;

    return {
        appRoot,
        destinationBaseDir,
        cssDestination,
        jsDestination,
        vendorScss: {
            autoprefix: false,
            dest: `${destinationBaseDir}/css/vendor.min.css`,
            srcGlob: [
                //Samples:
                // `vendor/main.scss`,
                // `${modulesRoot}/some/other/package.scss`
            ]
        },
        appScss: {
            autoprefix: true,
            dest: `${destinationBaseDir}/css/app.min.css`,
            srcGlob: [
                //Samples:
                // `${appRoot}/layout.scss`,
                // `${appRoot}/**/*.scss`
            ]
        },
        vendorJs: {
            concatOnly: true,
            dest: `${jsDestination}/vendor.min.js`,
            srcGlob: [
                //Samples:
                // `${modulesRoot}/angular/angular.min.js`
            ]
        },
        appJs: {
            concatOnly: false,
            dest: `${jsDestination}/app.min.js`,
            srcGlob: [
                //Samples:
                // `${appRoot}/app.module.js`,
                // `${appRoot}/**/*.module.js`,
                // `${appRoot}/**/*.js`
            ]
        },
        appHtml: {
            moduleName: 'templates',
            templateRoot: `/${appRoot}/`,
            dest: `${jsDestination}/app-templates.min.js`,
            srcGlob:[
                //Samples:
                // `${appRoot}/**/*.template.html`                
            ]
        },

        staticAssets: {
            base: appRoot,
            dest: destinationBaseDir + '',
            srcGlob:[
                //Samples:
                // `${appRoot}/index.html`,
                // `${appRoot}/fonts/**/*`,
                // `${appRoot}/images/**/*`
            ]
        },

        browserSync: {
            port: 4004,
            //NOTE: Use the 'appRoot' setting if you want BrowserSync to servce your app.
            //      Use 'proxy' if your app is hosted by ASP.NET or something similar.
            appRoot: 'www'
            //proxy: 'http://localhost:61653'        
        },

        revJs: {
            srcGlob: [
                `${jsDestination}/*.min.js`
            ],
            dest: `${jsDestination}`
        },
        revCss: {
            srcGlob: [
                `${cssDestination}/*.min.css`
            ],
            dest: `${cssDestination}`
        }
    };
};