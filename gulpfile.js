// =======================================================================
// Gulp Plugins
// =======================================================================
var gulp            = require('gulp'),
    gutil           = require('gulp-util'),
    jshint          = require('gulp-jshint'),
    stylish         = require('jshint-stylish'),
    concat          = require('gulp-concat'),
    rimraf          = require('gulp-rimraf'),
    streamify       = require('gulp-streamify'),
    uglify          = require('gulp-uglify'),
    sourcemaps      = require('gulp-sourcemaps'),
    less            = require('gulp-less'),
    prefix          = require('gulp-autoprefixer'),
    minifyCSS       = require('gulp-minify-css'),
    notify          = require('gulp-notify'),
    angularTplCache = require('gulp-angular-templatecache'),
    browserify      = require('browserify'),
    watchify        = require('watchify'),
    source          = require('vinyl-source-stream'),
    buffer          = require('vinyl-buffer'),
    runSequence     = require('run-sequence');


// =======================================================================
// File Paths
// =======================================================================
var filePath = {
    build: { 
        dest: './dist' 
    },
    lint: { 
        src: ['./app/*.js', './app/**/*.js'] 
    },
    browserify: { 
        src: './app/app.js',
        watch: 
        [
            '!./app/assets/libs/*.js',
            '!./app/assets/libs/**/*.js',
            './app/*.js','./app/**/*.js', 
            '/app/**/*.html'
        ] 
    },
    styles: { 
        src: './app/app.less', 
        watch: ['./app/app.less','./app/**/*.less'] 
    },
    images: { 
        src: './app/assets/images/**/*', 
        watch: ['./app/assets/images', './app/assets/images/**/*'],
        dest: './dist/images/' 
    },
    vendorJS: { 
        // These files will be bundled into a single vendor.js file that's called at the bottom of index.html
        src: 
        [
            './libs/jquery/dist/jquery.js', // v2.1.1
            './libs/bootstrap/dist/js/bootstrap.js' // v3.1.1
        ]
    },
    vendorCSS: { 
        src: 
        [
            './libs/bootstrap/dist/css/bootstrap.css', // v3.1.1
            './libs/font-awesome/css/font-awesome.css' // v4.1.0
        ]
    },
    copyIndex: { 
        src: './app/index.html', 
        watch: './app/index.html' 
    },
    copyFavicon: { 
        src: './app/favicon.png' 
    }
};


// =======================================================================
// Error Handling
// =======================================================================
function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}


// =======================================================================
// Server Settings for local development (Express Server)
// =======================================================================
var embedlr         = require('gulp-embedlr'),
    refresh         = require('gulp-livereload'),
    lrserver        = require('tiny-lr')(),
    express         = require('express'),
    livereload      = require('connect-livereload'),
    livereloadport  = 35728,
    serverportDev   = 5000,
    serverportProd  = 5050,
    server          = express();

server.use(livereload({port: livereloadport}));
// Use our 'dist' folder as rootfolder
server.use(express.static('./dist'));
// Redirects everything back to our index.html
server.all('/*', function(req, res) {
    res.sendfile('/', { root: './dist' });
});


// =======================================================================
// Dev Server Task
// =======================================================================  
gulp.task('dev', function() {
    server.listen(serverportDev);
    lrserver.listen(livereloadport);
    console.log('Server running at http://localhost:5000');
});

gulp.task('stage', function() {
    server.listen(serverportProd);
    lrserver.listen(livereloadport);
    console.log('Server running at http://localhost:5050');
});


// =======================================================================
// Clean out dist folder contents on build
// =======================================================================  
gulp.task('clean-dev', function () {
    return gulp.src(['./dist/*.js', './dist/*.css', './dist/*.html', './dist/*.png', './dist/*.ico'], {read: false})
        .pipe(rimraf());
});

gulp.task('clean-full', function () {
    return gulp.src(['./dist/*'], {read: false})
        .pipe(rimraf());
});


// =======================================================================
// JSHint
// =======================================================================
gulp.task('lint', function() {
    return gulp.src(filePath.lint.src)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});


// =======================================================================
// Browserify Bundle
// =======================================================================  
gulp.task('bundle-dev', function() {
    var bundler = watchify(filePath.browserify.src);

    bundler.on('update', rebundle)

    function rebundle () {
        return bundler.bundle({ debug: true })

            .pipe(source('bundle.js'))
            .on("error", handleError)
            .pipe(buffer())
            // Comment out the "Uglify" task if you don't want to minify your app in your dev environment. 
            // However, it can be useful to minify your app periodically to debug any problems with minification.
            // .pipe(streamify(uglify()))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(filePath.build.dest))
            .pipe(notify({ message: 'Browserify task complete' }))
            .pipe(refresh(lrserver));
    }

    return rebundle()
});

gulp.task('bundle-prod', function() {
    var bundler = watchify(filePath.browserify.src);

    bundler.on('update', rebundle)

    function rebundle () {
        return bundler.bundle({ debug: true })
            .pipe(sourcemaps.init())
            .pipe(source('bundle.js'))
            .on("error", handleError)
            .pipe(buffer())
            .pipe(streamify(uglify()))
            .pipe(gulp.dest(filePath.build.dest))
            .pipe(notify({ message: 'Browserify task complete' }))
            .pipe(refresh(lrserver));
    }

    return rebundle()
});


// =======================================================================
// Styles Task
// =======================================================================  
gulp.task('styles-dev', function () {
    return gulp.src(filePath.styles.src)
        .pipe(sourcemaps.init())
        .pipe(less())
        .on("error", handleError)
        .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"), {map: true})
    //    .pipe(minifyCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(filePath.build.dest))
        .on("error", handleError)
        .pipe(notify({ message: 'Styles task complete' }))
        .pipe(refresh(lrserver));
});

gulp.task('styles-prod', function () {
    return gulp.src(filePath.styles.src)
        .pipe(less())
        .on("error", handleError)
        .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"), {map: true})
        .pipe(minifyCSS())
        .pipe(gulp.dest(filePath.build.dest))
        .on("error", handleError)
        .pipe(notify({ message: 'Styles task complete' }))
});


// =======================================================================
// Images Task
// =======================================================================  
gulp.task('images', function() {
    return gulp.src(filePath.images.src)
        .on("error", handleError)
        .pipe(gulp.dest(filePath.images.dest))
        .pipe(notify({ message: 'Images copied' }))
        .pipe(refresh(lrserver));
});


// =======================================================================
// Vendor JS Task
// =======================================================================  
gulp.task('vendorJS', function () {
    return gulp.src(filePath.vendorJS.src)
        .pipe(concat("vendor.js"))
        .on("error", handleError)
        .pipe(uglify())
        .pipe(gulp.dest(filePath.build.dest))
        .pipe(notify({ message: 'VendorJS task complete' }))
});


// =======================================================================
// Vendor CSS Task
// =======================================================================  
gulp.task('vendorCSS', function () {
    return gulp.src(filePath.vendorCSS.src)
        .pipe(concat("vendor.css"))
        .on("error", handleError)
        .pipe(minifyCSS())
        .pipe(gulp.dest(filePath.build.dest))
        .pipe(notify({ message: 'VendorCSS task complete' }))
        .pipe(refresh(lrserver));
});


// =======================================================================
// Copy index.html
// =======================================================================  
gulp.task('copyIndex', function () {
    return gulp.src(filePath.copyIndex.src)
        .pipe(gulp.dest(filePath.build.dest))
        .pipe(notify({ message: 'index.html successfully copied' }))
        .pipe(refresh(lrserver));
});


// =======================================================================
// Copy Favicon
// =======================================================================  
gulp.task('copyFavicon', function () {
    return gulp.src(filePath.copyFavicon.src)
        .pipe(gulp.dest(filePath.build.dest))
        .pipe(notify({ message: 'favicon successfully copied' }));
});


// =======================================================================
// Watch for changes
// =======================================================================  
gulp.task('watch', function () {
    gulp.watch(filePath.browserify.watch, ['bundle-dev']);
    gulp.watch(filePath.styles.watch, ['styles-dev']);
    gulp.watch(filePath.images.watch, ['images']);
    gulp.watch(filePath.vendorJS.src, ['vendorJS']);
    gulp.watch(filePath.vendorCSS.src, ['vendorCSS']);
    gulp.watch(filePath.copyIndex.watch, ['copyIndex']);
    console.log('Watching...');
});


// =======================================================================
// Sequential Build Rendering
// =======================================================================  

// run "gulp" in terminal to build the DEV app
gulp.task('build-dev', function(callback) {
    runSequence(
        ['clean-dev', 'lint'],
        // images and vendor tasks are removed to speed up build time. Use "gulp build" to do a full re-build of the dev app.
        ['bundle-dev', 'styles-dev', 'copyIndex', 'copyFavicon'],
        ['dev', 'watch'],
        callback
    );
});

// run "gulp prod" in terminal to build the PROD-ready app
gulp.task('build-prod', function(callback) {
    runSequence(
        ['clean-full', 'lint'],
        ['bundle-prod', 'styles-prod', 'images', 'vendorJS', 'vendorCSS', 'copyIndex', 'copyFavicon'],
        ['stage'],
        callback
    );
});

// run "gulp build" in terminal for a full re-build in DEV
gulp.task('build', function(callback) {
    runSequence(
        ['clean-full', 'lint'],
        ['bundle-dev', 'styles-dev', 'images', 'vendorJS', 'vendorCSS', 'copyIndex', 'copyFavicon'],
        ['dev', 'watch'],
        callback
    );
});


gulp.task('default',['build-dev']); 
gulp.task('prod',['build-prod']); 