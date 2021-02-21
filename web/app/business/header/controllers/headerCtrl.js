/**
 * Created by daizq.
 */

define([
    'jquery',
    'angular'
], function ($, angular) {
    "use strict";

    var headerController = function ($scope, ajaxService, $location, $http) {
        //<!--data-toggle="tab" 会阻止a标签的默认行为-->
        $scope.userInfoClick = function () {
            $.removeCookie("SJSESSIONID");
            ajaxService.logout();
        }
    };

    return {
        headerCtrl: headerController
    }
});