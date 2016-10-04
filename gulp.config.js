module.exports = function() {
  var app = './app/';
  var report = './report/';
  var root = './';
  var temp = './.tmp';
  var wiredep = require('wiredep');
  var bowerFiles = wiredep({
    devDependencies: true
  })['js'];
  var bower = {
    json: require('./bower.json'),
    directory: './bower_components',
    ignorePath: '../..'
  }

  var nodeModules = 'node_modules'

  var config = {
    /**
     * File paths
     */
    // all javascript that we want to vet
    alljs: [
      './src/**/*.js',
      './*.js'
    ],
    build: './build/',
    css: temp + 'styles.css',
    fonts: bower.directory + 'font-awesome/fonts/**/*.*',
    html: app + '**/*.html',
    htmltemplates: app + '**/*.html',
    images: app + 'images/**/*.*',
    index: app + 'index.html',
    // app js, with no specs
    js: [
      app + '**/*.module.js',
      app + '**/*.js',
      '!' + app + '**/*.spec.js'
    ],
    jsOrder: [
      '**/app.module.js',
      '**/*.module.js',
      '**/*.js'
    ],
    sass: 'styles/styles.sass',
    report: report,
    root: root,

    source: 'src/',
    stubsjs: [
      bower.directory + 'angular-mocks/angular-mocks.js',
       'stubs/**/*.js'
    ],
    temp: temp,

    /**
     * optimized files
     */
    optimized: {
      app: 'app.js',
      lib: 'lib.js'
    },

    /**
     * plato
     */
    plato: {
      js: app + '**/*.js'
    },

    /**
     * browser sync
     */
    browserReloadDelay: 1000,

    /**
     * template cache
     */
    templateCache: {
      file: 'templates.js',
      options: {
        module: 'app.core',
        root: 'app/',
        standalone: false
      }
    },

    /**
     * Bower and NPM files
     */
    bower: bower,
    packages: [
      './package.json',
      './bower.json'
    ],
  }

  return config;
}
