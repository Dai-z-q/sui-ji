/**
 * Created by daizq.
 */

define([
    'jquery',
    'angular'
], function ($, angular) {
    "use strict";

    var chartroomController = function ($scope, $location, $http) {
        $scope.messages = [];
        $scope.inputBox = {
            value: "",
            keydown: function (event) {
                event.keyCode === 17 && (this.ctrlFlag = true);
                if (this.ctrlFlag && event.keyCode === 13 && $scope.inputBox.value) {
                    ws.send(JSON.stringify({
                        userName: $scope.userInfo.userName,
                        content: $scope.inputBox.value
                    }));
                    $scope.inputBox.value = "";
                }
            },
            keyup: function (event) {
                event.keyCode === 17 && (this.ctrlFlag = false);
            }
        }

        function checkMessageHeight() {
            var $messagesBox = $(".messages-box"),
                $messagesWrap = $(".messages-wrap");

            if ($messagesWrap.height() > $messagesBox.height()) {
                $messagesBox.scrollTop($messagesWrap.height() - $messagesBox.height() + 10);
            }
        }

        var ws = new WebSocket("ws://" + window.location.hostname + ":3000");
        ws.onopen = function () {
            ws.send(JSON.stringify({
                content: $scope.userInfo.userName + "加入了聊天室。"
            }));
            console.log("Connected to SuiJi Chat.");

        };
        ws.onclose = function () {
            console.log("Disconnected.");
        };
        ws.onmessage = function (payload) {
            if (typeof payload.data === "string") {
                $scope.$apply(function () {
                    $scope.messages.push(JSON.parse(payload.data));
                    
                });
                checkMessageHeight();
            }
        };

        //切换退出时关闭 WebSocket
        $scope.$on('$destroy', function () {
            ws.close();
        });
    };

    return {
        chartroomCtrl: chartroomController
    }
});