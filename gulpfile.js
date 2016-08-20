var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');
var uglify       = require('gulp-uglifyjs');
var autoprefixer = require('gulp-autoprefixer');


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("css/scss/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("css/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("css"))
    .pipe(browserSync.stream());
});

// watching js files
gulp.task('uglify', function() {
  gulp.src('js/*.js')
    .pipe(uglify('min.js'))
    .pipe(gulp.dest('js'))
});

// Autoprefixer
gulp.task('default', function () {
	return gulp.src('css/*.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['serve', 'uglify']);
