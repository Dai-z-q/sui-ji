/*global exports,require*/
/**
 * Created by daizq on 2016/8/19.
 */
var mongoose = require("mongoose"),
    schemas = require("./model/schema"),
    UserData = require("./constructor/userData"),
    PostData = require("./constructor/postData"),
    DB_URL = "mongodb://localhost:27017/SuiJi",
    connectTimes = 0;


var connect = function () {
    connectTimes++;

    if (connectTimes > 5) {
        return;
    }

    console.log("Mongoose connection connect " + connectTimes + " times.");
    mongoose.connect(DB_URL);
};

/**
 * 连接成功
 */
mongoose.connection.on("connected", function () {
    console.log("Mongoose connection open to " + DB_URL);
});

/**
 * 连接异常
 */
mongoose.connection.on("error", function (err) {
    console.log("Mongoose connection error: " + err);
});

/**
 * 连接断开
 */
mongoose.connection.on("disconnected", function () {
    console.log("Mongoose connection disconnected");
    connect();
});

connect();

/* process.on("SIGINT", function () {
    mongoose.connection.close(function () {
        process.exit(0);
    });
}); */

module.exports = {
    User: new UserData(schemas.User),
    Post: new PostData(schemas.Post)
};