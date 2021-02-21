/**
 *  路由配置模块 
 */

define(function () {
    return {
        topMenu: [
            {
                name: "首页",
                href: "#/home"
            },
            {
                name: "开发笔记",
                href: "#/develoNote"
            },
            {
                name: "技术分享",
                href: "#/sharing"
            },
            {
                name: "论坛",
                href: "#/forum"
            },
            {
                name: "聊天室",
                href: "#/chartroom"
            }
        ],
        routeMap: {
            "header": {
                url: "/header",
                templateUrl: "business/header/view/header.html",
                controller: "headerCtrl",
                path: "business/header/controllers/headerCtrl.js"
            },
            "login": {
                url: "/login",
                templateUrl: "business/header/view/login.html",
                controller: "loginCtrl",
                path: "business/header/controllers/loginCtrl.js"
            },
            "home": {
                url: "/home",
                templateUrl: "business/home/view/home.html",
                path: "business/home/controllers/homeCtrl.js",
                controller: "homeCtrl"
            },
            "develoNote": {
                url: "/develoNote",
                templateUrl: "business/develoNote/view/develoNote.html",
                path: "business/develoNote/controllers/develoNoteCtrl.js",
                controller: "develoNoteCtrl"
            },
            "sharing": {
                url: "/sharing",
                templateUrl: "business/sharing/view/sharing.html",
                path: "business/sharing/controllers/sharingCtrl.js",
                controller: "sharingCtrl"
            },
            "forum": {
                url: "/forum",
                templateUrl: "business/forum/view/forum.html",
                path: "business/forum/controllers/forumCtrl.js",
                controller: "forumCtrl"
            },
            "chartroom": {
                url: "/chartroom",
                templateUrl: "business/chartroom/view/chartroom.html",
                path: "business/chartroom/controllers/chartroomCtrl.js",
                controller: "chartroomCtrl"
            }
        },
        defaultRoute: "/login"
    };
});