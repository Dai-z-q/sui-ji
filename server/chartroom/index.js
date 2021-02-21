/**
 * Created by daizq on 2018/12/19.
 */

(function () {
    var config = require("../config");

    module.exports = function () {
        var WebSocketServer = require("ws").Server;
        var wss = new WebSocketServer({
            port: config.wsPort
        });

        console.log("WebSocket listened on port " + config.wsPort);

        wss.on("connection", function (ws) {
            ws.on("message", function (message) {
                var msg = JSON.parse(message);
                if (msg.type === "exit") {
                    ws.close();
                } 
                else {
                    msg.time = (new Date()).toLocaleString();
                    wss.clients.forEach(function (client) {
                        client.send(JSON.stringify(msg));
                    });
                }
            });

            ws.send(JSON.stringify({
                time: (new Date()).toLocaleString(),
                content: "Welcome to SuiJi chat."
            }));
        });
    };
})();