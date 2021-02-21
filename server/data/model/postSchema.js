var mongoose = require('mongoose'),
    Schema = mongoose.Schema

/**
 * Getters
 */

var getTags = function (tags) {
    return tags.join(',')
};

/**
 * Setters
 */

var setTags = function (tags) {
    return tags.split(',')
};
var Comment = new Schema({
    cid: { type: String },
    uid: { type: String },
    message: { type: String },
    format: { type: Number, default: 1 }, // 1: text; 2: html
    type: { type: Number, default: 1 },// 1：text；2：emotion；3：audio
    status: { type: Number, default: 0 },//0.待审核 1: OK
    create_date: { type: Number, default: Date.now }
}, { _id: false });

var Post = new Schema({
    /* id: { type: String, index: true },
    title: { type: String },
    summary: { type: String, default: '' },
    content: { type: String },
    //status         : { type: Number, default: 1}, // 0: 草稿,1: OK
    published: { type: Number, default: 1 },//1 true 0 false
    is_deleted: { type: Number, default: 0 }, // 0: false; 1: true;
    comment_count: { type: Number, default: 0 },
    comments: [Comment],
    tags: { type: [], get: getTags, set: setTags },
    category: { type: Number, default: 0 },
    last_reply_uid: { type: String, default: '' },
    last_reply_date: { type: Number, default: Date.now },
    author: { type: String, index: true },
    create_date: { type: Number, default: Date.now, index: true },
    publish_date: { type: Number, default: Date.now },
    update_uid: { type: String },
    update_date: { type: Number, default: Date.now },
    hits: { type: Number, default: 0 } */
    userCode: String,
    userName: String,
    sex: String,
    age: Number,
    phone: String,
    email: String,
    password: String
});

Post.methods = {
    makeSimple: function () {
        return _.pick(this, 'id', 'title', 'summary', 'category', 'published', 'tags', 'author', 'create_date', 'publish_date', 'hits');
    },
    makeFull: function () {
        return _.pick(this, 'id', 'title', 'summary', 'category', 'content', 'published', 'tags', 'author', 'create_date', 'publish_date', 'hits', 'comments');
    }
};

Post.statics = {

};
module.exports = Post;