const del    = require('del')
const gulp   = require('gulp')
const babel  = require('gulp-babel')

const config = (function () {
    const srcDir = 'src'

    return {
        isDev: process.env.NODE_ENV === 'development',
        paths: {
            srcDir,
            destDir: 'dist',
            src: {
                js: `${srcDir}/**/*.js`
            }
        }
    }
})()

// delete the target directory
gulp.task('clean', () => {
    return del(config.paths.destDir)
})

// compile the plugin and save it to the target directory
gulp.task('build', () => {
    return gulp.src(config.paths.src.js)
        .pipe(babel())
        .pipe(gulp.dest(config.paths.destDir))
})

gulp.task('default', gulp.task('build'))
