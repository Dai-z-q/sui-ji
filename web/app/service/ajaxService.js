/**
 *  接口注册 
 */

define(function () {
    "use strict";

    var AjaxService = function ($location, $http) {
        this.getRegisterInfo = function (data) {
            return $http.post("/api/user/register", data);
        };

        this.getLoginInfo = function (data) {
            return $http.post("/api/user/login", data);
        };

        this.getLoginStatus = function (data) {
            return $http.post("/api/user/getLoginStatus", data);
        };

        this.logout = function (data) {
            return $http.post("/api/user/logout", data);
        };
    };

    return AjaxService;
});