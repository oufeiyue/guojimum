var gulp = require("gulp");
// (2) 引入gulp-sass,返回值为方法
var sass = require("gulp-sass");
// 2.书写gulp任务 task(任务名,函数)
gulp.task("compileSass",function(){
    //(1) 通过路径，拿到文件流 src(路径)
    gulp.src(["./src/sass/**/*.scss"])
    //（2）运输文件流 pipe()
    // (3) 运输过程中，对scss文件编译成css文件 sass()
    //      * 报错不断开 on('error', sass.logError)
    // (4) 将css文件运输出去  dest(文件夹路径)
    .pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))

    .pipe(gulp.dest("./src/css"));
})

// (二)第二个任务
// 监听方法 watch("路径",[任务名])

gulp.task("jt",function(){
    gulp.watch("./src/sass/**/*.scss",["compileSass"]);
})
// 静态服务器:
var browserSync = require("browser-sync");
gulp.task('server',()=>{
    browserSync({
        // 服务器路径
        server:'./src/',
        // 端口
        port:666,
        // 监听文件修改，自动刷新页面
        files:['./src/**/*.html','./src/css/*.css','./src/api/*.php']
    });
    gulp.watch("./src/sass/**/*.scss",["compileSass"]);

})