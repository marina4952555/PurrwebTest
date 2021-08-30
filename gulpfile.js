'use strict'

const gulp = require("gulp");
const babel = require('gulp-babel');
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const concat = require('gulp-concat');
const rename = require("gulp-rename");
const webp = require("gulp-webp");
const sass = require('gulp-sass')(require('sass'));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const del = require("del");
const server = require("browser-sync").create();

gulp.task("transform", function() {
  return gulp.src("source/js/*.js")
    .pipe(sourcemap.init())
    .pipe(babel({
        presets: ["@babel/env"]
    }))
    .pipe(concat("all.js"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("docs/js"))
});

gulp.task("css", function () {
  return gulp.src("source/scss/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("docs/css"))
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff2,woff}",
    "source/*.html",
    "source/img/**",
    "source/*.ico"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("docs"));
});

gulp.task("clean", function () {
  return del("docs");
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("server", function () {
  server.init({
    server: "docs/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css", "refresh"));
  gulp.watch("source/*.html", gulp.series("build", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("build", "refresh"));
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "transform",
));

gulp.task("start", gulp.series("build", "server"));