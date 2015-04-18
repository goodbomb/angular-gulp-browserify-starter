'use strict';

function pageRoutes($stateProvider) {

    var about = {
        name: 'about',
        url: '/about',
        template: '<div about-view></div>',
        data: {
            moduleClasses: 'page',
            pageClasses: 'about',
            pageTitle: 'How it Works',
            pageDescription: 'Find your favourite cause, donate and receive vouchers of equal value that are redeemable at participating businesses.'
        }
    };

    $stateProvider.state(about);

}

pageRoutes.$inject = ['$stateProvider'];
module.exports = pageRoutes;