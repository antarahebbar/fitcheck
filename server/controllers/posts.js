import PostMessage from "../models/postMessage.js";
import express from 'express';
import mongoose from 'mongoose';
import auth from "../middleware/auth.js";

const router = express.Router();
 
// Retrieve post
 export const getPosts = async (req, res) => {
    
    // Find all posts in database
    try{
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
 }

 export const getPostWithId = async (req, res) => {
    const { id } = req.params;

    try {
        const postMessage = await PostMessage.findById(id);

        res.status(200).json(postMessage);
    } catch {
        res.status(404).json ({message : error.message});
    }
 }

 // Create a post
 export const createPost = async(req, res) => {
    
    const post = req.body;

    // Create new post in database
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt : new Date().toISOString()});
    
    // Try to save new post, send json response
    try{
        await newPost.save();

        res.status(201).json(newPost); 
    } catch (error) {
        res.status(409).json({message: error.message});
    }
 }

 export const updatePost = async(req, res) => {
    
    // Route is set to :id, id is grabbed here
    const { id : post_id } = req.params;

    // Updated post sent from front end
    const post = req.body;

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(post_id))
    {
        res.status(404).send('No post found');
    }
    
    // Update in database

    let updatedPost = await PostMessage.findByIdAndUpdate(post_id, post, {new : true });


    // Send updated post
    res.json(updatedPost);
 }

 export const deletePost = async(req, res) => {
    const { id } = req.params;

     // Check if ID is valid
     if (!mongoose.Types.ObjectId.isValid(id))
     {
         res.status(404).send('No post found');
     }

     await PostMessage.findByIdAndRemove(id);

     res.json({ message : 'Post Deleted Successfully'});
 }

 export const likePost = async(req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.json( { message : 'Unauthenticated'});

     if (!mongoose.Types.ObjectId.isValid(id))
     {
         res.status(404).send('No post found');
     }

     const post = await PostMessage.findById(id);

     const index = post.likes.findIndex((id) => id === String(req.userId));

     // Like post 
     if (index === -1) { 
        post.likes.push(req.userId);
     } else { // Dislike
        post.likes = post.likes.filter((id) => id !== String(req.userId));
     }

     const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new : true});

     res.json(updatedPost);
 }

 export default router;