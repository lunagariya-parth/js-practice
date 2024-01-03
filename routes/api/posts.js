const express = require("express");
const router = express.Router();

// Post Model
const Post = require("../../models/Posts");

//GET req GET all Posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) throw Error("No Item");
    res.status(200).json(posts);
  } catch {
    res.status(400).json({ msg: err });
  }
});

//GET req GET An Posts
router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) throw Error("No Post found");
      res.status(200).json(post);
    } catch {
      res.status(400).json({ msg: err });
    }
  });

// POST request
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const post = await newPost.save();
    if (!post) throw Error("Something went wrong while saving post");
    res.status(200).json(post);
  } catch {
    res.status(400).json({ msg: err });
  }
});

//DELETE req
router.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) throw Error("No Post Found");
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
});
  
//UPDATE req
router.patch("/:id", async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(req.params.id,req.body);
      if (!post) throw Error("Something went wrong while updating post");
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  });
module.exports = router;
