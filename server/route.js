/**
 * Created by daizq on 2016/8/19.
 */
(function () {
    var controller = require("./controller"),
        handler = require("./handler"),
        chartroom = require("./chartroom");

    module.exports = function (app) {
        //改变请求头
        //app.use(handler.init);
        //app.use(handler.domainMiddleware);
        app.use(handler.errorHandler);

        //允许跨域
        app.all("*", function (req, res, next) {
            console.log("[" + new Date().toLocaleString() + "]请求接口：" + req.originalUrl);

            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
            res.header("X-Powered-By", "3.2.1");
            res.header("Content-Type", "application/json;charset=utf-8");
            next();
        });

        /* app.get("/*", function (req, res) {
            res.redirect("/");
        }); */
        
        //首页
        app.get("/", controller.home.index);
        app.post("/api/search", controller.home.searchs);

        //用户
        app.post("/api/user/register", controller.user.register);
        app.post("/api/user/login", controller.user.login);
        app.post("/api/user/getLoginStatus", controller.user.getLoginStatus);
        app.post("/api/user/logout", controller.user.logout);
        app.get("/api/user/imgVerify", controller.user.getImgVerify);

        //聊天室模块
        chartroom();
    };
})();