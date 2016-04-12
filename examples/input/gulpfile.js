var gulp = require('gulp'),
    webpack = require('webpack-stream');

gulp.task('default', function() {
    return gulp.src('lib/main.js')
        .pipe(webpack({
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        exclude: /(node_modules|bower_components)/,
                        loader: 'babel'
                    }
                ]
            },
            output: {
                filename: 'bundle.js'
            }
        }))
        .pipe(gulp.dest('build/'));
})
