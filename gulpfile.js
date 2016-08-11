var gulp = require('gulp');
var stylus = require('gulp-stylus');
var poststylus = require('poststylus');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var nib = require('nib');

gulp.task('stylus', function () {
  gulp.src('./assets/stylus/home.styl')
    .pipe(stylus({
      use: [
        nib(),
        poststylus(['autoprefixer'])
      ],
      compress: true
    }))
    .pipe(gulp.dest('./public/css'));
});
gulp.task('compress', function() {
  gulp.src('./assets/js/*.js')
    .pipe(uglify())
    .pipe(concat('home.js'))
    .pipe(gulp.dest('./public/js'));
});
gulp.task('watch', ['compress', 'stylus'], function() {
  gulp.watch('./assets/stylus/**/*.styl', ['stylus']);
  gulp.watch('./assets/js/**/*.js', ['compress']);
});
