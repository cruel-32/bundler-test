const { src, dest, series, parallel, watch, lastRun } = require('gulp');
const gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    newer = require('gulp-newer'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    browsersync = require("browser-sync").create(),
    del = require('del');

const origin = "source",
    build = "source/build";

const clean = async (done) => {
    await del([`${build}`]);
    done();
}

const scripts = ()=> src(`${origin}/js/**/*.js`, {since: lastRun(scripts)})
    .pipe(newer(`${origin}/js/**/*.js`))
    .pipe(plumber({errorHandler : gutil.log}))
    .pipe(babel({
        presets: [
            '@babel/preset-env'
        ],
        plugins : [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-proposal-optional-chaining",
            "@babel/plugin-proposal-nullish-coalescing-operator",
            "@babel/plugin-proposal-object-rest-spread",
            "@babel/plugin-transform-runtime",
        ]
    }))
    .pipe(uglify())
    .pipe(dest(`${build}`))
    .pipe(browsersync.stream());

const browserSyncInit = (done)=>{
    browsersync.init({
        index:'/html/index.html',
        server: {
            baseDir: `${origin}/`,
        },
        port: 3000
    },(err,bs)=>{
        // console.log('err : ', err);
        // console.log('server : ', bs.options.get('server'));
        // console.log('urls : ', bs.options.get('urls'));
    });
    done();
}

const watcher = () => {
    watch([`${origin}/html/**/*.html`], scripts).on('change', browsersync.reload);
    watch([`${origin}/js/**/*.js`], scripts).on('change', browsersync.reload);
}

exports.default = series(clean, scripts, parallel(browserSyncInit, watcher) );
exports.clean = clean;
