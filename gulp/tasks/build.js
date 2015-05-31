var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function(done) {
  runSequence(
    'clean',
    ['webpack:build', 'copy'],
    done);
});

gulp.task('copy', function() {
  // Copy the remaining files to dist
  return gulp.src([
      'src/index.html',
    ], { base: './src' })
    .pipe(gulp.dest('dist'));
});
