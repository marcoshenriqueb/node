var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var stylus = require('gulp-stylus');
var poststylus = require('poststylus');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var nib = require('nib');
var BROWSER_SYNC_RELOAD_DELAY = 500;


gulp.task('stylus', function () {
  gulp.src('./assets/stylus/home.styl')
    .pipe(stylus({
      use: [
        nib(),
        poststylus(['autoprefixer'])
      ],
      compress: true
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});
gulp.task('compress', function() {
  gulp.src('./assets/js/*.js')
    .pipe(uglify())
    .pipe(concat('home.js'))
    .pipe(gulp.dest('./public/js'));
});
gulp.task('watch', ['nodemon', 'compress', 'stylus'], function() {
  browserSync({
    proxy: "localhost:3000",
    port: 8000,
    open: false,
    notify: true
  });
  gulp.watch('./assets/stylus/**/*.styl', ['stylus']);
  gulp.watch('./assets/js/**/*.js', ['compress']);
  gulp.watch(['./views/*.html'], reload);
});

gulp.task('nodemon', function (cb) {
	var started = false;
	return nodemon({
		script: './index.js',
    ext: 'js html'
	}).on('start', function () {
		if (!started) {
			cb();
			started = true;
		}
	}).on('restart', function onRestart() {
    setTimeout(function reload() {
      browserSync.reload({
        stream: false
      });
    }, BROWSER_SYNC_RELOAD_DELAY);
  });
});
