var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


//var Avatar = new Schema({
//    type: { type: Number},
//    path: { type: String }
//}, { _id: false });

var User = new Schema({
    userCode: String,
    userName: String,
    sex: String,
    age: Number,
    phone: String,
    email: String,
    password: String
});
module.exports = User;