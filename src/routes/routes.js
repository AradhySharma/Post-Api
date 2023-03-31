const express = require("express")
const Post = require("../models/Post");
const Comment = require("../models/Comment");
// Define the routes for the Posts endpoint
const router = express.Router();

// Create a new post
router.post('/spost', async (req, res) => {
  const data = req.body;
  //const { author, content } = req.body;
  let savedata = await Post.create(data)
  //const post = new Post({ author, content });
  //await post.save();
  res.send(savedata);
  //res.send(post);
});

// Get all posts
router.get('/gpost', async (req, res) => {
  const posts = await Post.find().populate('comments');
  res.send(posts);
});

// Get a specific post
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId).populate('comments');
  res.send(post);
});

// Update a post
router.put('/:postId', async (req, res) => {
  const { postId } = req.params;
  const { author, content } = req.body;
  const post = await Post.findByIdAndUpdate(postId, { author, content }, { new: true });
  res.send(post);
});

// Delete a post
router.delete('/:postId', async (req, res) => {
  const { postId } = req.params;
  await Post.findByIdAndDelete(postId);
  res.send({ message: 'Post deleted' });
});

router.post('/comments', async (req, res) => {
  const comment = new Comment(req.body);
  await comment.save();
  const parentComment = await Comment.findById(comment.parentComment).populate('comments');
  parentComment.comments.push(comment._id);
  await parentComment.save();
  res.status(201).send(comment);
});

router.get('/comments/:id', async (req, res) => {
  const comment = await Comment.findById(req.params.id).populate('comments');
  res.status(200).send(comment);
});

router.put('/comments/:id', async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).send(comment);
});

router.delete('/comments/:id', async (req, res) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);
  const parentComment = await Comment.findById(comment.parentComment).populate('comments');
  const index = parentComment.comments.indexOf(comment._id);
  parentComment.comments.splice(index, 1);
  await parentComment.save();
  res.status(200).send(comment);
});

module.exports = router