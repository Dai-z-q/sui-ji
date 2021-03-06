var util = require("util"),
    BaseData = require("./base"),
    mongoose = require('mongoose'),
    utils = require("../utils"),
    constant = require("../constant");

function ApplyData(schema) {
    this.Schema = schema;
    BaseData.call(this, mongoose.model("apply", schema));

    /**
     * add user
     * @param name
     * @param email
     * @param password
     * @param callback
     */
    this.add = function (name, email, callback) {
        var apply = new this.model({
            id      : utils.short_guid(),
            email   : email
        });
        apply.save(function (err) {
            return callback(err);
        });
    };

};


util.inherits(ApplyData, BaseData);

module.exports = ApplyData;