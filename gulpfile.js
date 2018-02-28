const del    = require('del')
const gulp   = require('gulp')
const babel  = require('gulp-babel')
const since  = require('gulp-changed')
const eslint = require('gulp-eslint')
const merge  = require('lodash/merge')

const CONFIG = {
    paths: {
        src: 'src/**/*.js',
        test: 'test/*.js',
        destDir: 'dist',
    }
}

const pkg = require('./package.json')
const config = merge({}, CONFIG, pkg.config)
const paths = config.paths

// compile the source and save the results to the target directory
gulp.task('build', () => {
    return gulp.src(paths.src)
        .pipe(babel())
        .pipe(since(paths.destDir))
        .pipe(gulp.dest(paths.destDir))
})

// delete the target directory
gulp.task('clean', () => {
    return del(paths.destDir)
})

// dump the project's build configuration (for debugging/diagnostics)
gulp.task('dump:config', done => {
    console.info(JSON.stringify(config, null, 4))
    done()
})

// check for violations of style and usage rules
gulp.task('lint', () => {
    return gulp.src([__filename, paths.src, paths.test])
        .pipe(eslint())
        .pipe(eslint.format()) // dump invalid code
        .pipe(eslint.failAfterError()) // exit with an error code on lint errors
})

gulp.task('default', gulp.task('build'))
