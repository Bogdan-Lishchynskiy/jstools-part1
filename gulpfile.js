const gulp = require('gulp');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const livereload = require('gulp-livereload');
const del = require('del');
const concat = require('gulp-concat');
// const uglify = require('gulp-uglify');
// const pump = require('pump');


gulp.task('sass', () => {
  gulp.src('./sass/**/*.scss').pipe(sass()).pipe(gulp.dest('./css'));
});

gulp.task('eslint', () => {
  gulp.src('./scripts/**/*.js').pipe(eslint()).pipe(gulp.dest('./js'));
});

gulp.task('live', () => {
  livereload.listen();
  gulp.watch('./scripts/**/*.js', ['eslint']);
});

gulp.task('del', () => {
  del([
    './js',
    './dist',
  ]);
});

gulp.task('concat', () => {
  gulp.src(['./scripts/index.js', './scripts/moment.js', './scripts/jquery.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});


// gulp.task('uglify', (cb) => {
//   pump([
//     gulp.src('./scripts/*.js'),
//     uglify(),
//     gulp.dest('./dist/'),
//   ],
//   cb,
//   );
// });
