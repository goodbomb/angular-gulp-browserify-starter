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
    rename 			= require('gulp-rename');
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
    	src: './app/assets/libs/*.js',
		watch: './app/assets/libs/*.js'
	},
    views: { 
    	src: ['!./app/index.html','./app/**/*.html'],
    	watch: ['!./app/index.html','./app/**/*.html'] 
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
gulp.task('browserify', function(){
	var bundler = browserify(filePath.browserify.src);
  	return bundler.bundle({ debug: true })
	    .pipe(source(filePath.browserify.src))
	    .pipe(rename('bundle.js'))
	    .pipe(buffer())
	    .pipe(streamify(uglify()))
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
// Vendor Scripts Task
// =======================================================================  
gulp.task('vendorJS', function () {
    return gulp.src(filePath.vendorJS.src)
        .pipe(concat("scripts.js"))
        .pipe(uglify())
        .pipe(gulp.dest(filePath.build.dest))
        .pipe(notify({ message: 'VendorJS task complete' }))
});


// =======================================================================
// Views Task
// =======================================================================  
gulp.task('views',function(){
    //combine all HTML view files of the app into a js file
    return gulp.src(filePath.views.src)
        .pipe(angularTplCache('views.js',{standalone:true}))
        .pipe(gulp.dest(filePath.build.dest))
        .pipe(notify({ message: 'Views task complete' }))
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
    gulp.watch(filePath.views.watch, ['views']);
    gulp.watch(filePath.vendorJS.watch, ['vendorJS']);
    gulp.watch(filePath.copyIndex.watch, ['copyIndex']);
});


// =======================================================================
// Sequential Build Rendering
// =======================================================================  
gulp.task('build', function(callback) {
	runSequence(
	  	['clean', 'lint'],
		['browserify', 'styles', 'images', 'views', 'vendorJS', 'copyIndex'],
		['dev', 'watch'],
		callback
	);
});


gulp.task('default',['build']);