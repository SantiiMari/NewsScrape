const mongoose = require("mongoose");
var Schema = mongoose.Schema

var CommentSchema = new Schema ({
 name: {
 type: String,
 //required: ["Take your notes here..."]
 },
 Body: {
     type: String,
     required: true
 },
});

var Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;

