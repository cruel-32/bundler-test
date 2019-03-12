const { src, dest, series, parallel, watch, lastRun } = require('gulp');
const gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    newer = require('gulp-newer'),
    fileinclude = require('gulp-file-include'),
    htmlhint = require("gulp-htmlhint"),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csscomb = require('gulp-csscomb'),
    cssmin = require('gulp-cssmin'),
    gcmq = require('gulp-group-css-media-queries'),
    jshint = require('gulp-jshint'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    spritesmith = require('gulp.spritesmith-multi'),
    merge = require('merge-stream'),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    inlineCss = require('gulp-inline-css'),
    data = require('gulp-data'),
    template = require('gulp-template'),
    sitemap = require('gulp-sitemap-generator'),
    browsersync = require("browser-sync").create(),
    del = require('del'),
    fs = require('fs'),
    path = require('path'),
    zip = require('gulp-zip')
    ftp = require( 'vinyl-ftp' ),
    origin = "source",
    project = "build";

const clean = async (done) => {
    await del([`${project}`]);
    done();
}

const html = ()=> src([`${origin}/**/*.html`, `!${origin}/include/*.html`, `!${origin}/map.html`], {since: lastRun(html)})
    .pipe(newer(`${project}`))
    .pipe(fileinclude({
        prefix: '@@',
        basepath: `${origin}/include`,
        context: {
            name: 'example'
        }
    }))
    .pipe(htmlhint('hint/.htmlhintrc'))
    .pipe(data((file)=>{
        return JSON.parse(fs.readFileSync(`${origin}/json/default.json`))
    }))
    .pipe(data((file)=>{
        try {
            const ext = path.extname(file.path);
            const jsonFile = file.path.split(`${origin}\\html\\`)[1].split(ext)[0];
            //html과 같은 경로와 같은 파일명으로 json파일을 넣으면 json데이터가 자동삽입됨
            return JSON.parse(fs.readFileSync(`${origin}/json/${jsonFile}.json`));
        } catch(err){
            return {}
        }
    }))
    .pipe(template())
    .pipe(sitemap({
        'name':`map.html`,
        'noDir': '상위',
        'dest': ``,
        'app':`${origin}`,
        'untitle':'-',
        'unknown':'cruel32',
        'noDescription':'설명이 없어요',
        'division':'html'
    }))
    .pipe(dest(`${project}`))
    .pipe(browsersync.stream());

const scripts = ()=> src(`${origin}/js/**/*.js`, {since: lastRun(scripts)})
    .pipe(newer(`${project}/js/**/*.js`))
    .pipe(plumber({errorHandler : gutil.log}))
    .pipe(jshint())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(dest(`${project}/js`))
    .pipe(browsersync.stream());


const css = () => src([`${origin}/css/**/*.{scss,sass}`,`!${origin}/css/import/**/*.{scss,sass}`], {since: lastRun(css)})
    .pipe(newer(`${project}/css/**/*.{scss,sass}`))
    .pipe(sass.sync().on('error', sass.logError))
    // .pipe(sass().on('error', sass.logError))
    .pipe(src([`${origin}/css/**/*.css`,`!${origin}/css/_icons.css`]), {passthrough: true})
    .pipe(autoprefixer())
    .pipe(gcmq())
    .pipe(csscomb({
        configPath: 'hint/.csscomb.json'
    }))
    .pipe(cssmin())
    .pipe(dest(`${project}/css`))
    .pipe(browsersync.stream());;


const images = () =>  src([
        `${origin}/images/**/*.{gif,jpeg,jpg,png,svg}`,
        `!${origin}/images/sprite/**/*.png`,
        `!${origin}/images/svg/**/*.svg`
    ], {since: lastRun(images)})
    .pipe(newer(`${project}/images/**/*.{gif,jpeg,jpg,png,svg}`))
    .pipe(dest(`${project}/images`))

const imagesOptimization = () =>  src([
        `${origin}/images/**/*.{gif,jpeg,jpg,png,svg}`,
        `!${origin}/images/sprite/**/*.png`,
        `!${origin}/images/svg/**/*.svg`
    ], {since: lastRun(imagesOptimization)})
    .pipe(newer(`${project}/images/**/*.{gif,jpeg,jpg,png,svg}`))
    .pipe(imagemin())
    .pipe(dest(`${project}/images`))

const sprite = () => {
    let opts = {
        spritesmith(options, sprite, icons) {
            options.imgPath = `/images/sprite/${options.imgName}`;
            options.cssName = `${sprite}.css`;
            options.cssSpritesheetName = sprite;
            options.padding = 10;
            options.cssVarMap = (spr) => {
                spr.name = `${spr.name}`;
            };
            return options;
        }
    };
    let spriteData = src(`${origin}/images/sprite/**/*.png`).pipe(spritesmith(opts)).on('error', (err) => {
        console.log(err)
    });
    let imgStream = spriteData.img.pipe(dest(`${project}/images/sprite`));
    let cssStream = spriteData.css
        .pipe(csscomb({
            configPath: 'hint/.csscomb.json'
        }))
        // .pipe(cssmin())
        .pipe(dest(`${project}/css`));
    return merge(imgStream, cssStream);
};


const fontawesome = ()=> src([`${origin}/images/svg/**/*.svg`])
    .pipe(iconfontCss({
        fontName: `awesome`,
        path: `${origin}/css/_icons.css`, //css rules를 생성해줄 css 파일
        targetPath: `../css/_icons.css`, //css가 생성되는 경로. 근데 왜 경로가 dest 기준이냐
        fontPath: `/fonts/` //css내에서 font의 경로를 잡아준다
    }))
    .pipe(iconfont({
        fontName: `awesome`,
        fontHeight: '1000',
        normalize: true
    }))
    .pipe(dest(`${project}/fonts`));

//inline 폴더안에 html에 포함된 모든 style들을 tag의 inline style로 변경해준다. 이메일을 보낼때 작업
const inlineCssInit = () => src([`${origin}/inline/**/*.html`], {since: lastRun(inlineCssInit)})
    .pipe(newer(`${project}/inline/**/*.html`))
    .pipe(inlineCss({
        applyStyleTags: true,
        applyLinkTags: true,
        removeStyleTags: true,
        removeLinkTags: true
    }))
    .pipe(dest(`${project}`))


const browserSyncInit = (done)=>{
    browsersync.init({
        index:'map.html',
        server: {
            baseDir: `${project}/`,
        },
        port: 5000
    },(err,bs)=>{
        // console.log('err : ', err);
        // console.log('server : ', bs.options.get('server'));
        // console.log('urls : ', bs.options.get('urls'));
    });
    done();
}

const packing = () => 
    src(`${project}/**/*`)
    .pipe(zip(`${project}.zip`))
    .pipe(dest(`./`))

const deployFtp = () => {
    const conn = ftp.create( {
        host:     'cruel32.maru.net',
        user:     'cruel32',
        password : '4120202qq',
        parallel : 1,
        log:      gutil.log
    } );
    const files = `${project}/**/*`;

    return src(files, {since: lastRun(deployFtp), buffer: true})
        .pipe(conn.newer(`${project}/**/*`)) // only upload newer files
        .pipe(conn.dest('/public_html/test_folder/'));
}

const watcher = () => {
    watch([`${origin}/html/**/*.html`, `${origin}/json/**/*.json`], html).on('change', browsersync.reload);
    watch([`${origin}/css/**/*.{scss,sass.css}`], css).on('change', browsersync.reload);
    watch([`${origin}/js/**/*.js`], scripts).on('change', browsersync.reload);
    watch([`${origin}/images/**/*.{gif,jpeg,jpg,png,svg}`], images).on('change', browsersync.reload);
    watch([`${origin}/images/sprite/**/*.png`], sprite).on('change', browsersync.reload);
    watch([`${origin}/images/svg/**/*.svg`], fontawesome).on('change', browsersync.reload);
}

exports.clean = clean;
exports.imagesOpt = imagesOptimization;
exports.pack = series(clean, sprite, fontawesome, parallel(html, css, scripts, images), packing);

exports.default = series(clean, sprite, fontawesome, parallel(html, css, scripts, images), imagesOptimization);
exports.serve = series(clean, sprite, fontawesome, parallel(html, css, scripts, images), parallel(browserSyncInit, watcher) );

//매일 보낼일이 없어 아직까지 실용성을 못찾겠음... 그럴일이 생긴다면 수정해서 메일 보낼때나 쓰자...
exports.inlineCssInit = series(sprite, fontawesome, parallel(html, css, scripts, images), inlineCssInit);
exports.deployFtp = series(clean, sprite, fontawesome, parallel(html, css, scripts, images), deployFtp);

//3.9버전 셋팅
// gulp.task('clean', () => {
//     return gulp.src(`${project}`, {
//             read: false
//         })
//         .pipe(clean());
// });

// gulp.task('js', () => {
//     return gulp.src(`./${origin}/js/**/*.js`)
//         .pipe(newer(`${origin}/js/*.js`))
//         .pipe(plumber({errorHandler : gutil.log}))
//         .pipe(jshint())
//         .pipe(babel({
//             presets: ['es2015']
//         }))
//         // .pipe(minify({
//         //     ext: {
//         //         src:'-debug.js',
//         //         min: '.js'
//         //     },
//         //     // exclude: ['tasks'],
//         //     ignoreFiles: ['-min.js']
//         // }))
//         .pipe(gulp.dest(`${project}/js`))
//         .pipe(connect.reload())
// });

// gulp.task('images', () => {
//     return gulp.src([
//             `${origin}/images/**/*.{gif,jpeg,jpg,png,svg}`,
//             `!${origin}/images/sprite/**/*.png`,
//             `!${origin}/images/svg/**/*.svg`
//         ])
//         .pipe(newer(`${project}/images/**/*.{gif,jpeg,jpg,png,svg}`))
//         .pipe(gulp.dest(`${project}/images`))
//         .pipe(connect.reload());
// });

// gulp.task('sprite', () => {
//     let opts = {
//         spritesmith(options, sprite, icons) {
//             options.imgPath = `/images/sprite/${options.imgName}`;
//             options.cssName = `${sprite}.css`;
//             options.cssSpritesheetName = sprite;
//             options.padding = 10;
//             options.cssVarMap = (spr) => {
//                 spr.name = `${spr.name}`;
//             };
//             return options;
//         }
//     };
//     let spriteData = gulp.src(`${origin}/images/sprite/**/*.png`).pipe(spritesmith(opts)).on('error', (err) => {
//         console.log(err)
//     });
//     let imgStream = spriteData.img.pipe(gulp.dest(`${project}/images/sprite`));
//     let cssStream = spriteData.css
//         .pipe(csscomb({
//             configPath: 'hint/.csscomb.json'
//         }))
//         // .pipe(cssmin())
//         .pipe(gulp.dest(`${project}/css`));
//     return merge(imgStream, cssStream);
// });

// gulp.task('iconfont', function() {
//     return gulp.src([`${origin}/images/svg/**/*.svg`])
//         .pipe(iconfontCss({
//             fontName: `awesome`,
//             path: `${origin}/css/_icons.css`, //css rules를 생성해줄 css 파일
//             targetPath: `../css/_icons.css`, //css가 생성되는 경로. 근데 왜 경로가 dest 기준이냐
//             fontPath: `/fonts/` //css내에서 font의 경로를 잡아준다
//         }))
//         .pipe(iconfont({
//             fontName: `awesome`,
//             fontHeight: '1000',
//             normalize: true
//         }))
//         .pipe(gulp.dest(`${project}/fonts`));
// });

// gulp.task('html', () => {
//     return gulp.src([`${origin}/**/*.html`, `!${origin}/include/*.html`,`!${origin}/map.html`])
//         .pipe(newer(`${origin}/**/*.html`))
//         .pipe(fileinclude({
//             prefix: '@@',
//             basepath: `${origin}/include`,
//             context: {
//                 name: 'example'
//             }
//         }))
//         .pipe(htmlhint('hint/.htmlhintrc'))
//         .pipe(data((file)=>{
//             return JSON.parse(fs.readFileSync(`${origin}/json/default.json`))
//         }))
//         .pipe(data((file)=>{
//             try {
//                 const ext = path.extname(file.path);
//                 const jsonFile = file.path.split(`${origin}\\html\\`)[1].split(ext)[0];
//                 //html과 같은 경로와 같은 파일명으로 json파일을 넣으면 json데이터가 자동삽입됨
//                 return JSON.parse(fs.readFileSync(`${origin}/json/${jsonFile}.json`));
//             } catch(err){
//                 return {}
//             }
//         }))
//         .pipe(template())
//         .pipe(sitemap({
//             'name':`map.html`,
//             'noDir': '상위',
//             'dest':``,
//             'app':`${origin}`,
//             'untitle':'-',
//             'unknown':'cruel32',
//             'noDescription':'설명이 없어요',
//             'division':'html'
//         }))
//         .pipe(gulp.dest(`${project}`))
//         .pipe(connect.reload());
// });

// gulp.task('css', () => {
//     return gulp.src([`${origin}/css/**/*.{scss,sass,css}`,`!${origin}/css/mixin/*.{scss,sass}`])
//         .pipe(newer(`${origin}/css/**/*.{scss,sass,css}`))
//         .pipe(sourcemaps.init())
//         .pipe(sass().on('error', sass.logError))
//         .pipe(autoprefixer())
//         .pipe(gcmq())
//         .pipe(csscomb({
//             configPath: 'hint/.csscomb.json'
//         }))
//         /*
//             *** csscomb 커스터마이징 ***
//             node_modules/csscomb/lib/options/strip-spaces.js 파일에서 9 lines 수정

//             수정전:
//             return string.replace(/[ \t]+\n/g, '\n');
            
//             수정후:
//             return string.replace(/[ \t]+\n/g, '\n').replace(/\n\n/g, '\n');
//         */
//         .pipe(sourcemaps.write())
//         // .pipe(cssmin())
//         .pipe(gulp.dest(`${project}/css`))
//         .pipe(connect.reload());
// });

// gulp.task('inlineCss',function(){
//     return gulp.src([`${origin}/inline/**/*.html`])
//         .pipe(newer(`${origin}/inline/**/*.html`))
//         .pipe(inlineCss({
//             applyStyleTags: true,
//             applyLinkTags: true,
//             removeStyleTags: true,
//             removeLinkTags: true
//         }))
//         .pipe(gulp.dest(`${project}`))
//         .pipe(connect.reload());
// })

// gulp.task('connect', function() {
//     connect.server({
//         root: `${project}`,
//         port: 5000,
//         livereload: true
//     });
// });

// gulp.task('watch', () => {
//     gulp.watch(`${origin}/images/**/*.{gif,jpeg,jpg,png,svg}`, ['images'])
//     gulp.watch(`${origin}/images/sprite/**/*.png`, ['sprite'])
//     gulp.watch(`${origin}/images/svg/**/*.svg`, ['iconfont'])
//     gulp.watch(`${origin}/js/**/*.js`, ['js']);
//     gulp.watch(`${origin}/html/**/*.html`, ['html'])
//     gulp.watch(`${origin}/css/**/*.{scss,sass.css}`, ['css']);
//     gulp.watch(`${origin}/json/**/*.json`, ['html']);
// });

// gulp.task('default', ['html', 'css', 'js', 'images', 'sprite', 'iconfont']);
// gulp.task('serve', ['connect', 'watch']);