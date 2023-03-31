const mongoose = require("mongoose")
const PostSchema = new mongoose.Schema({
    author: String,
    content: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  }, { timestamps: true });

  // const Post = mongoose.model('Post', PostSchema);
  module.exports =  mongoose.model('Post', PostSchema)