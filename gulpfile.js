const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const uglify = require('gulp-uglify')
const obfuscate = require('gulp-obfuscate')
const imagemin = require('gulp-imagemin')
const sourcemaps = require('gulp-sourcemaps')

function compilaSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'))
}

function comprimeImagem() {
    gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'))
}

function comprimeJs() {
    gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'))
}

exports.default = () => {
    gulp.watch('./source/styles/main.scss', { ignoreInitial: false }, gulp.series(compilaSass))
    gulp.watch('./source/scripts/*.js', { ignoreInitial: false }, gulp.series(comprimeJs))
    gulp.watch('./source/images/*', { ignoreInitial: false }, gulp.series(comprimeImagem))
}