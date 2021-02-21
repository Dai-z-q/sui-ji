define([
    'jquery',
    'angular'
], function ($, angular) {
    "use strict";

    var forumController = function ($scope, $http) {
        $scope.newArticle = [
            {
                title: "11111",
                content: "11111111111111111111111111"
            },
            {
                title: "22222",
                content: "22222222222222222222222222"
            },
            {
                title: "33333",
                content: "33333333333333333333333333"
            },
            {
                title: "44444",
                content: "44444444444444444444444444"
            }
        ];





    };

    return {
        forumCtrl: forumController
    }
});