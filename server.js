/**
 * Created by daizq on 2016/8/19.
 */
(function () {
    "use strict";
    var express = require("express"),
        //针对请求参数body获取为空的问题，引入body-parser
        bodyParser = require("body-parser"),
        app = express(),
        cookieParser = require("cookie-parser"),
        session = require("express-session"),
        route = require("./server/route"),
        config = require("./server/config")


    //添加http请求头参数body的解析机制
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    //设置静态文件目录
    app.use(express.static(__dirname + "/web/app"));

    app.use(cookieParser("SuiJiSession"));
    app.use(session({
        //服务器端生成session的签名
        secret: "SuiJiSession",
        //(是否允许)当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存
        resave: true,
        //是否保存未初始化的会话
        saveUninitialized: false,
        name: "sui-ji",
        //cookie:设置返回到前端key的属性，默认值为{ path: '/', httpOnly: true, secure: false, maxAge: null }
        cookie: {
            //将此设置为true时，如果浏览器没有使用HTTPS连接，客户端将不会将cookie发送回服务器。
            secure: false,
            //session和相应的cookie失效日期
            maxAge: 0.5 * 60 * 60 * 1000
        }
    }));

    //初始化路由
    route(app);

    //create server
    app.listen(config.port, config.host, function () {
        console.log("Server listened on port " + config.port);
    });
})();