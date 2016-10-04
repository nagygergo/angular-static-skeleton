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
