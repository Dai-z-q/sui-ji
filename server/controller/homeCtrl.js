/*global exports,require*/
/**
 * Created by daizq on 2016/8/19.
 */
(function () {
    "use strict";
    var data = require("../data");

    //首页初始页面
    exports.index = function (req, res, next) {
        res.sendfile('./web/app/index.html');
    };

    exports.searchs = function (req, res, next) {
        var queryData = {};
        req.body.code !== undefined && (queryData.code = req.body.code);
        req.body.name !== undefined && (queryData.name = new RegExp(req.body.name));
        req.body.sex !== undefined && (queryData.sex = new RegExp(req.body.sex));
        req.body.age !== undefined && (queryData.age = req.body.age);
        req.body.email !== undefined && (queryData.email = new RegExp(req.body.email));
        req.body.password !== undefined && (queryData.password = new RegExp(req.body.password));

        data.User.find(queryData, function (err, doc) {
            console.log('查询结果：' + doc)
            res.json(doc);
        }).sort({
            code: 1
        });
    };

})();
