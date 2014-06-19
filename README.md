# AngularJS-Gulp-Browserify Starter App

This Angular starter app is built with best practices in mind. The folder structure is intended to be different than the standard official AngularJS application. The application architecture follows modern design conventions from the proposal outlined here:

https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub

Files are grouped structurally (each section of the app being self contained with its own styles, views, controllers, and directives) instead of functionally (all views in one folder, all styles in one folder, etc). In practice, the file structure should look like this:

```
/app
--- /assets
------ /images
------ /vendor
--- /module1 (ex: common)
------ index.js (directives and module config)
------ module1.html (view)
------ module1.js (controller)
------ module1.less
--- /module2 (ex: home)
------ index.js
------ module2.html
------ module2.js
------ module2.less
--- /module3 (ex: about)
--- /module4 (ex: contact)
--- app.js
--- app.less
/dist
```

Each Module is self-contained and the js files are exported, combined, and minified through Browserify. Every LESS file from each module should be imported into the master ```app.less``` file in the root app directory. It is then processed by Gulp and a css file with a source map is pushed to the ```dist``` folder.

### Instructions
1) Node Modules and Bower Components are not included in this repository to keep it light weight. After cloning or pulling changes from this repository, make sure to run the following commands in terminal:

```npm install``` and ```bower install```

2) Once everything is installed all you have to do is run ```gulp``` and your new server will be running at ```http://localhost:5000```
