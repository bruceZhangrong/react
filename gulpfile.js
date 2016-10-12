var gulp = require('gulp')
// 获取 gulp-less 模块
var less = require('gulp-less')
// 压缩CSS
var clean = require('gulp-clean-css')
// 获取 uglify 模块（用于压缩 JS）
var uglify = require('gulp-uglify')
// 混淆js
var obfuscate = require('gulp-obfuscate');
// 小图片base64
var base64 = require('gulp-base64');
var sourcemaps = require('gulp-sourcemaps');
var config = {
    jssrc : 'src/js/**/*.js',
    jsdest : 'assets/js',
    csssrc : 'src/css/**/*.css',
    cssdest : 'assets/css/',
    base64 : {
        src: 'src/css/**/*.css',
        dest: 'assets/css/',
        options: {
            extensions: ['png'],
            maxImageSize: 20 * 1024, // bytes
            debug: false
        }
    },
}
// 编译less
// 在命令行输入 gulp less 启动此任务
gulp.task('less', function () {
    // 1. 找到 less 文件
    gulp.src('src/less/**/*.less')
        // 2. 编译为css
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(less())
        // 压缩文件
        .pipe(clean())
        .pipe(base64(config.base64.options))
        .pipe(sourcemaps.write("maps"))
        // 3. 另存文件
        .pipe(gulp.dest('assets/css/'))
});

// 压缩css
// 在命令行输入 gulp css 启动此任务
gulp.task('css', function () {
    // 1. 找到 less 文件
    gulp.src(config.csssrc)
        //小图片base64
        .pipe(base64(config.base64.options))
        // 压缩文件
        .pipe(clean())
        // 3. 另存文件
        .pipe(gulp.dest(config.cssdest))
});

// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
gulp.task('script', function() {
    // 1. 找到文件
    gulp.src(config.jssrc)
        // 2. 压缩文件
        .pipe(uglify())
        // 混淆
        // .pipe(obfuscate())
        // 3. 另存压缩后的文件
        .pipe(gulp.dest(config.jsdest))
    // gulp.src('src/js/main.js')
    //     .pipe(uglify())
    //     .pipe(gulp.dest('assets/js/'))
});

// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 less 任务
    gulp.watch(['src/js/**/*.js','src/css/**/*.css'], ['script','css'])
    //gulp.watch('mobile/src/js/**/*.js',['script'])
})
gulp.task('autoless', function () {
    // 监听文件修改，当文件被修改则执行 less 任务
    gulp.watch(['src/less/**/*.less'], ['less'])
    //gulp.watch('mobile/src/js/**/*.js',['script'])
})
// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 less 任务和 auto 任务
gulp.task('default', ['autoless'])
