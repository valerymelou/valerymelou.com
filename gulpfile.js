
////////////////////////////////
		//Setup//
////////////////////////////////

// Plugins
var gulp = require('gulp'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      cssnano = require('gulp-cssnano'),
      plumber = require('gulp-plumber'),
      pixrem = require('gulp-pixrem'),
      uglify = require('gulp-uglify'),
      spawn = require('child_process').spawn,
      runSequence = require('run-sequence'),
      browserSync = require('browser-sync').create(),
      reload = browserSync.reload;


// Relative paths function
var pathsConfig = function () {
  this.app = './_assets';
  var vendorsRoot = 'node_modules/';

  return {
    app: this.app,
    scss: this.app + '/scss/**/*.scss',
    scripts: this.app + '/scripts/**/*.js',
    templates: ['./*.html', './_config.yml', './_layouts/**/*.html', './_includes/**/*.html'],
    dist: './assets'
  }
};

var paths = pathsConfig();

////////////////////////////////
		//Tasks//
////////////////////////////////

// Styles autoprefixing and minification
gulp.task('styles', function() {
  return gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(plumber()) // Checks for errors
    .pipe(autoprefixer({browsers: ['last 2 versions']})) // Adds vendor prefixes
    .pipe(pixrem())  // add fallbacks for rem units
    .pipe(cssnano()) // Minifies the result
    .pipe(gulp.dest(paths.dist + '/css'));
});

// Javascript minification
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(plumber()) // Checks for errors
    .pipe(uglify()) // Minifies the scripts
    .pipe(gulp.dest(paths.dist + '/scripts'));
});

// Jekyll build
gulp.task('jekyll-build', function(done) {
  var cmd = spawn('bundle', ['exec', 'jekyll', 'build', '--incremental'], {stdio: 'inherit'});
  cmd.on('close', function(code) {
    done(code);
  });
});

// Jekyll rebuild & page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function() {
  reload();
});

// Serve
gulp.task('serve', ['jekyll-build'], function() {
  browserSync.init({
    server: {
      baseDir: '_site'
    }
  });
});

// Watch
gulp.task('watch', function() {
  gulp.watch(paths.scss, ['styles', 'jekyll-rebuild']);
  gulp.watch(paths.scripts, ['scripts', 'jekyll-rebuild']);
  gulp.watch(paths.templates, ['jekyll-rebuild']);
});

// Default task
gulp.task('default', function() {
    runSequence('styles', ['scripts'], ['serve'], ['watch']);
});
