# AngularJS-Gulp-Browserify Starter App

This Angular starter app is built with best practices in mind. The folder structure is intended to be different than the standard official AngularJS application. The application architecture follows modern design conventions from the proposal outlined here:

https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub

Files are grouped structurally (each section of the app being self contained with its own styles, views, controllers, and directives) instead of functionally (all views in one folder, all styles in one folder, etc). In practice, the basic file structure should look something like this:

```
/app
--- /assets
------ /images
--- /common
------ /directives
------ /resources
------ /services
------ /styles
------ common.js (common module requirements)
------ common.less
--- /module2 (ex: home)
------ index.js (module definition)
------ home.html (view)
------ homeController.js (controller)
------ homeDirective.js (directives)
------ module2.less (styles)
--- /module3 (ex: about)
------ index.js
------ moduleView.html
------ moduleController.js
------ moduleDirective.js
------ module.less
--- /module4 (ex: contact)
--- app.js
--- app.less
--- appRoutes.js (config file / path routes)
--- index.html
/dist (this is the gulp pipeline file output destination)
/libs (bower components install here)
/node_modules (npm installations go here)
```

Each Module is self-contained and the js files are exported, combined, and minified through Browserify. Every LESS file from each module should be imported into the master ```app.less``` file in the root app directory. Likewise, each LESS file from a sub-module should be imported into the main ```module.less``` file. The main app.less file is then processed by Gulp and a css file with a source map is pushed to the ```dist``` folder.

### Instructions
1) Node Modules and Bower Components are not included in this repository to keep it light weight. After cloning or pulling changes from this repository, make sure to run the following commands in terminal:

```npm install``` and ```bower install```

2) Once everything is installed all you have to do is run ```gulp``` and your new server will be running at ```http://localhost:5000```


### Working with this application structure
1) All pipeline, automation, and testing dependencies are in the ```node_modules``` folder (installed using npm), while all third party application libraries are located in the ```libs``` folder (installed using bower).

2) Any additional third party modules and plugins should always be installed automatically whenever possible using ```npm install module_name``` or ```bower install module_name``` with the ```--save``` or ```--save-dev``` suffixes to save the dependencies in the ```package.json``` and ```bower.json``` files.

3) All development takes place in the ```app``` folder. Production files are generated with gulp automatically and pushed to the ```dist``` folder (it will automatically be created the first time the ```gulp``` task is run in terminal post-installation).

4) The ```gulpFile.js``` is clearly commented, defining each task that takes place during pipeline automation. Every file change is watched and new files are automatically pushed to the ```dist``` folder. All files are concatenated into individual files for use on production servers.


### Routes, Controllers and TemplateURLs
1) Default AngularJS applications tend to use the ```angular-route``` plugin that makes use of a main ```ng-view``` directive in the index.html file and standard ```href``` tags for links. This application is using the ```angular-ui-router``` plugin for better route nesting and greater customizability. It makes use of a main ```ui-view``` directive instead of ```ng-view``` and uses an ```sref``` tag for links instead of the normal ```href``` tag. Check out the official documentation for more details: https://github.com/angular-ui/ui-router

2) Due to the modularity of this application structure, standard routing parameters aren't being used. In most examples, routes make use of ```TemplateURL``` and ```controller``` like so:

```
$stateProvider
    .state('home', {
      url: '/',
      templateUrl: './modules/home/home.html',
      controller: './modules/home/homeController.js'
    })
...
```
In this application, each module is set up as an injectible directive with its own controller. So instead of the above example, the home module has a directive called ```homeView``` that can be injected into the HTML like this: ```<div home-view></div>``` (camelcased directives always have to be changed to dashed names when in the HTML). As such, our route config makes use of the ```template``` paramter instead of ```templateURL```. So the routes look like this instead:

```
$stateProvider
    .state('home', {
      url: '/',
      template: '<div home-view></div>'
    });
```
As you can see, it's simpler and cleaner, calling only an HTML ```<div></div>``` tag as a template and leaving everything else contained within the module. This way, if anything changes in the file structure, the routes won't need to be updated.
