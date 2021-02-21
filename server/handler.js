"use strict";
var data = require("./data");

/**
 * Init
 * @param req
 * @param res
 * @param next
 */
exports.init = function (req, res, next) {


};

exports.domainMiddleware = function (req, res, next) {

};


exports.errorHandler = function (error, req, res, next) {
    if (error && 'number' !== typeof error) {
        if (error.code && !error.error) {

        } else {

        }
    }
    if (req.url.indexOf("/api") === 0) {
        if (error && error.code) {
            return res.send({code: error.code});
        } else if ('number' === typeof error) {

            return res.send({code: error});
        } else {

        }
    } else {
        return res.render('home/error.html', {title: '服务器异常', current_nav: "error"});
    }
};