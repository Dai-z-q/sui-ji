define([
    'jquery',
    'angular',
    'text!business/user/view/user.html'
], function ($, angular, tpl) {
    "use strict";

    var userController = function ($scope, $http) {

    };

    return {
        controller: userController,
        tpl: tpl
    }
});