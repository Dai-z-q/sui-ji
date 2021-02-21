var mongoose = require('mongoose');

module.exports = function (schema) {
    this.Schema = schema;
    return mongoose.model("Post", schema);
};