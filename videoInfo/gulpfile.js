const gulp = require("gulp");
const del = require("del");
const gutil = require("gulp-util");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const fs = require("fs");
const path = require("path");
const shell = require("gulp-shell");
const watch = require("gulp-watch");

gulp.task("default", ["modifyPublic", "typescriptBuild"]);

const pipelog = notify.withReporter(() => {
    // console.log("Title:", options.title);
    // console.log("Message:", options.message);
    // callback();
});

// pipelog.logLevel(2);

const cleanFolder = (folderPath) => {
    try {
        var stats = fs.statSync(folderPath);
        del.sync(folderPath);
        gutil.log(gutil.colors.italic.red(`clean ${path.basename(folderPath)} `));
    } catch (err) {
        gutil.log(gutil.colors.italic.red(`${path.basename(folderPath)} not exists yet, no need to clean`));
    };
}

gulp.task("buildAllTypeScript", () => {
    cleanFolder("./build/js/")
    gulp.src("./ts/**/*.ts")
        .pipe(plumber())
        .pipe(pipelog("compile ts file: <%= file.relative %>"))
        .pipe(shell([
            "tsc --rootDir ts"
        ]))
        .pipe(pipelog({
            message: "all ts files compile finish",
            onLast: true
        }));
})

gulp.task("typescriptBuild", ["buildAllTypeScript"], () => {

    watch("./ts/**/*.ts", (file) => {
        if (file.event === "unlink") {
            cleanFolder(`./build/js/${path.dirname(file.relative)}/${path.basename(file.relative, "ts")}js`);
        } else {
            gulp.src(file.path)
                .pipe(plumber())
                .pipe(pipelog("compile ts file: <%= file.relative %>"))
                .pipe(shell([
                    `tsc ts/${path.dirname(file.relative)}/${path.basename(file.relative)} --outdir ./build/js/${path.dirname(file.relative)} --experimentalDecorators --lib es6,dom --target es5`
                ]))
                .pipe(pipelog({
                    message: "ts file compile finish: <%= file.relative %>",
                    onLast: true
                }));
        }
    })
})

gulp.task("copyAllPublic", () => {
    cleanFolder("./build/public");
    gulp.src(["./public/**"])
        .pipe(plumber())
        .pipe(pipelog("copy public static file: <%= file.relative %>"))
        .pipe(gulp.dest(`./build/public`))
        .pipe(pipelog({
            message: "all public static files compile finish",
            onLast: true
        }))
})

gulp.task("modifyPublic", ["copyAllPublic"], () => {

    watch(["./public/**"], [], (file) => {
        if (file.event === "unlink") {
            cleanFolder(`./build/public/${path.dirname(file.relative)}/${path.basename(file.relative)}`);
        } else {
            gulp.src(file.path)
                .pipe(plumber())
                .pipe(pipelog("modify public static file: <%= file.relative %>"))
                .pipe(gulp.dest(`./build/public/${path.dirname(file.relative)}`))
                .pipe(pipelog({
                    message: "public static file modify finish: <%= file.relative %>",
                    onLast: true
                }));
        }
    })
})