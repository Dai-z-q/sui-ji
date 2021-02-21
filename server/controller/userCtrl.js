/*global exports,require*/
/**
 * Created by daizq on 2016/8/19.
 */
(function () {
    "use strict";
    var data = require("../data"),
        svgCaptcha = require("svg-captcha");


    //获取登陆IP
    function getClientIP(req) {
        return req.headers["x-forwarded-for"] || // 判断是否有反向代理 IP
            req.connection.remoteAddress || // 判断 connection 的远程 IP
            req.socket.remoteAddress || // 判断后端的 socket 的 IP
            req.connection.socket.remoteAddress;
    };

    //注册
    exports.register = function (req, res, next) {
        data.User.find({
            phone: req.body.userCode || ""
        }, function (err, doc) {
            if (doc.length) {
                res.send({
                    code: "1",
                    msg: "当前用户已存在！"
                });
                return;
            }

            if (req.session.svgCaptcha.toUpperCase() !== req.body.imgVerifyCode.toUpperCase()) {
                res.send({
                    code: "1",
                    msg: "验证码错误！"
                });
                return;
            }

            var reqData = new data.User({
                userCode: req.body.userCode || "",
                userName: req.body.userCode || "",
                sex: "",
                age: 0,
                phone: req.body.userCode || "",
                email: "",
                password: req.body.password || ""
            });
            reqData.save(function (err, doc) {
                console.log("结果：" + doc);
                res.send({
                    code: "0",
                    msg: "注册成功！"
                });
            });
        });
    };

    //登陆
    exports.login = function (req, res, next) {
        data.User.find({
            userCode: req.body.userCode || ""
        }, function (err, doc) {
            if (!doc.length) {
                res.send({
                    code: "1",
                    msg: "当前用户不存在！",
                    loginFlag: "102"
                });
                return;
            }

            if (doc[0].password !== req.body.password) {
                res.send({
                    code: "1",
                    msg: "登陆密码错误！",
                    loginFlag: "102"
                });
                return;
            }

            if (req.session.svgCaptcha.toUpperCase() !== req.body.imgVerifyCode.toUpperCase()) {
                res.send({
                    code: "1",
                    msg: "验证码错误！"
                });
                return;
            }

            console.log("当前登陆IP为：", getClientIP(req));
            //记录session
            req.session.userInfo = {
                userName: doc[0].userName,
                loginFlag: "101"
            };
            //写入cookie
            res.cookie("SJSESSIONID", req.session.userInfo, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: false
            });
            res.send({
                code: "0",
                msg: "登陆成功！",
                loginFlag: "101",
                userName: doc[0].userName
            });
        });
    };

    //获取登陆状态
    exports.getLoginStatus = function (req, res, next) {
        res.send({
            code: "0",
            msg: "查询登陆状态成功！",
            loginFlag: req.session.userInfo ? "101" : "103"
        });
    };

    //退出
    exports.logout = function (req, res, next) {
        if (req.session.userInfo) {
            req.session.destroy();
            //res.redirect("/");
        }

        res.send({
            code: "0",
            msg: "退出成功！",
            loginFlag: "103"
        });
    };

    //获取验证码
    exports.getImgVerify = function (req, res, next) {
        var cap = svgCaptcha.create({
            //验证码长度
            size: 4,
            //验证码字符中排除 0o1i
            ignoreChars: "0o1i",
            //干扰线条的数量
            noise: 2,
            //验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
            color: true,
            //验证码图片背景颜色
            background: "#84C784",
            fontSize: 40,
            width: 80,
            height: 34
        });
        req.session.svgCaptcha = cap.text;
        //响应的类型
        res.type("svg");
        res.send(cap.data);
    }
})();
