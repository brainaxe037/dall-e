import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

// const cloud_name = "djgelgtkk";
// const api_key_ = "411235442154167";
// const api_secret_key = "77sUxlhPBbw_UO40KZI_JB23GPo";


const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

});

//get all postS
router.route('/').get(async(req, res) =>{
    try {
        const posts = await Post.find({});
        res.status(200).json({ success:true, data: posts})

    } catch (error) {
        res.status(500).json({ success: false, message: error});
    }
});

//create a post
router.route('/').post(async(req, res) =>{
    try {
        const { name, prompt, photo } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);

        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        });

        res.status(200).json({ success: true, data: newPost});
    } catch (error) {
        res.status(500).json({ success: false, message: error});
    }
});

export default router;