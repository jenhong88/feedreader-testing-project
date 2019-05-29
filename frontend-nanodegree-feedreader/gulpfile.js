const gulp = require("gulp");
const jasmineBrowser = require("gulp-jasmine-browser");
const watch = require('gulp-watch')

gulp.task('jasmine', function() {
  const filesForTest = ['src/**/*.js', 'spec/**/*_spec.js', 'src/**/*.css'];
  return gulp.src(filesForTest)
    .pipe(watch(filesForTest))
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({port: 8888}));
    .pipe(jasmineBrowser.specRunner({ console: true }))
    .pipe(jasmineBrowser.headless({ driver: 'chrome' }));
});

gulp.task('stream', function () {
	// Endless stream mode
    return watch('css/**/*.css', { ignoreInitial: false })
        .pipe(gulp.dest('build'));
});

gulp.task('callback', function () {
	// Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch('css/**/*.css', function () {
        gulp.src('css/**/*.css')
            .pipe(gulp.dest('build'));
    });
});
    // .pipe(jasmineBrowser.specRunner({ console: true }))
    // .pipe(jasmineBrowser.headless({ driver: 'chrome' }));
