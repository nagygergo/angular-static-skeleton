// Generated on 2016-10-04 using generator-static-angular v0.0.6
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    connect = require('gulp-connect'),
    opn = require('opn'),
    htmlmin = require('gulp-htmlmin');
    config = require('./gulp.config')();
    print = require('gulp-print');
    eslint = require('gulp-eslint');
    args = require('yargs').argv;
    plumber = require('gulp-plumber');
    scss = require('gulp-sass');
    imagemin = require('gulp-imagemin');
    gulporder = require('gulp-order');
    gulpinject = require('gulp-inject');
    wiredep = require('gulp-wiredep');


gulp.task('html', function () {
    var assets = useref.assets();

    return gulp.src('dev/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', autoprefixer({
            browsers: ['last 2 versions', 'ie 8', 'ie 9']
        })))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('./'));
});

gulp.task('reload', function () {
  return gulp.src('dev/**/**.*')
    .pipe(connect.reload());
});

gulp.task('connect', function (done) {
  connect.server({
    root: 'dev',
    port: 8080,
    livereload: true
  });
  opn('http://localhost:8080', done);
});

gulp.task('watch', function () {
  gulp.watch('dev/**/**.*', ['reload']);
});

gulp.task('serve', ['connect', 'watch']);
gulp.task('default', ['html']);

gulp.task('lint', function () {
  log('Analyzing source with JSHint and JSCS');

  return gulp
    .src(config.alljs)
    .pipe(gulpif(args.verbose, print()))
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('styles', [], function () {
  log('Compiling Sass --> CSS');

  return gulp
    .src(config.sass)
    .pipe(plumber())
    .pipe(scss())
    .pipe(gulp.dest(config.build + 'styles'));
});

gulp.task('images', [], function () {
  log('Compressing and copying images');

  return gulp
    .src(config.images)
    .pipe(imagemin({optimizationLevel: 4}))
    .pipe(gulp.dest(config.build + 'images'));

});

gulp.task('sass-watcher', function() {
  gulp.watch([config.sass], ['styles']);
});

gulp.task('wiredep', function() {
  log('Wiring the bower dependencies into the html');

  var options = config.getWiredepDefaultOptions();

  // Only include stubs if flag is enabled
  var js = config.js;

  return gulp
    .src(config.root + config.index)
    .pipe(wiredep(options))
    .pipe(gulp.dest(config.build));
});

function log(msg) {
  if (typeof (msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        gutil.log(gutil.colors.blue(msg[item]));
      }
    }
  } else {
    gutil.log(gutil.colors.blue(msg));
  }
}

function inject(src, label, order) {
  var options = {};
  if (label) {
    options.name = 'inject:' + label;
  }

  return gulpinject(orderSrc(src, order), options);
}

function orderSrc(src, order) {
  //order = order || ['**/*'];
  return gulp
    .src(src)
    .pipe(gulpif(order, gulporder(order)));
}
