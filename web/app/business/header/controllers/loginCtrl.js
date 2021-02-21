/**
 * Created by daizq.
 */

define([
    "jquery",
    "config/api.js"
], function ($, api) {
    "use strict";

    var loginController = function ($rootScope, $scope, ajaxService, $state) {

        //提示信息
        function showValidTip(id, msg, pos) {
            var $target = $("#" + id);
            pos = pos || "auto right";
            if ($target.data("bs.tooltip")) {
                $target.data("bs.tooltip").options.title = msg || "";
                $target.focus();
                return;
            }

            $target.tooltip({
                placement: pos,
                title: msg,
                trigger: "focus",
                html: false
            }).focus();

            setTimeout(function () {
                $target.data("bs.tooltip") && $target.tooltip("destroy");
            }, 3000);
        }

        //校验手机号码
        function validTel(value) {
            return /^([+]?[\d]{1,3}-|[ ])?((13[0-9]{9})|(18[0-9]{9})|(15[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(16[0-9]{9})|(19[0-9]{9}))$/.exec(value) ||
                /^([5|6|9])\d{7}$/.exec(value) || /^[0][9]\d{8}$/.exec(value);
        }

        //选择页签时刷新验证码
        $("a[data-toggle='tab']").on("shown.bs.tab", function (e) {
            $(e.target.hash).find(".img-verify").attr("src", $scope.imgVerify.getPath());
        });

        //验证码
        $scope.imgVerify = {
            path: "/api/user/imgVerify",
            getPath: function () {
                return "/api/user/imgVerify?" + (new Date()).getTime() + "" + Math.round(Math.random() * 100);
            },
            click: function () {
                $scope.imgVerify.path = $scope.imgVerify.getPath();
            }
        };

        //注册
        $scope.registerInfo = {
            userCode: "",
            password: "",
            imgVerifyCode: "",
            keyup: function (event) {
                if (event.keyCode === 13) {
                    $scope.registerInfo.registerClick();
                }
            },
            registerClick: function () {
                var that = this;

                if (!that.userCode) {
                    showValidTip("registeruserCode", "请输入手机号码！");
                    return false;
                }

                if (!validTel(that.userCode)) {
                    showValidTip("registeruserCode", "请输入正确的手机号码！");
                    return false;
                }

                if (!that.password) {
                    showValidTip("registerPassword", "请输入密码！");
                    return false;
                }

                if (!that.imgVerifyCode) {
                    showValidTip("registerImgVerifyCode", "请输入验证码！");
                    return false;
                }

                ajaxService.getRegisterInfo({
                    userCode: that.userCode,
                    password: that.password,
                    imgVerifyCode: that.imgVerifyCode
                }).success(function (data) {
                    if (data.code !== "0") {
                        showValidTip("registerBtn", data.msg || "注册失败！", "auto bottom");
                        $scope.imgVerify.path = $scope.imgVerify.path + "?" + Math.random();
                        return false;
                    }

                    //注册成功跳转到登陆
                    $scope.loginInfo.userCode = that.userCode;
                    $("#loginTab").find("li>a").eq(0).trigger("click");
                }).error(function () {
                    showValidTip("registeruserCode", "注册失败！");
                });
            }
        };

        //登陆
        $scope.loginInfo = {
            userCode: "",
            password: "",
            keyup: function (event) {
                if (event.keyCode === 13) {
                    $scope.loginInfo.loginClick();
                }
            },
            loginClick: function () {
                var that = this;

                if (!that.userCode) {
                    showValidTip("userCode", "请输入手机号码！");
                    return false;
                }

                if (!validTel(that.userCode)) {
                    showValidTip("userCode", "请输入正确的手机号码！");
                    return false;
                }

                if (!that.password) {
                    showValidTip("password", "请输入密码！");
                    return false;
                }

                if (!that.imgVerifyCode) {
                    showValidTip("imgVerifyCode", "请输入验证码！");
                    return false;
                }

                ajaxService.getLoginInfo({
                    userCode: that.userCode,
                    password: that.password,
                    imgVerifyCode: that.imgVerifyCode
                }).success(function (data) {
                    if (data.code !== "0") {
                        showValidTip("loginBtn", data.msg || "登陆失败！", "auto bottom");
                        $scope.imgVerify.path = $scope.imgVerify.path + "?" + Math.random();
                        return false;
                    }

                    that.userCode = "";
                    that.password = "";
                    //更新用户信息
                    $rootScope.userInfo = data;
                    $rootScope.topMenu = api.topMenu;
                    $state.go("home");
                }).error(function () {
                    showValidTip("userCode", data.msg || "登陆失败！");
                });
            }
        };
    };

    return {
        loginCtrl: loginController
    }
});