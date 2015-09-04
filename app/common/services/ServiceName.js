'use strict';

var ServiceName = function(socketFactory) {
    return socketFactory();
};

ServiceName.$inject = ['socketFactory'];
module.exports = ServiceName;
