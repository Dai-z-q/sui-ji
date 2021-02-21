/**
 * Created by daizq.
 */

"use strict";

(function () {
    //禁用移动端手动拖动缩放界面
    document.ontouchmove = function (e) {
        e.preventDefault();
    };
})();

(function () {

    //配置baseUrl
    var baseUrl = "./";

    /*
     * 文件依赖
     */
    var config = {
        //依赖相对路径
        baseUrl: baseUrl,
        paths: {
            "jquery": "lib/jquery/jquery",
            "underscore": "lib/underscore/underscore",
            "angular": "lib/angular/angular",
            //"angular-route": "lib/angular/angular-route",
            "text": "lib/text",
            //用于requirejs导入html类型的依赖
            "bootstrap": "lib/bootstrap/js/bootstrap.min",
            "utils": "lib/utils"
        },
        /**
         * 引入没有使用requirejs模块写法的类库。
         * 例如underscore这个类库，本来会有一个全局变量"_"。
         * 这里shim等于快速定义一个模块，把原来的全局变量"_"封装在局部，并导出为一个exports，变成跟普通requirejs模块一样
         */
        shim: {
            "jquery": {
                exports: "$"
            },
            "underscore": {
                exports: "_"
            },
            "angular": {
                exports: "angular"
            },
            /* "angular-route": {
                deps: ["angular"],   //依赖的模块
                exports: "ngRouteModule"
            }, */
            "bootstrap": {
                deps: ["jquery"]
            },
            "utils": {
                deps: ["jquery"]
            }
        }
    };

    /**
     * require.config()方法，我们可以对模块的加载行为进行自定义。
     * require.config()写在主模块（main.js）的头部。
     * 参数就是一个对象，这个对象的paths属性指定各个模块的加载路径。
     * */
    require.config(config);

    //启动项目路由配置
    require([
        "angular",
        "require",
        "underscore",
        "jquery",
        "config/api.js",
        "service/ajaxService",
        //引入angular路由插件，不使用内置路由，采用开源优化的升级版angular-ui-router
        //"lib/angular-ui-router/release/angular-ui-router.js",
        "lib/angular/angular-ui-router.js",
        //引入bootstrap.js，方便项目使用bootstrap组件
        "bootstrap",
        "utils"
    ], function (angular, require, _, $, api, ajaxService) {

        var app = angular.module("SuiJiApp", ["ui.router"]);

        app.config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise(api.defaultRoute);

            _.each(api.routeMap, function (value, key) {
                $stateProvider.state(key, {
                    url: value.url,
                    templateUrl: value.templateUrl,
                    controller: value.controller
                });
            });
        });


        require(_.chain(api.routeMap).map(function (v) {
            return v.path;
        }).value(), function () {
            _.each(arguments, function (item) {
                app.controller(item);
            });

            app.service("ajaxService", ajaxService);

            app.run(["$rootScope", "$window", "$location", "$http", function ($rootScope, $window, $location, $http) {
                $rootScope.topMenu = [];
                $rootScope.userInfo = {};

                $rootScope.$on("$locationChangeStart", function (toState, fromState) {
                    var SJSESSIONID = $.cookie("SJSESSIONID");
                    if (SJSESSIONID) {
                        $http.post("/api/user/getLoginStatus").success(function (data) {
                            if (data.loginFlag === "101") {
                                $rootScope.userInfo = JSON.parse(SJSESSIONID.substring(SJSESSIONID.indexOf(":") + 1));
                                $rootScope.topMenu = api.topMenu;
                                $location.path() === "/login" && $location.path("/home");
                            }
                            else {
                                $rootScope.userInfo = {};
                                $rootScope.topMenu = [];
                                $.removeCookie("SJSESSIONID");
                                $location.path() !== "/login" && $location.path("/login");
                            }
                        });
                    }
                    else {
                        $rootScope.userInfo = {};
                        $rootScope.topMenu = [];
                        $.removeCookie("SJSESSIONID");
                        $location.path() !== "/login" && $location.path("/login");
                    }
                });
            }]);

            //手动启动 ng-app
            angular.bootstrap(document, ["SuiJiApp"]);
        });
    });
})();