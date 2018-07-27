// Load Gulp, its plugins and other NodeJS utilities

var gulp = require('gulp');

var cssnano = require('gulp-cssnano');
var plumber = require( 'gulp-plumber' );
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var stylelint = require('gulp-stylelint');
var imagemin = require('gulp-imagemin');
var sourcemaps = require( 'gulp-sourcemaps' );
var uglify = require('gulp-uglify');
var autoprefixer = require('autoprefixer');
var babelify = require( 'babelify' );
var browserify = require( 'browserify' );
var source = require( 'vinyl-source-stream' );
var buffer = require( 'vinyl-buffer' );
var browserSync = require( 'browser-sync' ).create();
var del = require('del');
var spawn = require('child_process').spawn;
var runSequence = require('run-sequence');

var getPathsConfig = function getPathsConfig() {
  this.app = './_assets';

  return {
    app: this.app,
    scss: `${this.app}/scss`,
    scripts: `${this.app}/scripts`,
    images: `${this.app}/images`,
    misc: [
      './*.html',
      './_config.yml',
      './_layouts/**/*.html',
      './_includes/**/*.html'
    ],
    dist: './assets',
    dest: './_site'
  }
};

var paths = getPathsConfig();

// Compiles SCSS to CSS
gulp.task('scss', ['scss-lint'], function() {
  return gulp.src(`${paths.scss}/**/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
      .pipe(plumber())  // Check for errors
      .pipe(postcss([
          autoprefixer,
      ]))
      .pipe(cssnano())  // Minify the result
      .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${paths.dist}/css`));
});

// Lint SCSS
gulp.task('scss-lint', function() {
  return gulp.src([`${paths.scss}/**/*.scss`, `!${paths.scss}/_reboot.scss`])
    .pipe(stylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

// JavaScript
gulp.task('scripts', function() {
  var bundler = browserify(`${paths.scripts}/base.js`, {
    debug: true,
  }).transform(babelify, {presets: ["@babel/preset-env"]})

  return bundler.bundle()
    .on('error', function(error) {
      console.log(error.message);
      this.emit('end');
    })
    .pipe(source('base.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${paths.dist}/scripts`));
});

gulp.task('images', function() {
  return gulp.src(paths.images + '/**/*')
    .pipe(imagemin())  // Compresses PNG, JPEG, GIF and SVG images
    .pipe(gulp.dest(`${paths.dist}/images`));
});

// Clean the dist folder
gulp.task('clean', function(done) {
  del([`${paths.dist}/**/*`]).then(function() {
    done();
  });
});

// Serve files
gulp.task('serve', function() {
  browserSync.init({
    files: [
      `${paths.dest}/**/*.css`,
      `${paths.dest}/**/*.js`,
      `${paths.dest}/**/*.html`
    ],
    server: {
      baseDir: paths.dest
    }
  });
});

// Jekyll build
gulp.task('jekyll-build', function(done) {
  var cmd = spawn('bundle', ['exec', 'jekyll', 'build', '--incremental'], {stdio: 'inherit'});
  cmd.on('close', function(code) {
    done(code);
  });
});

// Watch files for changes
gulp.task('watch', function() {
  gulp.watch(`${paths.scss}/**/*.scss`, function() {
    runSequence('scss', ['jekyll-build']);
  });

  gulp.watch(`${paths.scripts}/**/*.js`, function() {
    runSequence('scripts', ['jekyll-build']);
  });

  gulp.watch(paths.misc, ['jekyll-build']);
});

// Build files
gulp.task('build', function() {
  runSequence('clean', ['scss', 'scripts', 'images'], ['jekyll-build']);
});

// Default task
gulp.task('default', function() {
  runSequence('clean', ['scss', 'scripts', 'images'], ['jekyll-build'], ['serve', 'watch']);
});
