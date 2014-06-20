// =======================================================================
// Gulp Plugins
// =======================================================================
var gulp 		 	= require('gulp'),
    gutil 		 	= require('gulp-util'),
    jshint 		 	= require('gulp-jshint'),
    stylish 		= require('jshint-stylish'),
    concat 		 	= require('gulp-concat'),
    clean 		 	= require('gulp-clean'),
    streamify		= require('gulp-streamify'),
    uglify 			= require('gulp-uglify'),
    sourcemaps		= require('gulp-sourcemaps'),
    less 			= require('gulp-less-sourcemap'),
    prefix			= require('gulp-autoprefixer'),
    minifyCSS 		= require('gulp-minify-css'),
    notify 			= require('gulp-notify'),
    angularTplCache = require('gulp-angular-templatecache'),
    browserify   	= require('browserify'),
    source       	= require('vinyl-source-stream'),
    buffer 			= require('vinyl-buffer'),
    runSequence 	= require('run-sequence');


// =======================================================================
// File Paths
// =======================================================================
var filePath = {
    build: { 
    	dest: './dist/' 
    },
    lint: { 
    	src: ['./app/*.js', './app/**/*.js'] 
    },
    browserify: { 
    	src: './app/app.js',
    	watch: ['!./app/assets/libs/*.js','./app/*.js','./app/**/*.js'] 
    },
    styles: { 
    	src: './app/app.less', 
    	watch: ['./app/app.less','./app/**/*.less'] 
    },
    images: { 
    	src: './app/assets/images/*', 
    	watch: './app/assets/images/*', 
    	dest: './dist/images/' 
    },
    vendorJS: { 
        // These files will be bundled into a single vendor.js file that's called at the bottom of index.html
    	src: 
        [
            './libs/jquery/dist/jquery.min.js',
            './libs/bootstrap/dist/js/bootstrap.min.js'
        ]
	},
    vendorCSS: { 
    	src: ['./libs/bootstrap/dist/css/bootstrap.css']
    },
    copyIndex: { 
    	src: './app/index.html', 
    	watch: './app/index.html' 
    }
};


// =======================================================================
// Server Settings for local development (Express Server)
// =======================================================================
var embedlr 		= require('gulp-embedlr'),
    refresh 		= require('gulp-livereload'),
    lrserver 		= require('tiny-lr')(),
    express 		= require('express'),
    livereload 		= require('connect-livereload'),
    livereloadport 	= 35729,
    serverport 		= 5000,
    server 			= express();

server.use(livereload({port: livereloadport}));
// Use our 'dist' folder as rootfolder
server.use(express.static('./dist'));
// Redirects everything back to our index.html
server.all('/*', function(req, res) {
    res.sendfile(filePath.copyIndex.src, { root: 'dist' });
});


// =======================================================================
// Dev Server Task
// =======================================================================  
gulp.task('dev', function() {
	server.listen(serverport);
	lrserver.listen(livereloadport);
});


// =======================================================================
// Clean out dist folder contents on build
// =======================================================================  
gulp.task('clean', function () {
	gulp.src(filePath.build.dest, {read: false})
    	.pipe(clean());
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
// Browserify
// =======================================================================  
gulp.task('browserify', function() {
    return browserify(filePath.browserify.src)
        .bundle({ debug: true })
        .pipe(source('bundle.js'))
        .pipe(buffer())
    //    .pipe(streamify(uglify()))
        .pipe(gulp.dest(filePath.build.dest))
        .pipe(notify({ message: 'Browserify task complete' }))
        .pipe(refresh(lrserver));
});


// =======================================================================
// Styles Task
// =======================================================================  
gulp.task('styles', function () {
    gulp.src(filePath.styles.src)
        .pipe(less())
		.pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
		.pipe(minifyCSS())
        .pipe(gulp.dest(filePath.build.dest))
        // This next line will be displayed twice - once for the CSS file and once for the source map
        .pipe(notify({ message: 'Styles task complete' }))
        .pipe(refresh(lrserver));
});


// =======================================================================
// Images Task
// =======================================================================  
gulp.task('images', function() {
    return gulp.src(filePath.images.src)
    .pipe(gulp.dest(filePath.images.dest))
    .pipe(notify({ message: 'Images task complete' }))
    .pipe(refresh(lrserver));
});


// =======================================================================
// Vendor JS Task
// =======================================================================  
gulp.task('vendorJS', function () {
    return gulp.src(filePath.vendorJS.src)
        .pipe(concat("vendor.js"))
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
// Watch for changes
// =======================================================================  
gulp.task('watch', function () {
	gulp.watch(filePath.browserify.watch, ['browserify']);
    gulp.watch(filePath.styles.watch, ['styles']);
    gulp.watch(filePath.images.watch, ['images']);
    gulp.watch(filePath.vendorJS.src, ['vendorJS']);
    gulp.watch(filePath.vendorCSS.src, ['vendorCSS']);
    gulp.watch(filePath.copyIndex.watch, ['copyIndex']);
});


// =======================================================================
// Sequential Build Rendering
// =======================================================================  
gulp.task('build', function(callback) {
	runSequence(
	  	['clean', 'lint'],
		['browserify', 'styles', 'images', 'vendorJS', 'vendorCSS', 'copyIndex'],
		['dev', 'watch'],
		callback
	);
});


gulp.task('default',['build']);