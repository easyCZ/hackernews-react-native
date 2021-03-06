var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("default", function () {
  return gulp.src("app/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"))
    .on('error', function (e) {
      console.log(e);
    });
});

gulp.task('watch', ['default'], function () {
  return gulp.watch('app/**/*.js', ['default']);
});
