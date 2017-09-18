 /**
 * Created by xiajing on 2016/10/13.
 */
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin'); //html压缩
var uglify = require('gulp-uglify');//js压缩
var notify = require('gulp-notify');//提示信息
var minifycss = require('gulp-minify-css');//压缩css
var imagemin = require('gulp-imagemin');//图片压缩
var pngcrush = require('imagemin-pngcrush');
var concat = require('gulp-concat');//文件合并
var rename = require('gulp-rename');//文件更名
var watch = require('gulp-watch');
//var config = require('config.js').base64;

//压缩index.html
gulp.task('indexHtml',function(){
    return gulp.src('index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyJS: true,  //压缩页面JS
            minifyCSS: true  //压缩页面CSS
        }))
        .pipe(gulp.dest('../dist'))
        .pipe(notify({ message: 'html task ok' }));
})
//压缩html
gulp.task('html',function(){
     return gulp.src('html/*.html')
         .pipe(htmlmin({
             collapseWhitespace: true,
             removeComments: true,
             minifyJS: true,  //压缩页面JS
             minifyCSS: true  //压缩页面CSS
         }))
         .pipe(gulp.dest('../dist/view'))
         .pipe(notify({ message: 'html task ok' }));
})
//压缩js文件
gulp.task('js', function() {
    return gulp.src(['js/*.js'])
        // .pipe(concat('all.js'))
            .pipe(gulp.dest('../dist/js'))
            //.pipe(rename({suffix:'.min'}))//将压缩的js重命名
                .pipe(uglify().on('error', function(e){
                    console.log(e);
                }))
                .pipe(gulp.dest('../dist/js'))
                .pipe(notify({ message: 'js task ok' }));
});
//压缩
gulp.task('css', function() {
    return gulp.src(['css/*.css'])
        .pipe(concat('main.css'))
        .pipe(gulp.dest('../dist/css'))
        //.pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('../dist/css'))
        .pipe(notify({ message: 'css task ok' }));
});
// 压缩图片
gulp.task('img', function() {
    return gulp.src('images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('../dist/images'))
        .pipe(notify({ message: 'img task ok' }));
});
gulp.task('downConfig', function() {
    return gulp.src(['downConfig.js'])
        .pipe(gulp.dest('../dist'));
});

gulp.task('css2', function() {
    return gulp.src(['lib/*.css'])
        .pipe(minifycss())
        .pipe(gulp.dest('../dist/css'))
        .pipe(notify({ message: 'css2 task ok' }));
});

//gulp.task('base64', ['sass'], function() {
//    return gulp.src(config.src)
//        .pipe(base64(config.options))
//        .pipe(gulp.dest(config.dist));
//});
//执行任务
gulp.task('watch', function(){
    gulp.run('js', 'html','css','img','indexHtml','downConfig','css2');//执行
    //watch 监听变化
    gulp.watch('index.html',function(){gulp.run('indexHtml')});
    gulp.watch('html/*.html', function(){
        gulp.run('html');
    });
    gulp.watch(['js/*.js'], ['js']);
    gulp.watch(['css/*.css'], ['css']);
    gulp.watch('images/*', ['img']);
    gulp.watch('downConfig.js', ['downConfig']);
});

