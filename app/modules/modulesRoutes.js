'use strict';

function modulesRoutes($stateProvider) {

    var home = {
        name: 'home', // state name
        url: '/', // url path that activates this state
        template: '<div home-view></div>', // generate the Directive "homeView" - when calling the directive in HTML, the name must not be camelCased
        data: {
            moduleClasses: 'page', // assign a module class to the <body> tag
            pageClasses: 'home', // assign a page-specific class to the <body> tag
            pageTitle: 'Home', // set the title in the <head> section of the index.html file
            pageDescription: 'Meta Description goes here' // meta description in <head>
        }
    };

    var pages = {
        name: 'pages',
        abstract: true,  // This makes it so that the url for this route doesn't actually resolve
        url: '/pages',
        template: '<div ui-view></div>', // This injects a new ui-view that the about page directive is injected into
        controller: 'PagesCtrl'
    };

    $stateProvider.state(home);
    $stateProvider.state(pages);

}

modulesRoutes.$inject = ['$stateProvider'];
module.exports = modulesRoutes;