const { src, dest, series, parallel, watch, lastRun } = require('gulp');
const webpackStream = require('webpack-stream'),
    webpackConfig = require ("./webpack.config.js"),
    namedWithPath = require('vinyl-named-with-path'),
    browsersync = require("browser-sync").create(),
    del = require('del');

const origin = "source",
    build = "source/build";

const clean = async (done) => {
    await del([`${build}`]);
    done();
}

const bundling = () =>
    src(`${origin}/js/**/*.js`)
    .pipe(namedWithPath())
    .pipe(webpackStream(webpackConfig))
    .pipe(dest(`${build}`));

const browserSyncInit = (done)=>{
    browsersync.init({
        index:'/html/index.html',
        server: {
            baseDir: `${origin}/`,
        },
        port: 5000
    },(err, bs)=>{
        console.log('err : ', err);
        // console.log('server : ', bs.options.get('server'));
        // console.log('urls : ', bs.options.get('urls'));
    });
    done();
}

const watcher = () => {
    watch([`${origin}/js/**/*.js`], bundling).on('change', browsersync.reload);
}

exports.default = series(clean, bundling, parallel(browserSyncInit, watcher));
exports.clean = clean;
exports.build = series(clean, bundling);
