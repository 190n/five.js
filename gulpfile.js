var gulp = require('gulp'),
    babel = require('gulp-babel')();

gulp.task('babel', function() {
    return gulp.src('lib/*.js')
        .pipe(babel)
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['babel']);
