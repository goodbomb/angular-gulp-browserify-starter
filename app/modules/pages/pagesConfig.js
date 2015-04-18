'use strict';

function pageRoutes($stateProvider) {

    var about = {
        name: 'about',
        url: '/about',
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