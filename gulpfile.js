const { src, dest, watch, series } = require('gulp');

// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
const plumber = require('gulp-plumber');

// Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

// JS
const terser = require('gulp-terser')

function js( done ) {
    src('src/js/app.js')         // Ubica el archivo JavaScript de origen
        .pipe(terser())
        .pipe( dest('build/js') ) // Copia el archivo al destino

    done() // Finaliza la tarea
}


function css( done ) {
    src('src/scss/app.scss')
    .pipe(plumber({
        errorHandler: function (err) {
            console.error('Error en CSS:', err.message);
            this.emit('end'); // Finaliza el flujo sin detener Gulp
        }
    }))
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe( sourcemaps.write('.'))
        .pipe( dest('build/css') )

    done();
}

function imagenes() {
    return src('src/img/**/*')
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest('build/img') )
}

function versionWebp() {
    const opciones = {
        quality: 70
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe( webp( opciones ) )
        .pipe( dest('build/img') )
}

function dev() {
    watch( 'src/scss/**/*.scss', css );
    watch('src/js/**/*.js',js);
    watch( 'src/img/**/*', imagenes );
}


exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.default = series( imagenes, versionWebp, css, js, dev  );