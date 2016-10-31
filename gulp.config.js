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
        vendorScss: {
            autoprefix: false,
            dest: `${destinationBaseDir}/css/vendor.min.css`,
            srcGlob: [
                `vendor/main.scss`
            ]
        },
        appScss: {
            autoprefix: true,
            dest: `${destinationBaseDir}/css/app.min.css`,
            srcGlob: [
                `${appRoot}/layout.scss`,
                `${appRoot}/**/*.scss`
            ]
        },
        vendorJs: {
            concatOnly: true,
            dest: `${jsDestination}/vendor.min.js`,
            srcGlob: [
                `${modulesRoot}/lodash/lodash.min.js`,
                `${modulesRoot}/angular/angular.min.js`
            ]
        },
        appJs: {
            concatOnly: false,
            dest: `${jsDestination}/app.min.js`,
            srcGlob: [
                `${appRoot}/main.js`,
                `${appRoot}/**/*.js`
            ]
        },
        appHtml: {
            moduleName: 'templates',
            templateRoot: '/app/',
            dest: `${jsDestination}/app-templates.min.js`,
            srcGlob:[
                `${appRoot}/**/*.template.html`                
            ]
        },

        browserSync: {
            port: 4004,
            appRoot: 'www'
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