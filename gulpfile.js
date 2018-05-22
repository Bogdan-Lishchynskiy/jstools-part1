const gulp = require('gulp');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const livereload = require('gulp-livereload');
const del = require('del');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const pump = require('pump');
const watch = require('gulp-watch');
const copy = require('gulp-copy');

gulp.task('sass', () => {
  gulp.src('./sass/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('./css'));
});

gulp.task('eslint', () => {
  gulp.src('./scripts/**/*.js')
  .pipe(eslint())
  .pipe(eslint.failAfterError())
  .pipe(gulp.dest('./js'));
});

gulp.task('live', () => {
  livereload.listen();
  gulp.watch('./scripts/**/*.js', ['eslint']);
});

gulp.task('del', () => {
  del([
    './js',
    './min',
    './concat',
    './copies',
    './watchers',
    './prod',
  ]);
});

gulp.task('concat', () => {
  gulp.src(['./scripts/index.js', './scripts/moment.js', './scripts/jquery.js'])
    .pipe(concat('concat.js'))
    .pipe(gulp.dest('./concat/'));
});


gulp.task('uglify', (cb) => {
  pump([
    gulp.src('./scripts/*.js'),
    uglify(),
    gulp.dest('./min/'),
  ],
  cb
  );
});


gulp.task('watch', () => {
   watch('./scripts/**/*.js', function () {
      gulp.src('./scripts/**/*.js')
          .pipe(gulp.dest('./watchers'));
  });
});

gulp.task('copy', () => {
  gulp.src(['./scripts/index.js', './css/index.css'])
    .pipe(gulp.dest('./copies/'));
});


gulp.task('prod', () => {
   gulp.src('./copies/index.js')
   .pipe(del())
     .pipe(gulp.dest('./prodf/'));
});