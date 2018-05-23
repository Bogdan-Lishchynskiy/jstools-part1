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
const gulpif = require('gulp-if');
const babel = require('gulp-babel');


//////////////////////////////TASKS FOR PROD
gulp.task('buildprepare', () => {
  gulp.src('*.*', {
      read: false
    })
    
    .pipe(gulp.dest('./prod'));
});

gulp.task('buildcopy', () => {
  gulp.src('index.html')
    .pipe(gulp.dest('./prod/'));
});

gulp.task('buildcss', () => {
  gulp.src('./sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./prod/css/styles.css'));
});

gulp.task('buildjs', () => {
  gulp.src('./scripts/**/*.js')

    .pipe(concat('app.js'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./prod/js/'));
});
//////////////////////////////TASKS FOR PROD

//main task prod
gulp.task('prod', ['buildprepare', 'buildcopy', 'buildcss', 'buildjs']);
//

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
    './prod'
  ]);
});

gulp.task('concat', () => {
  gulp.src(['./scripts/index.js', './scripts/moment.js', './scripts/jquery.js'])
    .pipe(concat('concat.js'))
    .pipe(gulp.dest('./concat/'));
});


gulp.task('uglify', (cb) => {
  pump([
      gulp.src('./bundle.js'),
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


