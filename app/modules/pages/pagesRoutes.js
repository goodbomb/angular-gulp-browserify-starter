'use strict';

function pageRoutes($stateProvider) {

    var about = {
        name: 'pages.about',
        url: '^/about', // The ^ character makes this url override the parent url
        template: '<div about-view></div>',
        data: {
            moduleClasses: 'page',
            pageClasses: 'about',
            pageTitle: 'About',
            pageDescription: 'Some description.'
        }
    };

    $stateProvider.state(about);

}

pageRoutes.$inject = ['$stateProvider'];
module.exports = pageRoutes;