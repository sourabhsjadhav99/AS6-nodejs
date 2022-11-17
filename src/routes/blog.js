const router = require('express').Router();
const Blog = require('../models/Blog')
let express= require("express")
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// Your routing code goes here


router.get('/blog',async (req,res)=>{
  try {
    const { page, search } = req.query;
    const users = await Blog.find({topic:search})
    .skip((page - 1) * 10)
    .limit(10)
    res.status(200).json({
      status: "Sucess",
      users,
    });
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e.message,
    });
  }
})

//post
router.post("/blog", async (req, res) => {
    try {
      const users = await Blog.create(req.body);
      res.status(200).json({
        status: "Sucess",
        users,
      });
    } catch (e) {
      res.status(500).json({
        status: "failed",
        message: e.message,
      });
    }
  });

//put
router.put("blog/:id", async (req, res) => {
    try {
      const users = await Blog.updateOne( { _id: req.params.id },
        { $set: req.body });
      res.status(200).json({
        status: "Sucess",
        users,
      });
    } catch (e) {
      res.status(500).json({
        status: "failed",
        message: e.message,
      });
    }
  });

// delete
router.delete("blog/:id", async (req, res) => {
    try {
      const users = await Blog.deleteOne({ _id: req.params.id });
      res.status(200).json({
        status: "Sucess",
        users,
      });
    } catch (e) {
      res.status(500).json({
        status: "failed",
        message: e.message,
      });
    }
  });
module.exports = router;