const 	gulp = require('gulp'),
    	gulpUtil = require('gulp-util'),
    	sass = require('gulp-sass'),
    	cache = require('gulp-cache'),
    	imagemin = require('gulp-imagemin');
const 	browserSync = require('browser-sync').create();
const  	reload = browserSync.reload;

// static server assign

gulp.task('server', function() {
    browserSync.init({
        server: { baseDir: 'src'},
        notify: false,
        open : false
    });
});


// processing sass

gulp.task('sass', function() {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass({ outputSytle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
        // .pipe(browserSync.reload({ stream: true }));
        .pipe(browserSync.stream());

});


// watch task for sass

gulp.task('watch', ['sass', 'server'], function() {
    gulp.watch('src/sass/**/*.scss', ['sass'])
    gulp.watch('src/*.html').on('change',reload);

});

// image optimization process

gulp.task('imagemin', function() {
    return gulp.src('src/images/**/*')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('dist/images'));
});


// build into production

gulp.task('build', ['imagemin','sass'], function() {

    // Bulding html files into production one
    var buildFiles = gulp.src(['src/*.html', 'src/.htaccess'])
        .pipe(gulp.dest('dist'));


    // bulding css

    var buildCss = gulp.src(['src/css/**/*'])
        .pipe(gulp.dest('dist/css'));

    // building js

    var buildJs = gulp.src(['src/js/**/*'])
        .pipe(gulp.dest('dist/js'));


    //building fonts

    var buildFonts = gulp.src(['src/fonts/**/*'])
        .pipe(gulp.dest('dist/fonts'));

});

gulp.task('default', ['watch','build']);
