const mongoose = require("mongoose")
const CommentSchema = new mongoose.Schema({
    author: String,
    content: String,
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
  }, { timestamps: true });
  
  // const Comment = mongoose.model('Comment', CommentSchema);
  module.exports =  mongoose.model('Comment', CommentSchema)