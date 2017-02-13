'use strict';

let gulp = require('gulp'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  babelify = require('babelify'),
  ngAnnotate = require('gulp-ng-annotate'),
  batchReplace = require('gulp-batch-replace');

require('babelify-es6-polyfill');

const buildConfig = require('./build.config');

let currentBuildEnv = 'prod';
let outDir = __dirname + '/static';

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('files', () => {
  gulp.src(['src/img/**/*']).pipe(gulp.dest(outDir + '/img'));
  gulp.src(['src/fonts/**/*']).pipe(gulp.dest(outDir + '/fonts'));
  gulp.src(['src/**/*.ico']).pipe(gulp.dest(outDir));
  gulp.src(['src/js/**/*.html'])
    .pipe(batchReplace(buildConfig[currentBuildEnv]))
    .pipe(gulp.dest(outDir + '/views'));
  gulp.src(['src/index.html'])
    .pipe(batchReplace(buildConfig[currentBuildEnv]))
    .pipe(gulp.dest(outDir));
});

gulp.task('styles', function () {
  return gulp.src('src/css/**/*.css')
    // .pipe(minifyCSS({keepBreaks: false}))
    .pipe(gulp.dest(outDir + '/css'));
});

gulp.task('javascript', () => {
  return browserify({
    entries: 'src/js/app.js'
  })
    .transform('babelify', {presets: ["es2015"]})
    .bundle().on('error', handleError)
    .pipe(source('bundle.js'))
    .pipe(batchReplace(buildConfig[currentBuildEnv]))
    .pipe(ngAnnotate())
    .pipe(gulp.dest(outDir + '/js'));
});

// Watch task.
gulp.task('watch', ['build'], function () {
  gulp.watch(['src/img/**/*', 'src/index.html', 'src/js/**/*.html', 'src/fonts/**/*'], [
    'files'
  ]);

  gulp.watch(['src/css/**/*.css'], [
    'styles'
  ]);

  gulp.watch(['src/js/**/*.js'], [
    'javascript'
  ]);
});

// Build task.
gulp.task('build', [
  'javascript',
  'styles',
  'files'
], function(done) {
  console.log('Build done');
  done();
});

gulp.task('setDevEnv', () => {
  currentBuildEnv = 'dev';
});

gulp.task('dev', ['setDevEnv', 'default']);

// Use default task.
gulp.task('default', ['watch']);
