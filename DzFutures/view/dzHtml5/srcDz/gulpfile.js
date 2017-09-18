/**
 * Created by xiajing on 2016/9/30.
 */
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin'); //html压缩
var uglify = require('gulp-uglify');//js压缩
var notify = require('gulp-notify');//提示信息
var minifycss = require('gulp-minify-css');//压缩css
var imagemin = require('gulp-imagemin');//图片压缩
var pngcrush = require('imagemin-pngcrush');

//压缩html
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
//user文件下的
gulp.task('userHtml',function(){
    return gulp.src('user/openAccount.html')
        // return gulp.src('index.html')
        .pipe(htmlmin({collapseWhitespace: true,removeComments: true,
            minifyJS: true,  //压缩页面JS
            minifyCSS: true  //压缩页面CSS
        }))
        .pipe(gulp.dest('../dist/user'))
        .pipe(notify({ message: 'html task ok' }));
})
//info文件夹下的
gulp.task('infoHtml',function(){
    return gulp.src(['info/news-detail.html','info/newsNotice-list.html','info/reportInfo-list.html'])
        // return gulp.src('index.html')
        .pipe(htmlmin({collapseWhitespace: true,removeComments: true,
            minifyJS: true,  //压缩页面JS
            minifyCSS: true  //压缩页面CSS
        }))
        .pipe(gulp.dest('../dist/info'))
        .pipe(notify({ message: 'html task ok' }));
})
////压缩js文件
gulp.task('js', function() {
    return gulp.src(['build/dzNewsList.js','build/index-new.js','build/reportNewsList.js'])
        .pipe(gulp.dest('../dist/build'))
        .pipe(uglify().on('error', function(e){
            console.log(e);
        }))
        .pipe(gulp.dest('../dist/build'))
        .pipe(notify({ message: 'js task ok' }));
});
//压缩
gulp.task('css', function() {
    return gulp.src(['css/dzCss.css','css/base.css'])
        //.pipe(concat('main.css'))
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
        .pipe(gulp.dest('./dist/images/'))
        .pipe(notify({ message: 'img task ok' }));
});
//执行任务
gulp.task('build', function(){
    gulp.run('js', 'indexHtml','userHtml','infoHtml','css','img');
 /*   // 监听html文件变化
    gulp.watch('index.html', function(){
        gulp.run('indexHtml');
    });
    gulp.watch('user/openAccount.html', function(){
        gulp.run('userHtml');
    });
    gulp.watch(['info/news-detail.html','info/newsNotice-list.html','info/reportInfo-list.html'], function(){
        gulp.run('infoHtml');
    });
    gulp.watch(['build/dzNewsList.js','build/index-new.js','build/reportNewsList.js'], ['js']);
    gulp.watch(['css/dzCss.css','css/base.css'], ['css']);
    gulp.watch('images/!*', ['img']);*/
});