const del    = require('del')
const gulp   = require('gulp')
const babel  = require('gulp-babel')
const eslint = require('gulp-eslint')

const config = {
    isDev: process.env.NODE_ENV === 'development',
    paths: {
        destDir: 'dist',
        src: `src/**/*.js`,
        test: `test/*.js`,
    }
}

// compile the plugin and save it to the target directory
gulp.task('build', () => {
    return gulp.src(config.paths.src)
        .pipe(babel())
        .pipe(gulp.dest(config.paths.destDir))
})

// delete the target directory
gulp.task('clean', () => {
    return del(config.paths.destDir)
})

// check for violations of style and usage rules
gulp.task('lint', () => {
    return gulp.src([__filename, config.paths.src, config.paths.test])
        .pipe(eslint())
        .pipe(eslint.format()) // dump invalid code
        .pipe(eslint.failAfterError()) // exit with an error code on lint errors
})

gulp.task('default', gulp.series('clean', 'lint', 'build'))
